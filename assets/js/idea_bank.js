// Minimal Idea Bank JS
const ideas = [
  { title: "Tiny direct-mapped L1 cache", category: "cpu-extensions", status: "active", priority: "Medium" },
  { title: "Synapse32 → 5-stage pipeline", category: "cpu-extensions", status: "completed", priority: "High" },
  { title: "RISC-V GPUs", category: "ML/NN Accelerators", status: "idea", priority: "Medium" },
  { title: "Superscalar RISC-V Processor", category: "cpu-extensions", status: "idea", priority: "Medium" },
  { title: "ε-greedy cache prefetcher", category: "cpu-extensions", status: "idea", priority: "Low" },
  { title: "μManycore: Read Paper", category: "ML/NN Accelerators", status: "active", priority: "Low" },
  { title: "MVDRAM: Read Paper", category: "ML/NN Accelerators", status: "completed", priority: "Low" },
  { title: "SNN Accelerator", category: "Neuromorphic computing", status: "active", priority: "High" },
  { title: "“How is your Memory Fast?” video", category: "Video/Blog", status: "idea", priority: "Low" }
];

let currentFilter = 'all';
let currentSearch = '';

const searchInput = document.getElementById('search-input');
const ideasContainer = document.getElementById('ideas-container');
const noResults = document.getElementById('no-results');

document.addEventListener('DOMContentLoaded', function() {
  // Render category filter buttons
  const filterContainer = document.querySelector('.category-filters');
  const categories = ["all", "cpu-extensions", "ML/NN Accelerators", "Video/Blog", "Neuromorphic computing"];
  filterContainer.innerHTML = categories.map(cat =>
    `<button class="category-btn${cat === 'all' ? ' active' : ''}" data-category="${cat}">${cat}</button>`
  ).join('');

  updateStats();
  renderIdeas();
  setupEventListeners();
});

function updateStats() {
  document.getElementById('total-ideas').textContent = ideas.length;
  document.getElementById('categories-count').textContent = 4;
  document.getElementById('active-ideas').textContent = ideas.filter(i => i.status === 'active').length;
  document.getElementById('completed-ideas').textContent = ideas.filter(i => i.status === 'completed').length;
}

function setupEventListeners() {
  searchInput.addEventListener('input', function(e) {
    currentSearch = e.target.value.toLowerCase();
    renderIdeas();
  });
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.dataset.category;
      renderIdeas();
    });
  });
}

function filterIdeas() {
  return ideas.filter(idea => {
    if (currentFilter !== 'all' && idea.category !== currentFilter) return false;
    if (currentSearch) {
      const s = currentSearch;
      return idea.title.toLowerCase().includes(s);
    }
    return true;
  });
}

function renderIdeas() {
  const filteredIdeas = filterIdeas();
  if (filteredIdeas.length === 0) {
    ideasContainer.style.display = 'none';
    noResults.style.display = 'block';
    return;
  }
  ideasContainer.style.display = 'grid';
  noResults.style.display = 'none';
  ideasContainer.innerHTML = filteredIdeas.map(idea => `
    <div class="idea-card">
      <div class="idea-title">${idea.title}</div>
      <div class="idea-meta">
        <span class="idea-category">${idea.category}</span>
        <span class="idea-priority">${idea.priority}</span>
        <span class="idea-status">${getStatusIcon(idea.status)} ${idea.status}</span>
      </div>
    </div>
  `).join('');
}

function getStatusIcon(status) {
  switch(status) {
    case 'idea': return '💡';
    case 'active': return '🔥';
    case 'completed': return '✅';
    case 'paused': return '⏸️';
    default: return '💭';
  }
}
