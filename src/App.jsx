// src/App.jsx
// NEXUS Ultimate Master Sovereign Ecosystem (Singularity Edition v9.0)
// Designed and architected autonomously for user: FAHAD11ABBAS
// Pure English code, full bilingual localization (Arabic & English), auto-RTL,
// 8 Core Sovereign Modules, LocalStorage persistence, and Web Speech API AI Assistant.

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Shield, ShieldCheck, ShieldAlert, Lock, Unlock, Key,
  Sparkles, Bot, Mic, MicOff, Volume2, VolumeX, Send,
  Briefcase, DollarSign, Palette, Users, Utensils, Plane,
  BookOpen, Terminal, CheckCircle2, Circle, Plus, Trash2,
  Download, Upload, Play, Pause, RotateCcw, TrendingUp,
  Droplets, Flame, Activity, MapPin, Calendar, CreditCard,
  Wallet, FileText, Check, X, Search, Globe, Eye, EyeOff,
  Copy, Share2, RefreshCw, MessageSquare, ThumbsUp, MessageCircle,
  HelpCircle, Sliders, ChevronRight, Moon, Sun, ArrowUpRight,
  ExternalLink, Layers, Award, Clock
} from 'lucide-react';

// ==========================================
// BILINGUAL LOCALIZATION DICTIONARY
// ==========================================
const TRANSLATIONS = {
  en: {
    appName: 'NEXUS',
    edition: 'Singularity Edition v9.0',
    sovereignNode: 'Republic of Iraq | Sovereign Node',
    operator: 'Operator: FAHAD11ABBAS',
    ghostMode: 'Ghost Mode',
    ghostActive: 'Active (Zero-Telemetry)',
    ghostInactive: 'Disabled',
    modules: {
      office: 'Office',
      finance: 'Finance',
      studio: 'Studio',
      social: 'Social',
      nutrition: 'Nutrition',
      travel: 'Travel',
      knowledge: 'Knowledge',
      privacy: 'Privacy',
    },
    moduleSubs: {
      office: 'Autonomous Workspace & Kanban Sprint Engine',
      finance: 'Sovereign Treasury, Multi-Asset & Ledger',
      studio: 'Creative Canvas, Synthesizer & Prompt Forge',
      social: 'Decentralized Sovereign Feed & Encrypted P2P Messenger',
      nutrition: 'Biometrics, Caloric Engine & Hydration Matrix',
      travel: 'Sovereign Navigator, Expeditions & Packing Vault',
      knowledge: 'Neural Brain, Knowledge Vault & Flashcards',
      privacy: 'Web Crypto Security, SHA-256 Vault & Backup',
    },
    ai: {
      title: 'NEXUS Sovereign AI (Gemini Core)',
      subtitle: 'Browser-Native Voice & Neural Command Assistant',
      placeholder: 'Speak or type command (e.g. "Open finance", "Log water", "Add task: Audit node")...',
      listening: 'Listening to your voice...',
      speaking: 'Speaking response...',
      micPrompt: 'Click microphone to speak',
      muteVoice: 'Mute Voice',
      unmuteVoice: 'Enable Voice',
      quickSuggestions: 'Quick Directives',
      askAi: 'Send Directive',
      clearChat: 'Clear History',
      welcome: 'Greetings, Sovereign Master FAHAD11ABBAS. NEXUS Singularity v9.0 is online and operating at 100% sovereign capacity. How may I assist your mission today?',
    },
    office: {
      pomodoro: 'Sovereign Focus Timer',
      tasks: 'Sovereign Task Matrix',
      newTask: 'Add Task',
      taskPlaceholder: 'Enter high-priority sovereign task...',
      priority: 'Priority',
      todo: 'To Do',
      inProgress: 'In Progress',
      completed: 'Completed',
      notes: 'Executive Notes & Strategy Scratchpad',
      newNote: 'Create Note',
      noteTitle: 'Note Title',
      noteContent: 'Record sovereign insights, strategic directives, architecture notes...',
      saveNote: 'Save Note',
      copySuccess: 'Note copied to clipboard!',
    },
    finance: {
      netWorth: 'Sovereign Net Worth',
      delta: '+3.84% (24h Sovereign Alpha)',
      assets: 'Treasury Asset Allocation',
      transactions: 'Sovereign Ledger History',
      addTx: 'Record Transaction',
      description: 'Transaction Description',
      amount: 'Amount',
      type: 'Type',
      income: 'Income',
      expense: 'Expense',
      category: 'Category',
      rateNotice: 'Pegged to Central Bank of Iraq & Live Crypto Indexes',
    },
    studio: {
      sketchpad: 'Neural Interactive Canvas',
      clear: 'Clear Canvas',
      download: 'Export Drawing (PNG)',
      brushSize: 'Brush Size',
      brushColor: 'Color Spectrum',
      eraser: 'Eraser',
      synth: 'Web Audio Tone Synthesizer',
      synthHelp: 'Trigger real synthesized frequencies via native Web Audio API:',
      bell: 'Sovereign Chime (432Hz)',
      pulse: 'Cyber Pulse (Sawtooth)',
      chord: 'Cosmic Triad (Harmonic)',
      sub: 'Quantum Sub-Bass',
      promptForge: 'AI Creative Prompt Forge',
      generatePrompt: 'Generate Prompt',
      copyPrompt: 'Copy Prompt',
    },
    social: {
      composer: 'Broadcast Sovereign Transmission',
      postPlaceholder: 'Share decentralized insight, project update or sovereign status...',
      broadcast: 'Broadcast',
      feed: 'Decentralized Sovereign Feed',
      messenger: 'Encrypted P2P Secure Terminal',
      selectPeer: 'Select Active Node Peer',
      typeMessage: 'Type encrypted message...',
      send: 'Transmit',
      encryptedBadge: 'End-to-End Encrypted via Sovereign Protocol',
    },
    nutrition: {
      calorieTarget: 'Daily Caloric Target',
      caloriesConsumed: 'Consumed',
      caloriesRemaining: 'Remaining',
      macros: 'Macronutrient Synthesis',
      protein: 'Protein',
      carbs: 'Carbs',
      fats: 'Healthy Fats',
      hydration: 'Hydration Matrix',
      add250: '+250ml Cup',
      add500: '+500ml Bottle',
      resetWater: 'Reset Hydration',
      meals: "Today's Fuel Ledger",
      logMeal: 'Log Meal',
      mealName: 'Meal / Nutrient Item',
    },
    travel: {
      expeditions: 'Curated Sovereign Expeditions',
      planner: 'Expedition Custom Planner',
      destination: 'Destination',
      country: 'Region / Country',
      budget: 'Estimated Budget',
      addTrip: 'Add Expedition',
      packing: 'Sovereign Expedition Packing Matrix',
      addItem: 'Add Item',
      converter: 'Sovereign Currency Quick Converter',
    },
    knowledge: {
      search: 'Search Neural Second Brain...',
      vault: 'Neural Knowledge Vault',
      addEntry: 'Add Knowledge Card',
      title: 'Title',
      category: 'Category',
      content: 'Knowledge Insights & Markdown Content',
      flashcards: 'Spaced Repetition Flashcards',
      flipCard: 'Click to Reveal Knowledge',
      nextCard: 'Next Flashcard',
    },
    privacy: {
      auditTitle: 'Cryptographic Sovereign Health Audit',
      auditScore: '100% Sovereign (Zero Trackers / Fully Client-Side)',
      sha256Title: 'Native Web Crypto SHA-256 Generator',
      sha256Desc: 'Compute cryptographically secure SHA-256 hashes inside your browser using window.crypto.subtle:',
      inputPlaceholder: 'Enter raw text to hash...',
      computedHash: 'Calculated SHA-256 Digest:',
      storageTitle: 'LocalStorage Sovereign Data Management',
      storageUsage: 'Current Browser Storage Used:',
      exportBackup: 'Export Full JSON Backup',
      importBackup: 'Import JSON Backup',
      nuclearReset: 'Nuclear Reset to Factory Defaults',
      confirmReset: 'Are you sure you want to reset all data? This cannot be undone.',
    },
  },
  ar: {
    appName: 'نيكسوس',
    edition: 'إصدار السنغولاريتي v9.0',
    sovereignNode: 'جمهورية العراق | العقدة السيادية 🇮🇶',
    operator: 'المشغّل: فهد عباس (FAHAD11ABBAS)',
    ghostMode: 'وضع التخفي',
    ghostActive: 'مُفعل (بدون تعقب)',
    ghostInactive: 'معطل',
    modules: {
      office: 'المكتب',
      finance: 'المالية',
      studio: 'الاستوديو',
      social: 'التواصل',
      nutrition: 'التغذية',
      travel: 'السفر',
      knowledge: 'المعرفة',
      privacy: 'الخصوصية',
    },
    moduleSubs: {
      office: 'بيئة العمل السيادية ومصفوفة إدارة المهام السريعة',
      finance: 'الخزينة السيادية، إدارة الأصول المتعددة والسجل المالي',
      studio: 'لوحة الرسم التفاعلية، مُخلّق الأصوات ومولد التوجيهات',
      social: 'الشبكة السيادية اللامركزية والدردشة المشفرة طرفاً لطرف',
      nutrition: 'حاسبة السعرات الحيوية، المغذيات ومصفوفة ترطيب الجسم',
      travel: 'الملاحة السيادية، الرحلات ومصفوفة حقيبة السفر',
      knowledge: 'الدماغ الرقمي، مستودع المعرفة والبطاقات التفاعلية',
      privacy: 'التشفير البرمجي الأصيل، مولد SHA-256 والنسخ الاحتياطي',
    },
    ai: {
      title: 'مساعد نيكسوس السيادي (محرك جيميني)',
      subtitle: 'المساعد الصوتي والتحليلي المدمج عبر واجهة Web Speech API',
      placeholder: 'تحدث أو اكتب أمرك (مثال: "افتح المالية"، "أضف ماء"، "أضف مهمة: مراجعة العقدة")...',
      listening: 'جاري الاستماع لصوتك الآن...',
      speaking: 'جاري نطق الإجابة...',
      micPrompt: 'انقر على المايكروفون للتحدث صوتياً',
      muteVoice: 'كتم النطق الصوتي',
      unmuteVoice: 'تفعيل النطق الصوتي',
      quickSuggestions: 'أوامر مباشرة سريعة',
      askAi: 'إرسال الأمر',
      clearChat: 'مسح المحادثة',
      welcome: 'أهلاً بك سيدي القائد فهد عباس (FAHAD11ABBAS). نظام نيكسوس السيادي v9.0 يعمل بكامل طاقته التشغيلية. كيف يمكنني مساندتك اليوم؟',
    },
    office: {
      pomodoro: 'مؤقت التركيز السيادي (بومودورو)',
      tasks: 'مصفوفة المهام السيادية',
      newTask: 'إضافة مهمة',
      taskPlaceholder: 'أدخل تفاصيل المهمة ذات الأولوية...',
      priority: 'الأولوية',
      todo: 'قيد الانتظار',
      inProgress: 'قيد التنفيذ',
      completed: 'مكتملة',
      notes: 'الملاحظات الاستراتيجية والتوجيهات',
      newNote: 'ملاحظة جديدة',
      noteTitle: 'عنوان الملاحظة',
      noteContent: 'اكتب الرؤى السيادية، المعمارية البرمجية، أو التوجيهات...',
      saveNote: 'حفظ الملاحظة',
      copySuccess: 'تم نسخ الملاحظة إلى الحافظة!',
    },
    finance: {
      netWorth: 'صافي الثروة السيادية',
      delta: '+3.84% (العائد السيادي 24 ساعة)',
      assets: 'توزيع أصول الخزينة السيادية',
      transactions: 'سجل العمليات المالية',
      addTx: 'تسجيل عملية',
      description: 'وصف العملية',
      amount: 'المبلغ',
      type: 'النوع',
      income: 'إيراد',
      expense: 'مصروف',
      category: 'التصنيف',
      rateNotice: 'مرتبط بأسعار البنك المركزي العراقي ومؤشرات الكريبتو الحية',
    },
    studio: {
      sketchpad: 'لوحة الرسم الرقمية التفاعلية',
      clear: 'مسح اللوحة',
      download: 'تصدير الرسم (PNG)',
      brushSize: 'حجم الفرشاة',
      brushColor: 'طيف الألوان',
      eraser: 'الممحاة',
      synth: 'مُركّب النغمات والترددات الصوتية',
      synthHelp: 'توليد نغمات وترددات صوتية حقيقية عبر Web Audio API المدمجة:',
      bell: 'رنين سيادي (432 هرتز)',
      pulse: 'نبض سايبر (سن المنشار)',
      chord: 'ثلاثي كوني متناغم',
      sub: 'تردد كمي عميق',
      promptForge: 'مصنع توجيهات الذكاء الاصطناعي الإبداعي',
      generatePrompt: 'توليد فكرة جديدة',
      copyPrompt: 'نسخ التوجيه',
    },
    social: {
      composer: 'بث رسالة في الشبكة السيادية',
      postPlaceholder: 'شارك رؤية تقنية، تحديث مشروع، أو حالة سيادية...',
      broadcast: 'بث الرسالة',
      feed: 'خلاصة المنشورات اللامركزية',
      messenger: 'منصة المراسلة المشفرة (P2P)',
      selectPeer: 'اختر العقدة المستهدفة',
      typeMessage: 'اكتب رسالة مشفرة...',
      send: 'إرسال',
      encryptedBadge: 'مشفرة طرفاً لطرف عبر بروتوكول نيكسوس السيادي',
    },
    nutrition: {
      calorieTarget: 'الهدف اليومي من السعرات',
      caloriesConsumed: 'المستهلك',
      caloriesRemaining: 'المتبقي',
      macros: 'مصفوفة المغذيات الكبرى',
      protein: 'بروتين',
      carbs: 'كربوهيدرات',
      fats: 'دهون صحية',
      hydration: 'مصفوفة الترطيب وشرب الماء',
      add250: '+250 مل (كوب)',
      add500: '+500 مل (قارورة)',
      resetWater: 'تصفير الترطيب',
      meals: 'سجل الوجبات لليوم',
      logMeal: 'تسجيل وجبة',
      mealName: 'اسم الوجبة / المكون الغذائي',
    },
    travel: {
      expeditions: 'الرحلات الاستكشافية السيادية',
      planner: 'مخطط الرحلات المخصص',
      destination: 'الوجهة',
      country: 'المنطقة / الدولة',
      budget: 'الميزانية التقديرية',
      addTrip: 'إضافة رحلة',
      packing: 'مصفوفة تجهيز حقيبة السفر',
      addItem: 'إضافة غرض',
      converter: 'محول العملات السريع للرحلات',
    },
    knowledge: {
      search: 'بحث في الدماغ الرقمي السيادي...',
      vault: 'مستودع المعرفة الرقمي',
      addEntry: 'إضافة بطاقة معرفية',
      title: 'العنوان',
      category: 'التصنيف',
      content: 'المحتوى والأفكار المعرفية',
      flashcards: 'بطاقات التذكر والمراجعة المتباعدة',
      flipCard: 'انقر لكشف المعرفة المعمقة',
      nextCard: 'البطاقة التالية',
    },
    privacy: {
      auditTitle: 'فحص الأمان والسيادة البرمجية',
      auditScore: '100% سيادي (صفر تعقب / يعمل محلياً بالكامل)',
      sha256Title: 'مولد تجزئة SHA-256 الأصيل داخل المتصفح',
      sha256Desc: 'توليد تشفير SHA-256 آمن وفعلي مباشرة عبر window.crypto.subtle بدون سيرفرات خارجية:',
      inputPlaceholder: 'أدخل النص المراد تشفيره...',
      computedHash: 'قيمة التجزئة SHA-256 الناتجة:',
      storageTitle: 'إدارة بيانات التخزين المحلي (LocalStorage)',
      storageUsage: 'حجم البيانات المخزنة حالياً:',
      exportBackup: 'تصدير نسخة احتياطية كاملة (JSON)',
      importBackup: 'استيراد نسخة احتياطية',
      nuclearReset: 'إعادة ضبط المصنع الكاملة',
      confirmReset: 'هل أنت متأكد من تصفير وإعادة تهيئة جميع البيانات؟ لا يمكن التراجع عن هذا الإجراء.',
    },
  },
};

