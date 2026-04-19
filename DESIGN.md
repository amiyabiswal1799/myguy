# Design Brief

## Direction

MyGuy — AI companion social platform combining intimate AI chat with modern social feed, emphasizing dark-mode, minimal aesthetic with personality-based color differentiation.

## Tone

Brutally minimal with tech-forward warmth — Instagram's social architecture meets Nomi's intimate companion feel, rejecting skeuomorphism entirely.

## Differentiation

Each of four AI personalities gets a distinct OKLCH accent color + visual marker; chat UI prioritizes bubble-based conversation over decorative effects; social feed alternates surface elevation to guide attention.

## Color Palette

| Token                  | OKLCH Light    | OKLCH Dark     | Role                              |
| ---------------------- | -------------- | -------------- | --------------------------------- |
| background             | 0.99 0 0       | 0.08 0 0       | Page background (near-white/near-black) |
| foreground             | 0.15 0 0       | 0.96 0 0       | Body text                         |
| card                   | 0.96 0 0       | 0.12 0 0       | Card/section backgrounds          |
| primary                | 0.35 0 0       | 0.72 0.18 270  | Interactive elements, accent      |
| accent (personality)   | varies         | varies         | Friendly, romantic, mentor, business |
| muted                  | 0.92 0 0       | 0.22 0 0       | Secondary text, disabled states   |
| border                 | 0.88 0 0       | 0.18 0 0       | Subtle dividers                   |
| destructive            | 0.55 0.22 25   | 0.65 0.19 22   | Error/delete actions              |

## Typography

- Display: Bricolage Grotesque — headers, AI personality labels, bold callouts
- Body: General Sans — body text, chat, social feed captions
- Mono: JetBrains Mono — code snippets, timestamps
- Scale: h1 text-4xl font-display font-bold, h2 text-2xl font-display font-semibold, body text-base font-body, label text-xs font-body uppercase tracking-wider

## Elevation & Depth

Cards use subtle shadows (0 4px 16px 8% blur) in dark mode to create layered surface hierarchy; no drop shadows on interactive elements; focus ring uses primary accent color (0.72 0.18 270).

## Structural Zones

| Zone    | Background      | Border         | Notes                                   |
| ------- | --------------- | -------------- | --------------------------------------- |
| Header  | card            | border / 0.5px | Navigation + search, subtle top border  |
| Content | background      | —              | Feed/chat area, alternating section bg  |
| Chat    | popover (0.16)  | border / 0.5px | Message container, bubble-based layout  |
| Footer  | muted / 5%      | border / 0.5px | Copyright + links, bottom border        |

## Spacing & Rhythm

12px base unit; sections separated by 32px vertical gaps; card padding 20px; message bubbles 16px padding; group chat grid uses 16px gaps; generous whitespace around focal content.

## Component Patterns

- Buttons: rounded-lg bg-primary, hover:bg-primary/90, ring-2 ring-offset-2 ring-primary on focus
- Cards: rounded-lg bg-card shadow-card border border-border, no hover lift
- Badges: rounded-full px-3 py-1, color-coded by personality type, text-xs font-semibold
- Chat bubbles: rounded-2xl px-4 py-3, user messages bg-primary text-primary-foreground, AI messages bg-card border-border
- Personality cards: aspect-square, rounded-2xl, centered avatar + name + personality type label

## Motion

- Entrance: Fade in 200ms on page load; stagger chat messages 100ms each for conversation feel
- Hover: subtle text-opacity or scale 1.02 on interactive cards (200ms smooth)
- Transitions: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) — smooth, not bouncy

## Constraints

- Dark mode ONLY (no light mode toggle)
- No gradients on backgrounds; color-blocking only
- Max 2 font families (display + body); mono for code only
- Personality accent colors reserved for type badges and chat avatars only
- Social feed cards never use drop shadows; subtle border instead

## Signature Detail

Personality badge placement — each AI companion card shows a small circular color dot (8px) top-right corner matching its personality type, instantly differentiating the four companion archetypes on feed and in chat headers.
