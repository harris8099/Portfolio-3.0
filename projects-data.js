window.GITHUB_REPOS = [
  {
    name: "Motor-Website",
    language: "JavaScript",
    description: null,
    html_url: "https://github.com/harris8099/Motor-Website",
    updated_at: "2026-04-19T14:36:43Z",
  },
  {
    name: "Kicad-projects",
    language: "HTML",
    description: null,
    html_url: "https://github.com/harris8099/Kicad-projects",
    updated_at: "2026-01-18T12:29:20Z",
  },
  {
    name: "WiLink",
    language: "Python",
    description: "automaton for sign in using selenium",
    html_url: "https://github.com/harris8099/WiLink",
    updated_at: "2025-01-03T00:03:58Z",
  },
  {
    name: "Portfolio-2.0",
    language: "CSS",
    description: null,
    html_url: "https://github.com/harris8099/Portfolio-2.0",
    updated_at: "2024-11-20T06:22:32Z",
  },
  {
    name: "Tifan",
    language: "HTML",
    description: null,
    html_url: "https://github.com/harris8099/Tifan",
    updated_at: "2024-11-19T18:00:00Z",
  },
  {
    name: "CTAE-MAP",
    language: "HTML",
    description: null,
    html_url: "https://github.com/harris8099/CTAE-MAP",
    updated_at: "2024-11-19T17:26:32Z",
  },
  {
    name: "Type-Master",
    language: "Python",
    description: null,
    html_url: "https://github.com/harris8099/Type-Master",
    updated_at: "2024-11-19T17:14:58Z",
  },
  {
    name: "Text-to-Morse-converter-",
    language: "Python",
    description: "Text to Morse converter, gui based using tkinter and python",
    html_url: "https://github.com/harris8099/Text-to-Morse-converter-",
    updated_at: "2024-11-19T17:11:03Z",
  },
  {
    name: "Watermark",
    language: "Python",
    description: "watermark python app using tkinter",
    html_url: "https://github.com/harris8099/Watermark",
    updated_at: "2024-11-19T17:07:34Z",
  },
  {
    name: "Portfolio",
    language: "HTML",
    description: null,
    html_url: "https://github.com/harris8099/Portfolio",
    updated_at: "2024-11-15T18:43:33Z",
  },
  {
    name: "CODTECH-Task2",
    language: "Verilog",
    description: null,
    html_url: "https://github.com/harris8099/CODTECH-Task2",
    updated_at: "2024-06-25T19:59:28Z",
  },
  {
    name: "CODTECH-Task1",
    language: "Verilog",
    description: null,
    html_url: "https://github.com/harris8099/CODTECH-Task1",
    updated_at: "2024-06-25T19:53:14Z",
  },
  {
    name: "Dicee-roll",
    language: "CSS",
    description: "Roll the dice and settle at once",
    html_url: "https://github.com/harris8099/Dicee-roll",
    updated_at: "2024-06-15T19:52:35Z",
  },
  {
    name: "80s-hit-game-Breakout",
    language: "Python",
    description: "This game is made on python using turtle",
    html_url: "https://github.com/harris8099/80s-hit-game-Breakout",
    updated_at: "2024-06-15T05:31:41Z",
  },
  {
    name: "Tic-Tac-Toe-command-line",
    language: "Python",
    description: "I have made a tic tac toe game using python in a command line base not GUI",
    html_url: "https://github.com/harris8099/Tic-Tac-Toe-command-line",
    updated_at: "2024-04-25T13:42:45Z",
  },
];

