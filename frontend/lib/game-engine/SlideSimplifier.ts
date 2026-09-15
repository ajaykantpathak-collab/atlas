/**
 * SlideSimplifier — adapts teaching slide text for young students (Class 1-2).
 *
 * Simplifies complex vocabulary, shortens sentences, and adds kid-friendly
 * language without modifying the original game files.
 */

/**
 * Simplify text for Class 1-2 students.
 * For Class 3+, return the original text.
 */
export function simplifySlideText(text: string, classLevel: number): string {
  if (classLevel > 2) return text;
  if (!text) return text;

  let simplified = text;

  // Replace complex words with simpler ones
  const replacements: Array<[RegExp, string]> = [
    [/\bcombination\b/gi, 'mixing'],
    [/\bcombine\b/gi, 'mix'],
    [/\bcombining\b/gi, 'mixing'],
    [/\bprocess of\b/gi, 'way of'],
    [/\bcalculate\b/gi, 'count'],
    [/\bcalculation\b/gi, 'counting'],
    [/\bquantity\b/gi, 'amount'],
    [/\bnumerical\b/gi, 'number'],
    [/\brepresent\b/gi, 'show'],
    [/\brepresentation\b/gi, 'picture'],
    [/\bconcept\b/gi, 'idea'],
    [/\bconceptual\b/gi, ''],
    [/\bfundamental\b/gi, 'important'],
    [/\bessentially\b/gi, ''],
    [/\bdemonstrate\b/gi, 'show'],
    [/\bdemonstrates\b/gi, 'shows'],
    [/\bdemonstration\b/gi, 'show'],
    [/\billustrate\b/gi, 'show'],
    [/\billustrates\b/gi, 'shows'],
    [/\billustration\b/gi, 'picture'],
    [/\bvisualize\b/gi, 'picture'],
    [/\bvisualization\b/gi, 'picture'],
    [/\bidentify\b/gi, 'find'],
    [/\bidentifying\b/gi, 'finding'],
    [/\bidentification\b/gi, 'finding'],
    [/\bclassify\b/gi, 'sort'],
    [/\bclassifying\b/gi, 'sorting'],
    [/\bclassification\b/gi, 'sorting'],
    [/\bcategorize\b/gi, 'sort'],
    [/\bcategorizing\b/gi, 'sorting'],
    [/\bdistinguish\b/gi, 'tell apart'],
    [/\bdistinguishing\b/gi, 'telling apart'],
    [/\brecognize\b/gi, 'know'],
    [/\brecognizing\b/gi, 'knowing'],
    [/\bunderstand\b/gi, 'learn'],
    [/\bunderstanding\b/gi, 'learning'],
    [/\bcomprehend\b/gi, 'understand'],
    [/\bcomprehension\b/gi, 'understanding'],
    [/\butilize\b/gi, 'use'],
    [/\butilizing\b/gi, 'using'],
    [/\butilization\b/gi, 'use'],
    [/\bconsists of\b/gi, 'has'],
    [/\bconsisting of\b/gi, 'having'],
    [/\bcomprises\b/gi, 'has'],
    [/\bcomprising\b/gi, 'having'],
    [/\btherefore\b/gi, 'so'],
    [/\bhowever\b/gi, 'but'],
    [/\bfurthermore\b/gi, 'also'],
    [/\bmoreover\b/gi, 'also'],
    [/\bin addition\b/gi, 'also'],
    [/\bsubsequently\b/gi, 'then'],
    [/\bconsequently\b/gi, 'so'],
    [/\bnevertheless\b/gi, 'but'],
    [/\bnotwithstanding\b/gi, 'but'],
    [/\bprior to\b/gi, 'before'],
    [/\bsubsequent to\b/gi, 'after'],
    [/\bin order to\b/gi, 'to'],
    [/\breferred to as\b/gi, 'called'],
    [/\bknown as\b/gi, 'called'],
    [/\bdefined as\b/gi, 'is'],
    [/\bdescribed as\b/gi, 'is'],
    [/\bcharacterized by\b/gi, 'has'],
    [/\bassociated with\b/gi, 'goes with'],
    [/\brelated to\b/gi, 'like'],
    [/\bsimilar to\b/gi, 'like'],
    [/\bvarious\b/gi, 'many'],
    [/\bnumerous\b/gi, 'many'],
    [/\bseveral\b/gi, 'some'],
    [/\bparticular\b/gi, 'one'],
    [/\bspecific\b/gi, 'one'],
    [/\bspecifically\b/gi, ''],
    [/\bgenerally\b/gi, 'usually'],
    [/\btypically\b/gi, 'usually'],
    [/\bcommonly\b/gi, 'a lot'],
    [/\bfrequently\b/gi, 'a lot'],
    [/\boften\b/gi, 'a lot'],
    [/\brarely\b/gi, 'not often'],
    [/\bseldom\b/gi, 'not often'],
    [/\bapproximately\b/gi, 'about'],
    [/\broughly\b/gi, 'about'],
    [/\badequate\b/gi, 'enough'],
    [/\bsufficient\b/gi, 'enough'],
    [/\binsufficient\b/gi, 'not enough'],
    [/\bexcessive\b/gi, 'too much'],
    [/\babundant\b/gi, 'a lot of'],
    [/\bscarce\b/gi, 'hard to find'],
    [/\bessential\b/gi, 'needed'],
    [/\bnecessary\b/gi, 'needed'],
    [/\bunnecessary\b/gi, 'not needed'],
    [/\bimportant\b/gi, 'important'], // keep
    [/\bsignificant\b/gi, 'big'],
    [/\bsignificance\b/gi, 'meaning'],
    [/\brequire\b/gi, 'need'],
    [/\brequires\b/gi, 'needs'],
    [/\brequirement\b/gi, 'need'],
    [/\bobtain\b/gi, 'get'],
    [/\bobtained\b/gi, 'got'],
    [/\bacquire\b/gi, 'get'],
    [/\bacquired\b/gi, 'got'],
    [/\bpossess\b/gi, 'have'],
    [/\bpossesses\b/gi, 'has'],
    [/\bpossessing\b/gi, 'having'],
    [/\bcontain\b/gi, 'have'],
    [/\bcontains\b/gi, 'has'],
    [/\bcontaining\b/gi, 'having'],
    [/\binclude\b/gi, 'have'],
    [/\bincludes\b/gi, 'has'],
    [/\bincluding\b/gi, 'with'],
    [/\bexclude\b/gi, 'leave out'],
    [/\bexcludes\b/gi, 'leaves out'],
    [/\bexcluding\b/gi, 'leaving out'],
    [/\bcreate\b/gi, 'make'],
    [/\bcreates\b/gi, 'makes'],
    [/\bcreating\b/gi, 'making'],
    [/\bcreation\b/gi, 'making'],
    [/\bproduce\b/gi, 'make'],
    [/\bproduces\b/gi, 'makes'],
    [/\bproducing\b/gi, 'making'],
    [/\bproduction\b/gi, 'making'],
    [/\bgenerate\b/gi, 'make'],
    [/\bgenerates\b/gi, 'makes'],
    [/\bgenerating\b/gi, 'making'],
    [/\bformation\b/gi, 'making'],
    [/\bformed\b/gi, 'made'],
    [/\bforming\b/gi, 'making'],
    [/\btransform\b/gi, 'change'],
    [/\btransforms\b/gi, 'changes'],
    [/\btransforming\b/gi, 'changing'],
    [/\btransformation\b/gi, 'change'],
    [/\bconvert\b/gi, 'change'],
    [/\bconverts\b/gi, 'changes'],
    [/\bconverting\b/gi, 'changing'],
    [/\bconversion\b/gi, 'change'],
    [/\bmodify\b/gi, 'change'],
    [/\bmodifies\b/gi, 'changes'],
    [/\bmodifying\b/gi, 'changing'],
    [/\bmodification\b/gi, 'change'],
    [/\balter\b/gi, 'change'],
    [/\balters\b/gi, 'changes'],
    [/\baltering\b/gi, 'changing'],
    [/\balteration\b/gi, 'change'],
    [/\bobserve\b/gi, 'look at'],
    [/\bobserves\b/gi, 'looks at'],
    [/\bobserving\b/gi, 'looking at'],
    [/\bobervation\b/gi, 'looking'],
    [/\bexamine\b/gi, 'look at'],
    [/\bexamines\b/gi, 'looks at'],
    [/\bexamining\b/gi, 'looking at'],
    [/\bexamination\b/gi, 'looking'],
    [/\binvestigate\b/gi, 'look into'],
    [/\binvestigates\b/gi, 'looks into'],
    [/\binvestigating\b/gi, 'looking into'],
    [/\binvestigation\b/gi, 'looking'],
    [/\bexplore\b/gi, 'look at'],
    [/\bexplores\b/gi, 'looks at'],
    [/\bexploring\b/gi, 'looking at'],
    [/\bexploration\b/gi, 'looking'],
    [/\bdiscover\b/gi, 'find'],
    [/\bdiscovers\b/gi, 'finds'],
    [/\bdiscovering\b/gi, 'finding'],
    [/\bdiscovery\b/gi, 'finding'],
  ];

  for (const [pattern, replacement] of replacements) {
    simplified = simplified.replace(pattern, replacement);
  }

  // Shorten sentences that are too long (split on periods, keep first part if > 100 chars)
  if (simplified.length > 120) {
    const sentences = simplified.split(/(?<=[.!?])\s+/);
    const shortened = sentences.map(s => {
      if (s.length > 80) {
        // Find a natural break point
        const commaIdx = s.indexOf(',', 40);
        if (commaIdx > 0 && commaIdx < 70) {
          return s.substring(0, commaIdx + 1) + '...';
        }
        return s.substring(0, 75) + '...';
      }
      return s;
    });
    simplified = shortened.join(' ');
  }

  // Clean up double spaces from replacements
  simplified = simplified.replace(/\s+/g, ' ').trim();

  return simplified;
}

/**
 * Simplify slide title for young students.
 */
export function simplifySlideTitle(title: string, classLevel: number): string {
  if (classLevel > 2) return title;
  // Titles are usually short already, just remove complex words
  return simplifySlideText(title, classLevel);
}
