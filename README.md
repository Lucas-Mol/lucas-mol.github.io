# lucas-mol.github.io

Personal portfolio of **Lucas Mol** — Senior Software Engineer (backend, distributed systems & software architecture).

🔗 **https://lucas-mol.github.io**

## Concept

The site tells a career story as *a request crossing a distributed system*. On desktop, vertical scrolling moves a horizontal track of six scenes, each with three parallax depth layers. On mobile and short screens it becomes a vertical flow.

| Scene | What it shows |
|---|---|
| 01 Hello | Intro + profile rendered as an API response |
| 02 About | Bio and focus areas |
| 03 Architecture | Six architectures (microservices, event-driven, hexagonal, strangler fig, multi-tenant, SSO), each with an animated request/response simulation |
| 04 Journey | Career as a metro line with clickable stations |
| 05 Stack & Labs | Stack by category + projects |
| 06 Contact | Contact form (opens the visitor's email app) and live clocks for North American and European time zones |

## How it's built

- Plain **HTML, CSS and JavaScript** — no frameworks, no build step, no runtime dependencies
- Horizontal track and parallax driven by `requestAnimationFrame` on scroll (desktop stage designed at 1440×900 and scaled to the viewport)
- **EN / PT-BR** content switch (`assets/js/i18n.js`), remembered per visitor
- Keyboard navigation (← / →), visible focus states, semantic landmarks, JSON-LD `Person` schema
- Fonts: Bricolage Grotesque, IBM Plex Sans, JetBrains Mono (Google Fonts)

## Structure

```
index.html
assets/
  css/styles.css
  js/i18n.js       # EN / PT dictionaries (text, architectures, career stations)
  js/main.js       # track, parallax, i18n, architecture simulations, journey, form
  img/profile.jpg  # profile photo (optional — a monogram shows if missing)
  Lucas_Mol_Senior_Software_Engineer_Resume.pdf
```

## Run locally

```bash
python -m http.server 8000
# open http://localhost:8000
```
