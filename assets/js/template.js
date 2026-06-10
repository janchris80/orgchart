// template.js
// Depends on: utils.js (toTitleCase)

const LEVEL_STYLE = {
  division: { bg: '#EEF2FF', border: '#6366F1', color: '#4338CA', label: 'Division' },
  section:  { bg: '#F0FDF4', border: '#22C55E', color: '#15803D', label: 'Section'  },
  unit:     { bg: '#FFF7ED', border: '#F97316', color: '#C2410C', label: 'Unit'      },
};

const APPT_STYLE = {
  'Permanent':         'background:#dcfce7;color:#166534',
  'Casual':            'background:#fef3c7;color:#92400e',
  'Co-Terminous':      'background:#ede9fe;color:#4c1d95',
  'Elected Officials': 'background:#dbeafe;color:#1e3a8a',
};

function buildNodeTemplate(data) {
  const ls  = LEVEL_STYLE[data.orgLevel] || LEVEL_STYLE['unit'];
  const ast = APPT_STYLE[data.headAppt]  || 'background:#f1f5f9;color:#475569';

  const headBlock = data.headName
    ? `<div class="nc-head">${data.headName}</div>
       <div class="nc-pos">${data.headPos || ''}${data.headSG ? ' · SG ' + data.headSG : ''}</div>
       <span class="nc-appt" style="${ast}">${data.headAppt || ''}</span>`
    : `<div class="nc-head nc-no-head">— No head assigned —</div>`;

  const vacantBit   = data.vacant
    ? `<span class="nc-vacant">◌ ${data.vacant} vacant</span>` : '';
  const unfundedBit = data.unfunded
    ? `<span class="nc-unfunded">✕ ${data.unfunded} unfunded</span>` : '';

  return `
    <div class="nc-card" style="border-left:3px solid ${ls.border}" data-org-id="${data.orgId}">
      <span class="nc-badge" style="background:${ls.bg};color:${ls.color}">${ls.label}</span>
      <div class="nc-name">${toTitleCase(data.orgName)}</div>
      ${headBlock}
      <div class="nc-stats">
        <span class="nc-filled">● ${data.filled} filled</span>
        ${vacantBit}${unfundedBit}
      </div>
    </div>`;
}
