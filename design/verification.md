# Publish-ready verification

Verified locally on 8 September 2026. Deployment was not performed.

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors, 0 warnings, 0 hints across 19 source/config/test files |
| `npm run build` | Pass; eight static pages generated in `dist/` |
| `npm run format:check` | Pass |
| `npm test` | 44 passed: 22 checks each in Chromium and Firefox |
| `npm test -- --grep 'built form'` after final deploy-file packaging | 2 passed; form, sitemap, metadata, social image, `_headers` and `_redirects` are present |
| Dependency audit during final install | 0 reported vulnerabilities |
| Desktop/mobile visual review | Homepage, service, personal, about and enquiry layouts captured and inspected; 390px mobile quiz begins with its first question in view |

The browser suite covers the eight routes, one main heading per route, internal links and anchors, WCAG A/AA automated rules, five viewport widths (320, 390, 768, 1024 and 1440px), keyboard mobile navigation, quiz validation/back navigation/edit preservation, direct enquiry preselection, local preview protection, mocked submission success and failure, and a no-JavaScript fallback. Mobile quiz steps and the resulting form are also checked with axe. Passing an automated ruleset is not a claim of a comprehensive accessibility audit.

The first browser pass found insufficient red-on-putty contrast and enquiry overflow on narrow screens. The accent was darkened and the enquiry layout corrected. The final suite passes both checks. A further mobile review shortened the quiz introduction so visitors arrive at the question directly.

WebKit coverage was attempted, but the installed macOS 14 WebKit runner failed during `browserContext.newPage`, before loading the website: `Protocol error (Page.overrideSetting): Unknown setting: PushAPIEnabled`. That run was stopped and the complete suite was run successfully in Firefox as the second engine. Safari-specific behavior has not been verified here.

No external form submission was sent. Production submission tests use a reserved hostname and intercepted local responses, including Netlify's removal of the form-detection marker. Actual Netlify form detection, spam processing, notification receipt at `al@exfu.ai` and the live native POST remain operator-owned deployment checks. See `README.md`.

Review PNGs are reproducible via `npm run test:visual` and are held in the ignored `artifacts/visual/` directory. They are not website assets. The sharing image under `public/images/` is a screenshot of a small HTML composition using the actual logo and font.