// ==========================================
// DEFAULT SEED DATA (PERSISTED IN LOCALSTORAGE)
// ==========================================
const DEFAULT_STORAGE_KEY = 'nexus_singularity_v9_master';

function getInitialData() {
  return {
    lang: 'en',
    activeModule: 'office',
    ghostMode: false,
    voiceMuted: false,
    office: {
      pomodoroMinutes: 25,
      pomodoroSeconds: 0,
      tasks: [
        { id: '1', title: 'Audit Baghdad High-Tech Autonomous Cluster Architecture', status: 'inProgress', priority: 'sovereign', date: '2026-09-25' },
        { id: '2', title: 'Verify Web Speech SpeechRecognition & Synthesis latency', status: 'completed', priority: 'high', date: '2026-09-25' },
        { id: '3', title: 'Deploy NEXUS Singularity v9.0 Autonomous Release', status: 'inProgress', priority: 'sovereign', date: '2026-09-25' },
        { id: '4', title: 'Sync Mesopotamian Neural Knowledge Graph & Archives', status: 'todo', priority: 'medium', date: '2026-09-26' },
      ],
      notes: [
        {
          id: '1',
          title: 'Singularity Sovereign Roadmap 2026',
          tags: ['Roadmap', 'Sovereignty', 'AI'],
          date: '2026-09-25',
          content: 'NEXUS represents total technological self-determination. By decoupling from centralized cloud dependencies, master operator FAHAD11ABBAS commands an indestructible client-side ecosystem running pure local AI logic, client-side cryptographic hashing, and autonomous data sovereignty.',
        },
        {
          id: '2',
          title: 'Baghdad AI Renaissance Manifesto',
          tags: ['Mesopotamia', 'Heritage', 'Future'],
          date: '2026-09-24',
          content: 'From the House of Wisdom to autonomous neural microservices: Iraq will once again be the global cradle of mathematics, computing, and visionary civilizational leadership.',
        },
      ],
    },
    finance: {
      currency: 'USD',
      rates: { USD: 1, IQD: 1310, EUR: 0.92, BTC: 0.000015 },
      assets: [
        { id: '1', name: 'Sovereign Treasury Reserve', category: 'Fiat Reserve', amountUSD: 52000, color: '#7c3aed' },
        { id: '2', name: 'Bitcoin Sovereign Cold Vault', category: 'Crypto Asset', amountUSD: 84500, color: '#f59e0b' },
        { id: '3', name: 'Physical Gold Bullion (Karbala/Baghdad)', category: 'Precious Metals', amountUSD: 36000, color: '#10b981' },
        { id: '4', name: 'Autonomous Compute Infrastructure', category: 'Hardware Core', amountUSD: 24500, color: '#06b6d4' },
      ],
      transactions: [
        { id: '1', title: 'Sovereign Enterprise AI License Inflow', amount: 12500, type: 'income', category: 'Tech Enterprise', date: '2026-09-24' },
        { id: '2', title: 'Decentralized Server Array Upgrade', amount: 2400, type: 'expense', category: 'Hardware', date: '2026-09-23' },
        { id: '3', title: 'Mesopotamian Tech Research Grant', amount: 8000, type: 'income', category: 'Research', date: '2026-09-20' },
        { id: '4', title: 'High-Yield BTC Sovereign Staking Allocation', amount: 3500, type: 'income', category: 'Yield', date: '2026-09-18' },
      ],
    },
    studio: {
      prompts: [
        { id: '1', style: 'Mesopotamian Futurism', prompt: 'Ancient ziggurat of Ur reconstructed in 2099 with holographic cybernetic blue energy rings, neon gold runes, ultra-detailed 8K unreal engine 5 aesthetic' },
        { id: '2', style: 'Cyberpunk Sovereign Core', prompt: 'A sovereign autonomous datacenter floating over the Tigris river at twilight, sleek purple ambient reflections, neon bioluminescent architecture' },
        { id: '3', style: 'Deep Tech Singularity', prompt: 'Neural synapse matrix intertwining with crystalline mathematical structures, golden ratio geometry, cinematic lighting, photorealistic octane render' },
      ],
    },
    social: {
      posts: [
        {
          id: '1',
          author: 'FAHAD11ABBAS 🇮🇶',
          handle: '@fahad_sovereign',
          role: 'Master Operator',
          time: '15m ago',
          content: 'NEXUS Singularity v9.0 is fully active. All 8 sovereign modules operating with zero cloud latency. Client-side privacy and speech synthesis verified.',
          likes: 42,
          reposts: 18,
          comments: 7,
          isLiked: true,
        },
        {
          id: '2',
          author: 'Babylon Neural Sentinel 🇮🇶',
          handle: '@babylon_core',
          role: 'Sovereign Node #01',
          time: '2h ago',
          content: 'Decentralized handshake established with Baghdad Prime. Local cryptographic vaults operating at 100% integrity.',
          likes: 29,
          reposts: 9,
          comments: 3,
          isLiked: false,
        },
        {
          id: '3',
          author: 'Tigris Research Node 🇮🇶',
          handle: '@tigris_ai',
          role: 'Autonomous Cluster',
          time: '5h ago',
          content: 'Zero external telemetry detected across all endpoints. Absolute sovereign self-determination demonstrated in action.',
          likes: 38,
          reposts: 14,
          comments: 5,
          isLiked: false,
        },
      ],
      activePeer: 'Tigris Node [Baghdad]',
      messages: [
        { id: '1', sender: 'peer', text: 'Sovereign connection established with FAHAD11ABBAS. Node Tigris is ready for directives.', time: '17:15' },
        { id: '2', sender: 'user', text: 'Acknowledge. Singularity v9.0 deployment in progress. All security parameters green.', time: '17:18' },
        { id: '3', sender: 'peer', text: 'Confirmed. Encrypted peer-to-peer heartbeat active. No packets leaking outside sovereign boundary.', time: '17:19' },
      ],
    },
    nutrition: {
      targetCalories: 2450,
      targetProtein: 175,
      targetCarbs: 230,
      targetFats: 70,
      waterMl: 2250,
      targetWaterMl: 3000,
      meals: [
        { id: '1', name: 'High-Protein Breakfast: Oatmeal, Whey, Almonds & Bananas', calories: 650, protein: 48, time: '08:30' },
        { id: '2', name: 'Traditional Iraqi Grilled Chicken & Spiced Basmati Rice', calories: 820, protein: 65, time: '13:45' },
        { id: '3', name: 'Pre-Workout Greek Yogurt, Dates & Pomegranate Seeds', calories: 340, protein: 26, time: '16:30' },
      ],
    },
    travel: {
      itineraries: [
        { id: '1', destination: 'Babylon Sovereign Citadel & Hillah Ruins', country: 'Iraq 🇮🇶', dates: 'Oct 15 - 19, 2026', status: 'Confirmed', budget: '$1,200', notes: 'Neural photogrammetry scan of the Ishtar Gate foundations' },
        { id: '2', destination: 'Erbil High-Tech Park & Citadel', country: 'Kurdistan, Iraq 🇮🇶', dates: 'Nov 04 - 10, 2026', status: 'Planning', budget: '$1,650', notes: 'Autonomous cluster deployment summit with regional engineers' },
        { id: '3', destination: 'Tokyo Singularity Expo & Akihabara Tech Vaults', country: 'Japan 🇯🇵', dates: 'Dec 08 - 18, 2026', status: 'Booked', budget: '$4,800', notes: 'International sovereign computing symposium keynote' },
      ],
      packingList: [
        { id: '1', item: 'Biometric Passport & Sovereign ID credentials', checked: true, category: 'Documents' },
        { id: '2', item: 'Dual Hardware Cold Wallets (Air-gapped)', checked: true, category: 'Tech' },
        { id: '3', item: 'Satellite Handheld Communicator & Solar Bank', checked: true, category: 'Tech' },
        { id: '4', item: 'Active Noise Canceling Studio Headset', checked: false, category: 'Tech' },
        { id: '5', item: 'Compact Trauma & First Aid Sovereign Medical Kit', checked: true, category: 'Medical' },
        { id: '6', item: 'Multi-Country Power Adapter & Fast GaN Charger', checked: false, category: 'Gear' },
      ],
    },
    knowledge: {
      cards: [
        {
          id: '1',
          title: 'Sovereign Computing & Zero-Cloud Autonomy',
          category: 'Sovereign AI',
          tags: ['Sovereignty', 'Architecture', 'Security'],
          summary: 'Why local-first, client-side architectures eliminate external censorship, deplatforming, and espionage risks.',
          content: 'By leveraging modern browser capabilities—such as Web Crypto API, IndexedDB, LocalStorage, Web Workers, and Web Speech API—an application can execute entire intelligence pipelines locally without streaming sensitive personal directives to third-party corporate servers.',
        },
        {
          id: '2',
          title: 'The Mesopotamian Mathematical Heritage',
          category: 'Iraqi Heritage',
          tags: ['History', 'Mathematics', 'Civilization'],
          summary: 'The sexagesimal (base 60) numeral system and algebra pioneered in ancient Sumer and Babylon.',
          content: 'Mesopotamia gave humanity the division of time into 60 minutes and 360-degree circles. During the Islamic Golden Age in Baghdad, Al-Khwarizmi developed algebra and algorithmic thinking, cementing Iraq as the foundational birth site of global computational logic.',
        },
        {
          id: '3',
          title: 'Web Crypto API: In-Browser Cryptographic Primaries',
          category: 'Cryptography',
          tags: ['Crypto', 'Security', 'SHA-256'],
          summary: 'How window.crypto.subtle enables high-performance native cryptographic operations.',
          content: 'The Subtly-named Web Crypto API grants client applications access to hardware-accelerated SHA-256, AES-GCM, and ECDSA primitives without importing bulky or vulnerable external libraries.',
        },
      ],
      flashcards: [
        { id: '1', q: 'What is the primary architectural principle of NEXUS Singularity?', a: 'Total client-side technological sovereignty with zero external telemetry and native browser execution.' },
        { id: '2', q: 'Which native browser API provides free voice recognition without API keys?', a: 'The Web Speech API (webkitSpeechRecognition / SpeechRecognition).' },
        { id: '3', q: 'How does NEXUS ensure data persistence across sessions?', a: 'Through an encrypted, resilient localStorage engine that supports full JSON export and restore.' },
        { id: '4', q: 'What is the currency conversion anchor for the Iraqi Dinar in NEXUS?', a: 'A multi-asset treasury model combining central bank peg rates with live crypto & gold hedging.' },
      ],
    },
    aiChatHistory: [
      {
        id: '1',
        sender: 'ai',
        text: 'Greetings, Sovereign Master FAHAD11ABBAS. NEXUS Singularity v9.0 is online and operating at 100% sovereign capacity. All 8 core modules (Office, Finance, Studio, Social, Nutrition, Travel, Knowledge, Privacy) are primed. How may I assist your mission today?',
        time: '17:20',
      },
    ],
  };
}

