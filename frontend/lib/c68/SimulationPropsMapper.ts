/**
 * SimulationPropsMapper — Converts EnrichmentNode data to simulation component props.
 *
 * The enrichment files have DiagnosticQuestions with only {number, bloomLevel, question, answer}.
 * The simulation components need enhanced challenges with:
 *   {number, bloomLevel, question, answer, answerType, unit, formula, working, options, hint}
 *
 * This mapper:
 * 1. Infers answerType from the question text and answer content
 * 2. Extracts formula hints from the question text
 * 3. Generates step-by-step working from the answer
 * 4. Generates MCQ options for recall questions
 * 5. Maps misconceptions to {belief, correction} format
 * 6. Determines which simulation template to render
 */

import type { EnrichmentNode, DiagnosticQuestion } from '../game-engine/EnrichmentParser';
import { inferTemplateType, type SimulationTemplateType } from './SimulationRegistry';

// ─── Enhanced challenge type (what simulations expect) ────────

export interface EnhancedChallenge {
  number: number;
  bloomLevel: string;
  question: string;
  answer: string;
  answerType: 'number' | 'text' | 'mcq';
  unit?: string;
  formula?: string;
  working?: string;
  options?: string[];
  hint?: string;
}

export interface SimulationProps {
  nodeId: string;
  title: string;
  definition: string;
  eli5: string;
  misconceptions: Array<{ belief: string; correction: string }>;
  diagnosticQuestions: EnhancedChallenge[];
  masteryCriteria: string;
  templateType: SimulationTemplateType;
}

// ─── Answer type inference ────────────────────────────────────

function inferAnswerType(q: DiagnosticQuestion): 'number' | 'text' | 'mcq' {
  const questionLower = q.question.toLowerCase();
  const answerLower = q.answer.toLowerCase().trim();

  // If answer is a short number or simple value → number
  const numericMatch = q.answer.match(/^[-]?\d+(\.\d+)?$/);
  if (numericMatch && q.answer.length < 10) {
    return 'number';
  }

  // Recall questions → MCQ (generate options)
  if (q.bloomLevel === 'recall' && q.answer.length < 200) {
    return 'mcq';
  }

  // Questions asking to "explain", "describe", "evaluate", "design", "compare" → text
  if (questionLower.includes('explain') || questionLower.includes('describe') ||
      questionLower.includes('evaluate') || questionLower.includes('design') ||
      questionLower.includes('compare') || questionLower.includes('list') ||
      questionLower.includes('why') || questionLower.includes('how') ||
      q.answer.length > 100) {
    return 'text';
  }

  // Default: text for complex answers, mcq for short ones
  return q.answer.length < 80 ? 'mcq' : 'text';
}

// ─── Unit extraction ──────────────────────────────────────────

function extractUnit(question: string, answer: string): string | undefined {
  // Look for units in the answer
  const unitPatterns: Array<{ regex: RegExp; unit: string }> = [
    { regex: /\b(\d+(\.\d+)?)\s*(m|metre|meter)s?\b/i, unit: 'm' },
    { regex: /\b(\d+(\.\d+)?)\s*(cm|centimetre|centimeter)s?\b/i, unit: 'cm' },
    { regex: /\b(\d+(\.\d+)?)\s*(km|kilometre|kilometer)s?\b/i, unit: 'km' },
    { regex: /\b(\d+(\.\d+)?)\s*(kg|kilogram)s?\b/i, unit: 'kg' },
    { regex: /\b(\d+(\.\d+)?)\s*(g|gram)s?\b/i, unit: 'g' },
    { regex: /\b(\d+(\.\d+)?)\s*(s|sec|second)s?\b/i, unit: 's' },
    { regex: /\b(\d+(\.\d+)?)\s*(min|minute)s?\b/i, unit: 'min' },
    { regex: /\b(\d+(\.\d+)?)\s*(h|hr|hour)s?\b/i, unit: 'h' },
    { regex: /\b(\d+(\.\d+)?)\s*(N|newton)s?\b/i, unit: 'N' },
    { regex: /\b(\d+(\.\d+)?)\s*(J|joule)s?\b/i, unit: 'J' },
    { regex: /\b(\d+(\.\d+)?)\s*(W|watt)s?\b/i, unit: 'W' },
    { regex: /\b(\d+(\.\d+)?)\s*(V|volt)s?\b/i, unit: 'V' },
    { regex: /\b(\d+(\.\d+)?)\s*(A|amp|ampere)s?\b/i, unit: 'A' },
    { regex: /\b(\d+(\.\d+)?)\s*(Ω|ohm)s?\b/i, unit: 'Ω' },
    { regex: /\b(\d+(\.\d+)?)\s*(K|kelvin)\b/i, unit: 'K' },
    { regex: /\b(\d+(\.\d+)?)\s*°C\b/i, unit: '°C' },
    { regex: /\b(\d+(\.\d+)?)\s*(Hz|hertz)\b/i, unit: 'Hz' },
    { regex: /\b(\d+(\.\d+)?)\s*(Pa|pascal)\b/i, unit: 'Pa' },
    { regex: /\b(\d+(\.\d+)?)\s*(m\/s|mps)\b/i, unit: 'm/s' },
    { regex: /\b(\d+(\.\d+)?)\s*(g\/cm³|gcc)\b/i, unit: 'g/cm³' },
  ];

  for (const { regex, unit } of unitPatterns) {
    if (regex.test(answer)) return unit;
  }

  // Check question for unit hints
  if (question.includes('°')) return '°';
  if (question.match(/\bhow many\b/i) && answer.match(/^\d+$/)) return '';

  return undefined;
}

