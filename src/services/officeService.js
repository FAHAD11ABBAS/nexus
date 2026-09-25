// src/services/officeService.js
// NEXUS Office Suite — IndexedDB-backed document, spreadsheet & presentation management

const DB_NAME = 'nexus_office_db';
const DB_VERSION = 1;
const STORES = { docs: 'documents', sheets: 'spreadsheets', slides: 'presentations' };

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORES.docs)) db.createObjectStore(STORES.docs, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(STORES.sheets)) db.createObjectStore(STORES.sheets, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(STORES.slides)) db.createObjectStore(STORES.slides, { keyPath: 'id' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function txHelper(storeName, mode = 'readonly') {
  return openDB().then((db) => {
    const tx = db.transaction(storeName, mode);
    return tx.objectStore(storeName);
  });
}

function getAllFromStore(storeName) {
  return new Promise(async (resolve, reject) => {
    const store = await txHelper(storeName);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

function putToStore(storeName, item) {
  return new Promise(async (resolve, reject) => {
    const store = await txHelper(storeName, 'readwrite');
    const req = store.put(item);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function deleteFromStore(storeName, id) {
  return new Promise(async (resolve, reject) => {
    const store = await txHelper(storeName, 'readwrite');
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// ── Documents ──
function createDocument(title = 'Untitled Document') {
  return {
    id: `doc_${Date.now()}`,
    title,
    content: '',
    format: 'richtext',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// ── Spreadsheets ──
function createSpreadsheet(title = 'Untitled Spreadsheet') {
  const cells = {};
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 8; c++) {
      cells[`${r}_${c}`] = '';
    }
  }
  return {
    id: `sheet_${Date.now()}`,
    title,
    cells,
    rows: 10,
    cols: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function evaluateFormula(formula, cells) {
  if (!formula.startsWith('=')) return formula;
  const expr = formula.slice(1).toUpperCase().trim();

  // Parse cell references like A1, B3 etc.
  const colLetterToIndex = (l) => l.charCodeAt(0) - 65;
  const parseCellRef = (ref) => {
    const col = colLetterToIndex(ref[0]);
    const row = parseInt(ref.slice(1), 10) - 1;
    return cells[`${row}_${col}`] || '0';
  };

  // SUM(A1:A5), AVG(A1:A5), COUNT(A1:A5)
  const rangeMatch = expr.match(/^(SUM|AVG|COUNT|MIN|MAX)\(([A-H]\d+):([A-H]\d+)\)$/);
  if (rangeMatch) {
    const [, func, startRef, endRef] = rangeMatch;
    const startCol = colLetterToIndex(startRef[0]);
    const startRow = parseInt(startRef.slice(1), 10) - 1;
    const endCol = colLetterToIndex(endRef[0]);
    const endRow = parseInt(endRef.slice(1), 10) - 1;

    const values = [];
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        const v = parseFloat(cells[`${r}_${c}`]);
        if (!isNaN(v)) values.push(v);
      }
    }

    if (values.length === 0) return '0';
    switch (func) {
      case 'SUM': return values.reduce((a, b) => a + b, 0).toString();
      case 'AVG': return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
      case 'COUNT': return values.length.toString();
      case 'MIN': return Math.min(...values).toString();
      case 'MAX': return Math.max(...values).toString();
      default: return '0';
    }
  }

  // Simple arithmetic with cell references: =A1+B1
  try {
    const evaluated = expr.replace(/[A-H]\d+/g, (match) => {
      const val = parseCellRef(match);
      return isNaN(parseFloat(val)) ? '0' : val;
    });
    // Safe eval for basic math
    const result = Function(`"use strict"; return (${evaluated})`)();
    return isNaN(result) ? '#ERR' : result.toString();
  } catch {
    return '#ERR';
  }
}

// ── Presentations ──
function createPresentation(title = 'Untitled Presentation') {
  return {
    id: `pres_${Date.now()}`,
    title,
    slides: [
      { id: 's1', title: 'Welcome', body: 'Click to edit this slide', bgColor: '#1a1a2e' },
    ],
    currentSlide: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// ── Export Helpers ──
function exportToMarkdown(doc) {
  const text = doc.content.replace(/<[^>]+>/g, '').trim();
  const blob = new Blob([`# ${doc.title}\n\n${text}`], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${doc.title.replace(/\s+/g, '_')}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

function exportToPDF(doc) {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html><head><title>${doc.title}</title>
      <style>body{font-family:Inter,sans-serif;padding:40px;max-width:800px;margin:auto;color:#1a1a2e;}</style>
      </head><body>
      <h1>${doc.title}</h1>
      <div>${doc.content}</div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
}

const officeService = {
  // Documents
  getDocuments: () => getAllFromStore(STORES.docs),
  saveDocument: (doc) => putToStore(STORES.docs, { ...doc, updatedAt: new Date().toISOString() }),
  deleteDocument: (id) => deleteFromStore(STORES.docs, id),
  createDocument,
  exportToMarkdown,
  exportToPDF,

  // Spreadsheets
  getSpreadsheets: () => getAllFromStore(STORES.sheets),
  saveSpreadsheet: (sheet) => putToStore(STORES.sheets, { ...sheet, updatedAt: new Date().toISOString() }),
  deleteSpreadsheet: (id) => deleteFromStore(STORES.sheets, id),
  createSpreadsheet,
  evaluateFormula,

  // Presentations
  getPresentations: () => getAllFromStore(STORES.slides),
  savePresentation: (pres) => putToStore(STORES.slides, { ...pres, updatedAt: new Date().toISOString() }),
  deletePresentation: (id) => deleteFromStore(STORES.slides, id),
  createPresentation,

  // Nuke everything
  clearAll: () => {
    return new Promise(async (resolve) => {
      const db = await openDB();
      for (const store of Object.values(STORES)) {
        const tx = db.transaction(store, 'readwrite');
        tx.objectStore(store).clear();
      }
      resolve();
    });
  },
};

export default officeService;
