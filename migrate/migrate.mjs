#!/usr/bin/env node
// Luogu -> Hexo migration. Run from the blog root.
//   node migrate/migrate.mjs probe <lid>     # inspect one article (no write)
//   node migrate/migrate.mjs one   <lid>     # migrate a single article (write)
//   node migrate/migrate.mjs run [list.json] # migrate everything in list.json
import fsp from 'node:fs/promises';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, 'source', '_posts');
const IMG_BASE = path.join(ROOT, 'source', 'images', 'luogu');
// Posts removed at the user's request — never emitted.
const SKIP_LIDS = new Set(['xzy7ww2t']); // 【乱搞】P1835 素数密度
// Algorithm tag map (lid -> [tags]) produced by the tagging pass; 题解 tags come
// from here instead of the auto problem-number tags.
let TAG_MAP = {};
try { TAG_MAP = JSON.parse(fs.readFileSync(path.join(ROOT, 'migrate', 'tags.json'), 'utf8')); } catch {}
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const SLEEP = ms => new Promise(r => setTimeout(r, ms));
const BROWSER_HEADERS = {
  'User-Agent': UA,
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  'Upgrade-Insecure-Requests': '1',
};
const cookieHeader = jar => Object.entries(jar).map(([k, v]) => `${k}=${v}`).join('; ');
function parseSetCookie(arr, jar) {
  for (const line of arr) {
    const seg = line.split(';')[0];
    const i = seg.indexOf('=');
    if (i > 0) jar[seg.slice(0, i).trim()] = seg.slice(i + 1).trim();
  }
}

// Cookie-aware manual redirect following — Luogu sets a cookie via 30x and loops
// unless the client resends it (Node's fetch drops cookies across redirects).
async function fetchText(url, tries = 3) {
  let err;
  for (let attempt = 0; attempt < tries; attempt++) {
    try {
      const jar = {};
      let cur = url;
      for (let hop = 0; hop < 12; hop++) {
        const c = new AbortController();
        const t = setTimeout(() => c.abort(), 30000);
        const headers = { ...BROWSER_HEADERS };
        const ck = cookieHeader(jar);
        if (ck) headers['Cookie'] = ck;
        const r = await fetch(cur, { redirect: 'manual', headers, signal: c.signal });
        clearTimeout(t);
        const sc = typeof r.headers.getSetCookie === 'function' ? r.headers.getSetCookie() : [];
        if (sc.length) parseSetCookie(sc, jar);
        if (r.status >= 300 && r.status < 400) {
          const loc = r.headers.get('location');
          if (!loc) throw new Error('redirect without location');
          cur = new URL(loc, cur).href;
          continue;
        }
        if (r.status === 200) return await r.text();
        if (r.status === 404) throw new Error('404');
        throw new Error('HTTP ' + r.status);
      }
      throw new Error('too many redirects');
    } catch (e) { err = e; if (attempt < tries - 1) await SLEEP(800 * (attempt + 1)); }
  }
  throw err;
}

function extractArticle(html) {
  const m = html.match(/<script id="lentille-context"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) return null;
  let j;
  try { j = JSON.parse(m[1]); } catch { return null; }
  return (j.data && j.data.article) || j.article || (j.currentData && j.currentData.article) || null;
}

function fmtDate(unixSec) {
  const d = new Date(unixSec * 1000);
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).formatToParts(d);
  const g = t => parts.find(x => x.type === t).value;
  return `${g('year')}-${g('month')}-${g('day')} ${g('hour')}:${g('minute')}:${g('second')}`;
}

const yamlStr = s => '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';

function findImageUrls(md) {
  const urls = new Set();
  let m;
  const re1 = /!\[[^\]]*\]\(\s*(<[^>]+>|[^)\s]+)/g;
  while ((m = re1.exec(md))) { let u = m[1]; if (u.startsWith('<') && u.endsWith('>')) u = u.slice(1, -1); urls.add(u); }
  const re2 = /<img[^>]+src=["']([^"']+)["']/gi;
  while ((m = re2.exec(md))) urls.add(m[1]);
  return [...urls].filter(u => /^https?:\/\//i.test(u));
}

function extFromCT(ct) {
  if (!ct) return '';
  if (ct.includes('png')) return '.png';
  if (ct.includes('jpeg') || ct.includes('jpg')) return '.jpg';
  if (ct.includes('gif')) return '.gif';
  if (ct.includes('webp')) return '.webp';
  if (ct.includes('svg')) return '.svg';
  return '';
}
const sanitize = n => (n.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-50) || 'img');

