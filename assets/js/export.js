// export.js
// Depends on: diagram.js (window.orgDiagram), window.orgMeta

function exportChart(format) {
  // format: 'PNG' | 'SVG' | 'PDF' | 'JPEG'
  const year = window.orgMeta?.year ?? 'export';
  window.orgDiagram.exportDiagram({
    format:   format,
    region:   'Content',
    fileName: `LGU-OrgChart-${year}`,
    margin:   { left: 20, top: 20, right: 20, bottom: 20 },
  });
}