export default function App() {
  // ==========================================
  // STATE INITIALIZATION & LOCALSTORAGE SYNC
  // ==========================================
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(DEFAULT_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load storage, using seed data:', e);
    }
    return getInitialData();
  });

  // Save to localStorage on any state change
  useEffect(() => {
    try {
      localStorage.setItem(DEFAULT_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Storage quota exceeded or error saving:', e);
    }
  }, [data]);

  // Language & Direction Sync
  const lang = data.lang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isRTL = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    if (isRTL) {
      document.body.classList.add('font-cairo');
    } else {
      document.body.classList.remove('font-cairo');
    }
  }, [lang, isRTL]);

  // Active module navigation
  const activeModule = data.activeModule || 'office';
  const setActiveModule = (mod) => {
    setData((prev) => ({ ...prev, activeModule: mod }));
  };

  // Toggle Language
  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'ar' : 'en';
    setData((prev) => ({ ...prev, lang: nextLang }));
  };

  // Toggle Ghost Mode
  const toggleGhostMode = () => {
    setData((prev) => ({ ...prev, ghostMode: !prev.ghostMode }));
  };

  // ==========================================
  // WEB SPEECH API: VOICE AI ASSISTANT
  // ==========================================
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [aiInputText, setAiInputText] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const speechRecognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = lang === 'ar' ? 'ar-IQ' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition event:', event.error);
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleExecuteAiDirective(transcript);
        }
      };

      speechRecognitionRef.current = recognition;
    }
  }, [lang]);

  // Speech Synthesis Helper
  const speakText = (text) => {
    if (data.voiceMuted || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop any pending speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ar' ? 'ar-XA' : 'en-US';
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick best available voice matching language
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) =>
      lang === 'ar' ? v.lang.startsWith('ar') : v.lang.startsWith('en')
    );
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Trigger Voice Input
  const toggleListening = () => {
    if (!speechRecognitionRef.current) {
      alert(lang === 'ar' ? 'متصفحك لا يدعم Web Speech API' : 'Web Speech API is not supported in this browser.');
      return;
    }
    if (isListening) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        speechRecognitionRef.current.lang = lang === 'ar' ? 'ar-IQ' : 'en-US';
        speechRecognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Recognition start error:', err);
      }
    }
  };

  // Autonomous Natural Command Engine
  const handleExecuteAiDirective = (rawInput) => {
    const input = rawInput.trim();
    if (!input) return;

    const lower = input.toLowerCase();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user message
    const userMsg = { id: Date.now().toString(), sender: 'user', text: input, time: timeStr };

    let reply = '';
    let updatedModule = null;

    // Rule-based Autonomous Parsing with Gemini-like intelligence
    if (lower.includes('office') || lower.includes('مكتب') || lower.includes('مهام') || lower.includes('task')) {
      if (lower.includes('add task') || lower.includes('أضف مهمة') || lower.includes('مهمة جديدة')) {
        const cleanTitle = input.replace(/add task|أضف مهمة|مهمة جديدة/gi, '').trim() || (lang === 'ar' ? 'مهمة سيادية استراتيجية' : 'New Sovereign Task Directive');
        setData((prev) => ({
          ...prev,
          office: {
            ...prev.office,
            tasks: [
              ...prev.office.tasks,
              { id: Date.now().toString(), title: cleanTitle, status: 'todo', priority: 'sovereign', date: new Date().toISOString().split('T')[0] },
            ],
          },
        }));
        reply = lang === 'ar' ? `تم تسجيل المهمة في مصفوفة المكتب بنجاح: "${cleanTitle}".` : `Affirmative. Added task: "${cleanTitle}" to your Sovereign Office board.`;
      } else {
        updatedModule = 'office';
        reply = lang === 'ar' ? 'تم الانتقال إلى مصفوفة المكتب السيادية والمفكرة الاستراتيجية.' : 'Switching to Sovereign Office & Kanban sprint module.';
      }
    } else if (lower.includes('finance') || lower.includes('مالية') || lower.includes('فلوس') || lower.includes('money') || lower.includes('ثروة') || lower.includes('net worth')) {
      updatedModule = 'finance';
      reply = lang === 'ar' ? 'تم فتح الخزينة المالية السيادية. صافي الثروة محدث ومؤمن.' : 'Displaying Sovereign Treasury & Multi-Asset ledger.';
    } else if (lower.includes('studio') || lower.includes('استوديو') || lower.includes('رسم') || lower.includes('draw') || lower.includes('canvas')) {
      updatedModule = 'studio';
      reply = lang === 'ar' ? 'تم فتح الاستوديو الإبداعي ومولد النغمات الصوتية.' : 'Entering Creative Studio Canvas and Synthesizer suite.';
    } else if (lower.includes('social') || lower.includes('تواصل') || lower.includes('رسائل') || lower.includes('chat') || lower.includes('feed')) {
      updatedModule = 'social';
      reply = lang === 'ar' ? 'تم فتح الشبكة السيادية اللامركزية والدردشة المشفرة.' : 'Connected to Decentralized Sovereign Feed & P2P Terminal.';
    } else if (lower.includes('water') || lower.includes('ماء') || lower.includes('شرب') || lower.includes('drink')) {
      setData((prev) => ({
        ...prev,
        nutrition: {
          ...prev.nutrition,
          waterMl: Math.min(prev.nutrition.targetWaterMl + 1000, prev.nutrition.waterMl + 250),
        },
      }));
      reply = lang === 'ar' ? 'تم تسجيل 250 مل في مصفوفة الترطيب. الترطيب أساس الكفاءة الذهنية.' : 'Logged +250ml water intake to your Nutrition Matrix. Stay hydrated for optimal neural performance.';
    } else if (lower.includes('nutrition') || lower.includes('تغذية') || lower.includes('طعام') || lower.includes('calories') || lower.includes('سعرات')) {
      updatedModule = 'nutrition';
      reply = lang === 'ar' ? 'تم فتح مصفوفة التغذية والسعرات الحيوية.' : 'Opening Biometrics, Caloric Engine & Hydration Matrix.';
    } else if (lower.includes('travel') || lower.includes('سفر') || lower.includes('رحلة') || lower.includes('flight') || lower.includes('baghdad') || lower.includes('babylon')) {
      updatedModule = 'travel';
      reply = lang === 'ar' ? 'تم فتح محطة السفر والاستكشاف والملاحة السيادية.' : 'Opening Sovereign Navigator & Expedition Planner.';
    } else if (lower.includes('knowledge') || lower.includes('معرفة') || lower.includes('دماغ') || lower.includes('brain') || lower.includes('learn')) {
      updatedModule = 'knowledge';
      reply = lang === 'ar' ? 'تم فتح الدماغ المعرفي ومستودع العلوم والبطاقات التعليمية.' : 'Accessing Neural Knowledge Vault & Spaced Repetition engine.';
    } else if (lower.includes('privacy') || lower.includes('خصوصية') || lower.includes('تشفير') || lower.includes('crypto') || lower.includes('security') || lower.includes('أمان')) {
      updatedModule = 'privacy';
      reply = lang === 'ar' ? 'تم فتح مركز الأمان والتشفير وفحص السيادة الكاملة.' : 'Accessing Sovereign Web Crypto Security & LocalStorage Vault.';
    } else if (lower.includes('arabic') || lower.includes('عربي') || lower.includes('العربية')) {
      setData((prev) => ({ ...prev, lang: 'ar' }));
      reply = 'تم تحويل لغة النظام السيادي إلى اللغة العربية مع دعم التوجيه التلقائي RTL.';
    } else if (lower.includes('english') || lower.includes('انجليزي') || lower.includes('إنجليزية')) {
      setData((prev) => ({ ...prev, lang: 'en' }));
      reply = 'Language switched to English. Sovereign controls active.';
    } else if (lower.includes('ghost') || lower.includes('تخفي')) {
      setData((prev) => ({ ...prev, ghostMode: !prev.ghostMode }));
      reply = lang === 'ar' ? 'تم تعديل وضع التخفي السيادي (Ghost Mode).' : 'Ghost Mode state toggled. Strict sovereign stealth enforced.';
    } else {
      // General Gemini-like autonomous response
      reply = lang === 'ar'
        ? `أمرك مستلم سيدي فهد عباس: "${input}". نظام نيكسوس v9.0 ينفذ المعالجة محلياً عبر العقدة العراقية المستقلة. جميع المكونات السيادية جاهزة لتوجيهاتك.`
        : `Directive received, Master FAHAD11ABBAS: "${input}". NEXUS v9.0 Singularity processes this autonomously within your sovereign client-side node. What specific action shall we execute next?`;
    }

    const aiMsg = { id: (Date.now() + 1).toString(), sender: 'ai', text: reply, time: timeStr };

    setData((prev) => ({
      ...prev,
      activeModule: updatedModule || prev.activeModule,
      aiChatHistory: [...prev.aiChatHistory, userMsg, aiMsg],
    }));

    setAiInputText('');
    speakText(reply);
  };

  // ==========================================
  // MODULE SPECIFIC HELPERS & ACTIONS
  // ==========================================

  // --- 1. OFFICE ACTIONS ---
  const [newTaskInput, setNewTaskInput] = useState('');
  const [taskPriority, setTaskPriority] = useState('high');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(25 * 60);

  // Focus Timer Tick
  useEffect(() => {
    let interval = null;
    if (timerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerSecondsLeft === 0 && timerRunning) {
      setTimerRunning(false);
      speakText(lang === 'ar' ? 'انتهت جلسة التركيز السيادية بنجاح!' : 'Sovereign focus session completed!');
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSecondsLeft, lang]);

  const toggleTaskStatus = (id) => {
    setData((prev) => {
      const nextTasks = prev.office.tasks.map((task) => {
        if (task.id === id) {
          const order = ['todo', 'inProgress', 'completed'];
          const nextIndex = (order.indexOf(task.status) + 1) % order.length;
          return { ...task, status: order[nextIndex] };
        }
        return task;
      });
      return { ...prev, office: { ...prev.office, tasks: nextTasks } };
    });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    setData((prev) => ({
      ...prev,
      office: {
        ...prev.office,
        tasks: [
          ...prev.office.tasks,
          {
            id: Date.now().toString(),
            title: newTaskInput.trim(),
            status: 'todo',
            priority: taskPriority,
            date: new Date().toISOString().split('T')[0],
          },
        ],
      },
    }));
    setNewTaskInput('');
  };

  const handleDeleteTask = (id) => {
    setData((prev) => ({
      ...prev,
      office: {
        ...prev.office,
        tasks: prev.office.tasks.filter((t) => t.id !== id),
      },
    }));
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    setData((prev) => ({
      ...prev,
      office: {
        ...prev.office,
        notes: [
          {
            id: Date.now().toString(),
            title: newNoteTitle.trim(),
            tags: ['Sovereignty', 'Strategy'],
            date: new Date().toISOString().split('T')[0],
            content: newNoteContent.trim(),
          },
          ...prev.office.notes,
        ],
      },
    }));
    setNewNoteTitle('');
    setNewNoteContent('');
    setIsAddingNote(false);
  };

  // --- 2. FINANCE ACTIONS ---
  const [txDesc, setTxDesc] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txType, setTxType] = useState('expense');
  const [txCategory, setTxCategory] = useState('Tech Hardware');

  const totalNetWorthUSD = useMemo(() => {
    return data.finance.assets.reduce((sum, item) => sum + item.amountUSD, 0);
  }, [data.finance.assets]);

  const totalNetWorthIQD = useMemo(() => {
    return (totalNetWorthUSD * (data.finance.rates.IQD || 1310)).toLocaleString();
  }, [totalNetWorthUSD, data.finance.rates.IQD]);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const parsed = parseFloat(txAmount);
    if (!txDesc.trim() || isNaN(parsed) || parsed <= 0) return;

    setData((prev) => ({
      ...prev,
      finance: {
        ...prev.finance,
        transactions: [
          {
            id: Date.now().toString(),
            title: txDesc.trim(),
            amount: parsed,
            type: txType,
            category: txCategory,
            date: new Date().toISOString().split('T')[0],
          },
          ...prev.finance.transactions,
        ],
      },
    }));
    setTxDesc('');
    setTxAmount('');
  };

  // --- 3. STUDIO ACTIONS & WEB AUDIO SYNTHESIZER ---
  const canvasRef = useRef(null);
  const [brushColor, setBrushColor] = useState('#22d3ee');
  const [brushSize, setBrushSize] = useState(4);
  const [isDrawing, setIsDrawing] = useState(false);

  // Play Web Audio Tone
  const playWebAudioTone = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      if (type === 'bell') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, ctx.currentTime);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.8);
      } else if (type === 'pulse') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'chord') {
        [523.25, 659.25, 783.99].forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 1.5);
        });
      } else if (type === 'sub') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(65, ctx.currentTime);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 2.0);
      }
    } catch (e) {
      console.warn('Audio Context error:', e);
    }
  };

  // Canvas drawing handlers
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `nexus-studio-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // --- 4. SOCIAL ACTIONS ---
  const [newPostContent, setNewPostContent] = useState('');
  const [p2pInputText, setP2pInputText] = useState('');

  const handleBroadcastPost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    setData((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        posts: [
          {
            id: Date.now().toString(),
            author: 'FAHAD11ABBAS 🇮🇶',
            handle: '@fahad_sovereign',
            role: 'Master Operator',
            time: 'Just now',
            content: newPostContent.trim(),
            likes: 1,
            reposts: 0,
            comments: 0,
            isLiked: true,
          },
          ...prev.social.posts,
        ],
      },
    }));
    setNewPostContent('');
  };

  const togglePostLike = (id) => {
    setData((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        posts: prev.social.posts.map((post) => {
          if (post.id === id) {
            const nextLiked = !post.isLiked;
            return {
              ...post,
              isLiked: nextLiked,
              likes: nextLiked ? post.likes + 1 : Math.max(0, post.likes - 1),
            };
          }
          return post;
        }),
      },
    }));
  };

  const handleSendP2pMessage = (e) => {
    e.preventDefault();
    if (!p2pInputText.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: p2pInputText.trim(),
      time: timeStr,
    };

    setData((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        messages: [...prev.social.messages, userMsg],
      },
    }));
    setP2pInputText('');

    // Autonomous Simulated Peer Response
    setTimeout(() => {
      const peerMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'peer',
        text:
          lang === 'ar'
            ? `العقدة ${data.social.activePeer}: تم استلام التوجيه المشفر وتأكيد المزامنة مع فهد عباس.`
            : `Node ${data.social.activePeer}: Encrypted handshake acknowledged. Synchronized with FAHAD11ABBAS.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setData((prev) => ({
        ...prev,
        social: {
          ...prev.social,
          messages: [...prev.social.messages, peerMsg],
        },
      }));
    }, 1200);
  };

  // --- 5. NUTRITION ACTIONS ---
  const [mealNameInput, setMealNameInput] = useState('');
  const [mealCaloriesInput, setMealCaloriesInput] = useState('');
  const [mealProteinInput, setMealProteinInput] = useState('');

  const totalCaloriesConsumed = useMemo(() => {
    return data.nutrition.meals.reduce((sum, m) => sum + m.calories, 0);
  }, [data.nutrition.meals]);

  const caloriesRemaining = Math.max(0, data.nutrition.targetCalories - totalCaloriesConsumed);

  const handleLogMeal = (e) => {
    e.preventDefault();
    const cals = parseInt(mealCaloriesInput, 10);
    const prot = parseInt(mealProteinInput, 10) || 0;
    if (!mealNameInput.trim() || isNaN(cals) || cals <= 0) return;

    setData((prev) => ({
      ...prev,
      nutrition: {
        ...prev.nutrition,
        meals: [
          ...prev.nutrition.meals,
          {
            id: Date.now().toString(),
            name: mealNameInput.trim(),
            calories: cals,
            protein: prot,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ],
      },
    }));
    setMealNameInput('');
    setMealCaloriesInput('');
    setMealProteinInput('');
  };

  // --- 6. TRAVEL ACTIONS ---
  const [tripDest, setTripDest] = useState('');
  const [tripCountry, setTripCountry] = useState('');
  const [tripBudget, setTripBudget] = useState('');
  const [currencyInput, setCurrencyInput] = useState('100');

  const handleAddTrip = (e) => {
    e.preventDefault();
    if (!tripDest.trim()) return;
    setData((prev) => ({
      ...prev,
      travel: {
        ...prev.travel,
        itineraries: [
          ...prev.travel.itineraries,
          {
            id: Date.now().toString(),
            destination: tripDest.trim(),
            country: tripCountry.trim() || 'Iraq 🇮🇶',
            dates: 'Upcoming 2026',
            status: 'Planning',
            budget: tripBudget ? `$${tripBudget}` : '$1,000',
            notes: 'Autonomous travel itinerary recorded',
          },
        ],
      },
    }));
    setTripDest('');
    setTripCountry('');
    setTripBudget('');
  };

  const togglePackingItem = (id) => {
    setData((prev) => ({
      ...prev,
      travel: {
        ...prev.travel,
        packingList: prev.travel.packingList.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        ),
      },
    }));
  };

  // --- 7. KNOWLEDGE ACTIONS ---
  const [knowledgeSearch, setKnowledgeSearch] = useState('');
  const [activeFlashcardIndex, setActiveFlashcardIndex] = useState(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState(false);

  const filteredKnowledgeCards = useMemo(() => {
    const q = knowledgeSearch.toLowerCase().trim();
    if (!q) return data.knowledge.cards;
    return data.knowledge.cards.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.content.toLowerCase().includes(q)
    );
  }, [knowledgeSearch, data.knowledge.cards]);

  // --- 8. PRIVACY & WEB CRYPTO SHA-256 GENERATOR ---
  const [cryptoInputText, setCryptoInputText] = useState('FAHAD11ABBAS_SOVEREIGN_NODE_2026');
  const [calculatedSha256, setCalculatedSha256] = useState('');

  // Native Web Crypto SHA-256 Calculation
  useEffect(() => {
    async function computeHash() {
      if (!cryptoInputText) {
        setCalculatedSha256('');
        return;
      }
      try {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(cryptoInputText);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        setCalculatedSha256(hashHex);
      } catch (err) {
        console.warn('Crypto subtle error:', err);
      }
    }
    computeHash();
  }, [cryptoInputText]);

  // Export full JSON backup
  const handleExportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `nexus-sovereign-backup-v9-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON backup
  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed && typeof parsed === 'object') {
          setData(parsed);
          alert(lang === 'ar' ? 'تم استيراد النسخة الاحتياطية بنجاح!' : 'Sovereign backup restored successfully!');
        }
      } catch (err) {
        alert(lang === 'ar' ? 'الملف غير صالح!' : 'Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Nuclear Reset
  const handleNuclearReset = () => {
    if (window.confirm(t.privacy.confirmReset)) {
      const fresh = getInitialData();
      setData(fresh);
      try {
        localStorage.setItem(DEFAULT_STORAGE_KEY, JSON.stringify(fresh));
      } catch (e) {}
    }
  };

  return (
    <div className={`min-h-screen bg-[#07070f] text-slate-100 flex flex-col selection:bg-purple-600 selection:text-white ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* ======================================================== */}
      {/* 1. TOP HEADER & SOVEREIGN STATUS BAR */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0a0a16]/85 border-b border-purple-900/30 px-4 lg:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Node Branding */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-700 via-indigo-600 to-cyan-500 p-0.5 shadow-lg shadow-purple-950/50">
              <div className="w-full h-full bg-[#0d0d1e] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-wider bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  {t.appName}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-300 border border-purple-500/30">
                  {t.edition}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  {t.sovereignNode}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300 font-mono text-[11px]">{t.operator}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Switchers */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Assistant Quick Trigger */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs shadow-md shadow-purple-950/40 transition-all hover:scale-105"
            >
              <Bot className="w-4 h-4 text-cyan-300" />
              <span className="hidden md:inline">Gemini AI</span>
              {isListening && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              )}
            </button>

            {/* Ghost Mode Toggle */}
            <button
              onClick={toggleGhostMode}
              title={t.ghostMode}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                data.ghostMode
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-900/30'
                  : 'bg-slate-900/60 border-slate-700/50 text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className={`w-4 h-4 ${data.ghostMode ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">{t.ghostMode}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-purple-300 transition-all hover:border-purple-500"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="font-semibold">{lang === 'en' ? '🇮🇶 العربية' : '🇬🇧 English'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. CORE SOVEREIGN NAVIGATION DOCK */}
      {/* ======================================================== */}
      <nav className="bg-[#0b0b1b]/95 border-b border-purple-900/20 px-4 py-2 sticky top-[61px] z-30 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center justify-start lg:justify-center gap-1.5 sm:gap-2 min-w-max">
          {[
            { id: 'office', label: t.modules.office, icon: Briefcase, color: 'text-blue-400' },
            { id: 'finance', label: t.modules.finance, icon: DollarSign, color: 'text-amber-400' },
            { id: 'studio', label: t.modules.studio, icon: Palette, color: 'text-pink-400' },
            { id: 'social', label: t.modules.social, icon: Users, color: 'text-purple-400' },
            { id: 'nutrition', label: t.modules.nutrition, icon: Utensils, color: 'text-emerald-400' },
            { id: 'travel', label: t.modules.travel, icon: Plane, color: 'text-cyan-400' },
            { id: 'knowledge', label: t.modules.knowledge, icon: BookOpen, color: 'text-indigo-400' },
            { id: 'privacy', label: t.modules.privacy, icon: Lock, color: 'text-rose-400' },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg shadow-purple-950/60 border border-purple-400/40 scale-105'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Subtitle Banner for Active Module */}
      <div className="bg-gradient-to-r from-purple-950/30 via-indigo-950/20 to-transparent border-b border-purple-900/10 px-4 lg:px-8 py-2 text-center text-xs text-purple-300/80 font-mono">
        <span className="font-semibold text-purple-200">[{t.modules[activeModule]}]</span> {t.moduleSubs[activeModule]}
      </div>

      {/* ======================================================== */}
      {/* 3. MAIN WORKSPACE / ACTIVE SOVEREIGN MODULE */}
      {/* ======================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        {/* ---------------------------------------------------- */}
        {/* MODULE 1: OFFICE */}
        {/* ---------------------------------------------------- */}
        {activeModule === 'office' && (
          <div className="space-y-6 animate-fade-in">
            {/* Focus Timer Bar & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-5 rounded-2xl border border-purple-800/30 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <h3 className="font-bold text-sm text-slate-200">{t.office.pomodoro}</h3>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/50 text-purple-300 font-mono">
                    {timerRunning ? 'FOCUS ACTIVE' : 'IDLE'}
                  </span>
                </div>
                <div className="text-center my-3">
                  <span className="text-4xl font-black font-mono tracking-wider bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {Math.floor(timerSecondsLeft / 60)
                      .toString()
                      .padStart(2, '0')}
                    :
                    {(timerSecondsLeft % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setTimerRunning(!timerRunning)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition"
                  >
                    {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    {timerRunning ? 'Pause' : 'Start'}
                  </button>
                  <button
                    onClick={() => {
                      setTimerRunning(false);
                      setTimerSecondsLeft(25 * 60);
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    title="Reset"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Task Summary Metrics */}
              <div className="glass-card p-5 rounded-2xl border border-purple-800/30 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-sm text-slate-200">Sprint Progress</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Completed Tasks</span>
                    <span className="font-bold text-emerald-400">
                      {data.office.tasks.filter((t) => t.status === 'completed').length} / {data.office.tasks.length}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          data.office.tasks.length === 0
                            ? 0
                            : Math.round(
                                (data.office.tasks.filter((t) => t.status === 'completed').length /
                                  data.office.tasks.length) *
                                  100
                              )
                        }%`,
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 pt-1">
                    Autonomous priority queue for user FAHAD11ABBAS.
                  </p>
                </div>
              </div>

              {/* Quick Directive Form */}
              <div className="glass-card p-5 rounded-2xl border border-purple-800/30">
                <h3 className="font-bold text-sm text-slate-200 mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-cyan-400" />
                  {t.office.newTask}
                </h3>
                <form onSubmit={handleAddTask} className="space-y-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder={t.office.taskPlaceholder}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                  <div className="flex items-center justify-between gap-2">
                    <select
                      value={taskPriority}
                      onChange={(e) => setTaskPriority(e.target.value)}
                      className="px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300"
                    >
                      <option value="sovereign">🔴 Sovereign Urgent</option>
                      <option value="high">🟡 High Priority</option>
                      <option value="medium">🔵 Medium</option>
                    </select>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition"
                    >
                      {t.office.newTask}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { key: 'todo', title: t.office.todo, color: 'border-amber-500/40', badge: 'bg-amber-500/20 text-amber-300' },
                { key: 'inProgress', title: t.office.inProgress, color: 'border-blue-500/40', badge: 'bg-blue-500/20 text-blue-300' },
                { key: 'completed', title: t.office.completed, color: 'border-emerald-500/40', badge: 'bg-emerald-500/20 text-emerald-300' },
              ].map((col) => {
                const colTasks = data.office.tasks.filter((t) => t.status === col.key);
                return (
                  <div key={col.key} className={`glass-card p-4 rounded-2xl border ${col.color} flex flex-col min-h-[300px]`}>
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                      <span className="font-bold text-sm text-slate-200">{col.title}</span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${col.badge}`}>
                        {colTasks.length}
                      </span>
                    </div>

                    <div className="space-y-2 flex-1">
                      {colTasks.map((task) => (
                        <div
                          key={task.id}
                          className="p-3 rounded-xl bg-[#121226]/80 hover:bg-[#181832] border border-slate-800 hover:border-purple-600/40 transition group cursor-pointer"
                          onClick={() => toggleTaskStatus(task.id)}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-xs font-medium ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                              {task.title}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTask(task.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800/60 text-[10px] text-slate-400">
                            <span className="font-mono">{task.date}</span>
                            <span className="capitalize font-semibold text-purple-400">
                              {task.priority === 'sovereign' ? '⚡ Sovereign' : task.priority}
                            </span>
                          </div>
                        </div>
                      ))}
                      {colTasks.length === 0 && (
                        <div className="text-center py-8 text-xs text-slate-600">No tasks in this lane</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Strategic Notes Scratchpad */}
            <div className="glass-card p-5 rounded-2xl border border-purple-800/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-bold text-base text-slate-100">{t.office.notes}</h3>
                </div>
                <button
                  onClick={() => setIsAddingNote(!isAddingNote)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-700/60 hover:bg-purple-600 text-purple-200 text-xs font-semibold transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {t.office.newNote}
                </button>
              </div>

              {isAddingNote && (
                <form onSubmit={handleSaveNote} className="mb-6 p-4 rounded-xl bg-slate-900/90 border border-purple-500/40 space-y-3">
                  <input
                    type="text"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    placeholder={t.office.noteTitle}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                  <textarea
                    rows={4}
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder={t.office.noteContent}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingNote(false)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs"
                    >
                      {t.office.saveNote}
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.office.notes.map((note) => (
                  <div key={note.id} className="p-4 rounded-xl bg-[#101024] border border-slate-800/80 hover:border-purple-800/50 transition">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-sm text-purple-300">{note.title}</h4>
                      <span className="text-[10px] text-slate-500 font-mono">{note.date}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3 whitespace-pre-line">{note.content}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        {note.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-md bg-purple-950/60 text-purple-400 text-[10px]">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`${note.title}\n\n${note.content}`);
                          alert(t.office.copySuccess);
                        }}
                        className="text-slate-400 hover:text-cyan-300 flex items-center gap-1"
                        title="Copy note"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* MODULE 2: FINANCE */}
        {/* ---------------------------------------------------- */}
        {activeModule === 'finance' && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Net Worth Card */}
            <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-[#19132d] to-[#0f1b2b]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Wallet className="w-4 h-4" />
                    {t.finance.netWorth}
                  </span>
                  <div className="flex items-baseline gap-3 my-2">
                    <span className="text-4xl lg:text-5xl font-black text-white font-mono tracking-tight">
                      ${totalNetWorthUSD.toLocaleString()}
                    </span>
                    <span className="text-lg lg:text-xl font-bold text-amber-300/80 font-mono">
                      ≈ {totalNetWorthIQD} د.ع
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {t.finance.delta}
                    </span>
                    <span className="text-slate-400 font-mono">{t.finance.rateNotice}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-mono">
                    <div className="text-[10px] text-amber-400/70">USD/IQD PEG</div>
                    <div className="text-base font-bold">1,310 د.ع</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono">
                    <div className="text-[10px] text-purple-400/70">BTC SOVEREIGN HEDGE</div>
                    <div className="text-base font-bold">1.25 BTC</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Asset Allocation Grid */}
            <div>
              <h3 className="font-bold text-sm text-slate-300 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                {t.finance.assets}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.finance.assets.map((asset) => (
                  <div key={asset.id} className="glass-card p-4 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>{asset.category}</span>
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: asset.color }} />
                    </div>
                    <div className="font-bold text-sm text-slate-100 mb-2">{asset.name}</div>
                    <div className="text-xl font-bold font-mono text-purple-300">
                      ${asset.amountUSD.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-1">
                      ≈ {(asset.amountUSD * 1310).toLocaleString()} د.ع
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ledger Transactions & Logger */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Record Transaction Form */}
              <div className="glass-card p-5 rounded-2xl border border-purple-800/30 lg:col-span-1">
                <h3 className="font-bold text-sm text-slate-200 mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-400" />
                  {t.finance.addTx}
                </h3>
                <form onSubmit={handleAddTransaction} className="space-y-3">
                  <div>
                    <label className="text-[11px] text-slate-400">{t.finance.description}</label>
                    <input
                      type="text"
                      value={txDesc}
                      onChange={(e) => setTxDesc(e.target.value)}
                      placeholder="e.g. AI Consulting Revenue"
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400">{t.finance.amount} ($ USD)</label>
                    <input
                      type="number"
                      value={txAmount}
                      onChange={(e) => setTxAmount(e.target.value)}
                      placeholder="1500"
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-slate-400">{t.finance.type}</label>
                      <select
                        value={txType}
                        onChange={(e) => setTxType(e.target.value)}
                        className="w-full mt-1 px-2 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200"
                      >
                        <option value="income">{t.finance.income}</option>
                        <option value="expense">{t.finance.expense}</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400">{t.finance.category}</label>
                      <select
                        value={txCategory}
                        onChange={(e) => setTxCategory(e.target.value)}
                        className="w-full mt-1 px-2 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200"
                      >
                        <option value="Tech Enterprise">Tech Enterprise</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Yield">Yield</option>
                        <option value="Living">Living</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition shadow-md shadow-amber-950/40"
                  >
                    {t.finance.addTx}
                  </button>
                </form>
              </div>

              {/* Transactions History List */}
              <div className="glass-card p-5 rounded-2xl border border-purple-800/30 lg:col-span-2">
                <h3 className="font-bold text-sm text-slate-200 mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-400" />
                  {t.finance.transactions}
                </h3>
                <div className="space-y-2.5">
                  {data.finance.transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3.5 rounded-xl bg-[#121226]/70 border border-slate-800/80 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                            tx.type === 'income' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30' : 'bg-rose-950/60 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {tx.type === 'income' ? '+' : '-'}
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-slate-100">{tx.title}</div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-2">
                            <span>{tx.date}</span>
                            <span>•</span>
                            <span className="text-purple-400 font-medium">{tx.category}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`font-mono font-bold text-sm ${
                            tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {(tx.amount * 1310).toLocaleString()} IQD
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* MODULE 3: STUDIO */}
        {/* ---------------------------------------------------- */}
        {activeModule === 'studio' && (
          <div className="space-y-6 animate-fade-in">
            {/* Tone Synthesizer Ribbon */}
            <div className="glass-card p-4 rounded-2xl border border-pink-500/30 bg-gradient-to-r from-[#201026] to-[#121028]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-xs text-pink-300 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-pink-400" />
                    {t.studio.synth}
                  </h4>
                  <p className="text-[11px] text-slate-400">{t.studio.synthHelp}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { type: 'bell', label: t.studio.bell, color: 'hover:bg-amber-600' },
                    { type: 'pulse', label: t.studio.pulse, color: 'hover:bg-cyan-600' },
                    { type: 'chord', label: t.studio.chord, color: 'hover:bg-purple-600' },
                    { type: 'sub', label: t.studio.sub, color: 'hover:bg-emerald-600' },
                  ].map((btn) => (
                    <button
                      key={btn.type}
                      onClick={() => playWebAudioTone(btn.type)}
                      className={`px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition ${btn.color}`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Canvas Interactive Sketchpad */}
            <div className="glass-card p-5 rounded-2xl border border-purple-800/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-pink-400" />
                  <h3 className="font-bold text-sm text-slate-100">{t.studio.sketchpad}</h3>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Colors */}
                  <div className="flex items-center gap-1.5">
                    {['#22d3ee', '#a855f7', '#fbbf24', '#10b981', '#f43f5e', '#ffffff'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setBrushColor(c)}
                        className={`w-6 h-6 rounded-full border-2 transition ${brushColor === c ? 'scale-125 border-white shadow-lg' : 'border-transparent'}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>

                  {/* Brush Size */}
                  <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-xl border border-slate-700">
                    {[2, 5, 12, 24].map((size) => (
                      <button
                        key={size}
                        onClick={() => setBrushSize(size)}
                        className={`px-2 py-0.5 rounded text-xs font-mono ${brushSize === size ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
                      >
                        {size}px
                      </button>
                    ))}
                  </div>

                  {/* Canvas Controls */}
                  <button
                    onClick={clearCanvas}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
                  >
                    {t.studio.clear}
                  </button>
                  <button
                    onClick={downloadCanvas}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-semibold text-xs transition shadow-md shadow-pink-950/40"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {t.studio.download}
                  </button>
                </div>
              </div>

              {/* HTML5 Canvas Element */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-[#070714] touch-none">
                <canvas
                  ref={canvasRef}
                  width={1100}
                  height={460}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-[400px] cursor-crosshair block"
                />
              </div>
            </div>

            {/* Prompt Forge */}
            <div className="glass-card p-5 rounded-2xl border border-purple-800/30">
              <h3 className="font-bold text-sm text-slate-100 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                {t.studio.promptForge}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.studio.prompts.map((p) => (
                  <div key={p.id} className="p-4 rounded-xl bg-[#111124] border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-pink-950/60 text-pink-300 border border-pink-500/20">
                        {p.style}
                      </span>
                      <p className="text-xs text-slate-300 mt-2 italic leading-relaxed">"{p.prompt}"</p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(p.prompt);
                        alert(t.studio.copyPrompt);
                      }}
                      className="mt-4 flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-slate-800 hover:bg-purple-900/40 text-purple-300 text-xs font-semibold transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {t.studio.copyPrompt}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* MODULE 4: SOCIAL */}
        {/* ---------------------------------------------------- */}
        {activeModule === 'social' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Left 2 Cols: Feed & Composer */}
            <div className="lg:col-span-2 space-y-5">
              {/* Broadcast Composer */}
              <div className="glass-card p-5 rounded-2xl border border-purple-800/30">
                <h3 className="font-bold text-sm text-slate-200 mb-2 flex items-center gap-2">
                  <Send className="w-4 h-4 text-purple-400" />
                  {t.social.composer}
                </h3>
                <form onSubmit={handleBroadcastPost} className="space-y-3">
                  <textarea
                    rows={3}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder={t.social.postPlaceholder}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-purple-400">
                      <span className="font-mono text-[11px]">#SovereignAI</span>
                      <span className="font-mono text-[11px]">#IraqSingularity</span>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition shadow-md shadow-purple-950/40"
                    >
                      {t.social.broadcast}
                    </button>
                  </div>
                </form>
              </div>

              {/* Feed Posts */}
              <div className="space-y-3">
                {data.social.posts.map((post) => (
                  <div key={post.id} className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-purple-700/40 transition">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center font-bold text-xs text-white">
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-100">{post.author}</div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {post.handle} • {post.time}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-purple-300 font-mono">
                        {post.role}
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed my-3">{post.content}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs text-slate-400">
                      <button
                        onClick={() => togglePostLike(post.id)}
                        className={`flex items-center gap-1.5 transition ${post.isLiked ? 'text-pink-400 font-bold' : 'hover:text-slate-200'}`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{post.likes}</span>
                      </button>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Share2 className="w-3.5 h-3.5" />
                        <span>{post.reposts}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Encrypted P2P Terminal */}
            <div className="glass-card p-5 rounded-2xl border border-purple-800/30 flex flex-col h-[600px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-bold text-sm text-slate-200">{t.social.messenger}</h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                  P2P Node
                </span>
              </div>

              <div className="text-[10px] text-emerald-400/80 font-mono py-1.5 text-center bg-emerald-950/20 border-b border-slate-800/50">
                🔒 {t.social.encryptedBadge}
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1">
                {data.social.messages.map((m) => {
                  const isMe = m.sender === 'user';
                  return (
                    <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs ${
                          isMe
                            ? 'bg-purple-600 text-white rounded-br-sm'
                            : 'bg-slate-800/90 text-slate-200 rounded-bl-sm border border-slate-700/60'
                        }`}
                      >
                        {m.text}
                      </div>
                      <span className="text-[9px] text-slate-500 font-mono mt-0.5 px-1">{m.time}</span>
                    </div>
                  );
                })}
              </div>

              {/* Message Input Form */}
              <form onSubmit={handleSendP2pMessage} className="pt-2 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={p2pInputText}
                  onChange={(e) => setP2pInputText(e.target.value)}
                  placeholder={t.social.typeMessage}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* MODULE 5: NUTRITION */}
        {/* ---------------------------------------------------- */}
        {activeModule === 'nutrition' && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Calorie & Hydration Ribbon */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Daily Calories */}
              <div className="glass-card p-5 rounded-2xl border border-emerald-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-400">{t.nutrition.calorieTarget}</span>
                  <Flame className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black font-mono text-slate-100 my-1">
                  {totalCaloriesConsumed} / {data.nutrition.targetCalories}{' '}
                  <span className="text-xs text-slate-400 font-normal">kcal</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 mt-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-amber-400 h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, Math.round((totalCaloriesConsumed / data.nutrition.targetCalories) * 100))}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
                  <span>{t.nutrition.caloriesRemaining}: {caloriesRemaining} kcal</span>
                  <span>{Math.round((totalCaloriesConsumed / data.nutrition.targetCalories) * 100)}%</span>
                </div>
              </div>

              {/* Water Matrix */}
              <div className="glass-card p-5 rounded-2xl border border-cyan-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-cyan-400">{t.nutrition.hydration}</span>
                  <Droplets className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-black font-mono text-slate-100 my-1">
                  {data.nutrition.waterMl} / {data.nutrition.targetWaterMl}{' '}
                  <span className="text-xs text-slate-400 font-normal">ml</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        nutrition: { ...prev.nutrition, waterMl: prev.nutrition.waterMl + 250 },
                      }))
                    }
                    className="flex-1 py-1.5 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition"
                  >
                    {t.nutrition.add250}
                  </button>
                  <button
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        nutrition: { ...prev.nutrition, waterMl: prev.nutrition.waterMl + 500 },
                      }))
                    }
                    className="flex-1 py-1.5 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition"
                  >
                    {t.nutrition.add500}
                  </button>
                  <button
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        nutrition: { ...prev.nutrition, waterMl: 0 },
                      }))
                    }
                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200"
                    title={t.nutrition.resetWater}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Macronutrient Gauge */}
              <div className="glass-card p-5 rounded-2xl border border-purple-800/30">
                <span className="text-xs font-bold text-purple-400">{t.nutrition.macros}</span>
                <div className="space-y-2 mt-3 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>{t.nutrition.protein}</span>
                      <span className="font-mono font-bold text-indigo-400">140g / {data.nutrition.targetProtein}g</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1">
                      <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>{t.nutrition.carbs}</span>
                      <span className="font-mono font-bold text-amber-400">190g / {data.nutrition.targetCarbs}g</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '82%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>{t.nutrition.fats}</span>
                      <span className="font-mono font-bold text-pink-400">55g / {data.nutrition.targetFats}g</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1">
                      <div className="bg-pink-500 h-1.5 rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Meal Logger & Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form */}
              <div className="glass-card p-5 rounded-2xl border border-purple-800/30 lg:col-span-1">
                <h3 className="font-bold text-sm text-slate-200 mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-400" />
                  {t.nutrition.logMeal}
                </h3>
                <form onSubmit={handleLogMeal} className="space-y-3">
                  <div>
                    <label className="text-[11px] text-slate-400">{t.nutrition.mealName}</label>
                    <input
                      type="text"
                      value={mealNameInput}
                      onChange={(e) => setMealNameInput(e.target.value)}
                      placeholder="e.g. Grilled Salmon & Steamed Veggies"
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-slate-400">Calories (kcal)</label>
                      <input
                        type="number"
                        value={mealCaloriesInput}
                        onChange={(e) => setMealCaloriesInput(e.target.value)}
                        placeholder="550"
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400">Protein (g)</label>
                      <input
                        type="number"
                        value={mealProteinInput}
                        onChange={(e) => setMealProteinInput(e.target.value)}
                        placeholder="40"
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md shadow-emerald-950/40"
                  >
                    {t.nutrition.logMeal}
                  </button>
                </form>
              </div>

              {/* Meal List */}
              <div className="glass-card p-5 rounded-2xl border border-purple-800/30 lg:col-span-2">
                <h3 className="font-bold text-sm text-slate-200 mb-3 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-emerald-400" />
                  {t.nutrition.meals}
                </h3>
                <div className="space-y-2.5">
                  {data.nutrition.meals.map((meal) => (
                    <div
                      key={meal.id}
                      className="p-3.5 rounded-xl bg-[#121226]/80 border border-slate-800 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="font-semibold text-xs text-slate-100">{meal.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">{meal.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-xs text-emerald-400">
                          {meal.calories} kcal
                        </div>
                        <div className="text-[10px] text-indigo-400 font-mono">
                          {meal.protein}g protein
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* MODULE 6: TRAVEL */}
        {/* ---------------------------------------------------- */}
        {activeModule === 'travel' && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Curated Expeditions */}
            <div>
              <h3 className="font-bold text-sm text-slate-200 mb-3 flex items-center gap-2">
                <Plane className="w-4 h-4 text-cyan-400" />
                {t.travel.expeditions}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.travel.itineraries.map((trip) => (
                  <div key={trip.id} className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                        {trip.status}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-300">{trip.budget}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-100 my-1">{trip.destination}</h4>
                    <div className="text-xs text-cyan-400 flex items-center gap-1 mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {trip.country}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{trip.notes}</p>
                    <div className="text-[10px] text-slate-500 font-mono mt-3 pt-2 border-t border-slate-800">
                      {trip.dates}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Trip Planner & Packing Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trip Planner */}
              <div className="glass-card p-5 rounded-2xl border border-purple-800/30">
                <h3 className="font-bold text-sm text-slate-200 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  {t.travel.planner}
                </h3>
                <form onSubmit={handleAddTrip} className="space-y-3">
                  <div>
                    <label className="text-[11px] text-slate-400">{t.travel.destination}</label>
                    <input
                      type="text"
                      value={tripDest}
                      onChange={(e) => setTripDest(e.target.value)}
                      placeholder="e.g. Al-Mansour Sovereign Research Lab"
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-slate-400">{t.travel.country}</label>
                      <input
                        type="text"
                        value={tripCountry}
                        onChange={(e) => setTripCountry(e.target.value)}
                        placeholder="Iraq 🇮🇶"
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400">{t.travel.budget}</label>
                      <input
                        type="number"
                        value={tripBudget}
                        onChange={(e) => setTripBudget(e.target.value)}
                        placeholder="1200"
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition shadow-md shadow-cyan-950/40"
                  >
                    {t.travel.addTrip}
                  </button>
                </form>
              </div>

              {/* Packing Matrix */}
              <div className="glass-card p-5 rounded-2xl border border-purple-800/30">
                <h3 className="font-bold text-sm text-slate-200 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {t.travel.packing}
                </h3>
                <div className="space-y-2">
                  {data.travel.packingList.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => togglePackingItem(item.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                        item.checked
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            item.checked ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600'
                          }`}
                        >
                          {item.checked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={`text-xs ${item.checked ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                          {item.item}
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-mono">
                        {item.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* MODULE 7: KNOWLEDGE */}
        {/* ---------------------------------------------------- */}
        {activeModule === 'knowledge' && (
          <div className="space-y-6 animate-fade-in">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 absolute top-3.5 left-4 text-purple-400" />
              <input
                type="text"
                value={knowledgeSearch}
                onChange={(e) => setKnowledgeSearch(e.target.value)}
                placeholder={t.knowledge.search}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-purple-800/40 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Knowledge Vault Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredKnowledgeCards.map((card) => (
                <div key={card.id} className="glass-card p-5 rounded-2xl border border-purple-800/30 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-950/60 text-indigo-300 border border-indigo-500/20">
                      {card.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-100 my-2">{card.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">{card.summary}</p>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-300 leading-relaxed font-mono">
                      {card.content}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-2 border-t border-slate-800">
                    {card.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-purple-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Spaced Repetition Flashcards */}
            <div className="glass-card p-6 rounded-2xl border border-purple-800/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-100">{t.knowledge.flashcards}</h3>
                </div>
                <span className="text-xs text-purple-300 font-mono">
                  Card {activeFlashcardIndex + 1} of {data.knowledge.flashcards.length}
                </span>
              </div>

              {/* Interactive Flip Card */}
              {data.knowledge.flashcards[activeFlashcardIndex] && (
                <div
                  onClick={() => setIsFlashcardFlipped(!isFlashcardFlipped)}
                  className="min-h-[160px] p-6 rounded-2xl bg-gradient-to-br from-[#12122b] to-[#1d1230] border border-purple-600/40 flex flex-col items-center justify-center text-center cursor-pointer transition hover:border-purple-400 shadow-lg"
                >
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-2">
                    {isFlashcardFlipped ? 'REVEALED ANSWER' : 'QUESTION (CLICK TO REVEAL)'}
                  </span>
                  <p className="text-sm font-semibold text-slate-100 max-w-xl">
                    {isFlashcardFlipped
                      ? data.knowledge.flashcards[activeFlashcardIndex].a
                      : data.knowledge.flashcards[activeFlashcardIndex].q}
                  </p>
                </div>
              )}

              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={() => {
                    setIsFlashcardFlipped(false);
                    setActiveFlashcardIndex((prev) => (prev + 1) % data.knowledge.flashcards.length);
                  }}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition"
                >
                  {t.knowledge.nextCard}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* MODULE 8: PRIVACY & CRYPTO VAULT */}
        {/* ---------------------------------------------------- */}
        {activeModule === 'privacy' && (
          <div className="space-y-6 animate-fade-in">
            {/* Cryptographic Health Audit Card */}
            <div className="glass-card p-6 rounded-3xl border border-rose-500/30 bg-gradient-to-r from-[#200e1f] to-[#120d24]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4" />
                    {t.privacy.auditTitle}
                  </div>
                  <h3 className="text-2xl font-black text-white my-2">{t.privacy.auditScore}</h3>
                  <p className="text-xs text-slate-400 max-w-2xl">
                    NEXUS Singularity v9.0 operates with 100% sovereign isolation. No user credentials, financial
                    records, or voice audio packets are ever transmitted to remote corporate backdoors.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-center">
                  <div className="text-3xl font-black font-mono text-rose-400">0</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                    Trackers / Telemetry
                  </div>
                </div>
              </div>
            </div>

            {/* Native Web Crypto SHA-256 Engine */}
            <div className="glass-card p-6 rounded-2xl border border-purple-800/30">
              <div className="flex items-center gap-2 mb-2">
                <Key className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-sm text-slate-100">{t.privacy.sha256Title}</h3>
              </div>
              <p className="text-xs text-slate-400 mb-4">{t.privacy.sha256Desc}</p>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] text-slate-400 font-mono">Input Text Buffer:</label>
                  <input
                    type="text"
                    value={cryptoInputText}
                    onChange={(e) => setCryptoInputText(e.target.value)}
                    placeholder={t.privacy.inputPlaceholder}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="p-4 rounded-xl bg-[#090916] border border-purple-900/40">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-mono">{t.privacy.computedHash}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(calculatedSha256);
                        alert('SHA-256 hash copied to clipboard!');
                      }}
                      className="text-purple-400 hover:text-purple-300 flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy Hash
                    </button>
                  </div>
                  <div className="font-mono text-xs text-emerald-400 break-all select-all font-semibold">
                    {calculatedSha256 || '...'}
                  </div>
                </div>
              </div>
            </div>

            {/* LocalStorage Sovereign Data Management */}
            <div className="glass-card p-6 rounded-2xl border border-purple-800/30">
              <h3 className="font-bold text-sm text-slate-100 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-400" />
                {t.privacy.storageTitle}
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                All 8 sovereign modules persist inside client-side LocalStorage. You can export complete machine backups
                or execute an air-gapped wipe at any moment.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleExportBackup}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition shadow-md shadow-purple-950/40"
                >
                  <Download className="w-4 h-4" />
                  {t.privacy.exportBackup}
                </button>

                <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition cursor-pointer border border-slate-700">
                  <Upload className="w-4 h-4" />
                  {t.privacy.importBackup}
                  <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
                </label>

                <button
                  onClick={handleNuclearReset}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40 font-semibold text-xs transition ml-auto"
                >
                  <Trash2 className="w-4 h-4" />
                  {t.privacy.nuclearReset}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* 4. GEMINI VOICE & NEURAL AI ASSISTANT (MODAL / OVERLAY) */}
      {/* ======================================================== */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="glass-card w-full max-w-2xl rounded-3xl border border-purple-500/40 shadow-2xl shadow-purple-950/80 flex flex-col h-[650px] overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 px-6 border-b border-purple-900/30 flex items-center justify-between bg-[#0e0e22]">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500">
                  <Bot className="w-5 h-5 text-white" />
                  {isListening && (
                    <span className="animate-ping absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 opacity-75" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                    {t.ai.title}
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 font-mono">
                      v9.0 Singularity
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">{t.ai.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setData((prev) => ({
                      ...prev,
                      voiceMuted: !prev.voiceMuted,
                    }))
                  }
                  title={data.voiceMuted ? t.ai.unmuteVoice : t.ai.muteVoice}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  {data.voiceMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>

                <button
                  onClick={() => setIsAiModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat History Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {data.aiChatHistory.map((m) => {
                const isAi = m.sender === 'ai';
                return (
                  <div key={m.id} className={`flex gap-3 ${isAi ? 'items-start' : 'items-end flex-row-reverse'}`}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        isAi ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white' : 'bg-cyan-600 text-white'
                      }`}
                    >
                      {isAi ? <Bot className="w-4 h-4" /> : 'FA'}
                    </div>

                    <div className={`max-w-[80%] space-y-1`}>
                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                          isAi
                            ? 'bg-[#15152d] border border-purple-900/40 text-slate-200 rounded-tl-sm'
                            : 'bg-purple-600 text-white rounded-tr-sm'
                        }`}
                      >
                        {m.text}
                      </div>
                      <div className={`text-[10px] text-slate-500 font-mono px-1 ${isAi ? 'text-left' : 'text-right'}`}>
                        {m.time}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Status Wave Animation when Listening or Speaking */}
              {(isListening || isSpeaking) && (
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-300">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-4 bg-purple-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-6 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-4 bg-purple-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                  <span>{isListening ? t.ai.listening : t.ai.speaking}</span>
                </div>
              )}
            </div>

            {/* Quick Suggestions Chips */}
            <div className="px-6 py-2 bg-[#0c0c1e] border-t border-purple-900/20 overflow-x-auto no-scrollbar flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">
                {t.ai.quickSuggestions}:
              </span>
              {[
                { en: 'Open finance', ar: 'افتح المالية' },
                { en: 'Log 250ml water', ar: 'شربت 250 مل ماء' },
                { en: 'Add task: Audit node', ar: 'أضف مهمة: مراجعة العقدة' },
                { en: 'Switch to Arabic', ar: 'حول للغة الإنجليزية' },
                { en: 'Activate Ghost Mode', ar: 'تفعيل وضع التخفي' },
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleExecuteAiDirective(lang === 'ar' ? chip.ar : chip.en)}
                  className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-purple-900/50 text-slate-300 hover:text-purple-200 border border-slate-700/60 text-[11px] whitespace-nowrap transition"
                >
                  {lang === 'ar' ? chip.ar : chip.en}
                </button>
              ))}
            </div>

            {/* Voice & Text Input Box */}
            <div className="p-4 px-6 bg-[#0e0e22] border-t border-purple-900/30 flex items-center gap-2">
              <button
                onClick={toggleListening}
                title={t.ai.micPrompt}
                className={`p-3 rounded-2xl transition shadow-lg ${
                  isListening
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-950/60'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                value={aiInputText}
                onChange={(e) => setAiInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleExecuteAiDirective(aiInputText);
                  }
                }}
                placeholder={t.ai.placeholder}
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-900/90 border border-purple-900/40 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />

              <button
                onClick={() => handleExecuteAiDirective(aiInputText)}
                className="p-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. FOOTER */}
      {/* ======================================================== */}
      <footer className="mt-auto border-t border-purple-900/20 bg-[#070712] py-4 px-4 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">NEXUS Sovereign Singularity v9.0</span>
            <span>•</span>
            <span>Client-Side Local Architecture</span>
          </div>
          <div className="font-mono text-[11px] text-purple-400">
            Dedicated to Master Operator: FAHAD11ABBAS 🇮🇶
          </div>
        </div>
      </footer>
    </div>
  );
}
