// transformer.js
// Depends on: utils.js (toTitleCase, formatPersonName)

function flattenOrgTree(nodes, pid = '', result = []) {
  const sorted = [...nodes].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  for (const org of sorted) {
    const filled   = org.positions.filter(p => p.status === 'FILLED');
    const vacant   = org.positions.filter(p => p.status === 'VACANT');
    const unfunded = org.positions.filter(p => p.status === 'UNFUNDED');

    // Head = highest salary_grade among FILLED; salary_step as tiebreaker
    const head = filled.length
      ? filled.reduce((best, p) =>
          (p.salary_grade  >  (best.salary_grade  ?? 0)) ||
          (p.salary_grade === best.salary_grade &&
           p.salary_step  >  (best.salary_step   ?? 0)) ? p : best)
      : null;

    result.push({
      // EJ2 DataManager required fields (must be strings)
      id:  String(org.org_id),
      pid: pid,

      // Card display fields
      orgId:    org.org_id,
      orgName:  org.name,
      orgLevel: org.level,           // 'division' | 'section' | 'unit'
      isHead:   org.is_office_head,
      headName: formatPersonName(head),
      headPos:  head ? toTitleCase(head.position_title) : null,
      headAppt: head ? head.appointment_name            : null,
      headSG:   head ? head.salary_grade                : null,

      // Stats
      filled:   filled.length,
      vacant:   vacant.length,
      unfunded: unfunded.length,
      total:    org.positions.length,

      // Full list for detail panel
      positions: org.positions,
    });

    if (Array.isArray(org.children) && org.children.length) {
      flattenOrgTree(org.children, String(org.org_id), result);
    }
  }
  return result;
}

function collectAllPositions(nodes, result = []) {
  for (const n of nodes) {
    result.push(...(n.positions || []));
    if (n.children?.length) collectAllPositions(n.children, result);
  }
  return result;
}
