import { reverseWords, isAlphanumeric } from './text-utils';

describe('text-utils', () => {
  describe('isAlphanumeric', () => {
    it('should return true for letters', () => {
      expect(isAlphanumeric('a')).toBe(true);
      expect(isAlphanumeric('Z')).toBe(true);
    });

    it('should return true for numbers', () => {
      expect(isAlphanumeric('0')).toBe(true);
      expect(isAlphanumeric('9')).toBe(true);
    });

    it('should return false for punctuation', () => {
      expect(isAlphanumeric('.')).toBe(false);
      expect(isAlphanumeric(',')).toBe(false);
      expect(isAlphanumeric('!')).toBe(false);
      expect(isAlphanumeric('?')).toBe(false);
    });

    it('should return false for special characters', () => {
      expect(isAlphanumeric('@')).toBe(false);
      expect(isAlphanumeric('#')).toBe(false);
      expect(isAlphanumeric(' ')).toBe(false);
    });
  });

  describe('reverseWords', () => {
    it('should reverse letters in each word while maintaining sentence structure', () => {
      const input = 'The red fox crosses the ice, intent on none of my business.';
      const expected = 'ehT der xof sessorc eht eci, tnetni no enon fo ym ssenisub.';
      expect(reverseWords(input)).toBe(expected);
    });

    it('should handle single word', () => {
      expect(reverseWords('Hello')).toBe('olleH');
    });

    it('should handle word with trailing punctuation', () => {
      expect(reverseWords('Hello!')).toBe('olleH!');
      expect(reverseWords('world,')).toBe('dlrow,');
      expect(reverseWords('end.')).toBe('dne.');
    });

    it('should handle word with leading punctuation', () => {
      expect(reverseWords('"Hello')).toBe('"olleH');
      expect(reverseWords('(world')).toBe('(dlrow');
    });

    it('should handle word with both leading and trailing punctuation', () => {
      expect(reverseWords('"Hello!"')).toBe('"olleH!"');
      expect(reverseWords('(world).')).toBe('(dlrow).');
    });

    it('should handle multiple spaces', () => {
      expect(reverseWords('Hello  world')).toBe('olleH  dlrow');
    });

    it('should handle empty string', () => {
      expect(reverseWords('')).toBe('');
    });

    it('should handle string with only spaces', () => {
      expect(reverseWords('   ')).toBe('');
    });

    it('should handle string with only punctuation', () => {
      expect(reverseWords('...')).toBe('...');
      expect(reverseWords('!!!')).toBe('!!!');
    });

    it('should handle mixed case letters', () => {
      expect(reverseWords('HeLLo WoRLd')).toBe('oLLeH dLRoW');
    });

    it('should handle numbers', () => {
      expect(reverseWords('test123')).toBe('321tset');
      expect(reverseWords('123test')).toBe('tset321');
    });

    it('should handle words with numbers and punctuation', () => {
      expect(reverseWords('test123!')).toBe('321tset!');
      expect(reverseWords('item-1')).toBe('1-meti');
    });

    it('should preserve multiple punctuation marks', () => {
      expect(reverseWords('What?!')).toBe('tahW?!');
      expect(reverseWords('No...')).toBe('oN...');
    });

    it('should handle complex sentence', () => {
      const input = 'Hello, my name is John. How are you?';
      const expected = 'olleH, ym eman si nhoJ. woH era uoy?';
      expect(reverseWords(input)).toBe(expected);
    });

    it('should handle sentence with quotes', () => {
      const input = 'He said, "Hello world!"';
      const expected = 'eH dias, "olleH dlrow!"';
      expect(reverseWords(input)).toBe(expected);
    });

    it('should handle apostrophes within words', () => {
      expect(reverseWords("don't")).toBe("t'nod");
      expect(reverseWords("it's")).toBe("s'ti");
    });

    it('should handle hyphenated words', () => {
      expect(reverseWords('well-known')).toBe('nwonk-llew');
      expect(reverseWords('state-of-the-art')).toBe('tra-eht-fo-etats');
    });
  });
});
