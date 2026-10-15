# Caramel — Luxury Bags & Fashion Landing Page
## شنط وملابس حريمي

An interactive, responsive, editorial brand landing page and link-in-bio website for **Caramel** (Bags & Fashion). Built with React 19, TypeScript, Vite, and a custom Vanilla CSS luxury design system.

---

## ✨ Features & Architecture

1. **Photorealistic Mouse-Responsive Parallax:**
   - Layered editorial arrangement with 5 photorealistic fashion objects:
     - Caramel Tan Calfskin Leather Handbag
     - Dark Espresso Quilted Handbag with Gold Chain Strap
     - Champagne Gold & Caramel Silk Satin Evening Dress
     - Parisian Tailored Bouclé Tweed Jacket with Pearl Buttons
     - Amber Tortoiseshell Cat-Eye Sunglasses
   - Nested wrapper architecture separating pointer-driven interpolation (via `requestAnimationFrame` lerp) and independent CSS keyframe idle floats so transforms never overwrite each other.
   - Smooth deceleration back to resting position on pointer leave.
   - Respects `prefers-reduced-motion` and mobile touch devices.

2. **Central Brand Identity:**
   - Displays the provided official logo (`public/assets/caramel-logo.jpg`) with `object-fit: contain` in an elegant framed showcase.
   - Tasteful typography hierarchy with Cormorant Garamond, Cairo, and Tajawal.
   - Brand name **Caramel** paired with alternating descriptor **BAGS & FASHION** / **شنط وملابس حريمي**.

3. **Three Exclusive Social Destinations:**
   - Direct links for **Instagram**, **TikTok**, and **WhatsApp**.
   - **Safety Feature:** If placeholder values remain in `src/config/socialLinks.ts`, clicking displays a luxury toast notice informing visitors rather than navigating to a broken URL.
   - Prefilled bilingual message support for WhatsApp wa.me links.

4. **Bilingual Support (English & Arabic RTL):**
   - Seamless language toggle switching text, typography, and document direction (`dir="ltr"` / `dir="rtl"`).
   - Saved in `localStorage` across visits.

5. **Dual Theme Modes (Light & Dark):**
   - **Light Theme (Default):** Warm ivory (`#FAF7F2`), soft beige (`#E9D8C3`), rich caramel (`#8B542F`), and muted champagne gold (`#D5B078`).
   - **Dark Theme:** Espresso (`#1C100A`), dark chocolate, warm brown, and champagne gold glow.
   - Persisted via `localStorage` with no layout shifts.

6. **Fully Responsive:**
   - Optimized for desktop, laptops, tablets, and mobile screens (tested down to 360px).

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory.

---

## ⚙️ Configuration & Asset Locations

### 1. Social Links Configuration
File: [`src/config/socialLinks.ts`](file:///c:/Users/MESH%20WAHEED/OneDrive/Desktop/Caramel/src/config/socialLinks.ts)
- Replace `'YOUR_USERNAME'` with your real Instagram handle.
- Replace `'@YOUR_USERNAME'` with your real TikTok handle.
- Replace `'201XXXXXXXXX'` with your WhatsApp phone number (digits only, e.g. `201012345678`).

### 2. Logo Asset
File: [`public/assets/caramel-logo.jpg`](file:///c:/Users/MESH%20WAHEED/OneDrive/Desktop/Caramel/public/assets/caramel-logo.jpg)
- The supplied original high-resolution logo artwork is displayed using `object-fit: contain`.

### 3. Fashion Parallax Assets
Directory: [`public/assets/fashion/`](file:///c:/Users/MESH%20WAHEED/OneDrive/Desktop/Caramel/public/assets/fashion/)
- `handbag-caramel.webp`
- `handbag-dark.webp`
- `dress-elegant.webp`
- `jacket-boucle.webp`
- `accessory-sunglasses.webp`
