import { describe, expect, it } from 'vitest';
import flattenAbilities from './utils';

describe('flattenAbilities', () => {
  it('should flatten abilities correctly', () => {
    const abilities = [
      {
        effect_entries: [
          {
            effect: 'Effect 1',
            short_effect: 'Short Effect 1',
            language: { name: 'en', url: 'https://example.com/en' }
          },
          {
            effect: 'Effect 2',
            short_effect: 'Short Effect 2, but in french',
            language: { name: 'fr', url: 'https://example.com/fr' }
          }
        ],
        name: 'ability1'
      },
      {
        effect_entries: [
          {
            effect: 'Effect 3',
            short_effect: 'Short Effect 3',
            language: { name: 'en', url: 'https://example.com/en' }
          }
        ],
        name: 'ability2'
      }
    ];

    const expectedOutput = [
      {
        name: 'ability1',
        description: 'Effect 1',
        shortDescription: 'Short Effect 1'
      },
      {
        name: 'ability2',
        description: 'Effect 3',
        shortDescription: 'Short Effect 3'
      }
    ];

    const result = flattenAbilities(abilities);

    expect(result).toEqual(expectedOutput);
  });
});
