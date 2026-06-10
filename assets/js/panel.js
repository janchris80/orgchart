// panel.js
// Depends on: utils.js (toTitleCase, formatPersonName, formatSalary, getInitials)
// Depends on: template.js (APPT_STYLE)

function openDetailPanel(data) {
  document.getElementById('panel-org-name').textContent = toTitleCase(data.orgName);

  // Stats
  document.getElementById('panel-stats').innerHTML = `
    <span class="chip filled">${data.filled} Filled</span>
    <span class="chip vacant">${data.vacant} Vacant</span>
    <span class="chip unfunded">${data.unfunded} Unfunded</span>
    <span class="chip total">${data.total} Total</span>`;

  // Sort: FILLED → VACANT → UNFUNDED, then by SG desc
  const sorted = [...data.positions].sort((a, b) => {
    const order = { FILLED: 0, VACANT: 1, UNFUNDED: 2 };
    if (a.status !== b.status) return (order[a.status] ?? 3) - (order[b.status] ?? 3);
    return (b.salary_grade ?? 0) - (a.salary_grade ?? 0);
  });

  document.getElementById('panel-list').innerHTML = sorted.map(p => {
    const isFilled  = p.status === 'FILLED';
    const name      = isFilled ? formatPersonName(p) : '(Vacant Position)';
    const initials  = isFilled ? getInitials(p.firstname, p.lastname) : '—';
    const apptStyle = APPT_STYLE[p.appointment_name] || '';

    return `<div class="pos-row ${p.status.toLowerCase()}">
      <div class="pos-avatar">${initials}</div>
      <div class="pos-info">
        <div class="pos-name">${name}</div>
        <div class="pos-title">${toTitleCase(p.position_title || '')}</div>
        <div class="pos-meta">
          SG ${p.salary_grade ?? '—'}-${p.salary_step ?? '—'}
          · ${formatSalary(p.monthly_salary)}
          ${p.item_number ? '· Item #' + p.item_number : ''}
          ${p.appointment_name
            ? `<span class="appt-tag" style="${apptStyle}">${p.appointment_name}</span>`
            : ''}
        </div>
      </div>
      <span class="pos-status ${p.status.toLowerCase()}">${p.status}</span>
    </div>`;
  }).join('');

  document.getElementById('chart-body').classList.add('panel-open');
}

function closeDetailPanel() {
  document.getElementById('chart-body').classList.remove('panel-open');
}