async function downloadImage(url, destDir, idx) {
  try {
    const c = new AbortController();
    const t = setTimeout(() => c.abort(), 30000);
    const r = await fetch(url, { headers: { 'User-Agent': UA, 'Referer': 'https://www.luogu.com.cn/' }, signal: c.signal });
    clearTimeout(t);
    if (r.status !== 200) return null;
    const buf = Buffer.from(await r.arrayBuffer());
    if (!buf.length) return null;
    let base = sanitize(decodeURIComponent((url.split('/').pop() || '').split('?')[0]));
    if (!path.extname(base)) base += (extFromCT(r.headers.get('content-type')) || '.png');
    const name = `${String(idx).padStart(3, '0')}-${base}`;
    await fsp.mkdir(destDir, { recursive: true });
    await fsp.writeFile(path.join(destDir, name), buf);
    return name;
  } catch { return null; }
}

function buildFrontMatter(art) {
  const title = art.title || '';
  // Category from the title's 【…】 prefix (e.g. 【题解】/【笔记】/【游记】); fall back to
  // 闲话 for the few bracket-less "…闲话" posts, then solutionFor, then 随笔.
  const pm = title.match(/^\s*【([^】]+)】/);
  let cat;
  if (pm) cat = pm[1].trim();
  else if (title.includes('闲话')) cat = '闲话';
  else if (art.solutionFor != null) cat = '题解';
  else cat = '随笔';
  const cats = [cat];
  // Tags: algorithm tags from the tag map only (no problem-number / problem-name tags).
  const tags = new Set(TAG_MAP[art.lid] || []);
  const L = ['---'];
  L.push('title: ' + yamlStr(art.title || art.lid));
  L.push('date: ' + fmtDate(art.time || Math.floor(Date.now() / 1000)));
  L.push('categories:');
  cats.forEach(c => L.push('  - ' + yamlStr(c)));
  if (tags.size) { L.push('tags:'); [...tags].forEach(t => L.push('  - ' + yamlStr(t))); }
  L.push('luogu_lid: ' + yamlStr(art.lid));
  L.push('luogu_category: ' + (art.category ?? 'null'));
  L.push('original: ' + yamlStr('https://www.luogu.com.cn/article/' + art.lid));
  // Per-post override: skip Hexo's Nunjucks pass so literal {{ }} / {% %} in
  // Luogu/LaTeX content don't break the build (reliable regardless of plugin load order).
  L.push('disableNunjucks: true');
  L.push('---');
  return L.join('\n');
}

// Isolate $$...$$ display math onto its own block. Luogu (MathJax) allows trailing
// text after the closing $$ (e.g. an equation label "①"), but markdown-it's block
// rule needs $$ alone on its lines — otherwise the block fails to match AND swallows
// every following inline $...$ into one paragraph (cascading breakage). The leading
// alternatives match fenced code first and return it untouched, so $$ inside code is safe.
function isolateDisplayMath(md) {
  return md.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~|\$\$([\s\S]+?)\$\$/g, (m, inner) =>
    inner === undefined ? m : `\n\n$$\n${inner.trim()}\n$$\n\n`);
}

// Insert <!-- more --> after the first paragraph so the index page shows a short
// excerpt + "read more" link instead of the whole article body.
function insertMore(md) {
  if (md.includes('<!-- more -->')) return md;
  const blocks = md.split(/\n{2,}/);
  let i = 0;
  while (i < blocks.length && blocks[i].trim() === '') i++;   // skip leading blanks
  if (i >= blocks.length) return md;
  const tail = blocks.slice(i + 1).join('\n\n');
  if (!tail.trim()) return md;                                 // single-block post: leave whole
  return blocks.slice(0, i + 1).join('\n\n') + '\n\n<!-- more -->\n\n' + tail;
}

// Convert one already-fetched article object (lentille `article`) into a Hexo post.
// Images are pulled from cdn.luogu.com.cn (not behind the WAF), so this works locally.
async function emitArticle(art, report) {
  if (!art || typeof art.content !== 'string') {
    report.failed.push({ lid: (art && art.lid) || '?', reason: 'no content' });
    return;
  }
  const lid = art.lid;
  let content = isolateDisplayMath(art.content.replace(/\r\n/g, '\n'));
  const urls = findImageUrls(content);
  let imgOk = 0;
  if (urls.length) {
    const destDir = path.join(IMG_BASE, lid);
    let idx = 1;
    for (const u of urls) {
      const name = await downloadImage(u, destDir, idx++);
      if (name) { content = content.split(u).join(`/images/luogu/${lid}/${name}`); imgOk++; }
      await SLEEP(120);
    }
  }
  // Nunjucks tag parsing is disabled globally (markdown.disableNunjucks in _config.yml),
  // so {{ }} / {% %} in content stay literal — write content as-is.
  await fsp.mkdir(POSTS_DIR, { recursive: true });
  const body = insertMore(content);
  await fsp.writeFile(path.join(POSTS_DIR, lid + '.md'), buildFrontMatter(art) + '\n\n' + body + '\n', 'utf8');
  report.ok.push({ lid, title: art.title, images: `${imgOk}/${urls.length}` });
}