// ─── Formula extraction ───────────────────────────────────────

function inferFormula(question: string, bloomLevel: string): string | undefined {
  const q = question.toLowerCase();

  // Physics formulas
  if (q.includes('speed') || q.includes('velocity')) return 'Speed = Distance / Time';
  if (q.includes('density')) return 'Density = Mass / Volume';
  if (q.includes('force') || q.includes('newton')) return 'F = m × a';
  if (q.includes('weight')) return 'W = m × g';
  if (q.includes('pressure')) return 'Pressure = Force / Area';
  if (q.includes('work')) return 'Work = Force × Distance';
  if (q.includes('power')) return 'Power = Work / Time = V × I';
  if (q.includes('ohm') || q.includes('current') || q.includes('voltage') || q.includes('resistance')) return 'V = I × R (Ohm\'s Law)';
  if (q.includes('reflection') || q.includes('angle of incidence')) return '∠i = ∠r (Law of Reflection)';
  if (q.includes('mirror') && q.includes('focal')) return '1/f = 1/u + 1/v (Mirror Formula)';
  if (q.includes('refraction') || q.includes('refractive')) return 'n = sin(i) / sin(r) (Snell\'s Law)';
  if (q.includes('wavelength') || q.includes('frequency')) return 'v = f × λ (Wave Equation)';
  if (q.includes('heat') || q.includes('conduction')) return 'Q = k × A × ΔT / d';
  if (q.includes('magnet') || q.includes('magnetic force')) return 'F ∝ (q₁ × q₂) / r²';

  // Math formulas
  if (q.includes('area') && q.includes('triangle')) return 'Area = ½ × base × height';
  if (q.includes('area') && q.includes('circle')) return 'Area = π × r²';
  if (q.includes('area') && q.includes('rectangle')) return 'Area = length × width';
  if (q.includes('perimeter')) return 'Perimeter = sum of all sides';
  if (q.includes('volume') && q.includes('cube')) return 'Volume = side³';
  if (q.includes('volume') && q.includes('cylinder')) return 'Volume = π × r² × h';
  if (q.includes('circumference')) return 'C = 2 × π × r';
  if (q.includes('pythagoras') || q.includes('hypotenuse')) return 'a² + b² = c² (Pythagoras)';
  if (q.includes('percentage')) return 'Percentage = (part / whole) × 100';
  if (q.includes('profit') || q.includes('loss')) return 'Profit/Loss = CP × (P% or L%) / 100';
  if (q.includes('simple interest') || q.includes('si')) return 'SI = (P × R × T) / 100';
  if (q.includes('compound interest') || q.includes('ci')) return 'CI = P × (1 + R/100)ᵗ - P';
  if (q.includes('average') || q.includes('mean')) return 'Mean = sum of values / count';
  if (q.includes('probability')) return 'P(event) = favorable outcomes / total outcomes';

  // Chemistry formulas
  if (q.includes('mole') || q.includes('molar')) return 'n = mass / molar mass';
  if (q.includes('ph')) return 'pH = -log[H⁺]';

  // Recall questions usually don't need formulas
  if (bloomLevel === 'recall') return undefined;

  return undefined;
}

// ─── Working generation ───────────────────────────────────────

function generateWorking(q: DiagnosticQuestion, formula?: string): string {
  const lines: string[] = [];

  if (formula) {
    lines.push(`Formula: ${formula}`);
  }

  // Extract the answer's key points
  const answerSentences = q.answer.split('. ').filter(s => s.trim().length > 0);

  if (q.bloomLevel === 'recall' || q.bloomLevel === 'reasoning') {
    lines.push('');
    lines.push('Answer explanation:');
    answerSentences.slice(0, 3).forEach((s, i) => {
      lines.push(`${i + 1}. ${s.trim()}`);
    });
  } else if (q.bloomLevel === 'apply' || q.bloomLevel === 'evaluate') {
    lines.push('');
    lines.push('Step-by-step:');
    answerSentences.forEach((s, i) => {
      lines.push(`Step ${i + 1}: ${s.trim()}`);
    });
  } else {
    lines.push('');
    lines.push(q.answer);
  }

  return lines.join('\n');
}

