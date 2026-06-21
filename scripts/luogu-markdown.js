'use strict';

// Support Luogu's container / collapsible-box syntax:
//
//   ::::info[标题]
//   正文（可含 $公式$、代码、嵌套容器）
//   ::::
//
// markdown-it-container handles 3+ colons and nesting; the box body is tokenized
// as normal markdown, so math/code inside still render. We emit a <details> so the
// box is collapsible (matching Luogu), and inject matching CSS into every <head>.

const container = require('markdown-it-container');

const ALIAS = { danger: 'error', caution: 'warning', tip: 'success', note: 'info', quote: 'cite', epigraph: 'cite' };
const LABEL = { info: '信息', success: '成功', warning: '注意', error: '警告', cite: '引用' };

hexo.extend.filter.register('markdown-it:renderer', function (md) {
  md.use(container, 'luogu', {
    validate: (params) => /^\s*[A-Za-z][\w-]*\s*(\[[^\]]*\])?\s*$/.test(params),
    render: (tokens, idx) => {
      const tok = tokens[idx];
      if (tok.nesting === 1) {
        const m = tok.info.trim().match(/^([A-Za-z][\w-]*)\s*(?:\[([^\]]*)\])?/);
        let type = ((m && m[1]) || 'info').toLowerCase();
        type = ALIAS[type] || type;
        const title = (m && m[2]) ? m[2] : (LABEL[type] || type);
        return `<details open class="lg-adm lg-adm-${type}"><summary class="lg-adm-title">${md.utils.escapeHtml(title)}</summary><div class="lg-adm-body">\n`;
      }
      return '\n</div></details>\n';
    },
  });
  return md;
});

const CSS = `
.lg-adm{margin:1em 0;border:1px solid var(--lg-adm-bd,#d0d7de);border-left:4px solid var(--lg-adm-ac,#1f6feb);border-radius:6px;background:var(--lg-adm-bg,#f6f8fa);overflow:hidden}
.lg-adm>.lg-adm-title{cursor:pointer;font-weight:600;padding:.45em .9em;color:var(--lg-adm-ac,#1f6feb);background:var(--lg-adm-tb,rgba(31,111,235,.06));list-style:none;user-select:none}
.lg-adm>.lg-adm-title::-webkit-details-marker{display:none}
.lg-adm>.lg-adm-title::before{content:"\\25B8\\00a0";font-size:.85em}
.lg-adm[open]>.lg-adm-title::before{content:"\\25BE\\00a0"}
.lg-adm-body{padding:.5em .9em .6em}
.lg-adm-body>:first-child{margin-top:0}
.lg-adm-body>:last-child{margin-bottom:0}
.lg-adm-info{--lg-adm-ac:#1f6feb;--lg-adm-bg:#f1f6ff;--lg-adm-tb:rgba(31,111,235,.07);--lg-adm-bd:#cfe0ff}
.lg-adm-success{--lg-adm-ac:#1a7f37;--lg-adm-bg:#eef8f0;--lg-adm-tb:rgba(26,127,55,.08);--lg-adm-bd:#c6e9cf}
.lg-adm-warning{--lg-adm-ac:#bf8700;--lg-adm-bg:#fff8e8;--lg-adm-tb:rgba(191,135,0,.09);--lg-adm-bd:#f3e2b3}
.lg-adm-error{--lg-adm-ac:#cf222e;--lg-adm-bg:#fff0f1;--lg-adm-tb:rgba(207,34,46,.07);--lg-adm-bd:#f5c2c7}
.lg-adm-cite{--lg-adm-ac:#6e7781;--lg-adm-bg:#f6f8fa;--lg-adm-tb:rgba(110,119,129,.08);--lg-adm-bd:#d0d7de}
`;
hexo.extend.injector.register('head_end', () => `<style>${CSS}</style>`);
