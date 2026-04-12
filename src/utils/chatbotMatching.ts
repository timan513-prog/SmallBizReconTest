export const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/'/g, "'")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const STOP_WORDS = new Set([
  "what",
  "is",
  "an",
  "a",
  "the",
  "how",
  "do",
  "does",
  "tell",
  "me",
  "about",
  "can",
  "you",
  "for",
  "of",
  "and",
  "in",
  "was",
  "when",
  "to",
  "types",
  "type",
  "main",
  "explain",
  "terms",
  "simple",
  "simply",
  "please",
  "my",
  "are",
  "with",
  "this",
  "that",
  "or",
]);

export const getMeaningfulWords = (text: string): string[] => {
  return normalize(text)
    .split(" ")
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
};

export interface KnowledgeEntry {
  answer: string;
  variations?: string[];
}

export interface MatchResult {
  key: string;
  answer: string;
  score: number;
}

export const findBestMatch = (
  userInput: string,
  knowledgeBase: Record<string, KnowledgeEntry>,
  minScore: number = 6
): MatchResult | null => {
  const cleanInput = normalize(userInput);
  const inputWords = getMeaningfulWords(cleanInput);

  let bestMatch: MatchResult | null = null;
  let bestScore = -Infinity;

  for (const [key, entry] of Object.entries(knowledgeBase)) {
    const allPhrases = [key, ...(entry.variations || [])];

    for (const phrase of allPhrases) {
      const phraseNorm = normalize(phrase);
      const phraseWords = getMeaningfulWords(phraseNorm);

      const overlap = inputWords.reduce(
        (acc, w) => (phraseWords.includes(w) ? acc + 1 : acc),
        0
      );

      const reverseOverlap = phraseWords.reduce(
        (acc, w) => (inputWords.includes(w) ? acc + 1 : acc),
        0
      );

      const containment =
        phraseNorm.includes(cleanInput)
          ? 3
          : cleanInput.includes(phraseNorm)
          ? 2
          : 0;

      const lengthPenalty = Math.abs(phraseWords.length - inputWords.length) * 0.3;

      const score =
        overlap * 5 + reverseOverlap * 4 + containment * 6 - lengthPenalty;

      if (score > bestScore) {
        bestScore = score;
        bestMatch = {
          key,
          answer: entry.answer,
          score,
        };
      }
    }
  }

  if (bestMatch && bestScore >= minScore) {
    return bestMatch;
  }

  return null;
};

export const fuzzyMatchWithFallback = (
  userInput: string,
  knowledgeBase: Record<string, KnowledgeEntry>,
  fallbackGenerator?: (input: string) => string,
  minScore: number = 6
): string => {
  const match = findBestMatch(userInput, knowledgeBase, minScore);

  if (match) {
    return match.answer;
  }

  if (fallbackGenerator) {
    return fallbackGenerator(userInput);
  }

  return "I don't have specific information about that in my knowledge base. Try asking about required documents, the submission process, or specific forms.";
};
