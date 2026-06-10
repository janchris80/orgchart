// toolbar.js
// Depends on: diagram.js (window.orgDiagram, window.currentSubtreeType,
//             window.currentSubtreeOrientation, window.currentOrientation)

// ── Subtree alignment ─────────────────────────────────────────────────────────
// Syncfusion EJ2 getLayoutInfo has TWO properties that work together:
//   options.type        → 'Left' | 'Right' | 'Center' | 'Alternate' | 'Balanced'
//   options.orientation → 'Horizontal' | 'Vertical'
//
// The Syncfusion free-tools org-chart app exposes 7 buttons combining them:
//   0: Alternate + Horizontal
//   1: Balanced  + Horizontal
//   2: Right     + Horizontal
//   3: Left      + Horizontal
//   4: Center    + Horizontal
//   5: Left      + Vertical
//   6: Right     + Vertical

function setSubtree(type, orientation) {
  window.currentSubtreeType        = type;
  window.currentSubtreeOrientation = orientation;

  const d = window.orgDiagram;

  // Redefine getLayoutInfo with the new values
  d.layout.getLayoutInfo = (node, options) => {
    if (!options.hasSubTree) {
      options.type        = window.currentSubtreeType;
      options.orientation = window.currentSubtreeOrientation;
      options.offset      = 20;
    }
  };

  d.doLayout();
  refreshToolbarState();
}

// ── Orientation ───────────────────────────────────────────────────────────────
function setOrientation(dir) {
  window.currentOrientation             = dir;
  window.orgDiagram.layout.orientation   = dir;
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
// Build a quick lookup: button-index → { type, orientation }
const SUBTREE_COMBOS = [
  { type: 'Alternate', orientation: 'Horizontal' },  // btn-st-0
  { type: 'Balanced',  orientation: 'Horizontal' },  // btn-st-1
  { type: 'Right',     orientation: 'Horizontal' },  // btn-st-2
  { type: 'Left',      orientation: 'Horizontal' },  // btn-st-3
  { type: 'Center',    orientation: 'Horizontal' },  // btn-st-4
  { type: 'Left',      orientation: 'Vertical'   },  // btn-st-5
  { type: 'Right',     orientation: 'Vertical'   },  // btn-st-6
];

function refreshToolbarState() {
  // Subtree buttons
  SUBTREE_COMBOS.forEach((combo, i) => {
    const el = document.getElementById('btn-st-' + i);
    if (el) {
      el.classList.toggle('is-active',
        combo.type === window.currentSubtreeType &&
        combo.orientation === window.currentSubtreeOrientation
      );
    }
  });

  // Orientation buttons
  ['TopToBottom','LeftToRight','BottomToTop','RightToLeft'].forEach(d => {
    document.getElementById('btn-or-' + d)
      ?.classList.toggle('is-active', d === window.currentOrientation);
  });
}

// Call on page load to set defaults
document.addEventListener('DOMContentLoaded', refreshToolbarState);
