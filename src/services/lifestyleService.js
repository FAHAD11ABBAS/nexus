// src/services/lifestyleService.js
// NEXUS Advanced Nutrition, Bio-Diet & Healthcare — Meals, Diet Plans, Supplements, Symptom Checker, Med Vault, Zen

const LIFESTYLE_KEY = 'nexus_lifestyle_v1';

const FOOD_DATABASE = [
  { id: 'f1', name: 'Grilled Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: '100g', category: 'Protein' },
  { id: 'f2', name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8, serving: '1 cup', category: 'Carbs' },
  { id: 'f3', name: 'Broccoli', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, serving: '1 cup', category: 'Vegetables' },
  { id: 'f4', name: 'Salmon Fillet', calories: 208, protein: 20, carbs: 0, fat: 13, serving: '100g', category: 'Protein' },
  { id: 'f5', name: 'Sweet Potato', calories: 103, protein: 2.3, carbs: 24, fat: 0.1, serving: '1 medium', category: 'Carbs' },
  { id: 'f6', name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fat: 0.7, serving: '170g', category: 'Dairy' },
  { id: 'f7', name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, serving: '1 medium', category: 'Fruits' },
  { id: 'f8', name: 'Avocado', calories: 240, protein: 3, carbs: 13, fat: 22, serving: '1 whole', category: 'Fats' },
  { id: 'f9', name: 'Eggs (2 large)', calories: 143, protein: 13, carbs: 1, fat: 10, serving: '2 eggs', category: 'Protein' },
  { id: 'f10', name: 'Oatmeal', calories: 154, protein: 5, carbs: 27, fat: 2.6, serving: '1 cup', category: 'Carbs' },
  { id: 'f11', name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, serving: '100g', category: 'Vegetables' },
  { id: 'f12', name: 'Almonds', calories: 164, protein: 6, carbs: 6, fat: 14, serving: '28g', category: 'Nuts' },
  { id: 'f13', name: 'Whole Wheat Bread', calories: 128, protein: 4, carbs: 24, fat: 2, serving: '2 slices', category: 'Carbs' },
  { id: 'f14', name: 'Lentils', calories: 230, protein: 18, carbs: 40, fat: 0.8, serving: '1 cup', category: 'Protein' },
  { id: 'f15', name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, serving: '1 medium', category: 'Fruits' },
  { id: 'f16', name: 'Chicken Shawarma', calories: 392, protein: 28, carbs: 34, fat: 16, serving: '1 wrap', category: 'Meals' },
  { id: 'f17', name: 'Hummus', calories: 166, protein: 8, carbs: 14, fat: 10, serving: '100g', category: 'Spreads' },
  { id: 'f18', name: 'Falafel (4 pieces)', calories: 224, protein: 8, carbs: 22, fat: 12, serving: '4 pcs', category: 'Meals' },
  { id: 'f19', name: 'Basmati Rice', calories: 210, protein: 4.3, carbs: 46, fat: 0.5, serving: '1 cup', category: 'Carbs' },
  { id: 'f20', name: 'Grilled Kebab', calories: 280, protein: 26, carbs: 2, fat: 18, serving: '2 skewers', category: 'Protein' },
  { id: 'f21', name: 'Dates (5 pieces)', calories: 140, protein: 1, carbs: 37, fat: 0.2, serving: '5 pcs', category: 'Fruits' },
  { id: 'f22', name: 'Olive Oil', calories: 119, protein: 0, carbs: 0, fat: 14, serving: '1 tbsp', category: 'Fats' },
  { id: 'f23', name: 'Tuna Can', calories: 191, protein: 42, carbs: 0, fat: 1.4, serving: '1 can', category: 'Protein' },
  { id: 'f24', name: 'Pasta (cooked)', calories: 220, protein: 8, carbs: 43, fat: 1.3, serving: '1 cup', category: 'Carbs' },
  { id: 'f25', name: 'Orange Juice', calories: 112, protein: 1.7, carbs: 26, fat: 0.5, serving: '1 cup', category: 'Beverages' },
];

const DIET_PLANS = [
  {
    id: 'dp1', name: 'Fat Loss Shred', type: 'Fat Loss', dailyCal: 1600,
    macros: { protein: 40, carbs: 30, fat: 30 },
    meals: [
      { time: '7:00 AM', name: 'Breakfast', items: ['Eggs (2 large)', 'Spinach', 'Whole Wheat Bread'] },
      { time: '10:00 AM', name: 'Snack', items: ['Greek Yogurt', 'Almonds'] },
      { time: '1:00 PM', name: 'Lunch', items: ['Grilled Chicken Breast', 'Broccoli', 'Brown Rice'] },
      { time: '4:00 PM', name: 'Snack', items: ['Apple', 'Almonds'] },
      { time: '7:00 PM', name: 'Dinner', items: ['Salmon Fillet', 'Sweet Potato', 'Spinach'] },
    ],
  },
  {
    id: 'dp2', name: 'Muscle Gain Bulk', type: 'Muscle Gain', dailyCal: 2800,
    macros: { protein: 35, carbs: 45, fat: 20 },
    meals: [
      { time: '6:30 AM', name: 'Breakfast', items: ['Oatmeal', 'Banana', 'Eggs (2 large)', 'Whole Wheat Bread'] },
      { time: '9:30 AM', name: 'Snack', items: ['Greek Yogurt', 'Almonds', 'Banana'] },
      { time: '12:30 PM', name: 'Lunch', items: ['Grilled Chicken Breast', 'Brown Rice', 'Avocado', 'Broccoli'] },
      { time: '3:30 PM', name: 'Pre-Workout', items: ['Sweet Potato', 'Tuna Can'] },
      { time: '6:30 PM', name: 'Post-Workout', items: ['Grilled Kebab', 'Basmati Rice', 'Lentils'] },
      { time: '9:00 PM', name: 'Dinner', items: ['Salmon Fillet', 'Pasta (cooked)', 'Spinach'] },
    ],
  },
  {
    id: 'dp3', name: 'Keto Protocol', type: 'Keto', dailyCal: 1800,
    macros: { protein: 25, carbs: 5, fat: 70 },
    meals: [
      { time: '8:00 AM', name: 'Breakfast', items: ['Eggs (2 large)', 'Avocado', 'Olive Oil'] },
      { time: '12:00 PM', name: 'Lunch', items: ['Salmon Fillet', 'Spinach', 'Olive Oil', 'Almonds'] },
      { time: '3:00 PM', name: 'Snack', items: ['Almonds', 'Greek Yogurt'] },
      { time: '7:00 PM', name: 'Dinner', items: ['Grilled Kebab', 'Broccoli', 'Avocado'] },
    ],
  },
  {
    id: 'dp4', name: 'Medical / Diabetic Plan', type: 'Medical', dailyCal: 1500,
    macros: { protein: 30, carbs: 40, fat: 30 },
    meals: [
      { time: '7:30 AM', name: 'Breakfast', items: ['Oatmeal', 'Almonds'] },
      { time: '10:30 AM', name: 'Snack', items: ['Apple'] },
      { time: '1:00 PM', name: 'Lunch', items: ['Lentils', 'Brown Rice', 'Spinach'] },
      { time: '4:00 PM', name: 'Snack', items: ['Greek Yogurt'] },
      { time: '7:00 PM', name: 'Dinner', items: ['Grilled Chicken Breast', 'Sweet Potato', 'Broccoli'] },
    ],
  },
];

const SUPPLEMENTS = [
  { id: 's1', name: 'Vitamin D3', category: 'Vitamins', dosage: '2000-5000 IU/day', benefits: 'Bone health, immunity, mood regulation', icon: '☀️' },
  { id: 's2', name: 'Omega-3 Fish Oil', category: 'Essential Fats', dosage: '1000-3000 mg/day', benefits: 'Heart health, brain function, anti-inflammatory', icon: '🐟' },
  { id: 's3', name: 'Whey Protein', category: 'Protein', dosage: '20-40g post-workout', benefits: 'Muscle recovery, lean mass, satiety', icon: '💪' },
  { id: 's4', name: 'Magnesium Glycinate', category: 'Minerals', dosage: '200-400 mg/day', benefits: 'Sleep quality, muscle relaxation, stress relief', icon: '🌙' },
  { id: 's5', name: 'Creatine Monohydrate', category: 'Performance', dosage: '3-5g/day', benefits: 'Strength, power, muscle hydration', icon: '⚡' },
  { id: 's6', name: 'Zinc', category: 'Minerals', dosage: '15-30 mg/day', benefits: 'Immunity, testosterone, wound healing', icon: '🛡️' },
  { id: 's7', name: 'Vitamin C', category: 'Vitamins', dosage: '500-1000 mg/day', benefits: 'Antioxidant, collagen, immunity', icon: '🍊' },
  { id: 's8', name: 'Probiotics', category: 'Gut Health', dosage: '10-50 billion CFU/day', benefits: 'Digestion, gut microbiome, immunity', icon: '🦠' },
  { id: 's9', name: 'B-Complex', category: 'Vitamins', dosage: '1 capsule/day', benefits: 'Energy metabolism, nervous system, mood', icon: '🔋' },
  { id: 's10', name: 'Iron', category: 'Minerals', dosage: '18 mg/day (women), 8 mg/day (men)', benefits: 'Oxygen transport, energy, cognitive function', icon: '🩸' },
];

const SYMPTOM_TREE = {
  start: {
    question: 'What is your primary symptom?',
    options: [
      { label: 'Headache', next: 'headache' },
      { label: 'Stomach Pain', next: 'stomach' },
      { label: 'Fatigue / Low Energy', next: 'fatigue' },
      { label: 'Chest Discomfort', next: 'chest' },
      { label: 'Joint / Muscle Pain', next: 'joint' },
    ],
  },
  headache: {
    question: 'How would you describe the headache?',
    options: [
      { label: 'Throbbing / Migraine-like', next: 'migraine' },
      { label: 'Tension / Pressure band', next: 'tension_ha' },
      { label: 'With fever', next: 'ha_fever' },
    ],
  },
  migraine: {
    result: true,
    title: '⚠️ Possible Migraine',
    advice: 'Rest in a dark, quiet room. Stay hydrated. Consider OTC pain relief (ibuprofen/acetaminophen). If migraines are frequent (>4/month), consult a neurologist.',
    severity: 'moderate',
  },
  tension_ha: {
    result: true,
    title: '💆 Tension Headache',
    advice: 'Likely stress or posture related. Try neck stretches, hydration, and stress management. OTC pain relievers can help. If persistent, see a doctor.',
    severity: 'mild',
  },
  ha_fever: {
    result: true,
    title: '🌡️ Headache with Fever',
    advice: 'Could indicate an infection. Monitor temperature, stay hydrated, rest. If fever exceeds 39°C (102°F) or persists >3 days, seek medical attention immediately.',
    severity: 'high',
  },
  stomach: {
    question: 'Where is the stomach pain located?',
    options: [
      { label: 'Upper abdomen / Burning', next: 'gastric' },
      { label: 'Lower abdomen / Cramping', next: 'lower_abd' },
      { label: 'General nausea / Vomiting', next: 'nausea' },
    ],
  },
  gastric: {
    result: true,
    title: '🔥 Possible Gastritis / Acid Reflux',
    advice: 'Avoid spicy/acidic foods, caffeine, and alcohol. Try antacids. Eat smaller meals. If pain persists >2 weeks or with blood in stool, see a gastroenterologist.',
    severity: 'moderate',
  },
  lower_abd: {
    result: true,
    title: '🩺 Lower Abdominal Discomfort',
    advice: 'Could be digestive issues, menstrual cramps, or UTI. Stay hydrated, try a warm compress. If severe, with fever, or persistent, seek medical evaluation.',
    severity: 'moderate',
  },
  nausea: {
    result: true,
    title: '🤢 Nausea / Vomiting',
    advice: 'Sip clear fluids slowly, try ginger tea or crackers. Avoid heavy meals. If vomiting persists >24h, with blood, or severe dehydration, go to ER.',
    severity: 'moderate',
  },
  fatigue: {
    question: 'How long have you experienced fatigue?',
    options: [
      { label: 'A few days', next: 'fatigue_short' },
      { label: 'More than 2 weeks', next: 'fatigue_long' },
    ],
  },
  fatigue_short: {
    result: true,
    title: '😴 Acute Fatigue',
    advice: 'Likely due to poor sleep, stress, or mild illness. Prioritize 7-9h sleep, hydration, and balanced nutrition. If accompanied by other symptoms, monitor closely.',
    severity: 'mild',
  },
  fatigue_long: {
    result: true,
    title: '⚠️ Chronic Fatigue',
    advice: 'Persistent fatigue may indicate anemia, thyroid issues, vitamin deficiency, or depression. Blood work recommended. Consult your primary care physician.',
    severity: 'high',
  },
  chest: {
    result: true,
    title: '🚨 Chest Discomfort',
    advice: 'CAUTION: Chest pain can indicate cardiac issues. If pain is severe, radiates to arm/jaw, or with shortness of breath — CALL EMERGENCY SERVICES IMMEDIATELY. If mild and brief, it may be muscular or anxiety-related, but still see a doctor.',
    severity: 'critical',
  },
  joint: {
    result: true,
    title: '🦴 Joint / Muscle Pain',
    advice: 'Rest the affected area, apply ice for 15-20 min, and consider OTC anti-inflammatory. If swelling, redness, or limited mobility persists >1 week, consult an orthopedic doctor.',
    severity: 'mild',
  },
};

const DEFAULT_DATA = {
  mealLog: [],
  selectedPlan: null,
  medVault: {
    members: [
      { id: 'm1', name: 'Self', relation: 'Self', records: [] },
    ],
  },
  zenSettings: { inhale: 4, hold: 4, exhale: 6 },
  symptomHistory: [],
};

class LifestyleService {
  getData() {
    try {
      const raw = localStorage.getItem(LIFESTYLE_KEY);
      if (!raw) { this.save(DEFAULT_DATA); return { ...DEFAULT_DATA }; }
      return JSON.parse(raw);
    } catch { return { ...DEFAULT_DATA }; }
  }

  save(data) { localStorage.setItem(LIFESTYLE_KEY, JSON.stringify(data)); }

  // Foods
  getFoodDatabase() { return FOOD_DATABASE; }
  searchFood(query) {
    const q = query.toLowerCase();
    return FOOD_DATABASE.filter((f) => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q));
  }

  // Meal Log
  getMealLog() { return this.getData().mealLog; }
  logMeal(foods, multiplier = 1) {
    const data = this.getData();
    const entry = {
      id: `meal_${Date.now()}`,
      foods: foods.map((f) => ({ ...f, multiplier })),
      totalCalories: foods.reduce((s, f) => s + f.calories * multiplier, 0),
      totalProtein: foods.reduce((s, f) => s + f.protein * multiplier, 0),
      totalCarbs: foods.reduce((s, f) => s + f.carbs * multiplier, 0),
      totalFat: foods.reduce((s, f) => s + f.fat * multiplier, 0),
      date: new Date().toISOString(),
    };
    data.mealLog.unshift(entry);
    this.save(data);
    return entry;
  }

  // Diet Plans
  getDietPlans() { return DIET_PLANS; }
  getSelectedPlan() { return this.getData().selectedPlan; }
  selectPlan(planId) {
    const data = this.getData();
    data.selectedPlan = planId;
    this.save(data);
  }

  // Supplements
  getSupplements() { return SUPPLEMENTS; }

  // Symptom Checker
  getSymptomTree() { return SYMPTOM_TREE; }
  saveSymptomResult(result) {
    const data = this.getData();
    data.symptomHistory.unshift({ ...result, date: new Date().toISOString() });
    this.save(data);
  }

  // Medical Vault
  getMedVault() { return this.getData().medVault; }
  addFamilyMember(name, relation) {
    const data = this.getData();
    data.medVault.members.push({ id: `m_${Date.now()}`, name, relation, records: [] });
    this.save(data);
    return data.medVault;
  }
  addMedRecord(memberId, record) {
    const data = this.getData();
    const member = data.medVault.members.find((m) => m.id === memberId);
    if (member) {
      member.records.unshift({ id: `rec_${Date.now()}`, ...record, date: new Date().toISOString() });
      this.save(data);
    }
    return data.medVault;
  }

  // Zen Breathing
  getZenSettings() { return this.getData().zenSettings; }
  updateZenSettings(settings) {
    const data = this.getData();
    data.zenSettings = settings;
    this.save(data);
  }
}

const lifestyleService = new LifestyleService();
export default lifestyleService;
