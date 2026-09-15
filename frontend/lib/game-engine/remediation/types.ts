/**
 * Remediation types — alternative explanation modes
 */

export type ExplanationMode =
  | 'visual_objects'    // Use physical objects (counting blocks, fruits)
  | 'number_line'       // Use a number line
  | 'decomposition'     // Break the problem into smaller parts
  | 'real_world'        // Real-world context (money, shopping)
  | 'bar_model'         // Bar model diagram
  | 'pizza_model'       // Pizza/circle model for fractions
  | 'set_model'         // Set of objects for fractions
  | 'analogy'           // Analogy to something familiar
  | 'step_by_step'      // Step-by-step worked example
  | 'default';          // Default retry

export interface RemediationStrategy {
  /** The mode of explanation */
  mode: ExplanationMode;
  /** Spoken instruction for this mode */
  spokenText: string;
  /** Visual instruction text shown on canvas */
  visualText: string;
  /** Whether to show an alternative visual representation */
  showAlternativeVisual: boolean;
  /** Which renderer method to call for the alternative visual */
  rendererMethod?: string;
  /** Parameters for the alternative renderer */
  rendererParams?: number[];
}

export interface RemediationContext {
  /** The original question */
  question: string;
  /** The correct answer */
  correctAnswer: string;
  /** The student's wrong answer */
  studentAnswer: string;
  /** The subject */
  subject: string;
  /** The detected topic */
  topic: string;
  /** Which modes have already been shown */
  modesShown: ExplanationMode[];
  /** Error type from classifier */
  errorType: string;
  /** Specific misconception */
  misconception: string;
}
