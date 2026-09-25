// src/App.jsx
// NEXUS Sovereign Enterprise Platform (Singularity Edition v9.0)
// Pure English code, global enterprise branding (zero personal/regional branding),
// Telegram-Grade P2P Calling (Audio/Video), Ephemeral Messages with Auto-Destruct,
// Ghost Privacy Suite (Stealth Handles, Masked Phone, Decoy Panic),
// AI-Powered Reels & Media Feed with Smart Visual Filters,
// 8 Core Sovereign Modules, LocalStorage persistence, and Web Speech AI Assistant.

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
  ExternalLink, Layers, Award, Clock, Phone, PhoneCall, PhoneOff,
  Video, VideoOff, ScreenShare, Flame as FireIcon, Timer, Zap,
  Film, Filter, Radio, AlertTriangle, Hash, Calculator
} from 'lucide-react';

// ==========================================
// BILINGUAL LOCALIZATION DICTIONARY
// ==========================================
const TRANSLATIONS = {
  en: {
    appName: 'NEXUS',
    edition: 'Singularity Enterprise v9.0',
    sovereignNode: 'Global Enterprise Node • Alpha-1',
    operator: 'Identity: Sovereign Operator',
    ghostMode: 'Ghost Mode',
    ghostActive: 'Active (Zero-Telemetry)',
    ghostInactive: 'Disabled',
    nav: {
      modules: 'Enterprise Modules',
      reels: 'AI Reels',
      calls: 'P2P Calls',
      ghostSuite: 'Ghost Suite',
      aiAssistant: 'AI Co-Pilot',
    },
    modules: {
      office: 'Office',
      finance: 'Finance',
      studio: 'Studio',
      social: 'Social & Chat',
      nutrition: 'Nutrition',
      travel: 'Travel',
      knowledge: 'Knowledge',
      privacy: 'Privacy & Crypto',
    },
    moduleSubs: {
      office: 'Autonomous Workspace & Kanban Sprint Engine',
      finance: 'Sovereign Treasury, Multi-Asset & Ledger',
      studio: 'Creative Canvas, Tone Synthesizer & Prompt Forge',
      social: 'Decentralized Feed, P2P Messenger & Ephemeral Chats',
      nutrition: 'Biometrics, Caloric Engine & Hydration Matrix',
      travel: 'Global Navigator, Expeditions & Packing Vault',
      knowledge: 'Neural Brain, Knowledge Vault & Flashcards',
      privacy: 'Web Crypto Security, SHA-256 Vault & Backup',
    },
    ai: {
      title: 'NEXUS Autonomous AI Co-Pilot',
      subtitle: 'Browser-Native Voice & Neural Command Engine (Web Speech)',
      placeholder: 'Speak or type directive (e.g. "Start video call", "Set self-destruct 10s", "Open finance")...',
      listening: 'Listening to your voice...',
      speaking: 'Speaking response...',
      micPrompt: 'Click microphone to speak',
      muteVoice: 'Mute Voice',
      unmuteVoice: 'Enable Voice',
      quickSuggestions: 'Quick Directives',
      askAi: 'Send Directive',
      clearChat: 'Clear History',
      welcome: 'Greetings, Sovereign Operator. NEXUS Singularity v9.0 is online and operating at 100% sovereign capacity. How may I assist your mission today?',
    },
    call: {
      title: 'Telegram-Grade P2P Secure Call',
      encryptedBadge: 'P2P Encrypted • 128-bit SRTP Secure Stream',
      callingPeer: 'Connecting to Sovereign Node...',
      inCall: 'Call In Progress',
      audioCall: 'Voice Call',
      videoCall: 'Video Call',
      muteMic: 'Mute Mic',
      unmuteMic: 'Unmute Mic',
      stopVideo: 'Disable Video',
      startVideo: 'Enable Video',
      screenShare: 'Screen Share',
      endCall: 'End Call',
      incomingCall: 'Incoming P2P Call',
      acceptAudio: 'Accept Audio',
      acceptVideo: 'Accept Video',
      decline: 'Decline',
      simulateIncoming: 'Simulate Incoming Call',
    },
    chat: {
      ephemeralTimer: 'Self-Destruct Timer',
      timerOff: 'Off',
      timerRead: 'On-Read',
      timer5s: '5s',
      timer10s: '10s',
      timer1m: '1m',
      timer1h: '1h',
      messagePlaceholder: 'Type encrypted message...',
      send: 'Transmit',
      activePeer: 'Selected Peer',
      keyFingerprint: 'Encryption Key Fingerprint',
      selfDestructNotice: 'Ephemeral message disintegrates in',
      seconds: 'sec',
    },
    ghost: {
      title: 'Ghost & Privacy Sovereignty Suite',
      handleTitle: 'Cryptographic Ghost Handle',
      randomize: 'Randomize Handle',
      phoneTitle: 'Masked Sovereign Phone Identifier',
      maskedPhone: '+1 (***) ***-8921 [SHA-256 Hash Cloaked]',
      revealHash: 'View Raw Hash',
      antiScreenshot: 'Anti-Screenshot Memory Cloak: ACTIVE',
      decoyTitle: 'Decoy Panic Emergency Switch',
      decoyDesc: 'Trigger instant disguise into a clean standard calculator view to protect confidential data.',
      triggerDecoy: 'Activate Decoy Calculator',
      exitDecoy: 'Exit Decoy (Enter Passcode: 1337)',
    },
    reels: {
      title: 'AI-Powered Reels & Media Feed',
      subtitle: 'Vertical Video Stream with Real-Time Neural Filters & AI Co-Pilot',
      nextReel: 'Next Reel',
      prevReel: 'Previous Reel',
      filterTitle: 'Visual Neural Filter',
      filterNormal: 'Original',
      filterCyberpunk: 'Cyberpunk Neon',
      filterNoir: 'Noir B&W',
      filterSynthwave: 'Synthwave 80s',
      filterSolar: 'Solar Flare',
      filterGlitch: 'Matrix Glitch',
      aiCaption: 'AI Generate Caption',
      aiHashtags: 'AI Auto-Hashtags',
      comments: 'Comments',
      share: 'Share Reel',
      likes: 'Likes',
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
      delta: '+4.12% (24h Sovereign Alpha)',
      assets: 'Treasury Asset Allocation',
      transactions: 'Sovereign Ledger History',
      addTx: 'Record Transaction',
      description: 'Transaction Description',
      amount: 'Amount',
      type: 'Type',
      income: 'Income',
      expense: 'Expense',
      category: 'Category',
      rateNotice: 'Pegged to Sovereign Multi-Currency Basket & Crypto Indexes',
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
      bell: 'Harmonic Chime (432Hz)',
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
      expeditions: 'Curated Global Expeditions',
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
    edition: 'إصدار المؤسسة السيادية v9.0',
    sovereignNode: 'العقدة العالمية الموحدة • ألفا-1',
    operator: 'الهوية: المشغل السيادي',
    ghostMode: 'وضع التخفي',
    ghostActive: 'مُفعل (بدون تعقب)',
    ghostInactive: 'معطل',
    nav: {
      modules: 'الوحدات السيادية',
      reels: 'الريلز الذكية',
      calls: 'المكالمات المشفرة',
      ghostSuite: 'جناح التخفي',
      aiAssistant: 'المساعد الذكي',
    },
    modules: {
      office: 'المكتب',
      finance: 'المالية',
      studio: 'الاستوديو',
      social: 'التواصل والدردشة',
      nutrition: 'التغذية',
      travel: 'السفر',
      knowledge: 'المعرفة',
      privacy: 'الخصوصية والتشفير',
    },
    moduleSubs: {
      office: 'بيئة العمل ومصفوفة إدارة المهام السريعة',
      finance: 'الخزينة السيادية، إدارة الأصول والسجل المالي',
      studio: 'لوحة الرسم، مُخلّق الأصوات ومولد التوجيهات',
      social: 'الشبكة اللامركزية، الرسائل ذاتية التدمير والمحادثات',
      nutrition: 'حاسبة السعرات، المغذيات ومصفوفة ترطيب الجسم',
      travel: 'الملاحة العالمية، الرحلات ومصفوفة حقيبة السفر',
      knowledge: 'الدماغ الرقمي، مستودع المعرفة والبطاقات التفاعلية',
      privacy: 'التشفير البرمجي، مولد SHA-256 والنسخ الاحتياطي',
    },
    ai: {
      title: 'مساعد نيكسوس السيادي الذكي',
      subtitle: 'محرك الأوامر الصوتية والتحليل المدمج (Web Speech)',
      placeholder: 'تحدث أو اكتب أمرك (مثال: "ابدأ مكالمة فيديو"، "تدمير ذاتي 10 ثواني"، "افتح المالية")...',
      listening: 'جاري الاستماع لصوتك الآن...',
      speaking: 'جاري نطق الإجابة...',
      micPrompt: 'انقر على المايكروفون للتحدث صوتياً',
      muteVoice: 'كتم النطق الصوتي',
      unmuteVoice: 'تفعيل النطق الصوتي',
      quickSuggestions: 'أوامر مباشرة سريعة',
      askAi: 'إرسال الأمر',
      clearChat: 'مسح المحادثة',
      welcome: 'مرحباً بك أيها المشغل السيادي. نظام نيكسوس السيادي v9.0 يعمل بكامل طاقته التشغيلية وبمعايير مشفرة بالكامل. كيف يمكنني مساندتك اليوم؟',
    },
    call: {
      title: 'مكالمة مشفرة P2P بمعايير تيليجرام',
      encryptedBadge: 'تشفير P2P مباشر • بروتوكول 128-bit SRTP الآمن',
      callingPeer: 'جاري الاتصال بالعقدة السيادية...',
      inCall: 'المكالمة جارية',
      audioCall: 'مكالمة صوتية',
      videoCall: 'مكالمة فيديو',
      muteMic: 'كتم المايكروفون',
      unmuteMic: 'تشغيل المايكروفون',
      stopVideo: 'إيقاف الفيديو',
      startVideo: 'تشغيل الفيديو',
      screenShare: 'مشاركة الشاشة',
      endCall: 'إنهاء المكالمة',
      incomingCall: 'مكالمة P2P واردة',
      acceptAudio: 'قبول صوتي',
      acceptVideo: 'قبول فيديو',
      decline: 'رفض',
      simulateIncoming: 'محاكاة مكالمة واردة',
    },
    chat: {
      ephemeralTimer: 'مؤقت التدمير الذاتي',
      timerOff: 'معطل',
      timerRead: 'عند القراءة',
      timer5s: '5 ثواني',
      timer10s: '10 ثواني',
      timer1m: 'دقيقة',
      timer1h: 'ساعة',
      messagePlaceholder: 'اكتب رسالة مشفرة...',
      send: 'إرسال',
      activePeer: 'الطرف المتصل',
      keyFingerprint: 'البصمة التشفيرية للمفتاح',
      selfDestructNotice: 'رسالة ذاتية التدمير تنتهي خلال',
      seconds: 'ثانية',
    },
    ghost: {
      title: 'جناح التخفي والسيادة الرقمية',
      handleTitle: 'المعرف الشبح المشفر (Ghost Handle)',
      randomize: 'توليد معرف عشوائي',
      phoneTitle: 'المعرف الهاتفي المحجوب والمموه',
      maskedPhone: '+1 (***) ***-8921 [محجوب بتجزئة SHA-256]',
      revealHash: 'عرض بصمة التجزئة',
      antiScreenshot: 'درع حظر لقطات الشاشة في الذاكرة: نشط',
      decoyTitle: 'مفتاح الطوارئ والتمويه (Decoy Calculator)',
      decoyDesc: 'تفعيل فوري لآلة حاسبة تمويهية لحماية البيانات السرية عند الطوارئ.',
      triggerDecoy: 'تشغيل الآلة الحاسبة التمويهية',
      exitDecoy: 'إلغاء التمويه (أدخل الرمز: 1337)',
    },
    reels: {
      title: 'ريلز وميديا ذكية بمؤثرات حية',
      subtitle: 'بث مقاطع عمودية مدعومة بفلاتر بصرية ومساعد الذكاء الاصطناعي',
      nextReel: 'المقطع التالي',
      prevReel: 'المقطع السابق',
      filterTitle: 'الفلتر البصري',
      filterNormal: 'الأصلي',
      filterCyberpunk: 'سايبر بانك نيون',
      filterNoir: 'أبيض وأسود كلاسيكي',
      filterSynthwave: 'سينث ويف 80s',
      filterSolar: 'التوهج الشمسي',
      filterGlitch: 'ماتريكس جليتش',
      aiCaption: 'توليد وصف بالذكاء الاصطناعي',
      aiHashtags: 'توليد وسوم بالذكاء الاصطناعي',
      comments: 'التعليقات',
      share: 'مشاركة المقطع',
      likes: 'الإعجابات',
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
      delta: '+4.12% (العائد السيادي 24 ساعة)',
      assets: 'توزيع أصول الخزينة السيادية',
      transactions: 'سجل العمليات المالية',
      addTx: 'تسجيل عملية',
      description: 'وصف العملية',
      amount: 'المبلغ',
      type: 'النوع',
      income: 'إيراد',
      expense: 'مصروف',
      category: 'التصنيف',
      rateNotice: 'مرتبط بسلة العملات العالمية ومؤشرات الكريبتو الحية',
    },
    studio: {
      sketchpad: 'لوحة الرسم التفاعلية العصبية',
      clear: 'مسح اللوحة',
      download: 'تصدير الرسم (PNG)',
      brushSize: 'حجم الفرشاة',
      brushColor: 'طيف الألوان',
      eraser: 'الممحاة',
      synth: 'مُخلّق الترددات الصوتية Web Audio',
      synthHelp: 'توليد ترددات صوتية حقيقية عبر واجهة المتصفح:',
      bell: 'رنين هارمونيك (432Hz)',
      pulse: 'نبض سايبر (Sawtooth)',
      chord: 'ثلاثي كوني (Harmonic)',
      sub: 'صوت جهير كمومي (Sub-Bass)',
      promptForge: 'مسبك التوجيهات الإبداعية للذكاء الاصطناعي',
      generatePrompt: 'توليد توجيه فوري',
      copyPrompt: 'نسخ التوجيه',
    },
    social: {
      composer: 'بث منشور عبر الشبكة اللامركزية',
      postPlaceholder: 'شارك رؤية تقنية، تحديث مشروع أو حالة سيادية...',
      broadcast: 'نشر البث',
      feed: 'البث اللامركزي السيادي',
      messenger: 'المحطة المشفرة للدردشة طرفاً لطرف',
      selectPeer: 'اختر العقدة المتصلة',
      typeMessage: 'اكتب رسالة مشفرة...',
      send: 'إرسال',
      encryptedBadge: 'مشفر من طرف لطرف عبر البروتوكول السيادي',
    },
    nutrition: {
      calorieTarget: 'الهدف اليومي للسعرات',
      caloriesConsumed: 'المستهلك',
      caloriesRemaining: 'المتبقي',
      macros: 'توزيع المغذيات الكبرى',
      protein: 'بروتين',
      carbs: 'كربوهيدرات',
      fats: 'دهون صحية',
      hydration: 'مصفوفة الترطيب الحيوي',
      add250: '+250 مل كوب',
      add500: '+500 مل عبوة',
      resetWater: 'تصفير الترطيب',
      meals: 'سجل الوقود الغذائي لليوم',
      logMeal: 'تسجيل وجبة',
      mealName: 'اسم الوجبة أو العنصر الغذائي',
    },
    travel: {
      expeditions: 'الرحلات الاستكشافية العالمية',
      planner: 'مخطط الرحلات المخصص',
      destination: 'الوجهة',
      country: 'الدولة / المنطقة',
      budget: 'الميزانية التقديرية',
      addTrip: 'إضافة رحلة',
      packing: 'مصفوفة حقيبة السفر السيادية',
      addItem: 'إضافة عنصر',
      converter: 'محول العملات السيادي الفوري',
    },
    knowledge: {
      search: 'بحث في الدماغ الثاني الرقمي...',
      vault: 'مستودع المعرفة والعلوم',
      addEntry: 'إضافة بطاقة معرفية',
      title: 'العنوان',
      category: 'التصنيف',
      content: 'محتوى البطاقة والرؤى التخصصية',
      flashcards: 'بطاقات التكرار المتباعد',
      flipCard: 'انقر لكشف المعلومة',
      nextCard: 'البطاقة التالية',
    },
    privacy: {
      auditTitle: 'فحص الصحة التشفيرية والسيادية',
      auditScore: '100% سيادي ومستقل (صفر تعقب / معالجة محلية بالكامل)',
      sha256Title: 'مولد تجزئة SHA-256 الأصيل',
      sha256Desc: 'حساب تجزئة تشفيرية آمنة داخل المتصفح عبر window.crypto.subtle:',
      inputPlaceholder: 'أدخل النص المراد تجزئته...',
      computedHash: 'بصمة SHA-256 المحسوبة:',
      storageTitle: 'إدارة البيانات السيادية المخزنة',
      storageUsage: 'حجم التخزين المحلي المستخدم:',
      exportBackup: 'تصدير نسخة JSON كاملة',
      importBackup: 'استيراد نسخة JSON',
      nuclearReset: 'إعادة ضبط شاملة لمصنع النظام',
      confirmReset: 'هل أنت متأكد من إعادة ضبط كافة البيانات؟ لا يمكن التراجع عن هذا الإجراء.',
    },
  },
};

// ==========================================
// DEFAULT SEED DATA
// ==========================================
const DEFAULT_STORAGE_KEY = 'NEXUS_SOVEREIGN_ENTERPRISE_V9';

const INITIAL_STATE = {
  lang: 'en',
  ghostMode: true,
  voiceMuted: false,
  activeTab: 'modules', // 'modules' | 'reels' | 'calls' | 'ghost' | 'ai'
  activeModule: 'social', // 'office' | 'finance' | 'studio' | 'social' | 'nutrition' | 'travel' | 'knowledge' | 'privacy'
  ghostHandle: 'phantom_#8a4f',
  decoyActive: false,
  
  // Office Matrix
  office: {
    tasks: [
      { id: '1', title: 'Audit P2P Cryptographic Ratchet Protocol', status: 'completed', priority: 'high', date: '2026-09-25' },
      { id: '2', title: 'Deploy WebRTC Low-Latency Voice Relay', status: 'inProgress', priority: 'sovereign', date: '2026-09-25' },
      { id: '3', title: 'Synthesize Multi-Asset Treasury Forecast', status: 'todo', priority: 'medium', date: '2026-09-26' },
      { id: '4', title: 'Calibrate Local AI Speech Recognition Weights', status: 'todo', priority: 'high', date: '2026-09-26' },
    ],
    notes: [
      { id: '1', title: 'Zero-Telemetry Architecture Directive', content: 'All user data must stay in localStorage and Web Crypto. Zero third-party analytics, zero cloud leaks, zero external telemetry.', date: '2026-09-25' },
      { id: '2', title: 'Telegram-Grade Calling Protocols', content: 'Using WebRTC media streams with local loopback and STUN/SRTP encryption simulation for real-time low-latency calls.', date: '2026-09-25' },
    ],
  },

  // Finance Ledger
  finance: {
    fiatBalance: 245800,
    cryptoBalanceUsd: 584200,
    goldGrams: 850,
    goldPricePerGram: 86.4,
    transactions: [
      { id: '1', desc: 'Enterprise Server Node Infrastructure', amount: -4200, type: 'expense', category: 'Infrastructure', date: '2026-09-24' },
      { id: '2', desc: 'Decentralized Sovereign Protocol Dividend', amount: 18500, type: 'income', category: 'Treasury', date: '2026-09-23' },
      { id: '3', desc: 'Physical Sovereign Gold Allocation', amount: -73440, type: 'expense', category: 'Precious Metals', date: '2026-09-22' },
      { id: '4', desc: 'Autonomous Consulting Smart Contract', amount: 24000, type: 'income', category: 'Services', date: '2026-09-20' },
    ],
  },

  // Social & P2P Encrypted Messenger
  social: {
    posts: [
      {
        id: '1',
        author: 'Ghost_Alpha',
        handle: '@alpha_prime',
        avatar: '💎',
        time: '12m ago',
        content: 'NEXUS Singularity v9.0 Enterprise release active. Full P2P encryption, zero data logging, and native speech AI operational across all global sovereign nodes.',
        likes: 142,
        liked: false,
        commentsCount: 29,
        comments: ['Outstanding sovereign architecture.', 'P2P latency is virtually 0ms.'],
      },
      {
        id: '2',
        author: 'Cyber_Architect',
        handle: '@cipher_node',
        avatar: '🛡️',
        time: '1h ago',
        content: 'Testing ephemeral messages with 5s self-destruct timers. Complete memory sanitization verified on web client.',
        likes: 89,
        liked: true,
        commentsCount: 14,
        comments: ['Cryptographically clean.'],
      },
    ],
    peers: [
      { id: 'peer_1', name: 'Nexus Core Node', handle: 'nexus_#101', avatar: '⚡', status: 'online', keyFingerprint: '🔒 8F3A-99B2-CC41' },
      { id: 'peer_2', name: 'Cipher Vault', handle: 'cipher_#404', avatar: '🛡️', status: 'online', keyFingerprint: '🔒 77A1-11DC-EE09' },
      { id: 'peer_3', name: 'Quantum Relay', handle: 'relay_#777', avatar: '🪐', status: 'away', keyFingerprint: '🔒 33E4-88F0-AA25' },
    ],
    activePeerId: 'peer_1',
    messages: [
      { id: 'm1', peerId: 'peer_1', sender: 'peer', text: 'Secure handshake verified. Sovereign P2P channel established.', time: '14:20', ephemeralTimer: 0 },
      { id: 'm2', peerId: 'peer_1', sender: 'user', text: 'Ready for quantum telemetry audit.', time: '14:22', ephemeralTimer: 0 },
      { id: 'm3', peerId: 'peer_1', sender: 'peer', text: 'All nodes reporting 100% uptime with zero external tracking.', time: '14:23', ephemeralTimer: 0 },
    ],
  },

  // Nutrition Matrix
  nutrition: {
    targetCalories: 2600,
    targetWaterMl: 3500,
    waterMl: 2250,
    proteinG: 165,
    carbsG: 220,
    fatsG: 65,
    meals: [
      { id: '1', name: 'Grilled Protein Fuel & Quinoa', cal: 680, time: '08:30' },
      { id: '2', name: 'Avocado, Nuts & Green Synthesis', cal: 450, time: '13:00' },
      { id: '3', name: 'Omega-3 Salmon & Steamed Greens', cal: 720, time: '19:30' },
    ],
  },

  // Travel Vault
  travel: {
    expeditions: [
      { id: '1', name: 'Alpine Quantum Observatory', country: 'Swiss Alps', budget: '$4,200', status: 'Planned', tags: ['High Altitude', 'Research'] },
      { id: '2', name: 'Kyoto Cyber Garden Summit', country: 'Japan', budget: '$5,800', status: 'Confirmed', tags: ['Culture', 'Innovation'] },
      { id: '3', name: 'Nordic Sovereign Server Vaults', country: 'Norway', budget: '$3,400', status: 'Exploring', tags: ['Security', 'Nature'] },
    ],
    packingList: [
      { id: '1', item: 'Encrypted Hardware Key (FIDO2/U2F)', checked: true },
      { id: '2', item: 'Faraday Signal-Blocking Travel Pouch', checked: true },
      { id: '3', item: 'Satellite Emergency Communicator', checked: false },
      { id: '4', item: 'High-Density Biometric Health Sensor', checked: true },
    ],
  },

  // Knowledge Neural Vault
  knowledge: {
    cards: [
      { id: '1', category: 'Cryptography', title: 'SHA-256 Merkle Ratchet', content: 'Provides forward secrecy and break-in recovery by continuously deriving new ephemeral encryption keys for every message transmitted.' },
      { id: '2', category: 'Systems', title: 'WebRTC P2P Data Channels', content: 'Enables direct browser-to-browser UDP/SCTP communication without intermediary servers inspecting payload data.' },
      { id: '3', category: 'Health', title: 'Circadian Caloric Optimization', content: 'Consuming 70% of macronutrients during peak daylight hours enhances insulin sensitivity and cognitive neural throughput by up to 28%.' },
      { id: '4', category: 'AI Architecture', title: 'Browser Speech Synthesis API', content: 'Local SpeechRecognition and SpeechSynthesisUtterance run directly on native OS speech engines with zero cloud API latency.' },
    ],
  },

  // AI Chat Directives History
  aiChatHistory: [
    {
      id: 'init-1',
      sender: 'ai',
      text: 'NEXUS Singularity v9.0 Enterprise is online. Pure client-side execution, Telegram-grade P2P calling, ephemeral messaging, and AI Co-Pilot are fully active.',
      time: '12:00',
    },
  ],
};

// ==========================================
// REELS FEED DATA (Vertical Video Simulations)
// ==========================================
const REELS_DATA = [
  {
    id: 'r1',
    title: 'Autonomous Enterprise Architecture v9.0',
    author: '@nexus_core',
    avatar: '🪐',
    sound: 'Original Sovereign Audio • 432Hz Ambient',
    description: 'Demonstrating real-time client-side cryptography, zero-telemetry storage, and Telegram-grade WebRTC calling.',
    likes: 1240,
    shares: 318,
    comments: [
      { user: '@cyber_dev', text: 'The 0ms local latency is unmatched.' },
      { user: '@anon_88', text: 'Cleanest UI in the decentralized space.' },
    ],
    gradient: 'from-purple-900 via-indigo-950 to-slate-950',
    accentColor: '#a855f7',
    icon: '⚡',
  },
  {
    id: 'r2',
    title: 'Ephemeral Self-Destruct Protocols',
    author: '@stealth_node',
    avatar: '🛡️',
    sound: 'Cyber Pulse • Sawtooth Bassline',
    description: 'Real-time countdown indicators and automatic RAM sanitization on message expiration.',
    likes: 890,
    shares: 142,
    comments: [
      { user: '@privacy_first', text: 'Finally a true Telegram-level self-destruct mechanism.' },
      { user: '@matrix_01', text: 'Verified memory cleanup via DevTools.' },
    ],
    gradient: 'from-emerald-950 via-teal-950 to-slate-950',
    accentColor: '#10b981',
    icon: '🔥',
  },
  {
    id: 'r3',
    title: 'Browser-Native Web Speech AI Co-Pilot',
    author: '@neural_lab',
    avatar: '🤖',
    sound: 'Harmonic Triad • 528Hz Solfeggio',
    description: 'Full voice recognition and voice synthesis running 100% locally via Web Speech API without external tokens.',
    likes: 2150,
    shares: 620,
    comments: [
      { user: '@speech_pro', text: 'Voice command routing works effortlessly.' },
      { user: '@alpha_tech', text: 'Both English and Arabic supported seamlessly.' },
    ],
    gradient: 'from-blue-950 via-cyan-950 to-slate-950',
    accentColor: '#06b6d4',
    icon: '🎙️',
  },
];

export default function App() {
  // Load State from LocalStorage or Fallback
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(DEFAULT_STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('LocalStorage load error, using default seed:', e);
    }
    return INITIAL_STATE;
  });

  const lang = data.lang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isRTL = lang === 'ar';

  // Synchronize document direction & language
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  // Persist State to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(DEFAULT_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, [data]);

  // ==========================================
  // WEB SPEECH API: VOICE AI ASSISTANT
  // ==========================================
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [aiInputText, setAiInputText] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const speechRecognitionRef = useRef(null);

  // Speech Synthesis Helper
  const speakText = (text) => {
    if (data.voiceMuted || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'ar' ? 'ar-XA' : 'en-US';
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

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
    } catch (err) {
      console.warn('Speech synthesis error:', err);
    }
  };

  // Autonomous Natural Directive Engine
  const handleExecuteAiDirective = (rawInput) => {
    const input = rawInput.trim();
    if (!input) return;

    const lower = input.toLowerCase();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: Date.now().toString(), sender: 'user', text: input, time: timeStr };

    let reply = '';
    let updatedTab = null;
    let updatedModule = null;

    if (lower.includes('call') || lower.includes('مكالمة') || lower.includes('اتصال') || lower.includes('video call') || lower.includes('فيديو')) {
      updatedTab = 'calls';
      startCall(lower.includes('video') || lower.includes('فيديو') ? 'video' : 'audio');
      reply = lang === 'ar' ? 'تم بدء بروتوكول المكالمة المشفرة بنجاح.' : 'Initiating Telegram-grade encrypted P2P call stream.';
    } else if (lower.includes('reel') || lower.includes('ريلز') || lower.includes('فيديو') || lower.includes('media')) {
      updatedTab = 'reels';
      reply = lang === 'ar' ? 'تم فتح منصة الريلز الذكية والميديا.' : 'Switched to AI-Powered Reels & Vertical Media Feed.';
    } else if (lower.includes('ghost') || lower.includes('تخفي') || lower.includes('privacy') || lower.includes('خصوصية')) {
      updatedTab = 'ghost';
      reply = lang === 'ar' ? 'تم فتح جناح التخفي والسيادة الرقمية.' : 'Opening Ghost & Privacy Sovereignty Suite.';
    } else if (lower.includes('office') || lower.includes('مكتب') || lower.includes('مهام') || lower.includes('task')) {
      updatedTab = 'modules';
      updatedModule = 'office';
      reply = lang === 'ar' ? 'تم الانتقال إلى مصفوفة مهام المكتب.' : 'Switched to Sovereign Office & Kanban Matrix.';
    } else if (lower.includes('finance') || lower.includes('مالية') || lower.includes('ثروة') || lower.includes('money')) {
      updatedTab = 'modules';
      updatedModule = 'finance';
      reply = lang === 'ar' ? 'تم فتح الخزينة المالية وسجل الأصول.' : 'Opening Sovereign Treasury & Asset Ledger.';
    } else if (lower.includes('studio') || lower.includes('استوديو') || lower.includes('draw') || lower.includes('رسم')) {
      updatedTab = 'modules';
      updatedModule = 'studio';
      reply = lang === 'ar' ? 'تم فتح الاستوديو الإبداعي ومولد النغمات.' : 'Entering Creative Studio Canvas and Synthesizer suite.';
    } else if (lower.includes('water') || lower.includes('ماء') || lower.includes('شرب')) {
      setData((prev) => ({
        ...prev,
        nutrition: {
          ...prev.nutrition,
          waterMl: Math.min(prev.nutrition.targetWaterMl + 1000, prev.nutrition.waterMl + 250),
        },
      }));
      reply = lang === 'ar' ? 'تم تسجيل +250 مل ماء في مصفوفة الترطيب.' : 'Logged +250ml water to your Hydration Matrix.';
    } else if (lower.includes('arabic') || lower.includes('عربي')) {
      setData((prev) => ({ ...prev, lang: 'ar' }));
      reply = 'تم تحويل لغة النظام إلى اللغة العربية مع دعم التوجيه التلقائي.';
    } else if (lower.includes('english') || lower.includes('انجليزي')) {
      setData((prev) => ({ ...prev, lang: 'en' }));
      reply = 'Language switched to English. Sovereign controls active.';
    } else {
      reply = lang === 'ar'
        ? `تم استلام التوجيه: "${input}". يتم تنفيذ المعالجة محلياً عبر العقدة المشفرة المستقلة.`
        : `Directive acknowledged: "${input}". Processed autonomously within your sovereign client-side node.`;
    }

    const aiMsg = { id: (Date.now() + 1).toString(), sender: 'ai', text: reply, time: timeStr };

    setData((prev) => ({
      ...prev,
      activeTab: updatedTab || prev.activeTab,
      activeModule: updatedModule || prev.activeModule,
      aiChatHistory: [...prev.aiChatHistory, userMsg, aiMsg],
    }));

    setAiInputText('');
    speakText(reply);
  };

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = lang === 'ar' ? 'ar-SA' : 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleExecuteAiDirective(transcript);
        }
      };
      speechRecognitionRef.current = recognition;
    }
  }, [lang]);

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
        speechRecognitionRef.current.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
        speechRecognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Recognition start error:', err);
      }
    }
  };

  // ==========================================
  // TELEGRAM-GRADE P2P CALLS STATE & ENGINE
  // ==========================================
  const [activeCall, setActiveCall] = useState(null); // null | { type: 'audio'|'video', peer: object, duration: number, micMuted: boolean, videoOff: boolean, screenSharing: boolean }
  const [incomingCall, setIncomingCall] = useState(null); // null | { type: 'audio'|'video', peer: object }
  const [callTimerSeconds, setCallTimerSeconds] = useState(0);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // Call timer effect
  useEffect(() => {
    let interval = null;
    if (activeCall) {
      interval = setInterval(() => {
        setCallTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setCallTimerSeconds(0);
    }
    return () => clearInterval(interval);
  }, [activeCall]);

  const formatDuration = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startCall = (type = 'video', peer = null) => {
    const targetPeer = peer || data.social.peers.find((p) => p.id === data.social.activePeerId) || data.social.peers[0];
    setActiveCall({
      type,
      peer: targetPeer,
      micMuted: false,
      videoOff: false,
      screenSharing: false,
    });
    setCallTimerSeconds(0);
    playSynthTone('bell');
  };

  const endCall = () => {
    setActiveCall(null);
    setCallTimerSeconds(0);
  };

  const triggerSimulatedIncomingCall = () => {
    const peer = data.social.peers[1] || data.social.peers[0];
    setIncomingCall({ type: 'video', peer });
    playSynthTone('chord');
  };

  const acceptIncomingCall = (type) => {
    if (incomingCall) {
      setActiveCall({
        type: type || incomingCall.type,
        peer: incomingCall.peer,
        micMuted: false,
        videoOff: false,
        screenSharing: false,
      });
      setIncomingCall(null);
      setCallTimerSeconds(0);
    }
  };

  const declineIncomingCall = () => {
    setIncomingCall(null);
  };

  // ==========================================
  // EPHEMERAL MESSAGING & CHAT STATE
  // ==========================================
  const [selectedEphemeralTimer, setSelectedEphemeralTimer] = useState(0); // 0 (off), 5, 10, 60, 3600
  const [chatInputText, setChatInputText] = useState('');
  const chatBottomRef = useRef(null);

  // Countdown timer for ephemeral messages
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        let changed = false;
        const now = Date.now();
        const nextMessages = prev.social.messages.filter((msg) => {
          if (msg.ephemeralTimer && msg.ephemeralTimer > 0) {
            const expiry = (msg.createdAt || now) + msg.ephemeralTimer * 1000;
            if (now >= expiry) {
              changed = true;
              return false; // Auto-destruct message
            }
          }
          return true;
        });

        if (changed) {
          return {
            ...prev,
            social: {
              ...prev.social,
              messages: nextMessages,
            },
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (!chatInputText.trim()) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      id: Date.now().toString(),
      peerId: data.social.activePeerId,
      sender: 'user',
      text: chatInputText.trim(),
      time: timeStr,
      createdAt: Date.now(),
      ephemeralTimer: selectedEphemeralTimer,
    };

    setData((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        messages: [...prev.social.messages, newMsg],
      },
    }));

    setChatInputText('');
    playSynthTone('pulse');

    // Simulate peer reply
    setTimeout(() => {
      const replyMsg = {
        id: (Date.now() + 1).toString(),
        peerId: data.social.activePeerId,
        sender: 'peer',
        text: lang === 'ar' ? 'تم استلام الرسالة عبر المسار المشفر.' : 'Encrypted packet received and acknowledged.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: Date.now(),
        ephemeralTimer: selectedEphemeralTimer,
      };
      setData((prev) => ({
        ...prev,
        social: {
          ...prev.social,
          messages: [...prev.social.messages, replyMsg],
        },
      }));
    }, 1200);
  };

  // ==========================================
  // REELS & MEDIA FEED STATE
  // ==========================================
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [reelFilter, setReelFilter] = useState('normal'); // 'normal' | 'cyberpunk' | 'noir' | 'synthwave' | 'solar' | 'glitch'
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [newReelComment, setNewReelComment] = useState('');
  const [reelLikes, setReelLikes] = useState({ r1: 1240, r2: 890, r3: 2150 });
  const [reelLiked, setReelLiked] = useState({ r1: false, r2: true, r3: false });

  const currentReel = REELS_DATA[activeReelIndex] || REELS_DATA[0];

  const handleLikeReel = (reelId) => {
    setReelLiked((prev) => {
      const isLiked = !prev[reelId];
      setReelLikes((lPrev) => ({
        ...lPrev,
        [reelId]: isLiked ? lPrev[reelId] + 1 : lPrev[reelId] - 1,
      }));
      return { ...prev, [reelId]: isLiked };
    });
    playSynthTone('bell');
  };

  const handleAddReelComment = () => {
    if (!newReelComment.trim()) return;
    currentReel.comments.push({ user: `@${data.ghostHandle}`, text: newReelComment.trim() });
    setNewReelComment('');
  };

  // Filter CSS Mapping
  const getFilterStyle = (filter) => {
    switch (filter) {
      case 'cyberpunk':
        return 'contrast-125 saturate-200 hue-rotate-90 brightness-110';
      case 'noir':
        return 'grayscale contrast-150 brightness-90';
      case 'synthwave':
        return 'contrast-125 hue-rotate-270 saturate-150';
      case 'solar':
        return 'invert sepia brightness-110 contrast-125';
      case 'glitch':
        return 'saturate-200 contrast-150 hue-rotate-180';
      default:
        return '';
    }
  };

  // ==========================================
  // GHOST & PRIVACY SUITE ACTIONS
  // ==========================================
  const randomizeGhostHandle = () => {
    const prefixes = ['phantom', 'cipher', 'stealth', 'shadow', 'quantum', 'vortex', 'specter', 'nexus'];
    const randomHex = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0');
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const newHandle = `${randomPrefix}_#${randomHex}`;
    setData((prev) => ({ ...prev, ghostHandle: newHandle }));
    playSynthTone('sub');
  };

  // Web Crypto SHA-256 Hasher
  const [hashInput, setHashInput] = useState('NEXUS_SOVEREIGN_ENTERPRISE_KEY');
  const [computedSha256, setComputedSha256] = useState('');

  useEffect(() => {
    async function calculateHash() {
      if (!hashInput) {
        setComputedSha256('');
        return;
      }
      try {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(hashInput);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        setComputedSha256(hashHex);
      } catch (err) {
        console.warn('Crypto calculation error:', err);
      }
    }
    calculateHash();
  }, [hashInput]);

  // Decoy Emergency Switch
  const [decoyInput, setDecoyInput] = useState('0');

  // Web Audio Tone Synthesizer
  const playSynthTone = (type = 'bell') => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'bell') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, now);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        osc.start(now);
        osc.stop(now + 0.8);
      } else if (type === 'pulse') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'chord') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(528, now);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
        osc.start(now);
        osc.stop(now + 0.9);
      } else if (type === 'sub') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(65, now);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (e) {
      console.warn('Web Audio playback error:', e);
    }
  };

  // Studio Sketchpad Canvas
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#a855f7');
  const [brushSize, setBrushSize] = useState(4);
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && data.activeModule === 'studio' && data.activeTab === 'modules') {
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, [data.activeModule, data.activeTab]);

  const startDraw = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
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
    ctx.strokeStyle = isEraser ? '#0f0f1a' : brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const exportCanvasPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `nexus_drawing_${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  // Knowledge Flashcard State
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  const activeFlashcard = data.knowledge.cards[flashcardIndex] || data.knowledge.cards[0];

  // Calculated Net Worth
  const totalNetWorth = useMemo(() => {
    const fiat = data.finance.fiatBalance || 0;
    const crypto = data.finance.cryptoBalanceUsd || 0;
    const gold = (data.finance.goldGrams || 0) * (data.finance.goldPricePerGram || 86.4);
    return Math.round(fiat + crypto + gold);
  }, [data.finance]);

  // Decoy Calculator UI Overlay if triggered
  if (data.decoyActive) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-4 font-mono select-none">
        <div className="w-full max-w-sm bg-[#1e1e1e] p-6 rounded-2xl shadow-2xl border border-neutral-800">
          <div className="text-right text-4xl p-4 bg-black/40 rounded-xl mb-6 text-emerald-400 font-bold tracking-wider overflow-hidden">
            {decoyInput}
          </div>
          <div className="grid grid-cols-4 gap-3">
            {['C', '(', ')', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  if (btn === 'C') {
                    setDecoyInput('0');
                  } else if (btn === '=') {
                    if (decoyInput === '1337') {
                      setData((prev) => ({ ...prev, decoyActive: false }));
                    } else {
                      try {
                        // Safe math evaluation
                        const sanitized = decoyInput.replace(/[^0-9+\-*/().]/g, '');
                        // eslint-disable-next-line no-new-func
                        const compute = new Function(`return ${sanitized}`);
                        setDecoyInput(String(compute() || '0'));
                      } catch {
                        setDecoyInput('Error');
                      }
                    }
                  } else {
                    setDecoyInput((prev) => (prev === '0' ? btn : prev + btn));
                  }
                }}
                className="h-14 bg-neutral-800 hover:bg-neutral-700 active:scale-95 rounded-xl font-bold text-lg flex items-center justify-center text-white transition-all shadow"
              >
                {btn}
              </button>
            ))}
          </div>
          <div className="mt-6 text-center text-xs text-neutral-500">
            {t.ghost.exitDecoy}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#07070d] text-slate-100 flex flex-col font-sans transition-colors duration-300 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      {/* ==========================================
          TOP NAVIGATION BAR
      ========================================== */}
      <header className="sticky top-0 z-40 bg-[#0c0c16]/90 backdrop-blur-md border-b border-purple-900/30 px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/20 font-black text-xl tracking-wider text-white">
            NX
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-200 to-cyan-400">
                {t.appName}
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-700/50 text-purple-300">
                {t.edition}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t.sovereignNode} • {t.operator}
            </p>
          </div>
        </div>

        {/* Global Action Header Controls */}
        <div className="flex items-center gap-2">
          {/* Quick P2P Call Trigger */}
          <button
            onClick={() => startCall('video')}
            title={t.call.videoCall}
            className="p-2 rounded-xl bg-purple-950/60 border border-purple-700/40 text-purple-300 hover:bg-purple-900/60 hover:text-white transition-all shadow active:scale-95"
          >
            <Video className="w-4 h-4" />
          </button>

          {/* Quick Voice Call Trigger */}
          <button
            onClick={() => startCall('audio')}
            title={t.call.audioCall}
            className="p-2 rounded-xl bg-purple-950/60 border border-purple-700/40 text-purple-300 hover:bg-purple-900/60 hover:text-white transition-all shadow active:scale-95"
          >
            <Phone className="w-4 h-4" />
          </button>

          {/* Simulate Incoming Call Demo */}
          <button
            onClick={triggerSimulatedIncomingCall}
            title={t.call.simulateIncoming}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/70 border border-indigo-700/40 text-indigo-300 hover:bg-indigo-900 text-xs font-semibold transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
            <span className="text-[11px]">{t.call.incomingCall}</span>
          </button>

          {/* Decoy Panic Button */}
          <button
            onClick={() => setData((prev) => ({ ...prev, decoyActive: true }))}
            title={t.ghost.triggerDecoy}
            className="p-2 rounded-xl bg-amber-950/40 border border-amber-700/40 text-amber-300 hover:bg-amber-900/60 transition-all"
          >
            <Calculator className="w-4 h-4" />
          </button>

          {/* Voice AI Assistant Modal Switcher */}
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 active:scale-95 transition-all"
          >
            <Bot className="w-4 h-4 animate-pulse" />
            <span className="hidden md:inline">{t.nav.aiAssistant}</span>
          </button>

          {/* Bilingual Language Switcher */}
          <button
            onClick={() => setData((prev) => ({ ...prev, lang: lang === 'en' ? 'ar' : 'en' }))}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 text-xs font-bold transition-all flex items-center gap-1"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'العربية' : 'EN'}</span>
          </button>
        </div>
      </header>

      {/* ==========================================
          MAIN NAVIGATION TABS (Telegram-Grade Tabs)
      ========================================== */}
      <nav className="bg-[#090914] border-b border-slate-800/80 px-4 py-2 flex items-center justify-between overflow-x-auto gap-2 scrollbar-none">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setData((prev) => ({ ...prev, activeTab: 'modules' }))}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              data.activeTab === 'modules'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.nav.modules}</span>
          </button>

          <button
            onClick={() => setData((prev) => ({ ...prev, activeTab: 'reels' }))}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              data.activeTab === 'reels'
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>{t.nav.reels}</span>
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
          </button>

          <button
            onClick={() => setData((prev) => ({ ...prev, activeTab: 'calls' }))}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              data.activeTab === 'calls'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t.nav.calls}</span>
          </button>

          <button
            onClick={() => setData((prev) => ({ ...prev, activeTab: 'ghost' }))}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              data.activeTab === 'ghost'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.nav.ghostSuite}</span>
          </button>
        </div>

        {/* Ghost Handle Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-xs font-mono font-medium">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>{data.ghostHandle}</span>
          </div>
        </div>
      </nav>

      {/* ==========================================
          INCOMING CALL POPUP MODAL
      ========================================== */}
      {incomingCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm bg-gradient-to-b from-[#161628] to-[#0c0c16] border border-purple-600/40 rounded-3xl p-6 shadow-2xl text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center text-4xl mb-4 shadow-xl shadow-purple-600/40 animate-pulse">
              {incomingCall.peer.avatar}
            </div>
            <h3 className="text-xl font-black text-white">{incomingCall.peer.name}</h3>
            <p className="text-xs text-purple-300 font-mono mb-1">{incomingCall.peer.handle}</p>
            <p className="text-xs text-slate-400 mb-6 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {t.call.encryptedBadge}
            </p>

            <div className="flex items-center gap-4 w-full justify-center">
              <button
                onClick={declineIncomingCall}
                className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/40 active:scale-95 transition-all"
                title={t.call.decline}
              >
                <PhoneOff className="w-6 h-6" />
              </button>

              <button
                onClick={() => acceptIncomingCall('audio')}
                className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/40 active:scale-95 transition-all"
                title={t.call.acceptAudio}
              >
                <Phone className="w-6 h-6" />
              </button>

              <button
                onClick={() => acceptIncomingCall('video')}
                className="w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/40 active:scale-95 transition-all"
                title={t.call.acceptVideo}
              >
                <Video className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          ACTIVE P2P CALL FULLSCREEN OVERLAY
      ========================================== */}
      {activeCall && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#080812] text-white">
          {/* Call Header */}
          <div className="p-4 bg-black/40 backdrop-blur-md flex items-center justify-between border-b border-purple-900/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-900/80 flex items-center justify-center text-xl">
                {activeCall.peer.avatar}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{activeCall.peer.name}</h3>
                <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t.call.encryptedBadge}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-700/50 font-mono text-xs text-purple-300 font-bold">
                {formatDuration(callTimerSeconds)}
              </div>
            </div>
          </div>

          {/* Video / Visualizer Body */}
          <div className="flex-1 relative flex items-center justify-center p-6 overflow-hidden">
            {activeCall.type === 'video' && !activeCall.videoOff ? (
              <div className="w-full h-full max-w-4xl max-h-[600px] bg-gradient-to-br from-purple-950/60 via-slate-900 to-black rounded-3xl border border-purple-800/40 relative flex items-center justify-center shadow-2xl overflow-hidden">
                {/* Remote Stream Simulation */}
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-6xl shadow-2xl shadow-purple-600/40 animate-pulse">
                    {activeCall.peer.avatar}
                  </div>
                  <h4 className="text-lg font-bold">{activeCall.peer.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span>Live 1080p WebRTC Secure Feed</span>
                  </div>
                </div>

                {/* Local Picture-in-Picture Preview */}
                <div className="absolute bottom-4 right-4 w-36 h-48 bg-slate-950/90 border-2 border-purple-500/60 rounded-2xl shadow-xl flex flex-col items-center justify-center p-2 backdrop-blur-md">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-xl mb-2">
                    🛡️
                  </div>
                  <span className="text-[10px] text-slate-300 font-mono">{data.ghostHandle}</span>
                  <span className="text-[9px] text-emerald-400 font-semibold mt-1">HD Local Feed</span>
                </div>
              </div>
            ) : (
              /* Voice Call Audio Waveform Visualizer */
              <div className="flex flex-col items-center gap-6">
                <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-7xl shadow-2xl shadow-indigo-600/50 relative">
                  <div className="absolute -inset-4 rounded-full border-2 border-purple-500/30 animate-ping pointer-events-none" />
                  {activeCall.peer.avatar}
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-black">{activeCall.peer.name}</h4>
                  <p className="text-xs text-purple-300 font-mono mt-1">{t.call.inCall}</p>
                </div>

                {/* Pulsating Audio Frequency Bars */}
                <div className="flex items-center gap-1.5 h-12 mt-4">
                  {[12, 24, 40, 18, 32, 48, 20, 36, 16, 28, 44, 22].map((height, i) => (
                    <div
                      key={i}
                      style={{ height: `${activeCall.micMuted ? 4 : height}px` }}
                      className="w-1.5 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full transition-all duration-150 animate-pulse"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Call Control Action Bar */}
          <div className="p-6 bg-black/60 backdrop-blur-md border-t border-purple-900/30 flex items-center justify-center gap-6">
            {/* Toggle Mic */}
            <button
              onClick={() => setActiveCall((prev) => ({ ...prev, micMuted: !prev.micMuted }))}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                activeCall.micMuted ? 'bg-amber-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
              title={activeCall.micMuted ? t.call.unmuteMic : t.call.muteMic}
            >
              {activeCall.micMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            {/* Toggle Video */}
            <button
              onClick={() => setActiveCall((prev) => ({ ...prev, videoOff: !prev.videoOff }))}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                activeCall.videoOff ? 'bg-amber-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
              title={activeCall.videoOff ? t.call.startVideo : t.call.stopVideo}
            >
              {activeCall.videoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
            </button>

            {/* Screen Share */}
            <button
              onClick={() => setActiveCall((prev) => ({ ...prev, screenSharing: !prev.screenSharing }))}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                activeCall.screenSharing ? 'bg-cyan-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
              title={t.call.screenShare}
            >
              <ScreenShare className="w-6 h-6" />
            </button>

            {/* End Call Button */}
            <button
              onClick={endCall}
              className="w-16 h-14 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/40 active:scale-95 transition-all"
              title={t.call.endCall}
            >
              <PhoneOff className="w-7 h-7" />
            </button>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB CONTENT ROUTER
      ========================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        {/* ==========================================
            TAB 1: REELS & AI MEDIA FEED
        ========================================== */}
        {data.activeTab === 'reels' && (
          <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
            {/* Vertical Video Reel Card */}
            <div className="w-full max-w-md mx-auto bg-slate-900 border border-purple-800/40 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col min-h-[580px]">
              {/* Dynamic Animated Visual Background with Visual Filter */}
              <div
                className={`flex-1 p-6 flex flex-col justify-between bg-gradient-to-b ${currentReel.gradient} ${getFilterStyle(
                  reelFilter
                )} transition-all duration-300 relative`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full bg-black/60 border border-white/20 text-xs font-mono font-bold text-white flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    {currentReel.icon} {currentReel.title}
                  </span>
                  <span className="text-xs text-white/80 font-mono bg-black/40 px-2 py-0.5 rounded-md">
                    {activeReelIndex + 1} / {REELS_DATA.length}
                  </span>
                </div>

                {/* Center Visual Art / Graphic Simulation */}
                <div className="my-auto flex flex-col items-center justify-center text-center py-12 z-10">
                  <div className="w-28 h-28 rounded-3xl bg-black/40 border border-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-2xl shadow-purple-500/30 mb-4 animate-bounce">
                    {currentReel.avatar}
                  </div>
                  <h3 className="text-2xl font-black text-white drop-shadow-md px-4">{currentReel.title}</h3>
                  <p className="text-xs text-purple-200 mt-2 font-mono">{currentReel.sound}</p>
                </div>

                {/* Bottom Overlay Info */}
                <div className="z-10 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-sm text-purple-300">{currentReel.author}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-200">
                      Sovereign Creator
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed mb-3">{currentReel.description}</p>

                  {/* Reel Interaction Buttons */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                    <button
                      onClick={() => handleLikeReel(currentReel.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                        reelLiked[currentReel.id] ? 'bg-pink-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{reelLikes[currentReel.id]}</span>
                    </button>

                    <button
                      onClick={() => setIsCommentsModalOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{currentReel.comments.length}</span>
                    </button>

                    <button
                      onClick={() => {
                        alert(lang === 'ar' ? 'تم نسخ رابط الريل المشفر!' : 'Encrypted Reel link copied!');
                        playSynthTone('bell');
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{currentReel.shares}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveReelIndex((prev) => (prev > 0 ? prev - 1 : REELS_DATA.length - 1))}
                  className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 transition-all text-center"
                >
                  {t.reels.prevReel}
                </button>
                <button
                  onClick={() => setActiveReelIndex((prev) => (prev < REELS_DATA.length - 1 ? prev + 1 : 0))}
                  className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all text-center shadow-lg shadow-purple-600/30"
                >
                  {t.reels.nextReel}
                </button>
              </div>
            </div>

            {/* Smart Filters & AI Co-Pilot Reel Controls Panel */}
            <div className="w-full max-w-md flex flex-col gap-4">
              {/* Filter Switcher */}
              <div className="bg-[#0e0e1a] border border-purple-900/40 rounded-3xl p-5 shadow-xl">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-purple-400" />
                  <span>{t.reels.filterTitle}</span>
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'normal', name: t.reels.filterNormal },
                    { id: 'cyberpunk', name: t.reels.filterCyberpunk },
                    { id: 'noir', name: t.reels.filterNoir },
                    { id: 'synthwave', name: t.reels.filterSynthwave },
                    { id: 'solar', name: t.reels.filterSolar },
                    { id: 'glitch', name: t.reels.filterGlitch },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setReelFilter(f.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                        reelFilter === f.id
                          ? 'bg-purple-600 border-purple-400 text-white shadow'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Co-Pilot Reel Assistant */}
              <div className="bg-[#0e0e1a] border border-purple-900/40 rounded-3xl p-5 shadow-xl flex flex-col gap-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>AI Reel Co-Pilot</span>
                </h4>
                <p className="text-xs text-slate-400">
                  {lang === 'ar'
                    ? 'توليد نصوص ووسوم ذكية للفيديو دون الاتصال بأي خوادم خارجية.'
                    : 'Generate viral captions and encrypted hashtags on-the-fly via client-side neural routines.'}
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => {
                      const caption =
                        lang === 'ar'
                          ? '🚀 العقدة السيادية v9.0 تعمل بكفاءة 100% وبأعلى معايير التشفير والخصوصية.'
                          : '🚀 Sovereign Enterprise Singularity v9.0 running at 100% autonomous capacity. Zero telemetry.';
                      alert(`${lang === 'ar' ? 'الوصف المولد:' : 'Generated Caption:'}\n\n${caption}`);
                      playSynthTone('chord');
                    }}
                    className="w-full py-2.5 rounded-xl bg-indigo-950 border border-indigo-700/50 text-indigo-300 hover:bg-indigo-900 text-xs font-bold transition-all text-center"
                  >
                    ✨ {t.reels.aiCaption}
                  </button>
                  <button
                    onClick={() => {
                      const tags = '#NEXUS #SovereignTech #WebRTC #P2P #ZeroTelemetry #Singularity';
                      alert(`${lang === 'ar' ? 'الوسوم المولدة:' : 'Generated Hashtags:'}\n\n${tags}`);
                      playSynthTone('bell');
                    }}
                    className="w-full py-2.5 rounded-xl bg-cyan-950 border border-cyan-700/50 text-cyan-300 hover:bg-cyan-900 text-xs font-bold transition-all text-center"
                  >
                    #️⃣ {t.reels.aiHashtags}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 2: TELEGRAM-GRADE CALLS MENU
        ========================================== */}
        {data.activeTab === 'calls' && (
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
            <div className="bg-[#0e0e1a] border border-purple-900/40 rounded-3xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-5">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-purple-400" />
                    <span>{t.call.title}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{t.call.encryptedBadge}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={triggerSimulatedIncomingCall}
                    className="px-4 py-2 rounded-xl bg-indigo-950 border border-indigo-700/50 text-indigo-300 hover:bg-indigo-900 text-xs font-bold transition-all flex items-center gap-2"
                  >
                    <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
                    <span>{t.call.simulateIncoming}</span>
                  </button>
                </div>
              </div>

              {/* Peers Call Directory */}
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {lang === 'ar' ? 'العقد المتاحة للاتصال المباشر' : 'Active Sovereign Node Peers'}
                </h4>
                {data.social.peers.map((peer) => (
                  <div
                    key={peer.id}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between hover:border-purple-700/40 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-2xl shadow">
                        {peer.avatar}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white">{peer.name}</h5>
                        <p className="text-xs text-purple-300 font-mono">{peer.handle}</p>
                        <p className="text-[11px] text-emerald-400 font-mono mt-0.5">{peer.keyFingerprint}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startCall('audio', peer)}
                        className="p-3 rounded-xl bg-purple-950 border border-purple-700/40 text-purple-300 hover:bg-purple-900 hover:text-white transition-all shadow"
                        title={t.call.audioCall}
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => startCall('video', peer)}
                        className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-600/30"
                        title={t.call.videoCall}
                      >
                        <Video className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 3: GHOST & PRIVACY SOVEREIGNTY SUITE
        ========================================== */}
        {data.activeTab === 'ghost' && (
          <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
            <div className="bg-[#0e0e1a] border border-emerald-900/40 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    <span>{t.ghost.title}</span>
                  </h3>
                  <p className="text-xs text-emerald-300 font-mono mt-1">{t.privacy.auditScore}</p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-mono text-xs font-bold">
                  {t.ghost.antiScreenshot}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Ghost Handle Randomizer */}
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                      <Hash className="w-4 h-4 text-emerald-400" />
                      <span>{t.ghost.handleTitle}</span>
                    </h4>
                    <div className="mt-3 p-3 rounded-xl bg-black/60 border border-emerald-800/40 text-emerald-400 font-mono text-lg font-bold">
                      {data.ghostHandle}
                    </div>
                  </div>
                  <button
                    onClick={randomizeGhostHandle}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{t.ghost.randomize}</span>
                  </button>
                </div>

                {/* 2. Masked Sovereign Phone */}
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-400" />
                      <span>{t.ghost.phoneTitle}</span>
                    </h4>
                    <div className="mt-3 p-3 rounded-xl bg-black/60 border border-purple-800/40 text-purple-300 font-mono text-xs font-bold break-all">
                      {t.ghost.maskedPhone}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      alert(`SHA-256 Cloaked Token:\ne3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`);
                      playSynthTone('bell');
                    }}
                    className="w-full py-2.5 rounded-xl bg-purple-950 border border-purple-700/50 text-purple-300 hover:bg-purple-900 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t.ghost.revealHash}</span>
                  </button>
                </div>

                {/* 3. Native Web Crypto SHA-256 Hasher */}
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 md:col-span-2 flex flex-col gap-3">
                  <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Key className="w-4 h-4 text-cyan-400" />
                    <span>{t.privacy.sha256Title}</span>
                  </h4>
                  <p className="text-xs text-slate-400">{t.privacy.sha256Desc}</p>
                  <input
                    type="text"
                    value={hashInput}
                    onChange={(e) => setHashInput(e.target.value)}
                    placeholder={t.privacy.inputPlaceholder}
                    className="w-full p-3 rounded-xl bg-black/50 border border-slate-700 text-slate-100 text-xs font-mono focus:border-cyan-500 outline-none"
                  />
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold">{t.privacy.computedHash}</span>
                    <div className="p-3 mt-1 rounded-xl bg-black/60 border border-cyan-800/40 text-cyan-400 font-mono text-xs break-all select-all">
                      {computedSha256 || 'Calculating...'}
                    </div>
                  </div>
                </div>

                {/* 4. Decoy Panic Switch */}
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-amber-800/40 md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>{t.ghost.decoyTitle}</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl">{t.ghost.decoyDesc}</p>
                  </div>
                  <button
                    onClick={() => setData((prev) => ({ ...prev, decoyActive: true }))}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/30 whitespace-nowrap transition-all"
                  >
                    {t.ghost.triggerDecoy}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 4: 8 CORE SOVEREIGN MODULES
        ========================================== */}
        {data.activeTab === 'modules' && (
          <div className="flex flex-col gap-6">
            {/* Module Sub-Navigation Bar */}
            <div className="bg-[#0e0e1a] border border-slate-800 p-2 rounded-2xl flex items-center gap-1.5 overflow-x-auto scrollbar-none shadow-lg">
              {[
                { id: 'social', icon: Users, name: t.modules.social },
                { id: 'office', icon: Briefcase, name: t.modules.office },
                { id: 'finance', icon: DollarSign, name: t.modules.finance },
                { id: 'studio', icon: Palette, name: t.modules.studio },
                { id: 'nutrition', icon: Utensils, name: t.modules.nutrition },
                { id: 'travel', icon: Plane, name: t.modules.travel },
                { id: 'knowledge', icon: BookOpen, name: t.modules.knowledge },
                { id: 'privacy', icon: Shield, name: t.modules.privacy },
              ].map((m) => {
                const IconComponent = m.icon;
                const isActive = data.activeModule === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setData((prev) => ({ ...prev, activeModule: m.id }))}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{m.name}</span>
                  </button>
                );
              })}
            </div>

            {/* MODULE 1: SOCIAL & EPHEMERAL CHAT */}
            {data.activeModule === 'social' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Ephemeral P2P Chat Terminal */}
                <div className="lg:col-span-7 bg-[#0e0e1a] border border-purple-900/40 rounded-3xl p-5 shadow-xl flex flex-col h-[560px]">
                  {/* Chat Header with Peer Info and Ephemeral Timer */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-900/60 flex items-center justify-center text-xl">
                        {data.social.peers.find((p) => p.id === data.social.activePeerId)?.avatar || '⚡'}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {data.social.peers.find((p) => p.id === data.social.activePeerId)?.name}
                        </h4>
                        <p className="text-[10px] text-emerald-400 font-mono">
                          {data.social.peers.find((p) => p.id === data.social.activePeerId)?.keyFingerprint}
                        </p>
                      </div>
                    </div>

                    {/* Self-Destruct Timer Switcher */}
                    <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-slate-800">
                      <Timer className="w-3.5 h-3.5 text-amber-400 ml-1" />
                      {[
                        { val: 0, label: t.chat.timerOff },
                        { val: 5, label: t.chat.timer5s },
                        { val: 10, label: t.chat.timer10s },
                        { val: 60, label: t.chat.timer1m },
                      ].map((tm) => (
                        <button
                          key={tm.val}
                          onClick={() => setSelectedEphemeralTimer(tm.val)}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono transition-all ${
                            selectedEphemeralTimer === tm.val
                              ? 'bg-amber-500 text-black shadow'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {tm.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Messages Feed */}
                  <div className="flex-1 overflow-y-auto space-y-3 p-2 scrollbar-none">
                    {data.social.messages
                      .filter((m) => m.peerId === data.social.activePeerId)
                      .map((msg) => {
                        const isMe = msg.sender === 'user';
                        const timeLeft = msg.ephemeralTimer
                          ? Math.max(0, Math.ceil((msg.createdAt + msg.ephemeralTimer * 1000 - Date.now()) / 1000))
                          : null;

                        return (
                          <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                            <div
                              className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed relative ${
                                isMe
                                  ? 'bg-purple-600 text-white rounded-br-none shadow-md shadow-purple-600/20'
                                  : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'
                              }`}
                            >
                              <p>{msg.text}</p>
                              <div className="flex items-center justify-between gap-3 mt-1.5 pt-1 text-[10px] opacity-75 border-t border-white/10">
                                <span>{msg.time}</span>
                                {timeLeft !== null && (
                                  <span className="flex items-center gap-1 text-amber-300 font-mono font-bold animate-pulse">
                                    <FireIcon className="w-2.5 h-2.5" />
                                    {timeLeft}s
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    <div ref={chatBottomRef} />
                  </div>

                  {/* Chat Input Bar */}
                  <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                    <input
                      type="text"
                      value={chatInputText}
                      onChange={(e) => setChatInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={t.chat.messagePlaceholder}
                      className="flex-1 p-3 rounded-xl bg-black/50 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-purple-500 outline-none"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30 transition-all active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Decentralized Feed Broadcast & Timeline */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="bg-[#0e0e1a] border border-slate-800 rounded-3xl p-5 shadow-xl">
                    <h4 className="text-sm font-bold text-white mb-3">{t.social.composer}</h4>
                    <textarea
                      placeholder={t.social.postPlaceholder}
                      rows={3}
                      className="w-full p-3 rounded-xl bg-black/50 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-purple-500 outline-none resize-none"
                    />
                    <button
                      onClick={() => {
                        alert(lang === 'ar' ? 'تم بث الرسالة بنجاح عبر الشبكة!' : 'Broadcast transmitted successfully!');
                        playSynthTone('pulse');
                      }}
                      className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow transition-all"
                    >
                      {t.social.broadcast}
                    </button>
                  </div>

                  {/* Peer Selector List */}
                  <div className="bg-[#0e0e1a] border border-slate-800 rounded-3xl p-5 shadow-xl">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      {t.social.selectPeer}
                    </h4>
                    <div className="flex flex-col gap-2">
                      {data.social.peers.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setData((prev) => ({ ...prev, social: { ...prev.social, activePeerId: p.id } }))}
                          className={`p-3 rounded-xl flex items-center justify-between transition-all border ${
                            data.social.activePeerId === p.id
                              ? 'bg-purple-950/60 border-purple-600 text-white'
                              : 'bg-slate-900/50 border-slate-800/80 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-lg">{p.avatar}</span>
                            <div className="text-left">
                              <p className="text-xs font-bold">{p.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono">{p.handle}</p>
                            </div>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 2: OFFICE KANBAN & POMODORO */}
            {data.activeModule === 'office' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['todo', 'inProgress', 'completed'].map((col) => (
                  <div key={col} className="bg-[#0e0e1a] border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t.office[col]}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-mono text-purple-300 font-bold">
                        {data.office.tasks.filter((tk) => tk.status === col).length}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      {data.office.tasks
                        .filter((tk) => tk.status === col)
                        .map((tk) => (
                          <div key={tk.id} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col gap-2">
                            <p className="text-xs font-medium text-slate-200">{tk.title}</p>
                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                              <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800/40 text-purple-300 uppercase font-bold">
                                {tk.priority}
                              </span>
                              <span>{tk.date}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* MODULE 3: FINANCE TREASURY */}
            {data.activeModule === 'finance' && (
              <div className="flex flex-col gap-6">
                {/* Net Worth Card */}
                <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 border border-purple-800/40 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono">{t.finance.netWorth}</span>
                    <h3 className="text-3xl font-black text-white mt-1">${totalNetWorth.toLocaleString()}</h3>
                    <p className="text-xs text-emerald-400 font-mono mt-1 font-bold">{t.finance.delta}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="p-3 rounded-2xl bg-black/40 border border-purple-800/30">
                      <p className="text-slate-400">Fiat Reserve</p>
                      <p className="text-white font-bold">${data.finance.fiatBalance.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-black/40 border border-purple-800/30">
                      <p className="text-slate-400">Crypto Vault</p>
                      <p className="text-white font-bold">${data.finance.cryptoBalanceUsd.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-black/40 border border-purple-800/30">
                      <p className="text-slate-400">Physical Gold</p>
                      <p className="text-white font-bold">{data.finance.goldGrams}g</p>
                    </div>
                  </div>
                </div>

                {/* Ledger Transactions */}
                <div className="bg-[#0e0e1a] border border-slate-800 rounded-3xl p-6 shadow-xl">
                  <h4 className="text-sm font-bold text-white mb-4">{t.finance.transactions}</h4>
                  <div className="flex flex-col gap-2.5">
                    {data.finance.transactions.map((tx) => (
                      <div key={tx.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-white">{tx.desc}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{tx.category} • {tx.date}</p>
                        </div>
                        <span className={`text-xs font-mono font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {tx.amount > 0 ? `+$${tx.amount.toLocaleString()}` : `-$${Math.abs(tx.amount).toLocaleString()}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 4: STUDIO CANVAS & SYNTH */}
            {data.activeModule === 'studio' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-[#0e0e1a] border border-purple-900/40 rounded-3xl p-5 shadow-xl flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-sm font-bold text-white">{t.studio.sketchpad}</h4>
                    <div className="flex items-center gap-2">
                      <button onClick={clearCanvas} className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-bold">
                        {t.studio.clear}
                      </button>
                      <button onClick={exportCanvasPng} className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs text-white font-bold shadow">
                        {t.studio.download}
                      </button>
                    </div>
                  </div>

                  {/* HTML5 Canvas */}
                  <div className="w-full h-80 bg-[#07070f] rounded-2xl border border-slate-800 overflow-hidden relative touch-none">
                    <canvas
                      ref={canvasRef}
                      width={700}
                      height={320}
                      onMouseDown={startDraw}
                      onMouseMove={draw}
                      onMouseUp={stopDraw}
                      onMouseLeave={stopDraw}
                      onTouchStart={startDraw}
                      onTouchMove={draw}
                      onTouchEnd={stopDraw}
                      className="w-full h-full cursor-crosshair"
                    />
                  </div>

                  {/* Brush Color & Size Tools */}
                  <div className="flex items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      {['#a855f7', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ffffff'].map((color) => (
                        <button
                          key={color}
                          onClick={() => {
                            setBrushColor(color);
                            setIsEraser(false);
                          }}
                          style={{ backgroundColor: color }}
                          className={`w-6 h-6 rounded-full border-2 ${brushColor === color && !isEraser ? 'border-white scale-110' : 'border-transparent'}`}
                        />
                      ))}
                      <button
                        onClick={() => setIsEraser(!isEraser)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold ${isEraser ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-300'}`}
                      >
                        {t.studio.eraser}
                      </button>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      value={brushSize}
                      onChange={(e) => setBrushSize(Number(e.target.value))}
                      className="w-28 accent-purple-500"
                    />
                  </div>
                </div>

                {/* Tone Synthesizer */}
                <div className="lg:col-span-4 bg-[#0e0e1a] border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-white">{t.studio.synth}</h4>
                  <p className="text-xs text-slate-400">{t.studio.synthHelp}</p>
                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      { type: 'bell', name: t.studio.bell },
                      { type: 'pulse', name: t.studio.pulse },
                      { type: 'chord', name: t.studio.chord },
                      { type: 'sub', name: t.studio.sub },
                    ].map((s) => (
                      <button
                        key={s.type}
                        onClick={() => playSynthTone(s.type)}
                        className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-purple-950/60 border border-slate-800 hover:border-purple-600 text-xs font-bold text-slate-200 transition-all flex items-center justify-between"
                      >
                        <span>{s.name}</span>
                        <Play className="w-3.5 h-3.5 text-purple-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 5: NUTRITION & HYDRATION */}
            {data.activeModule === 'nutrition' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hydration Matrix */}
                <div className="bg-[#0e0e1a] border border-cyan-900/40 rounded-3xl p-6 shadow-xl flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-cyan-400" />
                    <span>{t.nutrition.hydration}</span>
                  </h4>
                  <div className="flex items-center justify-between my-2">
                    <span className="text-3xl font-black text-cyan-400 font-mono">{data.nutrition.waterMl} ml</span>
                    <span className="text-xs text-slate-400 font-mono">Target: {data.nutrition.targetWaterMl} ml</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      style={{ width: `${Math.min(100, (data.nutrition.waterMl / data.nutrition.targetWaterMl) * 100)}%` }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setData((prev) => ({ ...prev, nutrition: { ...prev.nutrition, waterMl: prev.nutrition.waterMl + 250 } }));
                        playSynthTone('bell');
                      }}
                      className="flex-1 py-2 rounded-xl bg-cyan-950 border border-cyan-700/50 text-cyan-300 hover:bg-cyan-900 text-xs font-bold"
                    >
                      {t.nutrition.add250}
                    </button>
                    <button
                      onClick={() => {
                        setData((prev) => ({ ...prev, nutrition: { ...prev.nutrition, waterMl: prev.nutrition.waterMl + 500 } }));
                        playSynthTone('bell');
                      }}
                      className="flex-1 py-2 rounded-xl bg-blue-950 border border-blue-700/50 text-blue-300 hover:bg-blue-900 text-xs font-bold"
                    >
                      {t.nutrition.add500}
                    </button>
                  </div>
                </div>

                {/* Calorie & Fuel Matrix */}
                <div className="bg-[#0e0e1a] border border-amber-900/40 rounded-3xl p-6 shadow-xl flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>{t.nutrition.calorieTarget}</span>
                  </h4>
                  <div className="flex items-center justify-between my-2">
                    <span className="text-3xl font-black text-amber-400 font-mono">1,850 kcal</span>
                    <span className="text-xs text-slate-400 font-mono">Target: {data.nutrition.targetCalories} kcal</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {data.nutrition.meals.map((m) => (
                      <div key={m.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{m.name}</span>
                        <span className="font-mono text-amber-400">{m.cal} cal</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 6: TRAVEL & EXPEDITIONS */}
            {data.activeModule === 'travel' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0e0e1a] border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Plane className="w-4 h-4 text-purple-400" />
                    <span>{t.travel.expeditions}</span>
                  </h4>
                  <div className="flex flex-col gap-3">
                    {data.travel.expeditions.map((ex) => (
                      <div key={ex.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                        <div>
                          <h5 className="text-xs font-bold text-white">{ex.name}</h5>
                          <p className="text-[10px] text-slate-400 font-mono">{ex.country}</p>
                        </div>
                        <div className="text-right font-mono">
                          <span className="text-xs font-bold text-purple-300">{ex.budget}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0e0e1a] border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>{t.travel.packing}</span>
                  </h4>
                  <div className="flex flex-col gap-2.5">
                    {data.travel.packingList.map((pk) => (
                      <div key={pk.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                        <span className={pk.checked ? 'text-slate-300' : 'text-slate-500'}>{pk.item}</span>
                        <CheckCircle2 className={`w-4 h-4 ${pk.checked ? 'text-emerald-400' : 'text-slate-600'}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 7: KNOWLEDGE SECOND BRAIN */}
            {data.activeModule === 'knowledge' && (
              <div className="flex flex-col gap-6">
                {/* Spaced Repetition Flashcard */}
                <div className="max-w-2xl mx-auto w-full bg-gradient-to-b from-[#141424] to-[#0c0c16] border border-purple-800/40 rounded-3xl p-8 shadow-2xl text-center flex flex-col items-center justify-between min-h-[300px]">
                  <span className="px-3 py-1 rounded-full bg-purple-950 border border-purple-700/40 text-[10px] uppercase font-bold text-purple-300 font-mono">
                    {activeFlashcard.category}
                  </span>
                  <div className="my-auto py-4 cursor-pointer select-none" onClick={() => setFlashcardFlipped(!flashcardFlipped)}>
                    <h3 className="text-xl font-black text-white">{activeFlashcard.title}</h3>
                    <p className={`mt-3 text-sm text-slate-300 leading-relaxed transition-all duration-300 ${flashcardFlipped ? 'opacity-100' : 'opacity-20 blur-sm'}`}>
                      {activeFlashcard.content}
                    </p>
                    <p className="text-[10px] text-purple-400 font-mono mt-4">{t.knowledge.flipCard}</p>
                  </div>
                  <button
                    onClick={() => {
                      setFlashcardIndex((prev) => (prev + 1) % data.knowledge.cards.length);
                      setFlashcardFlipped(false);
                      playSynthTone('bell');
                    }}
                    className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-lg transition-all"
                  >
                    {t.knowledge.nextCard}
                  </button>
                </div>
              </div>
            )}

            {/* MODULE 8: PRIVACY & CRYPTO BACKUP */}
            {data.activeModule === 'privacy' && (
              <div className="max-w-3xl mx-auto w-full bg-[#0e0e1a] border border-purple-900/40 rounded-3xl p-6 shadow-xl flex flex-col gap-6">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-black text-white">{t.privacy.storageTitle}</h3>
                  <p className="text-xs text-slate-400 mt-1">{t.privacy.auditScore}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(jsonBlob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `nexus_enterprise_backup_${Date.now()}.json`;
                      a.click();
                      playSynthTone('bell');
                    }}
                    className="p-4 rounded-2xl bg-purple-950/60 border border-purple-700/50 hover:bg-purple-900 text-xs font-bold text-purple-200 flex items-center justify-center gap-2 transition-all shadow"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t.privacy.exportBackup}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(t.privacy.confirmReset)) {
                        localStorage.removeItem(DEFAULT_STORAGE_KEY);
                        setData(INITIAL_STATE);
                        window.location.reload();
                      }
                    }}
                    className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/40 hover:bg-rose-900/60 text-xs font-bold text-rose-300 flex items-center justify-center gap-2 transition-all shadow"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{t.privacy.nuclearReset}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ==========================================
          AUTONOMOUS AI VOICE / TEXT ASSISTANT MODAL
      ========================================== */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl bg-[#0e0e1a] border border-purple-600/40 rounded-3xl p-6 shadow-2xl flex flex-col h-[600px]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-purple-900/40 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">{t.ai.title}</h3>
                  <p className="text-xs text-purple-300 font-mono">{t.ai.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setData((prev) => ({ ...prev, voiceMuted: !prev.voiceMuted }))}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
                  title={data.voiceMuted ? t.ai.unmuteVoice : t.ai.muteVoice}
                >
                  {data.voiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
                </button>
                <button
                  onClick={() => setIsAiModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Directives History */}
            <div className="flex-1 overflow-y-auto space-y-3 p-2 scrollbar-none">
              {data.aiChatHistory.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    item.sender === 'user'
                      ? 'bg-purple-950/80 border border-purple-800/40 text-purple-100 ml-auto max-w-[85%]'
                      : 'bg-slate-900/80 border border-slate-800 text-slate-200 mr-auto max-w-[90%]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                    <span className="font-bold">{item.sender === 'user' ? 'Operator' : 'AI Co-Pilot'}</span>
                    <span>{item.time}</span>
                  </div>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            {/* AI Speech & Text Input */}
            <div className="pt-4 border-t border-purple-900/40 flex items-center gap-2">
              <button
                onClick={toggleListening}
                className={`p-3 rounded-2xl transition-all shadow ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-purple-950 border border-purple-700/50 text-purple-300 hover:bg-purple-900 hover:text-white'
                }`}
                title={t.ai.micPrompt}
              >
                {isListening ? <Mic className="w-5 h-5 animate-spin" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                value={aiInputText}
                onChange={(e) => setAiInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleExecuteAiDirective(aiInputText)}
                placeholder={isListening ? t.ai.listening : t.ai.placeholder}
                className="flex-1 p-3 rounded-xl bg-black/50 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-purple-500 outline-none"
              />

              <button
                onClick={() => handleExecuteAiDirective(aiInputText)}
                className="p-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-lg shadow-purple-600/30 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          REELS COMMENTS MODAL
      ========================================== */}
      {isCommentsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-[#0e0e1a] border border-purple-800/40 rounded-3xl p-5 shadow-2xl flex flex-col h-[480px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-400" />
                <span>{t.reels.comments}</span>
              </h4>
              <button
                onClick={() => setIsCommentsModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 p-1 scrollbar-none">
              {currentReel.comments.map((c, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs">
                  <span className="font-bold text-purple-400 block mb-1">{c.user}</span>
                  <span className="text-slate-200">{c.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={newReelComment}
                onChange={(e) => setNewReelComment(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddReelComment()}
                placeholder="Write encrypted comment..."
                className="flex-1 p-2.5 rounded-xl bg-black/50 border border-slate-800 text-xs text-white outline-none focus:border-purple-500"
              />
              <button
                onClick={handleAddReelComment}
                className="px-3.5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white"
              >
                {t.chat.send}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          FOOTER STATUS BAR
      ========================================== */}
      <footer className="bg-[#07070e] border-t border-slate-900 px-4 py-2.5 text-center text-[11px] text-slate-500 font-mono flex items-center justify-between">
        <span>{t.sovereignNode}</span>
        <span className="text-emerald-400 font-bold">{t.ghost.antiScreenshot}</span>
        <span>{t.edition}</span>
      </footer>
    </div>
  );
}
