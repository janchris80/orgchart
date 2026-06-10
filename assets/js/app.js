// app.js
// Depends on: ALL other JS files. Load this last.
// Exposes: window.flatOrgData, window.orgMeta

async function boot(rawData) {
  window.orgMeta = { year: rawData.year, semester: rawData.semester };

  // Header
  document.getElementById('period-label').textContent =
    `${rawData.year} · Semester ${rawData.semester}`;

  // Global stats
  const allPos = collectAllPositions(rawData.tree);
  document.getElementById('stat-filled').textContent   = allPos.filter(p => p.status === 'FILLED').length   + ' Filled';
  document.getElementById('stat-vacant').textContent   = allPos.filter(p => p.status === 'VACANT').length   + ' Vacant';
  document.getElementById('stat-unfunded').textContent = allPos.filter(p => p.status === 'UNFUNDED').length + ' Unfunded';
  document.getElementById('stat-total').textContent    = allPos.length + ' Total';

  // Flatten + store globally for search
  window.flatOrgData = flattenOrgTree(rawData.tree);

  // Init diagram + search
  initDiagram(window.flatOrgData);
  initSearch();
}

// ── Q2-A: JS fetches data directly ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.classList.remove('hidden');
    
    const res  = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    await boot(data);
  } catch (err) {
    document.getElementById('error-message').textContent =
      'Failed to load org chart: ' + err.message;
    const banner = document.getElementById('error-banner');
    if (banner) banner.classList.remove('hidden');
  } finally {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.classList.add('hidden');
  }
});
