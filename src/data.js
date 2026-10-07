/** @typedef {'就活' | '友達' | 'ラブ'} Category */

/**
 * カテゴリごとの色・表示名
 * @type {Record<Category, { label: string, color: string, bg: string, soft: string }>}
 */
export const CATEGORIES = {
  就活: {
    label: '就活',
    color: '#4338CA',
    bg: '#6366F1',
    soft: '#EEF2FF',
  },
  友達: {
    label: '友達',
    color: '#15803D',
    bg: '#22C55E',
    soft: '#F0FDF4',
  },
  ラブ: {
    label: 'ラブ',
    color: '#BE185D',
    bg: '#F472B6',
    soft: '#FDF2F8',
  },
}

/**
 * デモ用サンプル予定（2026年10月前後）
 * @type {Array<{ id: string, title: string, date: string, time: string, category: Category, place?: string }>}
 */
export const SAMPLE_EVENTS = [
  {
    id: 'e1',
    title: 'エントリーシート提出',
    date: '2026-10-07',
    time: '10:00',
    category: '就活',
    place: 'オンライン',
  },
  {
    id: 'e2',
    title: 'カフェでランチ',
    date: '2026-10-07',
    time: '12:30',
    category: '友達',
    place: '渋谷',
  },
  {
    id: 'e3',
    title: '映画デート',
    date: '2026-10-07',
    time: '19:00',
    category: 'ラブ',
    place: '新宿',
  },
  {
    id: 'e4',
    title: '一次面接（○○商事）',
    date: '2026-10-08',
    time: '14:00',
    category: '就活',
    place: '丸の内',
  },
  {
    id: 'e5',
    title: '同窓会幹事ミーティング',
    date: '2026-10-09',
    time: '18:30',
    category: '友達',
    place: 'オンライン',
  },
  {
    id: 'e6',
    title: '記念日ディナー',
    date: '2026-10-11',
    time: '19:30',
    category: 'ラブ',
    place: '恵比寿',
  },
  {
    id: 'e7',
    title: '説明会（△△株式会社）',
    date: '2026-10-14',
    time: '13:00',
    category: '就活',
    place: 'オンライン',
  },
  {
    id: 'e8',
    title: 'ボウリング大会',
    date: '2026-10-15',
    time: '15:00',
    category: '友達',
    place: '池袋',
  },
  {
    id: 'e9',
    title: 'グループディスカッション練習',
    date: '2026-10-16',
    time: '10:00',
    category: '就活',
    place: '大学',
  },
  {
    id: 'e10',
    title: 'ピクニック',
    date: '2026-10-18',
    time: '11:00',
    category: 'ラブ',
    place: '代々木公園',
  },
  {
    id: 'e11',
    title: 'SPI模試',
    date: '2026-10-20',
    time: '09:30',
    category: '就活',
    place: '自宅',
  },
  {
    id: 'e12',
    title: '居酒屋（サークル）',
    date: '2026-10-22',
    time: '19:00',
    category: '友達',
    place: '新大久保',
  },
  {
    id: 'e13',
    title: '二次面接（○○商事）',
    date: '2026-10-24',
    time: '15:00',
    category: '就活',
    place: '丸の内',
  },
  {
    id: 'e14',
    title: '水族館デート',
    date: '2026-10-25',
    time: '13:00',
    category: 'ラブ',
    place: 'お台場',
  },
  {
    id: 'e15',
    title: 'OB訪問',
    date: '2026-10-28',
    time: '17:00',
    category: '就活',
    place: '渋谷',
  },
  {
    id: 'e16',
    title: 'ハロウィントーク',
    date: '2026-10-31',
    time: '20:00',
    category: '友達',
    place: 'オンライン',
  },
]
