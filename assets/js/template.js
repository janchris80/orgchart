// template.js
// Depends on: utils.js (toTitleCase, getInitials)

const LEVEL_CLASS = {
  division: 'division',
  section:  'section',
  unit:     'unit',
};

const APPT_STYLE = {
  'Permanent':         'background:#dcfce7;color:#166534',
  'Casual':            'background:#fef3c7;color:#92400e',
  'Co-Terminous':      'background:#ede9fe;color:#4c1d95',
  'Elected Officials': 'background:#fef3c7;color:#92400e;border:1px solid #c9a94e',
};

function buildNodeTemplate(data) {
  // ─── POSITION NODE (person card) ───
  if (data.type === 'position') {
    const statusClass = data.status.toLowerCase();
    const isFilled = data.status === 'FILLED';
    const isHead = data.isHead || false;
    const ast = APPT_STYLE[data.appointment] || 'background:#f1f5f9;color:#475569';

    const headClass = isHead ? ' is-head' : '';
    const initials = isFilled ? getInitials(data.posName.split(' ')[0], data.posName.split(' ').pop()) : '';

    return `
      <div class="nc-card position ${statusClass}${headClass}" data-pos-id="${data.posId}">
        <div class="nc-avatar">
          <span class="nc-avatar-icon">${isFilled ? '👤' : '○'}</span>
        </div>
        <div class="nc-person-name">${isFilled ? data.posName : '— VACANT —'}</div>
        <div class="nc-person-title">${toTitleCase(data.posTitle || '')}</div>
        <div class="nc-person-meta">
          <span class="nc-sg-badge">SG ${data.salaryGrade ?? '—'}</span>
          ${data.appointment ? `<span class="nc-appt" style="${ast}">${data.appointment}</span>` : ''}
        </div>
      </div>`;
  }

  // ─── OFFICE NODE (teal section header bar) ───
  const levelClass = LEVEL_CLASS[data.orgLevel] || 'unit';

  return `
    <div class="nc-card office ${levelClass}" data-org-id="${data.orgId}">
      <div class="nc-office-name">${toTitleCase(data.orgName)}</div>
      <div class="nc-office-stats">
        <span>● ${data.filled}</span>
        ${data.vacant ? `<span>◌ ${data.vacant}</span>` : ''}
        ${data.unfunded ? `<span>✕ ${data.unfunded}</span>` : ''}
      </div>
    </div>`;
}
