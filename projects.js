(function () {
  const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  const featuredWrap = document.getElementById('featuredProject');
  const spotlightWrap = document.getElementById('projectSpotlight');
  const sectionsWrap = document.getElementById('projectSections');
  const filtersWrap = document.getElementById('filterRow');
  const searchInput = document.getElementById('searchInput');
  const emptyState = document.getElementById('emptyState');

  let activeDomain = null;
  let query = '';
  let selectedProjectName = null;
  let currentSpotlightProject = null;
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  const repoStats = {};
  const domainOrder = [
    'Embedded & Hardware',
    'Python Tools',
    'Web App',
    'Digital Design',
    'Python Games',
  ];
  const domains = [...new Set(projects.map((p) => p.domain))];
  activeDomain = activeDomain || domains[0]; // Default to first domain

  function createFilters() {
    filtersWrap.innerHTML = '';
    domains.forEach((domain) => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (domain === activeDomain ? ' active' : '');
      btn.textContent = domain;
      btn.addEventListener('click', () => {
        activeDomain = domain;
        createFilters();
        if (selectedProjectName && !getFilteredProjects().some((project) => project.name === selectedProjectName)) {
          closeSpotlight(false);
        }
        renderPage();
      });
      filtersWrap.appendChild(btn);
    });
  }

  function getFilteredProjects() {
    return projects.filter((project) => {
      const domainOk = !activeDomain || project.domain === activeDomain;
      const q = query.trim().toLowerCase();
      if (!q) return domainOk;
      const hay = [project.name, project.summary, project.domain, ...(project.stack || []), ...(project.highlights || [])]
        .join(' ')
        .toLowerCase();
      return domainOk && hay.includes(q);
    });
  }

  function teaserLabel(project) {
    if (project.interaction?.type === 'tifan-machine') return 'Machine demo available';
    if (project.interaction?.type === 'terminal-demo') return 'Terminal flow available';
    if (project.interaction?.type === 'pcb-explorer') return 'Board explorer available';
    if (project.interaction?.type === 'browser-preview') return 'Preview screens available';
    if (project.interaction?.type === 'logic-sim') return 'Logic simulator available';
    if (project.interaction?.type === 'iframe-preview') return 'Live demo available';
    return 'Project overview';
  }

  function getProjectVisual(project) {
    if (project.interaction?.media?.images?.[0]?.src) {
      return `<img class="teaser-image" src="${project.interaction.media.images[0].src}" alt="${project.interaction.media.images[0].alt || project.name}">`;
    }
    if (project.interaction?.screens?.[0]?.image) {
      return `<img class="teaser-image" src="${project.interaction.screens[0].image}" alt="${project.interaction.screens[0].title || project.name}">`;
    }
    if (project.interaction?.type === 'terminal-demo') {
      const command = project.interaction.commands?.[0];
      return `
        <div class="teaser-terminal">
          <div class="terminal-line prompt">$ ${command?.command || 'python app.py'}</div>
          ${(command?.output || []).slice(0, 2).map((line) => `<div class="terminal-line">${line}</div>`).join('')}
        </div>
      `;
    }
    if (project.interaction?.type === 'logic-sim') {
      const state = project.interaction.states?.[0];
      return `
        <div class="teaser-logic">
          <span class="logic-pill">${state?.label || 'State'}</span>
          <strong>${state?.output || 'Output'}</strong>
        </div>
      `;
    }
    if (project.interaction?.type === 'pcb-explorer') {
      return `<div class="teaser-board"><span>PCB</span><span>Explorer</span></div>`;
    }
    return `<div class="teaser-generic">${project.domain}</div>`;
  }

  function metricsMarkup(metrics) {
    return (metrics || [])
      .map(([label, value]) => `<div class="machine-metric"><span>${label}</span><strong>${value}</strong></div>`)
      .join('');
  }

  function renderMachineInteraction(project) {
    const steps = project.interaction.steps || [];
    const images = project.interaction.media?.images || [];
    const videos = project.interaction.media?.videos || [];
    return `
      <section class="project-machine">
        <div class="machine-topline">
          <div>
            <p class="machine-kicker">${project.interaction.title}</p>
            <h4>${project.interaction.subtitle}</h4>
          </div>
          <div class="machine-metrics">${metricsMarkup(project.interaction.metrics)}</div>
        </div>
        <div class="project-media">
          <div class="media-stage">
            <img class="media-stage-image" src="${images[0]?.src || ''}" alt="${images[0]?.alt || ''}">
          </div>
          <div class="media-gallery">
            ${images.map((image) => `
              <button type="button" class="media-thumb" data-image="${image.src}" data-alt="${image.alt}">
                <img src="${image.src}" alt="${image.alt}">
              </button>
            `).join('')}
          </div>
          <div class="media-video-list">
            ${videos.map((media) => `
              <div class="media-video-card">
                <div class="media-label">${media.label}</div>
                <video controls preload="metadata" class="media-video">
                  <source src="${media.src}" type="video/mp4">
                </video>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="machine-tabs compact-tabs">
          ${steps.map((step, index) => `<button type="button" class="machine-tab${index === 0 ? ' active' : ''}" data-step="${step.key}" title="${step.text}">${step.label}</button>`).join('')}
        </div>
      </section>
    `;
  }

  function renderTerminalInteraction(project) {
    const commands = project.interaction.commands || [];
    return `
      <section class="project-machine terminal-shell">
        <div class="machine-topline">
          <div>
            <p class="machine-kicker">${project.interaction.title}</p>
            <h4>${project.interaction.subtitle}</h4>
          </div>
          <div class="machine-metrics">${metricsMarkup(project.interaction.metrics)}</div>
        </div>
        <div class="terminal-tabs">
          ${commands.map((command, index) => `<button type="button" class="terminal-tab${index === 0 ? ' active' : ''}" data-command="${command.key}">${command.label}</button>`).join('')}
        </div>
        <div class="terminal-body">
          ${commands.map((command, index) => `
            <div class="terminal-panel${index === 0 ? ' active' : ''}" data-terminal-panel="${command.key}">
              <div class="terminal-line prompt">$ ${command.command}</div>
              ${(command.output || []).map((line) => `<div class="terminal-line">${line}</div>`).join('')}
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderPcbInteraction(project) {
    const zones = project.interaction.zones || [];
    const images = project.interaction.media?.images || [];
    return `
      <section class="project-machine pcb-shell">
        <div class="machine-topline">
          <div>
            <p class="machine-kicker">${project.interaction.title}</p>
            <h4>${project.interaction.subtitle}</h4>
          </div>
          <div class="machine-metrics">${metricsMarkup(project.interaction.metrics)}</div>
        </div>
        <div class="project-media">
          <div class="media-stage">
            <img class="media-stage-image" src="${images[0]?.src || ''}" alt="${images[0]?.alt || ''}">
          </div>
          <div class="media-gallery">
            ${images.map((image) => `
              <button type="button" class="media-thumb" data-image="${image.src}" data-alt="${image.alt}">
                <img src="${image.src}" alt="${image.alt}">
              </button>
            `).join('')}
          </div>
        </div>
        <div class="pcb-tabs">
          ${zones.map((zone, index) => `<button type="button" class="pcb-tab${index === 0 ? ' active' : ''}" data-zone="${zone.key}">${zone.label}</button>`).join('')}
        </div>
        <div class="pcb-body">
          ${zones.map((zone, index) => `
            <div class="pcb-panel${index === 0 ? ' active' : ''}" data-pcb-panel="${zone.key}">
              <div class="pcb-canvas zone-${zone.key}">
                <div class="pcb-block block-power">Power</div>
                <div class="pcb-block block-mcu">Control</div>
                <div class="pcb-block block-io">I/O</div>
                <div class="pcb-trace trace-a"></div>
                <div class="pcb-trace trace-b"></div>
              </div>
              <div class="pcb-copy">
                <div class="pcb-title">${zone.title}</div>
                <p>${zone.text}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderBrowserInteraction(project) {
    const screens = project.interaction.screens || [];
    return `
      <section class="project-machine browser-shell">
        <div class="machine-topline">
          <div>
            <p class="machine-kicker">${project.interaction.title}</p>
            <h4>${project.interaction.subtitle}</h4>
          </div>
          <div class="machine-metrics">${metricsMarkup(project.interaction.metrics)}</div>
        </div>
        <div class="browser-tabs">
          ${screens.map((screen, index) => `<button type="button" class="browser-tab${index === 0 ? ' active' : ''}" data-screen="${screen.key}">${screen.label}</button>`).join('')}
        </div>
        <div class="browser-body">
          ${screens.map((screen, index) => `
            <div class="browser-panel${index === 0 ? ' active' : ''}" data-browser-panel="${screen.key}">
              <div class="browser-window">
                <div class="browser-chrome"><span></span><span></span><span></span></div>
                <img class="browser-image" src="${screen.image}" alt="${screen.title}">
              </div>
              <div class="browser-copy">
                <div class="pcb-title">${screen.title}</div>
                <p>${screen.text}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderLogicInteraction(project) {
    const states = project.interaction.states || [];
    return `
      <section class="project-machine logic-shell">
        <div class="machine-topline">
          <div>
            <p class="machine-kicker">${project.interaction.title}</p>
            <h4>${project.interaction.subtitle}</h4>
          </div>
          <div class="machine-metrics">${metricsMarkup(project.interaction.metrics)}</div>
        </div>
        <div class="logic-tabs">
          ${states.map((state, index) => `<button type="button" class="logic-tab${index === 0 ? ' active' : ''}" data-state="${state.key}">${state.label}</button>`).join('')}
        </div>
        <div class="logic-body">
          ${states.map((state, index) => `
            <div class="logic-panel${index === 0 ? ' active' : ''}" data-logic-panel="${state.key}">
              <div class="logic-display">
                <div class="logic-node input-node">A/B</div>
                <div class="logic-gate">${state.label}</div>
                <div class="logic-node output-node">${state.output}</div>
              </div>
              <div class="pcb-copy">
                <div class="pcb-title">${state.label}</div>
                <p>${state.note}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderIframeInteraction(project) {
    return `
      <section class="project-machine browser-shell">
        <div class="machine-topline">
          <div>
            <p class="machine-kicker">Live Demo</p>
            <h4>${project.name} - Hosted on GitHub Pages</h4>
          </div>
        </div>
        <div class="project-media project-media-iframe">
          <div class="media-stage media-stage-iframe">
            <div class="browser-chrome browser-chrome-static"><span></span><span></span><span></span></div>
            <iframe src="${project.interaction.url}" title="${project.name}" loading="lazy"></iframe>
          </div>
        </div>
      </section>
    `;
  }

  function renderInteraction(project) {
    if (!project.interaction) return '';
    if (project.interaction.type === 'terminal-demo') return renderTerminalInteraction(project);
    if (project.interaction.type === 'pcb-explorer') return renderPcbInteraction(project);
    if (project.interaction.type === 'browser-preview') return renderBrowserInteraction(project);
    if (project.interaction.type === 'logic-sim') return renderLogicInteraction(project);
    if (project.interaction.type === 'iframe-preview') return renderIframeInteraction(project);
    return renderMachineInteraction(project);
  }

  function spotlightMarkup(project) {
    const stack = (project.stack || []).map((item) => `<span class="tag">${item}</span>`).join('');
    const highlights = (project.highlights || []).map((item) => `<li>${item}</li>`).join('');
    return `
      <div class="spotlight-content">
        <button type="button" class="btn-close-modal" aria-label="Close modal">&times;</button>
        <div class="spotlight-head">
          <div>
            <p class="section-kicker">Project Viewer</p>
            <h2>${project.name}</h2>
            <p class="spotlight-summary">${project.summary}</p>
          </div>
          <div class="spotlight-actions">
            <a href="${project.github}" target="_blank" rel="noreferrer">Open GitHub</a>
          </div>
        </div>
        <div class="tags spotlight-tags">${stack}</div>
        ${renderInteraction(project)}
        <ul class="spotlight-list">${highlights}</ul>
      </div>
    `;
  }

  function bindSpotlightInteractions(scope) {
    const stageImage = scope.querySelector('.media-stage-image');
    scope.querySelectorAll('.media-thumb').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        scope.querySelectorAll('.media-thumb').forEach((button) => button.classList.toggle('active', button === thumb));
        if (stageImage) {
          stageImage.src = thumb.dataset.image;
          stageImage.alt = thumb.dataset.alt;
        }
      });
    });

    scope.querySelectorAll('.machine-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        scope.querySelectorAll('.machine-tab').forEach((button) => button.classList.toggle('active', button === tab));
      });
    });

    scope.querySelectorAll('.terminal-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.command;
        scope.querySelectorAll('.terminal-tab').forEach((button) => button.classList.toggle('active', button === tab));
        scope.querySelectorAll('.terminal-panel').forEach((panel) => panel.classList.toggle('active', panel.dataset.terminalPanel === target));
      });
    });

    scope.querySelectorAll('.pcb-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.zone;
        scope.querySelectorAll('.pcb-tab').forEach((button) => button.classList.toggle('active', button === tab));
        scope.querySelectorAll('.pcb-panel').forEach((panel) => panel.classList.toggle('active', panel.dataset.pcbPanel === target));
      });
    });

    scope.querySelectorAll('.browser-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.screen;
        scope.querySelectorAll('.browser-tab').forEach((button) => button.classList.toggle('active', button === tab));
        scope.querySelectorAll('.browser-panel').forEach((panel) => panel.classList.toggle('active', panel.dataset.browserPanel === target));
      });
    });

    scope.querySelectorAll('.logic-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.state;
        scope.querySelectorAll('.logic-tab').forEach((button) => button.classList.toggle('active', button === tab));
        scope.querySelectorAll('.logic-panel').forEach((panel) => panel.classList.toggle('active', panel.dataset.logicPanel === target));
      });
    });
  }

  function initTeaserTilt() {
    const cards = document.querySelectorAll('.project-teaser');
    cards.forEach((card) => {
      card.style.transform = '';
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
      if (reducedMotion || coarsePointer) return;

      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const px = x / rect.width;
        const py = y / rect.height;
        const rotateY = (px - 0.5) * 8;
        const rotateX = (0.5 - py) * 8;
        card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        card.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`);
        card.style.setProperty('--my', `${(py * 100).toFixed(2)}%`);
      });

      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
        card.style.setProperty('--mx', '50%');
        card.style.setProperty('--my', '50%');
      });
    });
  }

  function initSpotlightEffects(project, scope) {
    if (!scope || reducedMotion || coarsePointer) return;
    const content = scope.querySelector('.spotlight-content');
    if (content) {
      content.addEventListener('pointermove', (event) => {
        const rect = content.getBoundingClientRect();
        const rx = ((event.clientY - rect.top) / rect.height - 0.5) * -3;
        const ry = ((event.clientX - rect.left) / rect.width - 0.5) * 3;
        content.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      });
      content.addEventListener('pointerleave', () => {
        content.style.transform = '';
      });
    }

    if (project.interaction?.type === 'tifan-machine') {
      scope.querySelectorAll('.machine-diagram').forEach((diagram) => {
        diagram.addEventListener('pointermove', (event) => {
          const rect = diagram.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          diagram.querySelectorAll('.machine-node').forEach((node) => {
            const nr = node.getBoundingClientRect();
            const cx = nr.left - rect.left + nr.width / 2;
            const cy = nr.top - rect.top + nr.height / 2;
            const dist = Math.hypot(cx - x, cy - y);
            node.style.boxShadow = dist < 120 ? '0 0 18px rgba(0, 229, 255, 0.35)' : '';
          });
        });
      });
    }

    if (project.interaction?.type === 'pcb-explorer') {
      scope.querySelectorAll('.pcb-canvas').forEach((canvas) => {
        canvas.addEventListener('pointermove', (event) => {
          const rect = canvas.getBoundingClientRect();
          const mx = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
          const my = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
          canvas.querySelectorAll('.pcb-block').forEach((block, i) => {
            block.style.transform = `translate(${(mx * (0.2 + i * 0.1)).toFixed(2)}px, ${(my * (0.2 + i * 0.1)).toFixed(2)}px)`;
          });
        });
        canvas.addEventListener('pointerleave', () => {
          canvas.querySelectorAll('.pcb-block').forEach((block) => {
            block.style.transform = '';
          });
        });
      });
    }

    if (project.interaction?.type === 'logic-sim') {
      scope.querySelectorAll('.logic-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
          const panel = scope.querySelector(`.logic-panel[data-logic-panel="${tab.dataset.state}"]`);
          const gate = panel?.querySelector('.logic-gate');
          if (gate) {
            gate.animate(
              [
                { transform: 'translate(-50%, -50%) scale(1)' },
                { transform: 'translate(-50%, -50%) scale(1.08)' },
                { transform: 'translate(-50%, -50%) scale(1)' },
              ],
              { duration: 380, easing: 'ease-out' }
            );
          }
        });
      });
    }

    if (project.interaction?.type === 'browser-preview' || project.interaction?.type === 'iframe-preview') {
      scope.querySelectorAll('.browser-window').forEach((win) => {
        win.addEventListener('pointermove', (event) => {
          const rect = win.getBoundingClientRect();
          const mx = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
          const my = ((event.clientY - rect.top) / rect.height - 0.5) * 6;
          win.style.transform = `translate(${mx.toFixed(2)}px, ${my.toFixed(2)}px)`;
        });
        win.addEventListener('pointerleave', () => {
          win.style.transform = '';
        });
      });
    }
  }

  function openSpotlight(project) {
    currentSpotlightProject = project;
    selectedProjectName = project.name;
    spotlightWrap.classList.remove('hidden');
    spotlightWrap.innerHTML = spotlightMarkup(project);
    document.body.classList.add('modal-open');
    bindSpotlightInteractions(spotlightWrap);
    initSpotlightEffects(project, spotlightWrap);

    const closeButton = spotlightWrap.querySelector('.btn-close-modal');
    closeButton?.addEventListener('click', () => closeSpotlight(true));
    spotlightWrap.onclick = (event) => {
      if (event.target === spotlightWrap) closeSpotlight(true);
    };
  }

  function closeSpotlight(shouldRerender) {
    currentSpotlightProject = null;
    selectedProjectName = null;
    spotlightWrap.classList.add('hidden');
    spotlightWrap.innerHTML = '';
    spotlightWrap.onclick = null;
    spotlightWrap.style.transform = '';
    document.body.classList.remove('modal-open');
    if (shouldRerender) renderPage();
  }

  function projectCard(project) {
    return `
      <article class="project-mini${project.name === selectedProjectName ? ' selected' : ''}" data-project-card="${project.name}" data-project-open="${project.name}" tabindex="0" role="button" aria-label="Open ${project.name}">
        <div class="mini-top">
          <h4>${project.name}</h4>
          <div class="mini-actions">
            <button type="button" class="mini-btn" title="View project">→</button>
            <a href="${project.github}" target="_blank" rel="noreferrer" class="mini-gh" title="GitHub">⎇</a>
          </div>
        </div>
        <div class="mini-tags">${(project.stack || []).slice(0, 2).map((item) => `<span>${item}</span>`).join('')}</div>
      </article>
    `;
  }

  function renderFeatured(project) {
    if (!project) {
      featuredWrap.innerHTML = '';
      return;
    }
    featuredWrap.innerHTML = `
      <div class="featured-compact">
        <div class="featured-row">
          <span class="featured-badge">Featured</span>
          <h3>${project.name}</h3>
          <span class="featured-summary">${project.summary.slice(0, 80)}${project.summary.length > 80 ? '...' : ''}</span>
          <div class="featured-mini-tags">${(project.stack || []).slice(0, 3).map((item) => `<span class="tag-mini">${item}</span>`).join('')}</div>
          <button type="button" class="feature-btn-sm" data-project-open="${project.name}">View</button>
          <a href="${project.github}" target="_blank" rel="noreferrer" class="github-link-sm">GitHub</a>
        </div>
      </div>
    `;
  }

  function renderSections(filtered) {
    const remaining = filtered.filter((project) => project.name !== 'Tifan');
    const grouped = new Map();
    domainOrder.forEach((domain) => grouped.set(domain, []));
    remaining.forEach((project) => {
      if (!grouped.has(project.domain)) grouped.set(project.domain, []);
      grouped.get(project.domain).push(project);
    });

    sectionsWrap.innerHTML = '';
    let hasCards = false;

    grouped.forEach((groupProjects, domain) => {
      if (!groupProjects.length) return;
      hasCards = true;
      const section = document.createElement('section');
      section.className = 'domain-section';
      section.innerHTML = `
        <div class="domain-head">
          <p class="section-kicker">${domain}</p>
          <h2>${domain}</h2>
        </div>
        <div class="teaser-grid">
          ${groupProjects.map(projectCard).join('')}
        </div>
      `;
      sectionsWrap.appendChild(section);
    });

    emptyState.classList.toggle('hidden', hasCards || filtered.some((project) => project.name === 'Tifan'));
  }

  function attachProjectOpenHandlers() {
    document.querySelectorAll('[data-project-open]').forEach((trigger) => {
      const open = () => {
        const project = projects.find((item) => item.name === trigger.dataset.projectOpen);
        if (!project) return;
        selectedProjectName = project.name;
        renderPage();
        openSpotlight(project);
      };
      trigger.addEventListener('click', open);
      if (trigger.getAttribute('role') === 'button') {
        trigger.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            open();
          }
        });
      }
    });
  }

  function renderPage() {
    const filtered = getFilteredProjects();
    const featured = filtered.find((project) => project.name === 'Tifan') || filtered[0] || null;
    renderFeatured(featured);
    renderSections(filtered);
    attachProjectOpenHandlers();
    initTeaserTilt();
  }

  async function fetchGitHubStats() {
    try {
      const response = await fetch('https://api.github.com/users/harris8099/repos');
      if (!response.ok) return;
      const repos = await response.json();
      repos.forEach((repo) => {
        repoStats[repo.name] = {
          stars: repo.stargazers_count,
          updated: new Date(repo.updated_at).toLocaleDateString(),
        };
      });
      renderPage();
      if (currentSpotlightProject) openSpotlight(currentSpotlightProject);
    } catch (error) {
      console.error('GitHub API fetch failed', error);
    }
  }

  searchInput.addEventListener('input', (event) => {
    query = event.target.value || '';
    if (selectedProjectName && !getFilteredProjects().some((project) => project.name === selectedProjectName)) {
      closeSpotlight(false);
    }
    renderPage();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && currentSpotlightProject) {
      closeSpotlight(true);
    }
  });

  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get('filter');
  if (filterParam) {
    query = filterParam;
    searchInput.value = query;
  }

  createFilters();
  renderPage();
  fetchGitHubStats();
})();
