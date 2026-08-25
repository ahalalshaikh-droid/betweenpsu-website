# Security Notes

## Current deployment protection

The site is a dependency-free static deployment on GitHub Pages. Its document-level Content Security Policy restricts scripts, styles, images, fonts, and the manifest to the same origin; disables plugins, frames, forms, media, and browser connections; and upgrades insecure requests. External links use `noopener noreferrer`, and the page sends no analytics or tracking requests.

The referrer policy is `no-referrer`, so navigation from this site does not disclose the page URL through the HTTP `Referer` header.

## GitHub Pages limitation

GitHub Pages does not let this repository define arbitrary HTTP response headers. The following protections therefore cannot be enforced from these files alone:

- HTTP Strict Transport Security (HSTS)
- `X-Content-Type-Options: nosniff`
- Permissions Policy
- `frame-ancestors` or `X-Frame-Options`
- Cross-origin opener, embedder, and resource policies

The meta Content Security Policy cannot provide `frame-ancestors`; browsers only honor that directive when it is delivered as an HTTP header.

If those response headers become a requirement, place a configurable CDN or reverse proxy such as Cloudflare in front of GitHub Pages and set the headers there. Test the policy in report-only mode before enforcement to avoid blocking legitimate site resources.

## Photo protection boundary

The published photographs are reduced web derivatives. The interface suppresses casual image dragging, touch callout, and image context menus, and displays a subtle Between mark over photographs. These measures do not prevent screenshots, screen recording, cache inspection, or retrieval through browser developer tools. Any browser that can display an image must receive its pixels.

## Reporting an issue

Please report security concerns privately to `betweenclub@psu.edu.sa`. Do not include passwords, access tokens, or other sensitive data in a public issue.
