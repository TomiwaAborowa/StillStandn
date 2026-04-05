export interface Quote {
  text:   string;
  ref:    string;
  author: string;
}

export const encouragementQuotes: Quote[] = [
  {
    text:   "For I know the plans I have for you — plans to prosper you and not to harm you, plans to give you hope and a future.",
    ref:    "Jeremiah 29:11",
    author: "The Lord",
  },
  {
    text:   "I can do all things through Christ who strengthens me.",
    ref:    "Philippians 4:13",
    author: "Paul the Apostle",
  },
  {
    text:   "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    ref:    "Joshua 1:9",
    author: "The Lord",
  },
  {
    text:   "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures.",
    ref:    "Psalm 23:1–2",
    author: "David",
  },
  {
    text:   "Cast all your anxiety on him because he cares for you.",
    ref:    "1 Peter 5:7",
    author: "Peter",
  },
  {
    text:   "And we know that in all things God works for the good of those who love him.",
    ref:    "Romans 8:28",
    author: "Paul the Apostle",
  },
  {
    text:   "Trust in the Lord with all your heart and lean not on your own understanding.",
    ref:    "Proverbs 3:5",
    author: "Solomon",
  },
  {
    text:   "Even youths grow tired and weary, but those who hope in the Lord will renew their strength.",
    ref:    "Isaiah 40:31",
    author: "Isaiah",
  },
  {
    text:   "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
    ref:    "Philippians 4:6",
    author: "Paul the Apostle",
  },
  {
    text:   "The joy of the Lord is your strength.",
    ref:    "Nehemiah 8:10",
    author: "Nehemiah",
  },
];

export function getDailyQuote(): Quote {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000
  );
  return encouragementQuotes[dayOfYear % encouragementQuotes.length];
}
