# Design QA — product cards and footer

## Reference

- Product-card issue: `/Users/zeljkamikulcic/Desktop/Screenshot 2026-10-30 at 15.00.11.png`
- Footer-logo issue: `/Users/zeljkamikulcic/Desktop/Screenshot 2026-10-30 at 15.00.46.png`
- Corrected mobile capture: `/Users/zeljkamikulcic/Documents/Codex/2026-10-29/referenced-chatgpt-conversation-this-is-an-2/outputs/vespera-mobile-card-fixed.png`
- Corrected footer capture: `/Users/zeljkamikulcic/Documents/Codex/2026-10-29/referenced-chatgpt-conversation-this-is-an-2/outputs/vespera-mobile-footer-fixed.png`

## Test setup

- Browser: Codex in-app browser
- Responsive viewport: 414 × 850 CSS px, matching the approximate 2× mobile viewport represented by the 828 px-wide user screenshot
- Page: local production-equivalent Next.js build at `/`

## Results

- P0: none.
- P1 fixed: product cards no longer place a second photograph inside the first photograph.
- P1 fixed: the lower carousel now contains discounted models instead of regular-price Kent/Canon/Sardinia models.
- P1 fixed: every discounted card shows the discount badge, crossed-out earlier published price, savings percentage, and larger action price.
- P1 fixed: footer uses the official public Vespera logo asset instead of the text-only imitation.
- P2 fixed: AI labelling remains discreet and appears only when the card is using an AI-modified ambience image.
- P2 fixed: catalog cards use one source photograph on a white background; the original/AI switch remains available on product-detail pages.
- Responsive result: no overlapping images, price text, badges, or footer elements at the checked mobile width.
- Console/build: targeted lint and full production build pass.

final result: passed
