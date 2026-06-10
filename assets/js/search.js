// search.js
// Depends on: diagram.js (window.orgDiagram), window.flatOrgData

function initSearch() {
  const input   = document.getElementById('search-input');
  const counter = document.getElementById('search-count');
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    const d = window.orgDiagram;

    d.clearSelection();
    counter.textContent = '';

    if (!q) return;

    const matches = (window.flatOrgData || []).filter(n =>
      n.orgName.toLowerCase().includes(q) ||
      (n.headName || '').toLowerCase().includes(q) ||
      n.positions.some(p =>
        `${p.firstname ?? ''} ${p.lastname ?? ''}`.toLowerCase().includes(q) ||
        (p.position_title ?? '').toLowerCase().includes(q)
      )
    );

    matches.forEach(n => {
      const node = d.nodes.find(nd => nd.data?.orgId === n.orgId);
      if (node) d.select([node], true);
    });

    counter.textContent = matches.length
      ? `${matches.length} result(s)` : 'No results';

    // Pan to first match
    if (matches.length) {
      const first = d.nodes.find(nd => nd.data?.orgId === matches[0].orgId);
      if (first) d.bringIntoView(first.wrapper.bounds);
    }
  });
}
