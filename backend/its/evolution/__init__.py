"""evolution — self-improvement layer for the ITS.

Closes the loop on MetaBrain's nightly mining jobs. MetaBrain produces a
read-only MetaBrainReport; this package is responsible for turning those
findings into live system changes under safety gates.

Modules:
    outcome_attribution   — links each interaction to the rule/prompt that produced it
    apply_loop            — writes MetaBrain findings into OrchestratorRule + A/B tests
    misconception_writer  — promotes discovered error clusters into the misconception catalog
    prompt_registry       — versioned renderer prompts with effectiveness tracking
"""
