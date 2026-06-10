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

    const officeNodeId = String(org.org_id);

    // 1. Push the Office Node
    result.push({
      id: officeNodeId,
      pid: pid,
      type: 'office',

      orgId:    org.org_id,
      orgName:  org.name,
      orgLevel: org.level,
      isHead:   org.is_office_head,
      headName: formatPersonName(head),
      headPos:  head ? toTitleCase(head.position_title) : null,
      headAppt: head ? head.appointment_name            : null,
      headSG:   head ? head.salary_grade                : null,

      filled:   filled.length,
      vacant:   vacant.length,
      unfunded: unfunded.length,
      total:    org.positions.length,
      positions: org.positions, // keep for detail panel
    });

    // 2. Process and Push Position Nodes
    const posSorted = [...org.positions].sort((a, b) => {
      const order = { FILLED: 0, VACANT: 1, UNFUNDED: 2 };
      if (a.status !== b.status) return (order[a.status] ?? 3) - (order[b.status] ?? 3);
      return (b.salary_grade ?? 0) - (a.salary_grade ?? 0);
    });

    for (const p of posSorted) {
      result.push({
        id: 'pos-' + p.id,
        pid: officeNodeId,
        type: 'position',

        // Position specific data
        posId: p.id,
        posTitle: p.position_title,
        posName: p.status === 'FILLED' ? formatPersonName(p) : '(Vacant Position)',
        status: p.status,
        salaryGrade: p.salary_grade,
        appointment: p.appointment_name
      });
    }

    // 3. Process Children Offices
    if (Array.isArray(org.children) && org.children.length) {
      flattenOrgTree(org.children, officeNodeId, result);
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
