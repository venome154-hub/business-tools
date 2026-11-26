export function buildEmbedSnippet(slug: string, title: string, toolPath: string, site: string) {
  return `<iframe src="${site}/embed/${slug}" title="${title}" loading="lazy" style="width:100%;max-width:480px;height:460px;border:0"></iframe>
<p style="font-size:13px;margin:4px 0 0">
  <a href="${site}${toolPath}">${title}</a> by BizToolsBox
</p>`;
}
