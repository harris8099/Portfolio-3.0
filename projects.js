(function () {
  const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  const grid = document.getElementById('projectGrid');
  const filtersWrap = document.getElementById('filterRow');
  const searchInput = document.getElementById('searchInput');
  const emptyState = document.getElementById('emptyState');

  let activeDomain = 'All';
  let query = '';

  const domains = ['All', ...new Set(projects.map((p) => p.domain))];

  function createFilters() {
    filtersWrap.innerHTML = '';
    domains.forEach((domain) => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (domain === activeDomain ? ' active' : '');
      btn.textContent = domain;
      btn.addEventListener('click', () => {
        activeDomain = domain;
        createFilters();
        render();
      });
      filtersWrap.appendChild(btn);
    });
  }

  function matches(p) {
    const domainOk = activeDomain === 'All' || p.domain === activeDomain;
    const q = query.trim().toLowerCase();
    if (!q) return domainOk;
    const hay = [p.name, p.summary, p.domain, ...(p.stack || []), ...(p.highlights || [])]
      .join(' ')
      .toLowerCase();
    return domainOk && hay.includes(q);
  }

  function projectCard(p) {
    const item = document.createElement('article');
    item.className = 'card';

    const stack = (p.stack || []).map((s) => `<span class="tag">${s}</span>`).join('');
    const highlights = (p.highlights || []).map((h) => `<li>${h}</li>`).join('');

    const githubLink = p.github ? `<a href="${p.github}" target="_blank" rel="noreferrer">GitHub</a>` : '';
    const demoLink = p.demo ? `<a href="${p.demo}" target="_blank" rel="noreferrer">Live</a>` : '';

    item.innerHTML = `
      <div class="card-head">
        <h3>${p.name}</h3>
        <div class="meta">${p.domain}  |  ${p.year}</div>
      </div>
      <p class="summary">${p.summary}</p>
      <div class="tags">${stack}</div>
      <div class="actions">
        <button type="button" class="toggle-btn">Details</button>
        ${githubLink}
        ${demoLink}
      </div>
      <div class="details"><ul>${highlights}</ul></div>
    `;

    const toggleBtn = item.querySelector('.toggle-btn');
    toggleBtn.addEventListener('click', () => {
      item.classList.toggle('open');
      toggleBtn.textContent = item.classList.contains('open') ? 'Hide' : 'Details';
    });

    return item;
  }

  function render() {
    const filtered = projects.filter(matches);
    grid.innerHTML = '';
    filtered.forEach((p) => grid.appendChild(projectCard(p)));
    emptyState.classList.toggle('hidden', filtered.length > 0);
  }

  searchInput.addEventListener('input', (e) => {
    query = e.target.value || '';
    render();
  });

  createFilters();
  render();
})();
