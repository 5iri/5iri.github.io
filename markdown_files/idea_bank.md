---
title: Idea Bank
permalink: /idea-bank
layout: content
---

## The Idea Bank

*A collection of random thoughts, projects, and sparks of creativity.*

<link rel="stylesheet" href="/assets/css/idea_bank.css">

<div class="idea-bank">


  <div class="stats">
    <div class="stat-item">
  <span class="stat-number" id="total-ideas">9</span>
  <span class="stat-label">Total Ideas</span>
    </div>
    <div class="stat-item">
  <span class="stat-number" id="categories-count">4</span>
  <span class="stat-label">Categories</span>
    </div>
    <div class="stat-item">
  <span class="stat-number" id="active-ideas">3</span>
  <span class="stat-label">Active</span>
    </div>
    <div class="stat-item">
  <span class="stat-number" id="completed-ideas">2</span>
  <span class="stat-label">Completed</span>
    </div>
  </div>

  <div class="idea-controls">
    <input type="text" class="search-box" id="search-input" placeholder="Search ideas...">
  <div class="category-filters"></div>
  </div>

  <div class="ideas-grid" id="ideas-container">
    <!-- Ideas will be populated by JavaScript -->
  </div>

  <div class="no-results" id="no-results" style="display: none;">
    No ideas found matching your search criteria.
  </div>


</div>

<!-- JavaScript for idea bank is now loaded from external file -->
<script src="/assets/js/idea_bank.js"></script>