// Fetch a single article server-side (subject to Luogu's WAF) then emit it.
async function processArticle(lid, report) {
  let html;
  try { html = await fetchText('https://www.luogu.com.cn/article/' + lid); }
  catch (e) { report.failed.push({ lid, reason: 'fetch ' + e.message }); return; }
  const art = extractArticle(html);
  if (!art) { report.failed.push({ lid, reason: 'no content (anti-bot interstitial?)' }); return; }
  await emitArticle(art, report);
}

async function main() {
  const [mode, arg] = process.argv.slice(2);
  if (mode === 'probe') {
    const art = extractArticle(await fetchText('https://www.luogu.com.cn/article/' + arg));
    if (!art) return console.log('no article found');
    console.log('lid:', art.lid, '| title:', art.title);
    console.log('time:', art.time, '->', fmtDate(art.time));
    console.log('category:', art.category, '| solutionFor:', JSON.stringify(art.solutionFor), '| collection:', art.collection && art.collection.name);
    console.log('content length:', art.content && art.content.length);
    console.log('images:', findImageUrls(art.content || ''));
    console.log('--- content head ---\n' + (art.content || '').slice(0, 300));
    return;
  }
  if (mode === 'one') {
    const report = { ok: [], failed: [] };
    await processArticle(arg, report);
    console.log(JSON.stringify(report, null, 2));
    return;
  }
  if (mode === 'local') {
    // Convert from a JSON file of full article objects (fetched in the user's browser).
    const data = JSON.parse(await fsp.readFile(arg, 'utf8'));
    const arts = Array.isArray(data) ? data : (data.articles || []);
    console.log(`Converting ${arts.length} articles from ${arg}`);
    const report = { ok: [], failed: [] };
    let i = 0;
    for (const art of arts) {
      i++;
      process.stdout.write(`[${i}/${arts.length}] ${(art && art.lid) || '?'} ... `);
      if (art && art._error) { report.failed.push({ lid: art.lid, reason: art._error }); console.log('skip (' + art._error + ')'); continue; }
      if (art && SKIP_LIDS.has(art.lid)) { console.log('skip (已删除)'); continue; }
      await emitArticle(art, report);
      const failed = report.failed.find(f => f.lid === (art && art.lid));
      console.log(failed ? 'FAIL ' + failed.reason : 'ok (img ' + report.ok[report.ok.length - 1].images + ')');
      await SLEEP(100);
    }
    await fsp.writeFile(path.join(ROOT, 'migrate', 'report.json'), JSON.stringify(report, null, 2));
    console.log(`\nDone. ok=${report.ok.length} failed=${report.failed.length}. See migrate/report.json`);
    if (report.failed.length) console.log('Failed:', report.failed.map(f => f.lid + ':' + f.reason).join(', '));
    return;
  }
  if (mode === 'run') {
    const listPath = arg || path.join(ROOT, 'migrate', 'list.json');
    const list = JSON.parse(await fsp.readFile(listPath, 'utf8'));
    const articles = (list.articles || []).filter(a => a && a.lid);
    const seen = new Set(articles.map(a => a.lid));
    for (const b of (list.blogs || [])) { const id = b && (b.lid || b.id); if (id && !seen.has(id)) { articles.push({ lid: id }); seen.add(id); } }
    console.log(`Total to migrate: ${articles.length}`);
    const report = { ok: [], failed: [] };
    let i = 0;
    for (const a of articles) {
      i++;
      process.stdout.write(`[${i}/${articles.length}] ${a.lid} ... `);
      await processArticle(a.lid, report);
      const failed = report.failed.find(f => f.lid === a.lid);
      console.log(failed ? 'FAIL ' + failed.reason : 'ok (img ' + report.ok[report.ok.length - 1].images + ')');
      await SLEEP(400);
    }
    await fsp.writeFile(path.join(ROOT, 'migrate', 'report.json'), JSON.stringify(report, null, 2));
    console.log(`\nDone. ok=${report.ok.length} failed=${report.failed.length}. See migrate/report.json`);
    if (report.failed.length) console.log('Failed:', report.failed.map(f => f.lid + ':' + f.reason).join(', '));
    return;
  }
  console.log('Usage: node migrate/migrate.mjs probe <lid> | one <lid> | run [list.json] | local <articles.json>');
}
main().catch(e => { console.error(e); process.exit(1); });
