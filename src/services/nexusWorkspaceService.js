// src/services/nexusWorkspaceService.js
// NEXUS Communication & Workspace Suite — NEXOS Mail, NEXOS Meet, NEXOS Cloud Drive (zero-cost client-side)

const MAIL_STORAGE_KEY = 'nexus_workspace_mail_v1';
const DRIVE_STORAGE_KEY = 'nexus_workspace_drive_v1';

export const DEFAULT_MAILS = [
  {
    id: 'mail-101',
    sender: 'security@nexus.org',
    senderName: 'NEXUS Security Sentinel',
    recipient: 'user@nexusmail.com',
    subject: '🔒 Sovereign Key Pair Initialized Successfully',
    preview: 'Your client-side cryptographic BYOK vault and local inbox are now active...',
    body: `Salam & Welcome to NEXOS Mail!

Your sovereign client-side address: user@nexusmail.com
Security Status: Encrypted Zero-Trace Handshake Active.

All message payloads are stored strictly inside your browser storage (IndexedDB/localStorage) with zero server routing.

Verification Code for Web Sign-Ups: [ 789-421 ]

Best regards,
NEXUS Security Team`,
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    isRead: false,
    verificationCode: '789-421',
  },
  {
    id: 'mail-102',
    sender: 'academy@nexus.org',
    senderName: 'NEXUS Open University',
    recipient: 'user@nexusmail.com',
    subject: '📜 Graduation Certificate Awarded',
    preview: 'Congratulations on completing Autonomous AI Engineering...',
    body: `Congratulations Scholar!

You have completed the requirements for "Autonomous AI Engineering & Poly-Engine Design".
Certificate Hash: 0x9948271a

Keep building the decentralized digital universe!`,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    isRead: true,
  },
];

export const DEFAULT_FILES = [
  {
    id: 'file-1',
    name: 'nexus-master-blueprint.json',
    size: '14.2 KB',
    type: 'json',
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    content: '{"architecture": "NEXUS Singularity v7.0", "zeroCost": true}',
  },
  {
    id: 'file-2',
    name: 'hadal-abyss-sensor-data.csv',
    size: '128.5 KB',
    type: 'csv',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    content: 'depth_m,temp_c,extremophile_species_count\n11034,2.1,412',
  },
];

class NexusWorkspaceService {
  constructor() {
    this.mails = this.loadMails();
    this.files = this.loadDriveFiles();
  }

  // NEXOS Mail
  loadMails() {
    try {
      const saved = localStorage.getItem(MAIL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error loading mails:', e);
    }
    this.saveMails(DEFAULT_MAILS);
    return DEFAULT_MAILS;
  }

  saveMails(mails) {
    this.mails = mails;
    try {
      localStorage.setItem(MAIL_STORAGE_KEY, JSON.stringify(mails));
    } catch (e) {
      console.error('Failed to save mails:', e);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('nexus_mail_updated', { detail: mails }));
    }
  }

  getMails() {
    return this.mails;
  }

  markAsRead(id) {
    const updated = this.mails.map((m) => (m.id === id ? { ...m, isRead: true } : m));
    this.saveMails(updated);
  }

  sendMail({ recipient, subject, body }) {
    const newMail = {
      id: `mail-${Date.now()}`,
      sender: 'user@nexusmail.com',
      senderName: 'You (NEXOS Mail)',
      recipient,
      subject,
      preview: body.substring(0, 50) + '...',
      body,
      timestamp: new Date().toISOString(),
      isRead: true,
    };
    const updated = [newMail, ...this.mails];
    this.saveMails(updated);
    return newMail;
  }

  // NEXOS Cloud Drive
  loadDriveFiles() {
    try {
      const saved = localStorage.getItem(DRIVE_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error loading drive files:', e);
    }
    this.saveDriveFiles(DEFAULT_FILES);
    return DEFAULT_FILES;
  }

  saveDriveFiles(files) {
    this.files = files;
    try {
      localStorage.setItem(DRIVE_STORAGE_KEY, JSON.stringify(files));
    } catch (e) {
      console.error('Failed to save drive files:', e);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('nexus_drive_updated', { detail: files }));
    }
  }

  getDriveFiles() {
    return this.files;
  }

  uploadDriveFile(name, content, type = 'txt') {
    const newFile = {
      id: `file-${Date.now()}`,
      name,
      size: `${(content.length / 1024).toFixed(1)} KB`,
      type,
      updatedAt: new Date().toISOString(),
      content,
    };
    const updated = [newFile, ...this.files];
    this.saveDriveFiles(updated);
    return newFile;
  }
}

const nexusWorkspaceService = new NexusWorkspaceService();
export default nexusWorkspaceService;
