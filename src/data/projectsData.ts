export interface ProjectItem {
  id: string;
  title: string;
  category: 'AI & ML' | '3D Web & WebGL' | 'DevTools' | 'Cloud & Distributed';
  tagline: string;
  description: string;
  fullOverview: string;
  architecture: string[];
  techStack: string[];
  badge: 'Production' | 'Live Beta' | 'Featured' | 'Experiment';
  stars: number;
  views: string;
  engineSpecs: {
    polygons: string;
    drawCalls: string;
    fpsTarget: string;
    shaderPasses: string;
  };
  dataCollectedNotice: string;
  githubUrl: string;
  demoUrl: string;
  themeColor: string;
}

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: 'neural-mesh-3d',
    title: 'NeuralMesh 3D',
    category: '3D Web & WebGL',
    tagline: 'Procedural 3D Neural Network Visualizer with WebGPU',
    description: 'Real-time WebGL/WebGPU visualizer displaying weight tensors and activation maps in an interactive 3D cluster with particle flow physics.',
    fullOverview: 'NeuralMesh is built for deep learning engineers to inspect multi-layer perceptron and transformer attention activations in full 3D space. It renders 250,000 synaptic nodes in real-time with compute shaders.',
    architecture: [
      'WebGPU compute pipeline for 250k particle simulations',
      'Three.js custom GLSL shader material with bloom post-processing',
      'Web Worker thread for asynchronous tensor matrix ingestion',
      'Zero external telemetry without explicit user opt-in'
    ],
    techStack: ['Three.js', 'WebGPU', 'GLSL', 'TypeScript', 'WebAudio API'],
    badge: 'Featured',
    stars: 1420,
    views: '38.4k',
    engineSpecs: {
      polygons: '185,000',
      drawCalls: '14 / frame',
      fpsTarget: '60 FPS (Ultra)',
      shaderPasses: 'Bloom + Chromatic Aberration'
    },
    dataCollectedNotice: 'Captures anonymous FPS telemetry & WebGL device capabilities solely to tune shader resolution. No PII is collected.',
    githubUrl: 'https://github.com/example/neural-mesh-3d',
    demoUrl: '#demo',
    themeColor: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'cyber-vault-p2p',
    title: 'Aegis Zero Data Vault',
    category: 'Cloud & Distributed',
    tagline: 'End-to-End Encrypted Decentralized Data Storage',
    description: 'Client-side encrypted vault utilizing AES-GCM-256 and WebCrypto API. Integrates automated GDPR Art. 17 cryptographic shredding.',
    fullOverview: 'Aegis guarantees complete user sovereignty over personal telemetry and cloud assets. All decryption keys stay inside user hardware enclave, enabling mathematically provable user data deletion upon request.',
    architecture: [
      'PBKDF2 key derivation with 600,000 SHA-256 iterations',
      'WebCrypto API hardware-accelerated encryption',
      'Decentralized storage sharding across IPFS pinning nodes',
      'Instant cryptographic self-destruct mechanism'
    ],
    techStack: ['WebCrypto', 'Rust / Wasm', 'Next.js', 'Tailwind', 'IPFS'],
    badge: 'Production',
    stars: 2890,
    views: '84.1k',
    engineSpecs: {
      polygons: '42,000',
      drawCalls: '6 / frame',
      fpsTarget: '120 FPS',
      shaderPasses: 'Glass Refraction Pass'
    },
    dataCollectedNotice: 'Strict zero-knowledge policy. Server stores zero telemetry, cookies, or user identifiers.',
    githubUrl: 'https://github.com/example/aegis-data-vault',
    demoUrl: '#demo',
    themeColor: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'nexus-flow-ai',
    title: 'NexusFlow Generative Engine',
    category: 'AI & ML',
    tagline: 'Edge LLM Orchestration with Dynamic 3D Agent Graphs',
    description: 'Autonomous multi-agent runtime visualizing execution topologies as self-organizing 3D force-directed node graphs in the browser.',
    fullOverview: 'NexusFlow orchestrates subagent workflows, streaming token responses directly into interactive 3D spatial nodes. Users can drag nodes, inspect latency waterfalls, and hot-swap prompt embeddings.',
    architecture: [
      'Force-directed 3D physics solver running in WebAssembly',
      'Server-Sent Events (SSE) token streaming pipeline',
      'Three.js InstancedMesh optimization for high-density node trees',
      'Local model fallback using WebLLM in browser'
    ],
    techStack: ['Python', 'WebAssembly', 'Three.js', 'React', 'FastAPI'],
    badge: 'Live Beta',
    stars: 3510,
    views: '112.5k',
    engineSpecs: {
      polygons: '96,000',
      drawCalls: '22 / frame',
      fpsTarget: '60 FPS',
      shaderPasses: 'Depth-of-Field Blur'
    },
    dataCollectedNotice: 'Prompts and model outputs are processed in-memory. Opt-in session telemetry tracks agent completion latency.',
    githubUrl: 'https://github.com/example/nexus-flow-ai',
    demoUrl: '#demo',
    themeColor: 'from-violet-500 to-purple-600',
  },
  {
    id: 'hyper-terminal-cli',
    title: 'HyperTerminal 3D CLI',
    category: 'DevTools',
    tagline: 'Spatial Command Center for Cloud & Docker Infrastructure',
    description: 'Re-imagining the terminal emulator as an interactive 3D workstation with real-time Kubernetes pod clusters, network topologies, and log streams.',
    fullOverview: 'HyperTerminal transforms text terminal sessions into a spatial 3D control deck. Monitor CPU throttling, container memory leaks, and deploy microservices with gesture-like camera controls.',
    architecture: [
      'Xterm.js WebGL addon integrated into Three.js 3D plane textures',
      'WebSocket bi-directional cluster heartbeat streamer',
      'Rust-based micro-daemon for local Docker daemon inspection',
      'Custom CRT scanline & retro phosphor post-processing shader'
    ],
    techStack: ['Rust', 'Three.js', 'WebGL', 'Docker API', 'TypeScript'],
    badge: 'Featured',
    stars: 1940,
    views: '45.8k',
    engineSpecs: {
      polygons: '64,000',
      drawCalls: '18 / frame',
      fpsTarget: '60 FPS',
      shaderPasses: 'CRT Phosphor & Scanlines'
    },
    dataCollectedNotice: 'Local CLI mode never transmits terminal keystrokes. Aggregated crash reports only sent if telemetry consent flag is set.',
    githubUrl: 'https://github.com/example/hyper-terminal-3d',
    demoUrl: '#demo',
    themeColor: 'from-cyan-400 to-emerald-500',
  },
  {
    id: 'holo-synth-audio',
    title: 'HoloSynth 3D Audio Lab',
    category: '3D Web & WebGL',
    tagline: 'Spatial Audio Synthesizer with 3D Waveform Geometry',
    description: 'Synthesizer workstation mapping polyphonic oscillators into dynamic 3D undulating terrain meshes driven by WebAudio Fourier transforms.',
    fullOverview: 'Create rich spatial audio soundscapes in your browser. HoloSynth uses fast Fourier transform (FFT) analysis to generate real-time vertex displacement on 3D terrain meshes.',
    architecture: [
      'WebAudio AnalyserNode supplying 1024-band frequency vectors',
      'Dynamic vertex displacement in vertex shader',
      'Binaural 3D panner nodes based on virtual listener camera position',
      'MIDI controller WebUSB interface'
    ],
    techStack: ['WebAudio API', 'Three.js', 'GLSL', 'WebMIDI', 'Tailwind'],
    badge: 'Experiment',
    stars: 870,
    views: '22.3k',
    engineSpecs: {
      polygons: '120,000',
      drawCalls: '8 / frame',
      fpsTarget: '60 FPS',
      shaderPasses: 'Dynamic Vertex Wave Deformation'
    },
    dataCollectedNotice: 'Audio processing is 100% client-side. No microphone input or audio buffers leave your local machine.',
    githubUrl: 'https://github.com/example/holo-synth-audio',
    demoUrl: '#demo',
    themeColor: 'from-pink-500 to-rose-600',
  },
  {
    id: 'spectre-quantum-sim',
    title: 'Spectre Quantum Simulator',
    category: 'AI & ML',
    tagline: 'Bloch Sphere 3D State Visualizer & Qubit Circuit Builder',
    description: 'Interactive quantum state representation on interactive 3D Bloch spheres. Drag quantum gates, simulate superposition, and view entanglements.',
    fullOverview: 'Spectre makes quantum computing accessible with visual state vectors. Build 8-qubit quantum circuits, apply Hadamard and Pauli-X gates, and watch quantum state vectors collapse in 3D.',
    architecture: [
      'Complex linear algebra engine written in pure TypeScript',
      'Interactive 3D Bloch sphere rendered with Three.js Spherical Coordinates',
      'Quantum entanglement state graph visualizer',
      'Export circuits to Qiskit / OpenQASM format'
    ],
    techStack: ['TypeScript', 'Three.js', 'Linear Algebra', 'KaTeX', 'React'],
    badge: 'Production',
    stars: 2130,
    views: '61.7k',
    engineSpecs: {
      polygons: '78,000',
      drawCalls: '12 / frame',
      fpsTarget: '60 FPS',
      shaderPasses: 'Fresnel Glow Shader'
    },
    dataCollectedNotice: 'Circuit state is saved in local browser storage. No user accounts or personal metadata required.',
    githubUrl: 'https://github.com/example/spectre-quantum',
    demoUrl: '#demo',
    themeColor: 'from-amber-500 to-orange-600',
  }
];

