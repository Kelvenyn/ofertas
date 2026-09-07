# Cashflow Tracking and Brand Removal Design

## Goal

Make Cashflow the only tracking integration for Tilápia and Mapa de Perfil, restore Tilápia attribution to its configured Cashflow offer, and remove Universo Eduk/Hub branding from those two public routes.

## Scope

- Tilápia loads Cashflow offer `b6f77b1d-115d-45ff-a9ee-b4ed79b73845`.
- Mapa de Perfil keeps Cashflow offer `da308c1d-8e9b-46c3-b9f4-5657d8f51335`.
- Pixel IDs and CAPI tokens remain stored in Cashflow, never in browser-delivered source code.
- The shared pricing component stops invoking the obsolete `window.trackhub` integration. Cashflow already emits PageView and ViewContent and decorates supported checkout URLs.
- Tilápia and Mapa receive route-local privacy policy and terms pages without Universo Eduk references. Their footer links point to those local pages, and each page returns to its originating offer rather than the root redirect.
- Other offer routes and their existing legal pages are unchanged.

## Data Flow

Meta click with the supplied UTM template reaches the landing page. The Cashflow script records PageView and ViewContent, retains the source parameters, decorates the Hotmart checkout link, and sends server-side events using the credentials configured in Cashflow. The frontend does not send duplicate ViewContent or InitiateCheckout events.

## Verification

Static regression tests assert the two page layouts reference their expected Cashflow offer IDs and do not contain Universo Eduk/Hub URLs. Build and typecheck verify the routes and shared component compile. A final manual post-deploy visit using a real Meta ad URL validates that Cashflow records a page view under the corrected offer.
