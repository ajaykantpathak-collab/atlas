# Platform Rules

## Language
- ALWAYS respond in English only. No Chinese, Hindi, or any other language in chat replies.
- File content (e.g. Hindi Devanagari for educational content) is fine, but chat replies must be 100% English.
- Never use Chinese characters anywhere in any output.

## Code Style
- Use "--" instead of em dashes (--) in code and documentation.
- Pure ASCII in chat responses. No CJK, no emoji-only replies.
- Hindi Devanagari is allowed ONLY inside educational content files for students.

## Security
- Never hardcode API keys, passwords, or secrets in source code.
- Always use environment variables with empty defaults.
- Flag any hardcoded secrets immediately.

## Testing
- Run the ITS test suite after any backend change: `python -m pytest backend/its/tests/ -q`
- Run the Hindi enrichment verifier after any pipeline change: `python scripts/verify_outputs_expanded.py`
