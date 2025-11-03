/**
 * Checks if a character is alphanumeric
 */
export const isAlphanumeric = (char: string): boolean => {
  return /[a-zA-Z0-9]/.test(char);
};

/**
 * Reverses the letters in each word while maintaining the original sentence structure
 * and preserving punctuation positions.
 *
 * Example:
 * Input: "The red fox crosses the ice, intent on none of my business."
 * Output: "ehT der xof sessorc eht eci, tnetni no enon fo ym ssenisub."
 *
 * @param text - The input text to process
 * @returns The text with reversed words
 */
export const reverseWords = (text: string): string => {
  if (!text.trim()) {
    return '';
  }

  // Split by spaces to preserve spacing
  const words = text.split(' ');

  const reversedWords = words.map(word => {
    if (word.length === 0) return word;

    // Find where the actual word starts (skip leading punctuation)
    let startIndex = 0;
    while (startIndex < word.length && !isAlphanumeric(word[startIndex])) {
      startIndex++;
    }

    // Find where the actual word ends (skip trailing punctuation)
    let endIndex = word.length - 1;
    while (endIndex >= 0 && !isAlphanumeric(word[endIndex])) {
      endIndex--;
    }

    // If no alphanumeric characters, return as is
    if (startIndex > endIndex) {
      return word;
    }

    // Extract parts
    const leadingPunctuation = word.substring(0, startIndex);
    const trailingPunctuation = word.substring(endIndex + 1);
    const actualWord = word.substring(startIndex, endIndex + 1);

    // Reverse only the alphanumeric part
    const reversedWord = actualWord.split('').reverse().join('');

    // Reconstruct with punctuation in original positions
    return leadingPunctuation + reversedWord + trailingPunctuation;
  });

  return reversedWords.join(' ');
};
