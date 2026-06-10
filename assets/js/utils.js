// utils.js

function toTitleCase(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

function formatPersonName(p) {
  if (!p || !p.firstname) return null;
  const mi  = p.middlename ? ' ' + p.middlename.charAt(0).toUpperCase() + '.' : '';
  const suf = p.presuf     ? ' ' + p.presuf + '.'                              : '';
  return `${toTitleCase(p.lastname)}, ${toTitleCase(p.firstname)}${mi}${suf}`;
}

function formatSalary(amount) {
  if (!amount) return '';
  return '₱' + Number(amount).toLocaleString('en-PH') + '/mo';
}

function getInitials(firstname, lastname) {
  const f = (firstname || '').charAt(0).toUpperCase();
  const l = (lastname  || '').charAt(0).toUpperCase();
  return f + l || '—';
}
