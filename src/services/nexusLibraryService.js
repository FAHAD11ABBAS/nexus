// src/services/nexusLibraryService.js
// NEXUS Global Library & Philosophy Hub — Multilingual Digital Reader & Socratic Discourses (zero-cost client-side)

export const DEFAULT_LIBRARY_BOOKS = [
  {
    id: 'book-101',
    title: 'تاريخ الفلسفة والحضارات القديمة (Ancient Philosophy & Civilizations)',
    author: 'أرشيف العلوم الإنسانية (Humanities Archives)',
    language: 'ar',
    flag: '📚',
    category: 'history',
    description: 'دراسة شاملة لنشأة الفلسفة والعلوم الإنسانية في العالم القديم والإسهامات العلمية العالمية.',
    content: `بسم الله الرحمن الرحيم

تعتبر أرض وادي الرافدين مهد الحضارات الإنسانية، حيث ابتكر السومريون الكتابة المسمارية في الألفية الرابعة قبل الميلاد.
وفضلاً عن ذلك، كانت بغداد عاصمة الحكمة والتنوير العلمي في دار الحكمة، حيث تلاقحت العلوم والفلسفة والرياضيات والطب.`,
  },
  {
    id: 'book-102',
    title: 'Meditations of Marcus Aurelius & Stoic Epistemology',
    author: 'Marcus Aurelius',
    language: 'en',
    flag: '📖',
    category: 'philosophy',
    description: 'Personal writings of the Roman Emperor on Stoic philosophy, self-discipline, and mental sovereignty.',
    content: `Book II, Section 1:
When you wake up in the morning, tell yourself: The people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous, and surly.
They are like this because they cannot distinguish good from evil. But I have seen the beauty of good, and the ugliness of evil, and I have recognized that the wrongdoer has a nature related to my own.`,
  },
  {
    id: 'book-103',
    title: 'الرسالة الذهبية في الطب والوقاية (The Golden Medical Treatise)',
    author: 'الحكيم القديم (Ancient Medical Scholar)',
    language: 'ar',
    flag: '📜',
    category: 'medical',
    description: 'توجيهات طبية ووقائية للحفاظ على صحة الجسد والتوازن الغذائي والتنفسي.',
    content: `اعلم أن الصحة تاج على رؤوس الأصحاء، وإن الوقاية خير من العلاج.
ينبغي توازن الأغذية وتجنب الإفراط في الطعام، مع الحفاظ على النشاط البدني ونقاء الهواء.`,
  },
];

class NexusLibraryService {
  getBooks(language = 'all', query = '') {
    let result = DEFAULT_LIBRARY_BOOKS;
    if (language !== 'all') {
      result = result.filter((b) => b.language === language);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.content.toLowerCase().includes(q)
      );
    }
    return result;
  }
}

const nexusLibraryService = new NexusLibraryService();
export default nexusLibraryService;
