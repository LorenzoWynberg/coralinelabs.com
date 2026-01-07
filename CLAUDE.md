# Claude Code Guidelines

This file contains preferences and guidelines for AI assistants (Claude Code) working on this project.

## Git Commit Messages

Commit messages should focus on what changed and why, not who or what tool made the change.

**Do not include:**
- AI attribution (e.g., "Generated with Claude Code")
- Co-authored-by tags for AI assistants
- References to AI tools in commit messages

**Do include:**
- Clear description of what changed
- Why the change was made (if not obvious)
- Any relevant technical details

### Example

Good:
```
fix: improve phone field autofill compatibility for mobile browsers

Add autocomplete="tel" attribute to phone input field and remove duplicate
hidden input to ensure proper autofill behavior on mobile devices.
```

Bad:
```
fix: improve phone field autofill compatibility for mobile browsers

Add autocomplete="tel" attribute to phone input field and remove duplicate
hidden input to ensure proper autofill behavior on mobile devices.

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```
