# Design System Specification: The Synthetic Architect

## 1. Overview & Creative North Star
**Creative North Star: "The Terminal Sublime"**

This design system is not a template; it is a high-end digital environment built for the elite developer. It moves away from the "flat web" by embracing **The Terminal Sublime**—a philosophy that blends the raw, functional power of a code editor with the ethereal, layered depth of futuristic glass interfaces. 

To break the "standard" portfolio look, this system utilizes **intentional asymmetry** and **tonal layering**. Elements are not merely placed on a grid; they are "docked" into a digital workspace. We use high-contrast typography scales and overlapping glass modules to create a sense of three-dimensional space, ensuring the developer’s work feels less like a webpage and more like a proprietary OS.

## 2. Colors & Atmospheric Depth
Our palette is rooted in the void (`#10141a`), punctuated by high-energy neon pulses.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section off content. Traditional dividers are prohibited. 
*   **Separation through Tonal Shift:** Define sections by transitioning from `surface` to `surface-container-low` or `surface-container-high`. 
*   **Separation through Space:** Use aggressive vertical margins from our spacing scale to let content breathe, rather than trapping it in boxes.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested physical layers. 
*   **The Foundation:** Use `surface` (`#10141a`) for the base background.
*   **The Workspace:** Use `surface-container-low` (`#181c22`) for secondary layout areas.
*   **The Module:** Use `surface-container-highest` (`#31353c`) for interactive elements or cards.
By nesting a "Highest" tier module within a "Low" tier section, we create immediate visual hierarchy without a single line of CSS border code.

### The Glass & Gradient Rule
Main CTAs and Hero elements must transcend flat hex codes. 
*   **Neon Gradients:** Use a linear gradient from `primary` (`#e9feff`) to `primary-container` (`#00f5ff`) for primary actions.
*   **Glassmorphism:** For floating navigation or modal overlays, use `surface-variant` (`#31353c`) at 40% opacity with a `backdrop-filter: blur(20px)`. This creates a "frosted" aesthetic that lets background neon glows bleed through.

## 3. Typography: Editorial Logic
We combine the humanist clarity of **Inter** with the technical precision of **Space Grotesk** (and monospaced accents).

*   **The Display Scale:** Use `display-lg` (Space Grotesk) for impact. To create an editorial feel, use extreme letter-spacing (-0.04em) on large headlines.
*   **The Technical Voice:** `label-md` and `label-sm` should be used for metadata, git hashes, or tech stacks. These are our "monospaced-adjacent" moments that signal developer-centricity.
*   **Contrast as Hierarchy:** Pair a large `headline-lg` with a tiny, all-caps `label-sm` in `secondary` (`#fface8`) to create a professional, high-end "dashboard" feel.

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to simulate height; we use light and transparency.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` card placed on a `surface-bright` section creates a "sunken" effect, perfect for code snippets.
*   **Ambient Shadows:** If an element must float (e.g., a dropdown), use a shadow with a blur of 40px and 6% opacity. Use a tint of `primary` (`#e9feff`) instead of black to simulate the glow of the screen.
*   **The Ghost Border:** If accessibility requires a container boundary, use `outline-variant` (`#3a494a`) at **15% opacity**. It should be felt, not seen.
*   **Subtle Glows:** Use the `primary-container` color as a 20% opacity "inner-glow" on active cards to simulate a powered-on state.

## 5. Components

### Buttons: The Kinetic Trigger
*   **Primary:** Gradient of `primary` to `primary-container`. `radius-md`. No border. On hover, add a 10px outer glow of the `surface-tint`.
*   **Secondary:** `surface-container-high` background with `on-surface` text. 
*   **Tertiary:** Ghost style. No background. `primary` text with a monospaced font-weight.

### Cards: The Glass Module
*   **Rule:** Forbid divider lines within cards.
*   **Style:** Use `surface-container-low` at 60% opacity with backdrop blur. Use `padding-xl` for internal spacing. Separate header and body through a background shift to `surface-container-highest` at the bottom 20% of the card.

### Chips: The Syntax Tag
*   **Style:** Rounded-full. `surface-container-highest` background. Text in `primary-fixed-dim`. These should look like variables in a high-end IDE.

### Input Fields: The Command Line
*   **Style:** `surface-container-lowest` background. Only a bottom-aligned "Active" bar in `secondary` (`#fface8`) when focused. Typography must be monospaced for the input text.

### Code Blocks: The Feature
*   **Style:** `surface-container-lowest` background. `radius-lg`. High contrast syntax highlighting using `secondary` (magenta) for keywords and `primary` (cyan) for strings.

## 6. Do's and Don'ts

### Do:
*   **Do** overlap elements. Let a glass card sit 20px over a section boundary to create depth.
*   **Do** use asymmetrical layouts (e.g., a 7-column main area and a 5-column secondary area).
*   **Do** use `primary` and `secondary` accents sparingly—they are "signals" in a dark environment.

### Don't:
*   **Don't** use 100% white. Use `on-surface` (`#dfe2eb`) to prevent eye strain.
*   **Don't** use standard 1px borders. If you feel you need one, use a tonal background shift instead.
*   **Don't** use "flat" shadows. If it doesn't glow or blur, it doesn't belong in this system.
*   **Don't** use default Inter for everything. Use the mono-scale for all technical data to maintain the developer persona.