// ─── MCQ option generation ────────────────────────────────────

function generateMCQOptions(q: DiagnosticQuestion): string[] {
  // For recall questions, try to generate plausible distractors
  const correct = q.answer.trim();

  // If answer is very long, MCQ is not suitable — convert to text
  if (correct.length > 150) {
    return [];
  }

  // Extract the first sentence as the short answer
  const shortAnswer = correct.split('.')[0].trim();

  // Generic distractors based on common misconceptions
  // These are placeholder distractors — in a real system these would come from
  // the misconception data or be generated more intelligently
  const distractors: string[] = [];

  // Try to create distractors by negating or altering the answer
  if (shortAnswer.includes('is ')) {
    distractors.push(shortAnswer.replace('is ', 'is not '));
  }
  if (shortAnswer.includes('increases') || shortAnswer.includes('increase')) {
    distractors.push(shortAnswer.replace(/increases?/i, 'decreases'));
  }
  if (shortAnswer.includes('decreases') || shortAnswer.includes('decrease')) {
    distractors.push(shortAnswer.replace(/decreases?/i, 'increases'));
  }

  // Add generic wrong answers
  distractors.push('None of the above');
  distractors.push('It depends on the temperature');

  // Shuffle and take 3 distractors + correct
  const allOptions = [shortAnswer, ...distractors.filter(d => d !== shortAnswer)];
  const unique = Array.from(new Set(allOptions)).slice(0, 4);

  // Shuffle
  for (let i = unique.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [unique[i], unique[j]] = [unique[j], unique[i]];
  }

  return unique;
}

// ─── Hint generation ──────────────────────────────────────────

function generateHint(q: DiagnosticQuestion, formula?: string): string {
  if (formula) {
    return `Use the formula: ${formula}. Look at the simulation to find the values you need.`;
  }

  if (q.bloomLevel === 'recall') {
    return 'Check the ELI5 and Theory tabs for the definition.';
  }

  if (q.bloomLevel === 'apply') {
    return 'Set up the simulation as described, then read the live readout values.';
  }

  if (q.bloomLevel === 'evaluate') {
    return 'Think about what changes and what stays the same. Compare before and after.';
  }

  return 'Re-read the theory tab and try interacting with the simulation.';
}

// ─── Numeric answer extraction ────────────────────────────────

function extractNumericAnswer(answer: string): string {
  // Extract the first number from the answer
  const match = answer.match(/[-]?\d+(\.\d+)?/);
  return match ? match[0] : answer.trim();
}

// ─── Main conversion function ─────────────────────────────────

export function enrichNodeToSimProps(node: EnrichmentNode): SimulationProps {
  const templateType = inferTemplateType(node);

  // Convert diagnostic questions to enhanced challenges
  // Take only the first 3 questions (recall → apply → evaluate/create)
  // to match the simulation challenge format
  const selectedQuestions = node.diagnosticQuestions.slice(0, 3);

  const enhancedChallenges: EnhancedChallenge[] = selectedQuestions.map((q) => {
    const answerType = inferAnswerType(q);
    const unit = extractUnit(q.question, q.answer);
    const formula = inferFormula(q.question, q.bloomLevel);
    const working = generateWorking(q, formula);
    const hint = generateHint(q, formula);

    let options: string[] | undefined;
    let finalAnswer = q.answer;

    if (answerType === 'mcq') {
      options = generateMCQOptions(q);
      if (options.length < 2) {
        // Fallback to text if we can't generate good options
        return {
          number: q.number,
          bloomLevel: q.bloomLevel,
          question: q.question,
          answer: q.answer,
          answerType: 'text' as const,
          unit,
          formula,
          working,
          hint,
        };
      }
    } else if (answerType === 'number') {
      finalAnswer = extractNumericAnswer(q.answer);
    }

    return {
      number: q.number,
      bloomLevel: q.bloomLevel,
      question: q.question,
      answer: finalAnswer,
      answerType,
      unit,
      formula,
      working,
      options,
      hint,
    };
  });

  // Convert misconceptions
  const misconceptions = node.misconceptions.map(m => ({
    belief: m.belief,
    correction: m.correction,
  }));

  return {
    nodeId: node.nodeId,
    title: node.title,
    definition: node.definition,
    eli5: node.eli5,
    misconceptions,
    diagnosticQuestions: enhancedChallenges,
    masteryCriteria: node.masteryCriteria,
    templateType,
  };
}
