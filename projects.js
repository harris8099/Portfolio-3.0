(function () {
  const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  const featuredWrap = document.getElementById('featuredProject');
  const spotlightWrap = document.getElementById('projectSpotlight');
  const sectionsWrap = document.getElementById('projectSections');
  const filtersWrap = document.getElementById('filterRow');
  const searchInput = document.getElementById('searchInput');
  const emptyState = document.getElementById('emptyState');

  let activeDomain = 'All';
  let query = '';
  let selectedProjectName = null;

  const domainOrder = [
    'Embedded & Hardware',
    'Python Tools',
    'Web App',
    'Digital Design',
    'Python Games',
  ];

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

  function teaserLabel(project) {
    if (project.interaction?.type === 'tifan-machine') return 'Machine demo available';
    if (project.interaction?.type === 'terminal-demo') return 'Terminal flow available';
    if (project.interaction?.type === 'pcb-explorer') return 'Board explorer available';
    if (project.interaction?.type === 'browser-preview') return 'Preview screens available';
    if (project.interaction?.type === 'logic-sim') return 'Logic simulator available';
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

  function renderMachineInteraction(p) {
    const metricsMarkup = (p.interaction.metrics || [])
      .map(([label, value]) => `<div class="machine-metric"><span>${label}</span><strong>${value}</strong></div>`)
      .join('');
    const interactionButtons = p.interaction.steps
      .map((step, index) => `<button type="button" class="machine-tab${index === 0 ? ' active' : ''}" data-step="${step.key}">${step.label}</button>`)
      .join('');
    const imageMarkup = (p.interaction.media?.images || [])
      .map((image) => `
        <button type="button" class="media-thumb" data-image="${image.src}" data-alt="${image.alt}">
          <img src="${image.src}" alt="${image.alt}">
        </button>
      `)
      .join('');
    const videoMarkup = (p.interaction.media?.videos || [])
      .map((media) => `
        <div class="media-video-card">
          <div class="media-label">${media.label}</div>
          <video controls preload="metadata" class="media-video">
            <source src="${media.src}" type="video/mp4">
          </video>
        </div>
      `)
      .join('');
    const panelsMarkup = p.interaction.steps
      .map((step, index) => `
        <div class="machine-panel${index === 0 ? ' active' : ''}" data-panel="${step.key}">
          <div class="machine-board">
            <div class="machine-stage">${step.stage}</div>
            <div class="machine-diagram">
              <div class="machine-node node-hand${step.key === 'grip' ? ' live' : ''}">Hand</div>
              <div class="machine-node node-feed${step.key === 'overview' ? ' live' : ''}">Feed</div>
              <div class="machine-node node-path${step.key === 'plant' ? ' live' : ''}">Plant Path</div>
              <div class="machine-node node-reset${step.key === 'reset' ? ' live' : ''}">Reset</div>
            </div>
            <div class="machine-copy">${step.text}</div>
          </div>
          <div class="machine-parts">
            ${(step.parts || []).map((part) => `<span class="machine-chip">${part}</span>`).join('')}
          </div>
        </div>
      `)
      .join('');

    return `
      <section class="project-machine">
        <div class="machine-topline">
          <div>
            <p class="machine-kicker">${p.interaction.title}</p>
            <h4>${p.interaction.subtitle}</h4>
          </div>
          <div class="machine-metrics">${metricsMarkup}</div>
        </div>
        <div class="project-media">
          <div class="media-stage">
            <img class="media-stage-image" src="${p.interaction.media?.images?.[0]?.src || ''}" alt="${p.interaction.media?.images?.[0]?.alt || ''}">
          </div>
          <div class="media-gallery">${imageMarkup}</div>
          <div class="media-video-list">${videoMarkup}</div>
        </div>
        <div class="machine-tabs">${interactionButtons}</div>
        <div class="machine-panels">${panelsMarkup}</div>
      </section>
    `;
  }

  function renderTerminalInteraction(p) {
    const metricsMarkup = (p.interaction.metrics || [])
      .map(([label, value]) => `<div class="machine-metric"><span>${label}</span><strong>${value}</strong></div>`)
      .join('');
    const commandTabs = p.interaction.commands
      .map((command, index) => `<button type="button" class="terminal-tab${index === 0 ? ' active' : ''}" data-command="${command.key}">${command.label}</button>`)
      .join('');
    const terminalPanels = p.interaction.commands
      .map((command, index) => `
        <div class="terminal-panel${index === 0 ? ' active' : ''}" data-terminal-panel="${command.key}">
          <div class="terminal-line prompt">$ ${command.command}</div>
          ${(command.output || []).map((line) => `<div class="terminal-line">${line}</div>`).join('')}
        </div>
      `)
      .join('');

    return `
      <section class="project-machine terminal-shell">
        <div class="machine-topline">
          <div>
            <p class="machine-kicker">${p.interaction.title}</p>
            <h4>${p.interaction.subtitle}</h4>
          </div>
          <div class="machine-metrics">${metricsMarkup}</div>
        </div>
        <div class="terminal-tabs">${commandTabs}</div>
        <div class="terminal-body">${terminalPanels}</div>
      </section>
    `;
  }

  function renderPcbInteraction(p) {
    const metricsMarkup = (p.interaction.metrics || [])
      .map(([label, value]) => `<div class="machine-metric"><span>${label}</span><strong>${value}</strong></div>`)
      .join('');
    const imageMarkup = (p.interaction.media?.images || [])
      .map((image) => `
        <button type="button" class="media-thumb" data-image="${image.src}" data-alt="${image.alt}">
          <img src="${image.src}" alt="${image.alt}">
        </button>
      `)
      .join('');
    const zoneTabs = p.interaction.zones
      .map((zone, index) => `<button type="button" class="pcb-tab${index === 0 ? ' active' : ''}" data-zone="${zone.key}">${zone.label}</button>`)
      .join('');
    const zonePanels = p.interaction.zones
      .map((zone, index) => `
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
      `)
      .join('');

    return `
      <section class="project-machine pcb-shell">
        <div class="machine-topline">
          <div>
            <p class="machine-kicker">${p.interaction.title}</p>
            <h4>${p.interaction.subtitle}</h4>
          </div>
          <div class="machine-metrics">${metricsMarkup}</div>
        </div>
        <div class="project-media">
          <div class="media-stage">
            <img class="media-stage-image" src="${p.interaction.media?.images?.[0]?.src || ''}" alt="${p.interaction.media?.images?.[0]?.alt || ''}">
          </div>
          <div class="media-gallery">${imageMarkup}</div>
        </div>
        <div class="pcb-tabs">${zoneTabs}</div>
        <div class="pcb-body">${zonePanels}</div>
      </section>
    `;
  }

  function renderBrowserInteraction(p) {
    const metricsMarkup = (p.interaction.metrics || [])
      .map(([label, value]) => `<div class="machine-metric"><span>${label}</span><strong>${value}</strong></div>`)
      .join('');
    const screenTabs = p.interaction.screens
      .map((screen, index) => `<button type="button" class="browser-tab${index === 0 ? ' active' : ''}" data-screen="${screen.key}">${screen.label}</button>`)
      .join('');
    const screenPanels = p.interaction.screens
      .map((screen, index) => `
        <div class="browser-panel${index === 0 ? ' active' : ''}" data-browser-panel="${screen.key}">
          <div class="browser-window">
            <div class="browser-chrome">
              <span></span><span></span><span></span>
            </div>
            <img class="browser-image" src="${screen.image}" alt="${screen.title}">
          </div>
          <div class="browser-copy">
            <div class="pcb-title">${screen.title}</div>
            <p>${screen.text}</p>
          </div>
        </div>
      `)
      .join('');

    return `
      <section class="project-machine browser-shell">
        <div class="machine-topline">
          <div>
            <p class="machine-kicker">${p.interaction.title}</p>
            <h4>${p.interaction.subtitle}</h4>
          </div>
          <div class="machine-metrics">${metricsMarkup}</div>
        </div>
        <div class="browser-tabs">${screenTabs}</div>
        <div class="browser-body">${screenPanels}</div>
      </section>
    `;
  }

  function renderLogicInteraction(p) {
    const metricsMarkup = (p.interaction.metrics || [])
      .map(([label, value]) => `<div class="machine-metric"><span>${label}</span><strong>${value}</strong></div>`)
      .join('');
    const stateTabs = p.interaction.states
      .map((state, index) => `<button type="button" class="logic-tab${index === 0 ? ' active' : ''}" data-state="${state.key}">${state.label}</button>`)
      .join('');
    const statePanels = p.interaction.states
      .map((state, index) => `
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
      `)
      .join('');

    return `
      <section class="project-machine logic-shell">
        <div class="machine-topline">
          <div>
            <p class="machine-kicker">${p.interaction.title}</p>
            <h4>${p.interaction.subtitle}</h4>
          </div>
          <div class="machine-metrics">${metricsMarkup}</div>
        </div>
        <div class="logic-tabs">${stateTabs}</div>
        <div class="logic-body">${statePanels}</div>
      </section>
    `;
  }

  function renderInteraction(p) {
    if (!p.interaction) return '';
    if (p.interaction.type === 'terminal-demo') return renderTerminalInteraction(p);
    if (p.interaction.type === 'pcb-explorer') return renderPcbInteraction(p);
    if (p.interaction.type === 'browser-preview') return renderBrowserInteraction(p);
    if (p.interaction.type === 'logic-sim') return renderLogicInteraction(p);
    return renderMachineInteraction(p);
  }

  function spotlightMarkup(project) {
    const stack = (project.stack || []).map((s) => `<span class="tag">${s}</span>`).join('');
    const highlights = (project.highlights || []).map((h) => `<li>${h}</li>`).join('');
    return `
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
    `;
  }

  function bindSpotlightInteractions(scope) {
    const tabs = scope.querySelectorAll('.machine-tab');
    const panels = scope.querySelectorAll('.machine-panel');
    const thumbs = scope.querySelectorAll('.media-thumb');
    const stageImage = scope.querySelector('.media-stage-image');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.step;
        tabs.forEach((btn) => btn.classList.toggle('active', btn === tab));
        panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === target));
      });
    });
    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        thumbs.forEach((btn) => btn.classList.toggle('active', btn === thumb));
        if (stageImage) {
          stageImage.src = thumb.dataset.image;
          stageImage.alt = thumb.dataset.alt;
        }
      });
    });

    const terminalTabs = scope.querySelectorAll('.terminal-tab');
    const terminalPanels = scope.querySelectorAll('.terminal-panel');
    terminalTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.command;
        terminalTabs.forEach((btn) => btn.classList.toggle('active', btn === tab));
        terminalPanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.terminalPanel === target));
      });
    });

    const pcbTabs = scope.querySelectorAll('.pcb-tab');
    const pcbPanels = scope.querySelectorAll('.pcb-panel');
    pcbTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.zone;
        pcbTabs.forEach((btn) => btn.classList.toggle('active', btn === tab));
        pcbPanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.pcbPanel === target));
      });
    });

    const browserTabs = scope.querySelectorAll('.browser-tab');
    const browserPanels = scope.querySelectorAll('.browser-panel');
    browserTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.screen;
        browserTabs.forEach((btn) => btn.classList.toggle('active', btn === tab));
        browserPanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.browserPanel === target));
      });
    });

    const logicTabs = scope.querySelectorAll('.logic-tab');
    const logicPanels = scope.querySelectorAll('.logic-panel');
    logicTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.state;
        logicTabs.forEach((btn) => btn.classList.toggle('active', btn === tab));
        logicPanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.logicPanel === target));
      });
    });
  }

  function renderSpotlight(project) {
    if (!project) {
      spotlightWrap.classList.add('hidden');
      spotlightWrap.innerHTML = '';
      return;
    }
    spotlightWrap.classList.remove('hidden');
    spotlightWrap.classList.add('fade-transition', 'fade-hidden');
    
    setTimeout(() => {
      spotlightWrap.innerHTML = spotlightMarkup(project);
      bindSpotlightInteractions(spotlightWrap);
      spotlightWrap.classList.remove('fade-hidden');
      spotlightWrap.classList.add('fade-visible');
    }, 50);
  }

  function projectCard(project) {
    const stack = (project.stack || []).slice(0, 3).map((s) => `<span class="tag">${s}</span>`).join('');
    const actionLabel =
      project.interaction?.type === 'tifan-machine' ? 'View System' :
      project.interaction?.type === 'terminal-demo' ? 'Run Demo' :
      project.interaction?.type === 'pcb-explorer' ? 'Inspect Board' :
      project.interaction?.type === 'browser-preview' ? 'Open Preview' :
      project.interaction?.type === 'logic-sim' ? 'Test Logic' :
      'Explore Project';

    return `
      <article class="project-teaser animate-in${project.name === selectedProjectName ? ' selected' : ''}" data-project-card="${project.name}">
        <div class="teaser-visual">${getProjectVisual(project)}</div>
        <div class="teaser-body">
          <div class="teaser-meta">${project.domain} | ${project.year}</div>
          <h3>${project.name}</h3>
          <p>${project.summary}</p>
          <div class="tags teaser-tags">${stack}</div>
          <div class="teaser-footer">
            <span class="teaser-hook">${teaserLabel(project)}</span>
            <button type="button" class="teaser-btn" data-project-open="${project.name}">${actionLabel}</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderFeatured(project) {
    if (!project) {
      featuredWrap.innerHTML = '';
      return;
    }
    featuredWrap.innerHTML = `
      <div class="featured-shell animate-in">
        <div class="featured-copy">
          <p class="section-kicker">Featured Project</p>
          <h2>${project.name}</h2>
          <p>${project.summary}</p>
          <div class="tags featured-tags">${(project.stack || []).map((s) => `<span class="tag">${s}</span>`).join('')}</div>
          <div class="featured-actions">
            <button type="button" class="feature-btn" data-project-open="${project.name}">Open Interactive Viewer</button>
            <a href="${project.github}" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <div class="featured-visual">
          ${getProjectVisual(project)}
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
        <div class="domain-head animate-in">
          <p class="section-kicker">${domain}</p>
          <h2>${domain}</h2>
        </div>
        <div class="teaser-grid">
          ${groupProjects.map(projectCard).join('')}
        </div>
      `;
      sectionsWrap.appendChild(section);
    });

    const animatedEls = sectionsWrap.querySelectorAll('.animate-in');
    animatedEls.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.05}s`;
    });

    emptyState.classList.toggle('hidden', hasCards || filtered.some((project) => project.name === 'Tifan'));
  }

  function attachProjectOpenHandlers() {
    document.querySelectorAll('[data-project-open]').forEach((button) => {
      button.addEventListener('click', () => {
        selectedProjectName = button.dataset.projectOpen;
        const selectedProject = projects.find((project) => project.name === selectedProjectName);
        
        spotlightWrap.classList.remove('fade-visible');
        spotlightWrap.classList.add('fade-hidden');
        
        setTimeout(() => {
          renderSpotlight(selectedProject);
          render();
          
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = spotlightWrap.getBoundingClientRect().top;
          const offsetPosition = (elementRect - bodyRect) - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 150);
      });
    });
  }

  function render() {
    const filtered = projects.filter(matches);
    const featured = filtered.find((project) => project.name === 'Tifan') || filtered[0] || null;
    const selected = selectedProjectName ? filtered.find((project) => project.name === selectedProjectName) : null;

    renderFeatured(featured);
    renderSpotlight(selected);
    renderSections(filtered);
    attachProjectOpenHandlers();
  }

  searchInput.addEventListener('input', (e) => {
    query = e.target.value || '';
    render();
  });

  createFilters();
  render();
})();
