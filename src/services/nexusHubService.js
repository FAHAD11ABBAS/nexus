// src/services/nexusHubService.js
// NEXUS Hub — Decentralized Code Storage & Version Control Repository Manager (zero-cost client-side)

const NEXUS_HUB_STORAGE_KEY = 'nexus_hub_repositories_v1';

const DEFAULT_REPOSITORIES = [
  {
    id: 'repo-nexus-core',
    name: 'nexus-super-app',
    description: 'Autonomous client-side digital universe & Open-Core plugin architecture.',
    visibility: 'public', // 'public' | 'private'
    defaultBranch: 'main',
    branches: ['main', 'dev', 'feature/quantum-ai'],
    activeBranch: 'main',
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    starsCount: 1240,
    forksCount: 310,
    files: [
      {
        path: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>NEXUS Super App Landing</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-white flex items-center justify-center min-h-screen">
  <div class="text-center p-8 rounded-3xl bg-slate-900 border border-emerald-500/40 shadow-2xl">
    <h1 class="text-3xl font-extrabold text-emerald-400">NEXUS Cloud Pages</h1>
    <p class="text-xs text-slate-400 mt-2">Deployed autonomously via client-side gateway</p>
  </div>
</body>
</html>`,
      },
      {
        path: 'src/App.jsx',
        language: 'javascript',
        content: `import React from 'react';

export default function App() {
  return (
    <div className="p-6 bg-slate-900 text-white rounded-2xl">
      <h1 className="text-xl font-bold">Hello from NEXUS Super App</h1>
    </div>
  );
}`,
      },
      {
        path: 'README.md',
        language: 'markdown',
        content: `# NEXUS Super App Architecture
An autonomous, self-sustaining, modular, zero-cost client-side digital universe.`,
      },
    ],
    commits: [
      {
        id: 'c-101',
        message: 'Initial singularity commit & open-core setup',
        author: 'NEXUS Architect',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        hash: 'a1b2c3d',
      },
      {
        id: 'c-102',
        message: 'Add BYOK AI Studio Poly-Engine & Decoy Panic Vault',
        author: 'NEXUS Architect',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        hash: 'e5f6g7h',
      },
    ],
  },
  {
    id: 'repo-cyber-ui',
    name: 'cyber-glass-theme-kit',
    description: 'Neon glowing checkmarks, glassmorphism card layouts, and CSS variable themes.',
    visibility: 'public',
    defaultBranch: 'main',
    branches: ['main'],
    activeBranch: 'main',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    starsCount: 840,
    forksCount: 142,
    files: [
      {
        path: 'theme.css',
        language: 'css',
        content: `:root {
  --nexus-primary: #10b981;
  --nexus-glow: 0 0 20px rgba(16, 185, 129, 0.4);
}`,
      },
      {
        path: 'README.md',
        language: 'markdown',
        content: `# Cyber Glass Theme Kit
Persistent themes saved via localStorage.`,
      },
    ],
    commits: [
      {
        id: 'c-201',
        message: 'Add Neon Green Singularity CSS variables',
        author: 'Theme Team',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        hash: '9x8y7z',
      },
    ],
  },
];

class NexusHubService {
  constructor() {
    this.repositories = this.loadRepositories();
  }

  loadRepositories() {
    try {
      const saved = localStorage.getItem(NEXUS_HUB_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error loading repositories:', e);
    }
    this.saveRepositories(DEFAULT_REPOSITORIES);
    return DEFAULT_REPOSITORIES;
  }

  saveRepositories(repos) {
    this.repositories = repos;
    try {
      localStorage.setItem(NEXUS_HUB_STORAGE_KEY, JSON.stringify(repos));
    } catch (e) {
      console.error('Failed to save repositories:', e);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('nexus_hub_updated', { detail: repos }));
    }
  }

  getRepositories() {
    return this.repositories;
  }

  getRepositoryById(id) {
    return this.repositories.find((r) => r.id === id) || this.repositories[0];
  }

  createRepository({ name, description, visibility = 'public' }) {
    const id = `repo-${Date.now()}`;
    const newRepo = {
      id,
      name: name.toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
      description: description || 'NEXUS client-side repository',
      visibility,
      defaultBranch: 'main',
      branches: ['main'],
      activeBranch: 'main',
      updatedAt: new Date().toISOString(),
      starsCount: 1,
      forksCount: 0,
      files: [
        {
          path: 'index.html',
          language: 'html',
          content: `<!DOCTYPE html>
<html>
<head>
  <title>${name}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-white p-8">
  <h1 class="text-2xl font-bold text-emerald-400">Welcome to ${name}</h1>
</body>
</html>`,
        },
        {
          path: 'README.md',
          language: 'markdown',
          content: `# ${name}\n${description || 'Created in NEXUS Hub.'}`,
        },
      ],
      commits: [
        {
          id: `c-${Date.now()}`,
          message: 'Initial commit',
          author: 'Current Developer',
          timestamp: new Date().toISOString(),
          hash: Math.random().toString(16).substring(2, 9),
        },
      ],
    };

    const updated = [newRepo, ...this.repositories];
    this.saveRepositories(updated);
    return newRepo;
  }

  commitFileChanges(repoId, filePath, newContent, commitMessage = 'Update file content') {
    const repos = this.repositories.map((repo) => {
      if (repo.id === repoId) {
        const fileIdx = repo.files.findIndex((f) => f.path === filePath);
        let updatedFiles = [...repo.files];

        if (fileIdx !== -1) {
          updatedFiles[fileIdx] = { ...updatedFiles[fileIdx], content: newContent };
        } else {
          const ext = filePath.split('.').pop();
          updatedFiles.push({ path: filePath, language: ext, content: newContent });
        }

        const newCommit = {
          id: `c-${Date.now()}`,
          message: commitMessage,
          author: 'Current Developer',
          timestamp: new Date().toISOString(),
          hash: Math.random().toString(16).substring(2, 9),
        };

        return {
          ...repo,
          files: updatedFiles,
          commits: [newCommit, ...repo.commits],
          updatedAt: new Date().toISOString(),
        };
      }
      return repo;
    });

    this.saveRepositories(repos);
    return this.getRepositoryById(repoId);
  }

  createBranch(repoId, branchName) {
    const repos = this.repositories.map((repo) => {
      if (repo.id === repoId) {
        if (!repo.branches.includes(branchName)) {
          return {
            ...repo,
            branches: [...repo.branches, branchName],
            activeBranch: branchName,
          };
        }
      }
      return repo;
    });
    this.saveRepositories(repos);
    return this.getRepositoryById(repoId);
  }

  switchBranch(repoId, branchName) {
    const repos = this.repositories.map((repo) => {
      if (repo.id === repoId) {
        return { ...repo, activeBranch: branchName };
      }
      return repo;
    });
    this.saveRepositories(repos);
    return this.getRepositoryById(repoId);
  }

  deleteRepository(repoId) {
    const repos = this.repositories.filter((r) => r.id !== repoId);
    this.saveRepositories(repos);
    return repos;
  }
}

const nexusHubService = new NexusHubService();
export default nexusHubService;
