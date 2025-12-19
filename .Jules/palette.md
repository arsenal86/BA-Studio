## 2025-12-19 - Critical Accessibility Gap in Interactive Cards
**Learning:** Key navigation components (`FeatureCard`) were implemented as `div`s with `onClick`, completely excluding keyboard users. This is a common pattern in this codebase where visual design prioritized "card" look over semantic interaction.
**Action:** Use `<button>` for interactive cards by default, or `<a>` if they are pure links. Ensure `w-full` and proper text alignment are added to match block-level `div` behavior when switching to `button`.
