// src/services/nexusPagesService.js
// NEXUS Pages — Zero-Cost Cloud Deployment Gateway & Custom Subdomain Manager

const NEXUS_PAGES_STORAGE_KEY = 'nexus_pages_deployments_v1';

const DEFAULT_DEPLOYMENTS = [
  {
    id: 'dep-101',
    repoId: 'repo-nexus-core',
    repoName: 'nexus-super-app',
    subdomain: 'nexus-super-app.nexuspages.app',
    status: 'Active', // 'Active' | 'Building' | 'Failed' | 'RolledBack'
    targetBranch: 'main',
    commitHash: 'e5f6g7h',
    commitMessage: 'Add BYOK AI Studio Poly-Engine & Decoy Panic Vault',
    deployedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    logs: [
      '[00:00.01] 🚀 Initializing NEXUS Pages Client-Side Gateway...',
      '[00:00.12] 📦 Fetching repository payload "nexus-super-app"...',
      '[00:00.45] ⚙️ Compiling HTML/CSS/JS bundles & assets...',
      '[00:00.89] 🔒 Generating SSL Certificate for "nexus-super-app.nexuspages.app"...',
      '[00:01.20] ✅ Deployment Live: https://nexus-super-app.nexuspages.app',
    ],
    htmlBundle: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>NEXUS Super App Live</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-white flex items-center justify-center min-h-screen">
  <div class="text-center p-8 rounded-3xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-4">
    <div class="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xl font-bold">🚀</div>
    <h1 class="text-3xl font-extrabold text-emerald-400">NEXUS Cloud Pages Live Deployment</h1>
    <p class="text-xs text-slate-400">Deployed via Zero-Cost Client Gateway</p>
    <a href="#" onclick="alert('NEXUS Subdomain Routing Active!')" class="inline-block px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs">Explore Active App</a>
  </div>
</body>
</html>`,
  },
  {
    id: 'dep-102',
    repoId: 'repo-cyber-ui',
    repoName: 'cyber-glass-theme-kit',
    subdomain: 'cyber-glass.nexuspages.app',
    status: 'Active',
    targetBranch: 'main',
    commitHash: '9x8y7z',
    commitMessage: 'Add Neon Green Singularity CSS variables',
    deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    logs: [
      '[00:00.01] 🚀 Initializing NEXUS Pages Client-Side Gateway...',
      '[00:00.22] ⚙️ Building CSS modules...',
      '[00:00.95] ✅ Deployment Live: https://cyber-glass.nexuspages.app',
    ],
    htmlBundle: `<!DOCTYPE html>
<html>
<head><title>Cyber Glass Theme Kit</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-slate-900 text-white p-8">
  <h1 class="text-xl font-bold text-cyan-400">Cyber Glass Theme Kit Active</h1>
</body>
</html>`,
  },
];

class NexusPagesService {
  constructor() {
    this.deployments = this.loadDeployments();
  }

  loadDeployments() {
    try {
      const saved = localStorage.getItem(NEXUS_PAGES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error loading deployments:', e);
    }
    this.saveDeployments(DEFAULT_DEPLOYMENTS);
    return DEFAULT_DEPLOYMENTS;
  }

  saveDeployments(deployments) {
    this.deployments = deployments;
    try {
      localStorage.setItem(NEXUS_PAGES_STORAGE_KEY, JSON.stringify(deployments));
    } catch (e) {
      console.error('Failed to save deployments:', e);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('nexus_pages_updated', { detail: deployments }));
    }
  }

  getDeployments() {
    return this.deployments;
  }

  getDeploymentById(id) {
    return this.deployments.find((d) => d.id === id);
  }

  /**
   * Deploy a repository payload to NEXUS Pages
   */
  deployRepository(repo) {
    const subdomain = `${repo.name.toLowerCase()}.nexuspages.app`;
    const lastCommit = repo.commits[0] || { hash: 'head', message: 'Manual trigger deployment' };
    const htmlFile = repo.files.find((f) => f.path === 'index.html') || repo.files[0];

    const newDep = {
      id: `dep-${Date.now()}`,
      repoId: repo.id,
      repoName: repo.name,
      subdomain,
      status: 'Building',
      targetBranch: repo.activeBranch || 'main',
      commitHash: lastCommit.hash,
      commitMessage: lastCommit.message,
      deployedAt: new Date().toISOString(),
      logs: [
        '[00:00.01] 🚀 Initializing NEXUS Pages Client-Side Gateway...',
        `[00:00.15] 📦 Fetching repo payload "${repo.name}" on branch "${repo.activeBranch || 'main'}"...`,
        '[00:00.40] ⚙️ Compiling HTML/CSS/JS client bundle...',
        '[00:00.75] 🔒 Assigning SSL & DNS routing to "' + subdomain + '"...',
      ],
      htmlBundle: htmlFile ? htmlFile.content : '<h1>NEXUS Pages App</h1>',
    };

    const updated = [newDep, ...this.deployments];
    this.saveDeployments(updated);

    // Simulate real-time build completion after 1.5 seconds
    setTimeout(() => {
      const finishedList = this.deployments.map((d) => {
        if (d.id === newDep.id) {
          return {
            ...d,
            status: 'Active',
            logs: [
              ...d.logs,
              `[00:01.40] ✅ Build Succeeded! Live at https://${subdomain}`,
            ],
          };
        }
        return d;
      });
      this.saveRepositories(finishedList);
    }, 1500);

    return newDep;
  }

  saveRepositories(deployments) {
    this.saveDeployments(deployments);
  }

  rollbackDeployment(depId) {
    const deps = this.deployments.map((d) => {
      if (d.id === depId) {
        return {
          ...d,
          status: 'Active',
          logs: [
            ...d.logs,
            `[${new Date().toLocaleTimeString()}] ↺ Instant Rollback Executed to commit ${d.commitHash}`,
          ],
        };
      }
      return d;
    });
    this.saveDeployments(deps);
    return this.getDeploymentById(depId);
  }
}

const nexusPagesService = new NexusPagesService();
export default nexusPagesService;
