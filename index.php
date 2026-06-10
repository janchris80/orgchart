<?php
require 'config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= APP_NAME ?></title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/material.css">
  
  <link rel="stylesheet" href="assets/css/layout.css">
  <link rel="stylesheet" href="assets/css/toolbar.css">
  <link rel="stylesheet" href="assets/css/node-card.css">
  <link rel="stylesheet" href="assets/css/detail-panel.css">
  <link rel="stylesheet" href="assets/css/responsive.css">

  <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
</head>
<body>

<!-- Header -->
<div id="page-header">
  <h1>🏛 <?= APP_NAME ?></h1>
  <span id="period-label"></span>
  <div id="stats-row">
    <span class="chip filled"   id="stat-filled">—</span>
    <span class="chip vacant"   id="stat-vacant">—</span>
    <span class="chip unfunded" id="stat-unfunded">—</span>
    <span class="chip total"    id="stat-total">—</span>
  </div>
</div>

<!-- Toolbar -->
<div id="toolbar">
  <!-- Search -->
  <div id="search-wrap">
    <input id="search-input" type="search" placeholder="🔍 Search office or employee…">
    <span id="search-count"></span>
  </div>
  <div class="tb-sep"></div>

  <!-- Subtree alignment -->
  <span class="tb-label">Subtree</span>
  <button class="tb-btn" title="Linear"    onclick="setSubtree('Linear')"    id="btn-st-Linear">│</button>
  <button class="tb-btn" title="Alternate" onclick="setSubtree('Alternate')" id="btn-st-Alternate">⫠</button>
  <button class="tb-btn" title="Right"     onclick="setSubtree('Right')"     id="btn-st-Right">┤</button>
  <button class="tb-btn" title="Left"      onclick="setSubtree('Left')"      id="btn-st-Left">├</button>
  <button class="tb-btn" title="Balanced"  onclick="setSubtree('Balanced')"  id="btn-st-Balanced">⊞</button>
  <button class="tb-btn" title="Center"    onclick="setSubtree('Center')"    id="btn-st-Center">⊟</button>
  <div class="tb-sep"></div>

  <!-- Orientation -->
  <span class="tb-label">Orientation</span>
  <button class="tb-btn" title="Top → Bottom" onclick="setOrientation('TopToBottom')" id="btn-or-TopToBottom">↓</button>
  <button class="tb-btn" title="Left → Right" onclick="setOrientation('LeftToRight')" id="btn-or-LeftToRight">→</button>
  <button class="tb-btn" title="Bottom → Top" onclick="setOrientation('BottomToTop')" id="btn-or-BottomToTop">↑</button>
  <button class="tb-btn" title="Right → Left" onclick="setOrientation('RightToLeft')" id="btn-or-RightToLeft">←</button>
  <div class="tb-sep"></div>

  <!-- Layout & view controls -->
  <button class="tb-btn" onclick="reLayout()">↺ Re-layout</button>
  <button class="tb-btn" onclick="expandAll()">＋ Expand</button>
  <button class="tb-btn" onclick="collapseAll()">－ Collapse</button>
  <button class="tb-btn" onclick="fitChart()">⤢ Fit</button>
  <div class="tb-sep"></div>

  <!-- Undo / Redo -->
  <button class="tb-btn" onclick="undoAction()" title="Undo">⟲</button>
  <button class="tb-btn" onclick="redoAction()" title="Redo">⟳</button>
  <div class="tb-sep"></div>

  <!-- Export -->
  <button class="tb-btn" onclick="exportChart('PNG')">⬇ PNG</button>
  <button class="tb-btn" onclick="exportChart('SVG')">⬇ SVG</button>
  <button class="tb-btn" onclick="exportChart('PDF')">⬇ PDF</button>
</div>

<!-- Main body -->
<div id="chart-body">
  <!-- Loading overlay -->
  <div id="loading-overlay">Loading Organizational Chart...</div>
  
  <!-- Error banner -->
  <div id="error-banner" class="hidden">
    <span id="error-message"></span>
  </div>

  <!-- Diagram area -->
  <div id="diagram-wrap">
    <div id="diagram"></div>
  </div>

  <!-- Detail Panel -->
  <div id="detail-panel">
    <div id="panel-header">
      <h2 id="panel-org-name"></h2>
      <button id="panel-close" onclick="closeDetailPanel()">✕</button>
    </div>
    <div id="panel-stats"></div>
    <div id="panel-list"></div>
  </div>
</div>

<script src="assets/js/config.js"></script>
<script src="assets/js/utils.js"></script>
<script src="assets/js/transformer.js"></script>
<script src="assets/js/template.js"></script>
<script src="assets/js/diagram.js"></script>
<script src="assets/js/toolbar.js"></script>
<script src="assets/js/search.js"></script>
<script src="assets/js/export.js"></script>
<script src="assets/js/panel.js"></script>
<script src="assets/js/app.js"></script>

</body>
</html>
