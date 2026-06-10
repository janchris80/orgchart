// toolbar.js
// Depends on: diagram.js (window.orgDiagram, window.currentSubtree, window.currentOrientation)

// ── Subtree alignment ─────────────────────────────────────────────────────────
// Maps to EJ2 getLayoutInfo options.type:
// 'Linear'    = children in one vertical column
// 'Alternate' = children alternate left/right
// 'Right'     = children hang right
// 'Left'      = children hang left
// 'Balanced'  = balanced horizontal rows
// 'Center'    = centred below parent (default)

function setSubtree(type) {
  window.currentSubtree = type;
  const d = window.orgDiagram;
  d.layout.getLayoutInfo = (node, options) => {
    if (!options.hasSubTree) {
      options.type        = window.currentSubtree;
      options.orientation = 'Horizontal';
    }
  };
  d.dataBind();
  d.doLayout();
  refreshToolbarState();
}

// ── Orientation ───────────────────────────────────────────────────────────────
function setOrientation(dir) {
  window.currentOrientation      = dir;
  window.orgDiagram.layout.orientation = dir;
  window.orgDiagram.dataBind();
  window.orgDiagram.doLayout();
  refreshToolbarState();
}

// ── View controls ─────────────────────────────────────────────────────────────
function fitChart()     { window.orgDiagram.fitPage(); }
function reLayout()     { window.orgDiagram.doLayout(); }
function undoAction()   { window.orgDiagram.undo(); }
function redoAction()   { window.orgDiagram.redo(); }

function expandAll() {
  window.orgDiagram.nodes.forEach(n => {
    if (n.isExpanded === false) window.orgDiagram.expandNode(n);
  });
}

function collapseAll() {
  window.orgDiagram.nodes.forEach(n => {
    if (n.data?.pid !== '') window.orgDiagram.collapseNode(n);
  });
}

// ── Active state highlight ────────────────────────────────────────────────────
function refreshToolbarState() {
  ['Linear','Alternate','Right','Left','Balanced','Center'].forEach(t => {
    document.getElementById('btn-st-' + t)
      ?.classList.toggle('is-active', t === window.currentSubtree);
  });
  ['TopToBottom','LeftToRight','BottomToTop','RightToLeft'].forEach(d => {
    document.getElementById('btn-or-' + d)
      ?.classList.toggle('is-active', d === window.currentOrientation);
  });
}

// Call on page load to set defaults
document.addEventListener('DOMContentLoaded', refreshToolbarState);
