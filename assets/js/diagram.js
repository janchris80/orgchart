// diagram.js
// Depends on: config.js, template.js, utils.js
// Exposes:    window.orgDiagram (the EJ2 Diagram instance)
//             window.currentSubtree (string)
//             window.currentOrientation (string)

// ── Register license ──────────────────────────────────────────────────────────
try {
  if (window.ej && ej.base && typeof ej.base.registerLicense === 'function') {
    ej.base.registerLicense(EJ2_LICENSE);
  }
} catch (e) {
  console.warn('Syncfusion license registration skipped', e);
}

// ── Inject modules ────────────────────────────────────────────────────────────
ej.diagrams.Diagram.Inject(
  ej.diagrams.DataBinding,
  ej.diagrams.HierarchicalTree,
  ej.diagrams.PrintAndExport,
  ej.diagrams.UndoRedo,
  ej.diagrams.LayoutAnimation,
  ej.diagrams.ConnectorEditing
);

// ── State ─────────────────────────────────────────────────────────────────────
window.currentSubtree    = 'Center';
window.currentOrientation = 'TopToBottom';

// ── Init ─────────────────────────────────────────────────────────────────────
function initDiagram(flatData) {
  window.orgDiagram = new ej.diagrams.Diagram({
    width:  '100%',
    height: '100%',

    layout: {
      type:              'OrganizationalChart',
      orientation:       window.currentOrientation,
      horizontalSpacing: 20,
      verticalSpacing:   50,
      enableAnimation:   true,
      getLayoutInfo: (node, options) => {
        if (!options.hasSubTree) {
          options.type        = window.currentSubtree;
          options.orientation = 'Horizontal';
          options.offset      = 20;
        }
      },
    },

    dataSourceSettings: {
      id:         'id',
      parentId:   'pid',
      dataSource: new ej.data.DataManager(flatData),
    },

    getNodeDefaults: (node) => {
      if (node.data && node.data.type === 'position') {
        node.width  = 180;
        node.height = 70;
      } else {
        node.width  = 220;
        node.height = 110;
      }
      
      // Inject the HTML template directly into the node's shape here
      if (node.data) {
        node.shape = { 
          type: 'HTML', 
          content: buildNodeTemplate(node.data) 
        };
      } else {
        node.shape = { type: 'HTML' };
      }

      node.style  = { fill: 'transparent', strokeColor: 'transparent' };

      // ── Q4-C Re-parent drag ───────
      node.constraints = ej.diagrams.NodeConstraints.Default
                       | ej.diagrams.NodeConstraints.AllowDrop;

      return node;
    },

    getConnectorDefaults: (connector) => {
      connector.type  = 'Orthogonal';
      connector.style = { strokeColor: '#CBD5E1', strokeWidth: 1.5 };
      connector.targetDecorator = {
        shape: 'Arrow',
        style: { fill: '#CBD5E1', strokeColor: '#CBD5E1', strokeWidth: 1 },
      };
      return connector;
    },

    // Open detail panel on node click
    click: (args) => {
      if (args.element?.data && args.element.data.type === 'office') {
        openDetailPanel(args.element.data);
      }
    },

    // ── Q4-C only: re-parent drop ─────────────────────────────────────────
    drop: (args) => {
      if (args.element && args.target && args.target.id) {
        const node = args.element;
        const inEdges = node.inEdges;
        if (inEdges && inEdges.length > 0) {
          const connector = window.orgDiagram.getObject(inEdges[0]);
          if (connector) {
            connector.sourceID = args.target.id;
            window.orgDiagram.dataBind();
            window.orgDiagram.doLayout();
          }
        }
      }
    },

    snapSettings:  { constraints: ej.diagrams.SnapConstraints.None },
    scrollSettings:{ canAutoScroll: true },
  });

  window.orgDiagram.appendTo('#diagram');
  
  setTimeout(() => {
    window.orgDiagram.fitPage();
  }, 100);
}

// ── Spacebar Panning ──────────────────────────────────────────────────────────
let isPanning = false;
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !isPanning && e.target.tagName !== 'INPUT') {
    isPanning = true;
    if (window.orgDiagram) {
      window.orgDiagram.tool = ej.diagrams.DiagramTools.ZoomPan;
      window.orgDiagram.dataBind();
    }
    e.preventDefault();
  }
});
document.addEventListener('keyup', (e) => {
  if (e.code === 'Space' && isPanning) {
    isPanning = false;
    if (window.orgDiagram) {
      window.orgDiagram.tool = ej.diagrams.DiagramTools.Default | ej.diagrams.DiagramTools.SingleSelect;
      window.orgDiagram.dataBind();
    }
    e.preventDefault();
  }
});
