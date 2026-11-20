# Belated Birthday Wish & Apology Web App for Aastha ✨❤️

A trendy, viral-aesthetic, romantic dark-mode single-page interactive experience crafted for **Aastha**.

---

## 🎨 Design & Aesthetic
- **Palette**: Deep matte obsidian `#0a0a0c`, velvety dark graphite `#121217`, glowing crimson `#e63946`, vibrant ruby `#ff1e42`, soft blush pink `#ffb3c1`, and warm gold `#ffd166`.
- **Atmosphere**: Glassmorphic cards with subtle ruby glow borders, floating ambient hearts & sparkles canvas, modern serif (`Playfair Display`), elegant script (`Dancing Script`), and clean sans-serif typography (`Plus Jakarta Sans`).
- **Audio & Music**:
  - **Featured Track:** *"Priyatama 2.0 (Video Song) | Kabir Singh | Shahid Kapoor, Kiara Advani | Radhan | AA Films"* configured at top-right with an interactive music dock, spinning vinyl disc, and animated sound equalizer waves!
  - **Built-in Web Audio API synthesizers** for sound FX (harp chimes, dodge whooshes, celebration fanfare, realistic candle blow puff) — **100% self-contained with offline resilience**.

---

## ✨ Multi-Stage Interactive Flow

1. **Stage 1: The Teaser / 3D Envelope Opening**
   - Sleek minimal teaser card with a 3D folded envelope, wax seal with pulsing ruby heart, and the teaser text: *"Hey Aastha... I know I'm late, but I made something for you."*
   - Clicking *"Open It"* or the wax seal triggers a 3D flap unfold, letter slide-up, and gentle glissando chimes into Stage 2.

2. **Stage 2: The Cute Apology & Viral Dodging "No" Button**
   - Apology quote card: *"I messed up the timing, not how much you matter."*
   - The question: **"Will you forgive me?"**
   - **Playful Dodging Mechanic**: Attempting to hover or tap the **"No 😤"** button causes it to playfully zip away to safe coordinates inside the screen while cycling funny teasing messages (*"Are you sure? 🥺"*, *"Pretty please? 🥺👉👈"*, *"Nice try! 😜"*).
   - Meanwhile, the **"Yes, I forgive you ❤️"** button grows larger and glows brighter with every attempt!

3. **Stage 3: The Birthday Celebration Reveal**
   - Clicking "Yes" triggers a full multi-cannon confetti burst.
   - **Hero Header**: *"Happy Belated Birthday, Aastha! 🎂❤️"* with glowing shimmer text.
   - **Interactive Birthday Cake**: Stylized 3-tier dark chocolate & velvet crimson cake with 3 flickering candles.
     - Tap individual candles or click **"Blow Out All Candles 🎂💨"** to extinguish them with smoke animations and sounds.
     - When all candles are out, a secret wish banner unfolds: *"May all your wishes come true, Aastha!"*
   - **Heartfelt Note Card**: Warm, sincere message with clearly labeled code comments for quick personalization.
   - **Polaroid Photo Frame**: Ready for a personal picture of Aastha or you both.
   - **3 Interactive Flip Cards**: Tap to flip for compliments and promises (*Always Shining*, *Best Year Ahead*, *The Late Fee*).
   - **Replay Button**: Seamlessly reset and replay the entire interactive story anytime.

---

## 🚀 How to Run & Preview

1. **Direct Browser Open (Easiest)**:
   - Simply double-click `index.html` or open it directly in any browser (Chrome, Edge, Safari, Firefox).
   
2. **Local Development Server (Optional)**:
   - Run `npx serve .` or `python -m http.server 3000` inside this directory and open `http://localhost:3000`.

3. **Free 1-Minute Deployment (To send her the link!)**:
   - **Vercel**: Drag and drop this folder onto [vercel.com](https://vercel.com).
   - **Netlify**: Drag and drop this folder onto [netlify.drop](https://app.netlify.com/drop).
   - **GitHub Pages**: Push this repo to GitHub and enable Pages in repository settings.

---

## ✍️ How to Personalize the Message & Photo

- **Change Message**: Open `index.html` and look for the comment:
  `<!-- CUSTOMIZE NOTE FOR AASTHA -->` around line 240.
- **Add A Real Photo**: In `index.html`, inside `.polaroid-image-slot`, you can replace the placeholder with an `<img>` tag:
  ```html
  <img src="path-to-your-photo.jpg" alt="Aastha" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
  ```
- **Edit Flip Card Notes**: Search for `Reminder #1`, `Reminder #2`, or `Reminder #3` in `index.html`.