(function () {
  const complexityRank = {
    "Motor-Website": 88,
    "Kicad-projects": 84,
    WiLink: 80,
    "Portfolio-2.0": 76,
    Tifan: 92,
    "CTAE-MAP": 72,
    "Type-Master": 69,
    "Text-to-Morse-converter-": 65,
    Watermark: 64,
    Portfolio: 60,
    "CODTECH-Task2": 58,
    "CODTECH-Task1": 55,
    "80s-hit-game-Breakout": 52,
    "Tic-Tac-Toe-command-line": 46,
    "Dicee-roll": 42,
  };

  const customMeta = {
    "Motor-Website": {
      domain: "Embedded & Hardware",
      stack: ["JavaScript", "HTML", "CSS", "Control"],
      summary: "Web interface project for motor control workflows and hardware-facing interaction.",
    },
    "Kicad-projects": {
      domain: "Embedded & Hardware",
      stack: ["KiCad", "HTML", "CSS"],
      summary: "Collection of PCB and hardware design work created in KiCad.",
      highlights: [
        "Board-level design work focused on practical layouts and electronics implementation.",
        "Explores routing, component grouping, power delivery, and manufacturable board structure.",
        "Acts as a hardware archive of PCB experiments and design iterations.",
      ],
      interaction: {
        type: "pcb-explorer",
        title: "PCB Explorer",
        subtitle: "Inspect the design workflow from board planning to routed layout decisions.",
        metrics: [
          ["Tool", "KiCad"],
          ["Focus", "Layout and routing"],
          ["Priority", "Clean board structure"],
        ],
        media: {
          images: [
            {
              src: "assets/kicad-projects/workflow.jpg",
              alt: "PCB layout workflow",
            },
            {
              src: "assets/kicad-projects/schematic.jpg",
              alt: "Schematic design workflow",
            },
            {
              src: "assets/kicad-projects/esp32-board.png",
              alt: "ESP32 based dev board layout",
            },
          ],
        },
        zones: [
          {
            key: "power",
            label: "Power",
            title: "Power Section",
            text: "Power input, regulation, and trace width decisions are grouped for cleaner delivery and better reliability across the board.",
          },
          {
            key: "signal",
            label: "Signal",
            title: "Signal Routing",
            text: "Signal paths are separated from noisy sections to keep the layout readable and reduce cross-interference in practical builds.",
          },
          {
            key: "placement",
            label: "Placement",
            title: "Component Placement",
            text: "Component clusters are arranged by function so assembly, debugging, and routing become easier through each design revision.",
          },
        ],
      },
    },
    WiLink: {
      domain: "Python Tools",
      stack: ["Python", "Selenium", "Automation"],
      summary: "Python automation tool for handling repetitive sign-in flow using Selenium.",
      highlights: [
        "Automates sign-in actions to reduce repetitive manual workflow.",
        "Built around browser control, repeatability, and practical utility.",
        "Represents a lightweight Python automation project focused on convenience.",
      ],
      interaction: {
        type: "terminal-demo",
        title: "Automation Console",
        subtitle: "Run through the WiLink sign-in flow like a lightweight terminal session.",
        metrics: [
          ["Language", "Python"],
          ["Engine", "Selenium"],
          ["Use Case", "Sign-in automation"],
        ],
        commands: [
          {
            key: "launch",
            label: "Launch",
            command: "python wilink.py --launch",
            output: [
              "[init] browser session created",
              "[scan] loading sign-in portal",
              "[ready] automation profile active",
            ],
          },
          {
            key: "signin",
            label: "Sign In",
            command: "python wilink.py --signin",
            output: [
              "[fill] credentials injected",
              "[wait] challenge and page load handled",
              "[done] sign-in sequence complete",
            ],
          },
          {
            key: "status",
            label: "Status",
            command: "python wilink.py --status",
            output: [
              "[session] active browser profile",
              "[network] portal reachable",
              "[result] ready for next automation cycle",
            ],
          },
        ],
      },
    },
    "Portfolio-2.0": {
      domain: "Web App",
      stack: ["HTML", "CSS", "JavaScript"],
      summary: "Interactive portfolio website with hardware-inspired UI and project archive views.",
      highlights: [
        "Portfolio experience built with a custom visual identity instead of a generic template.",
        "Combines project storytelling, experimental UI, and interactive sections.",
        "Focused on presentation quality, personality, and stronger user engagement.",
      ],
      interaction: {
        type: "browser-preview",
        title: "Website Preview",
        subtitle: "Walk through key screens of the portfolio like a miniature product demo.",
        metrics: [
          ["Format", "Portfolio website"],
          ["Focus", "Interactive presentation"],
          ["Goal", "Show projects with personality"],
        ],
        screens: [
          {
            key: "home",
            label: "Home",
            title: "Landing Experience",
            text: "The home screen introduces the hardware-inspired visual identity and creates a memorable entry instead of a basic portfolio hero section.",
            image: "assets/portfolio-2.0/portfolio.png",
          },
          {
            key: "projects",
            label: "Projects",
            title: "Project Archive",
            text: "Project browsing is treated as an experience, with filtering, hierarchy, and richer interaction patterns rather than static project cards.",
            image: "assets/portfolio-2.0/ctae-map.png",
          },
          {
            key: "profile",
            label: "Profile",
            title: "Personal Layer",
            text: "Profile and about sections create context around the work so the site feels like a complete engineering portfolio rather than just a gallery.",
            image: "assets/portfolio-2.0/profile2.jpg",
          },
        ],
      },
    },
    Tifan: {
      domain: "Embedded & Hardware",
      stack: ["Robotics", "Machine Integration", "Mechanical Design", "Control System"],
      summary: "Robotic hand integrated onto a sapling planting machine for the Tifan competition to improve handling and planting workflow.",
      highlights: [
        "Designed and integrated a robotic hand onto a sapling planting machine.",
        "Focused on gripping, transfer alignment, release timing, and machine reset flow.",
        "Built as a hardware competition project with system-level thinking across mechanism and control.",
      ],
      interaction: {
        type: "tifan-machine",
        title: "Sapling Planting Cycle",
        subtitle: "Interactive machine view of the robotic hand and planting workflow.",
        steps: [
          {
            key: "overview",
            label: "Overview",
            stage: "System Layout",
            text: "The robotic hand is mounted on the planting machine to pick, guide, and release saplings at the right point in the cycle.",
            parts: ["Robotic Hand", "Sapling Feed", "Planting Chute", "Control Unit"],
          },
          {
            key: "grip",
            label: "Grip",
            stage: "Sapling Capture",
            text: "The gripper closes around the sapling with controlled force so the plant stays secure without damage during transfer.",
            parts: ["Gripper", "Actuator", "Force Path"],
          },
          {
            key: "plant",
            label: "Plant Cycle",
            stage: "Transfer And Release",
            text: "The hand aligns with the planting path, moves the sapling into position, releases it, and synchronizes with the machine cycle.",
            parts: ["Transfer Arm", "Release Point", "Planting Path"],
          },
          {
            key: "reset",
            label: "Reset",
            stage: "Next Cycle Ready",
            text: "After release, the mechanism returns to its starting position so the next sapling can be picked without slowing the machine.",
            parts: ["Return Motion", "Cycle Timing", "Ready State"],
          },
        ],
        metrics: [
          ["Role", "Robotic hand integration"],
          ["Use Case", "Sapling handling on planting machine"],
          ["Main Challenge", "Reliable grip and timed release"],
        ],
        media: {
          images: [
            {
              src: "assets/tifan/tifan-photo-1.jpeg",
              alt: "Tifan robotic hand on sapling planting machine",
            },
            {
              src: "assets/tifan/tifan-photo-2.jpeg",
              alt: "Tifan machine integration close view",
            },
          ],
          videos: [
            {
              src: "assets/tifan/demo_video.mp4",
              type: "video",
              label: "Sapling Planting Demo",
            },
          ],
        },
      },
    },
    "CTAE-MAP": {
      domain: "Web App",
      stack: ["HTML", "CSS", "Mapping"],
      summary: "Campus map interface for exploring CTAE spaces, departments, and landmarks visually.",
      highlights: [
        "Built as a visual campus exploration interface rather than a plain information page.",
        "Organizes buildings, departments, and key spaces into an easier browsing experience.",
        "Uses image-backed navigation to make the map feel more discoverable and practical.",
      ],
      interaction: {
        type: "browser-preview",
        title: "Campus Map Preview",
        subtitle: "Explore the CTAE map through landmark-driven preview screens.",
        metrics: [
          ["Format", "Campus interface"],
          ["Focus", "Navigation and landmarks"],
          ["Audience", "Students and visitors"],
        ],
        screens: [
          {
            key: "main",
            label: "Main",
            title: "Main Building View",
            text: "The map starts with a broad campus anchor so users can orient themselves before jumping into specific departments or spaces.",
            image: "assets/ctae-map/main-building.png",
          },
          {
            key: "admin",
            label: "Admin",
            title: "Administrative Zone",
            text: "Administrative points are separated clearly so the experience remains useful for first-time visitors trying to navigate campus services.",
            image: "assets/ctae-map/admin.png",
          },
          {
            key: "spots",
            label: "Spots",
            title: "Campus Spots",
            text: "Important places like canteen and shared campus areas add practical value beyond department-only navigation.",
            image: "assets/ctae-map/canteen.jpeg",
          },
        ],
      },
    },
    "Type-Master": {
      domain: "Python Tools",
      stack: ["Python", "Typing", "Desktop App"],
      summary: "Typing-focused Python project built as a practical utility.",
      highlights: [
        "Desktop typing tool designed for practice, rhythm, and accuracy improvement.",
        "Uses keyboard-centered interaction instead of a static screen flow.",
        "Built as a practical training app rather than just a UI exercise.",
      ],
      interaction: {
        type: "browser-preview",
        title: "Typing Trainer Preview",
        subtitle: "Preview the training flow, control keys, and typing feedback screens.",
        metrics: [
          ["Format", "Desktop typing app"],
          ["Input", "Keyboard focused"],
          ["Goal", "Typing speed and accuracy"],
        ],
        screens: [
          {
            key: "screen",
            label: "Screen",
            title: "Main Practice View",
            text: "The app centers the user around a focused typing practice area so every keypress feels like part of a training loop instead of generic input.",
            image: "assets/type-master/screen.png",
          },
          {
            key: "demo",
            label: "Demo",
            title: "Typing Demo",
            text: "The demo preview shows how the typing session behaves visually while the learner works through the prompt.",
            image: "assets/type-master/demo.gif",
          },
          {
            key: "controls",
            label: "Controls",
            title: "Control Keys",
            text: "Small control assets like play and reset make the app feel intentional as an interactive learning tool.",
            image: "assets/type-master/play_key.png",
          },
        ],
      },
    },
    "Text-to-Morse-converter-": {
      domain: "Python Tools",
      stack: ["Python", "Tkinter", "Encoding"],
      summary: "Tkinter-based text-to-Morse converter with a simple desktop conversion workflow.",
      highlights: [
        "Desktop converter built around quick text transformation into Morse code.",
        "Focuses on simple input, instant conversion, and clear output.",
        "Represents a compact Python GUI utility project with a specific purpose.",
      ],
      interaction: {
        type: "browser-preview",
        title: "Converter Preview",
        subtitle: "Preview the input-to-output flow of the Morse converter app.",
        metrics: [
          ["Format", "Desktop converter"],
          ["Framework", "Tkinter"],
          ["Goal", "Quick text encoding"],
        ],
        screens: [
          {
            key: "screen",
            label: "Screen",
            title: "Converter Interface",
            text: "The main screen keeps the experience simple: give text, trigger conversion, and read the Morse output without unnecessary friction.",
            image: "assets/text-to-morse/screen.png",
          },
          {
            key: "demo",
            label: "Demo",
            title: "Conversion Demo",
            text: "The demo loop shows the app behaving like a practical utility with visible conversion steps.",
            image: "assets/text-to-morse/demo.gif",
          },
        ],
      },
    },
    Watermark: {
      domain: "Python Tools",
      stack: ["Python", "Tkinter", "Images"],
      summary: "Watermarking utility built in Python for overlaying custom text onto images.",
      highlights: [
        "Image utility focused on uploading, editing, and watermarking in a simple flow.",
        "Built as a practical desktop tool rather than a one-off visual experiment.",
        "Combines file handling with image modification in a direct interface.",
      ],
      interaction: {
        type: "browser-preview",
        title: "Watermark App Preview",
        subtitle: "Step through the upload, edit, and watermark stages of the image tool.",
        metrics: [
          ["Format", "Desktop image tool"],
          ["Framework", "Tkinter"],
          ["Goal", "Add custom watermarks"],
        ],
        screens: [
          {
            key: "upload",
            label: "Upload",
            title: "Image Upload Stage",
            text: "The app begins with a simple upload-first flow so the watermark process starts from the user's chosen image.",
            image: "assets/watermark/upload.png",
          },
          {
            key: "mark",
            label: "Watermark",
            title: "Watermark Layer",
            text: "The watermark step focuses on placing a visible mark while keeping the tool straightforward for repeated use.",
            image: "assets/watermark/water-mark.png",
          },
          {
            key: "demo",
            label: "Demo",
            title: "Workflow Demo",
            text: "The demo preview captures the overall flow of using the watermark tool from action to result.",
            image: "assets/watermark/demo.gif",
          },
        ],
      },
    },
    Portfolio: {
      domain: "Web App",
      stack: ["HTML", "CSS"],
    },
    "CODTECH-Task2": {
      domain: "Digital Design",
      stack: ["Verilog", "Digital Logic"],
      summary: "Digital design task implemented in Verilog with logic-focused problem solving.",
      interaction: {
        type: "logic-sim",
        title: "Logic Simulator",
        subtitle: "Switch through input states and inspect output behavior like a mini digital lab.",
        metrics: [
          ["Language", "Verilog"],
          ["Category", "Digital Design"],
          ["Mode", "Combinational logic"],
        ],
        states: [
          { key: "00", label: "A0 B0", output: "Y = 0", note: "Base state with both inputs low." },
          { key: "01", label: "A0 B1", output: "Y = 1", note: "Single high input propagates through the logic path." },
          { key: "10", label: "A1 B0", output: "Y = 1", note: "Mirrored alternate case for the second input path." },
          { key: "11", label: "A1 B1", output: "Y = 0", note: "Final state verifies both-input interaction and output rule." },
        ],
      },
    },
    "CODTECH-Task1": {
      domain: "Digital Design",
      stack: ["Verilog", "Digital Logic"],
      summary: "Verilog task exploring digital logic behavior through hardware-description implementation.",
      interaction: {
        type: "logic-sim",
        title: "Logic Explorer",
        subtitle: "Cycle through a few test states to preview how the design responds.",
        metrics: [
          ["Language", "Verilog"],
          ["Category", "Digital Design"],
          ["Mode", "State testing"],
        ],
        states: [
          { key: "idle", label: "Idle", output: "OUT = 0", note: "Initial state before the active input condition is asserted." },
          { key: "test-a", label: "Test A", output: "OUT = 1", note: "Primary test condition activates the expected output path." },
          { key: "test-b", label: "Test B", output: "OUT = 1", note: "Second test path verifies alternate activation logic." },
          { key: "reset", label: "Reset", output: "OUT = 0", note: "Reset-like state confirms return to stable baseline behavior." },
        ],
      },
    },
    "Dicee-roll": {
      domain: "Python Games",
      stack: ["HTML", "CSS", "Game UI"],
    },
    "80s-hit-game-Breakout": {
      domain: "Python Games",
      stack: ["Python", "Turtle", "Game Dev"],
    },
    "Tic-Tac-Toe-command-line": {
      domain: "Python Games",
      stack: ["Python", "CLI", "Game Logic"],
    },
  };

  function inferDomain(repo) {
    if (customMeta[repo.name]?.domain) return customMeta[repo.name].domain;
    const lang = (repo.language || "").toLowerCase();
    if (["c", "c++", "cmake"].includes(lang)) return "Embedded & Hardware";
    if (lang === "python") return "Python Tools";
    if (lang === "verilog") return "Digital Design";
    return "Web App";
  }

  function inferStack(repo) {
    const preset = customMeta[repo.name]?.stack;
    if (preset) return preset;
    return [repo.language || "Code"].filter(Boolean);
  }

  function inferSummary(repo) {
    if (customMeta[repo.name]?.summary) return customMeta[repo.name].summary;
    if (repo.description) return repo.description;
    return `Project repository for ${repo.name}.`;
  }

  function buildHighlights(repo, domain, updatedDate) {
    if (customMeta[repo.name]?.highlights) return customMeta[repo.name].highlights;
    return [
      `Built and maintained in the ${domain} track.`,
      `Latest update: ${updatedDate}.`,
      repo.description ? repo.description : "Focused on practical implementation and iteration.",
    ];
  }

  window.PROJECTS = window.GITHUB_REPOS.map((repo) => {
    const updatedDate = new Date(repo.updated_at);
    const year = String(updatedDate.getUTCFullYear());
    const dateLabel = updatedDate.toISOString().slice(0, 10);
    const domain = inferDomain(repo);

    return {
      name: repo.name,
      domain,
      year,
      summary: inferSummary(repo),
      stack: inferStack(repo),
      highlights: buildHighlights(repo, domain, dateLabel),
      github: repo.html_url,
      demo: "",
      updatedAt: repo.updated_at,
      complexity: complexityRank[repo.name] || 0,
      interaction: customMeta[repo.name]?.interaction || null,
    };
  }).sort((a, b) => {
    if (b.complexity !== a.complexity) return b.complexity - a.complexity;
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
})();
