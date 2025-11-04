# Virtual Band Website

A Gorillaz-inspired website with a dark, edgy aesthetic featuring 4 interactive banner sections and 4 additional pages.

## 🎵 Project Structure

```
website/
├── index.html          # Main page with 4 interactive banners
├── tour.html           # Tour dates and VIP packages
├── store.html          # Merchandise and music store
├── about.html          # Band history and members
├── media.html          # Music videos, photos, and interactive content
├── styles/
│   └── main.css        # Main stylesheet with Gorillaz-inspired theme
├── scripts/
│   └── main.js         # Interactive functionality
└── images/             # Directory for your images (currently empty)
```

## 🎨 Design Features

### Color Scheme
- **Primary Background**: `#0a0a0a` (Deep black)
- **Secondary Background**: `#1a1a1a` (Dark gray)
- **Accent Colors**:
  - Cyan: `#00d9ff`
  - Pink: `#ff006e`
  - Yellow: `#ffbe0b`

### Interactive Elements
1. **Main Page Banners**: 4 full-screen sections with hover effects
2. **Responsive Navigation**: Mobile-friendly menu with smooth transitions
3. **Parallax Scrolling**: Subtle depth effect on banner content
4. **Fade-in Animations**: Cards and sections animate on scroll
5. **Hover Effects**: Glowing buttons and transforming cards
6. **Easter Egg**: Try the Konami code! (↑ ↑ ↓ ↓ ← → ← → B A)

## 🚀 How to Use

### Option 1: Direct File Opening
1. Navigate to the `website` folder
2. Double-click `index.html` to open in your browser

### Option 2: Local Web Server (Recommended)
```bash
cd website
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser

### Option 3: VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

## 📱 Pages Overview

### 1. Home (index.html)
- **Banner 1**: New Album announcement
- **Banner 2**: World Tour 2025
- **Banner 3**: Exclusive Merchandise
- **Banner 4**: Virtual Studio experience

### 2. Tour (tour.html)
- Tour dates in 6 major cities
- VIP package options (Premium, Deluxe, Standard)
- Ticket purchase CTAs

### 3. Store (store.html)
- Music section (Vinyl, CD, Box Set)
- Apparel section (T-shirts, Hoodies, Jackets, etc.)
- Special bundle deals with savings

### 4. About (about.html)
- Band story and history
- 4 band members with descriptions
- Discography highlights (6 albums)
- Awards and achievements

### 5. Media (media.html)
- Music video gallery
- Kong Studios interactive experience
- Photo gallery categories
- Documentaries and interviews
- Interactive experiences (VR, Music Mixer, AR Filters)

## 🎯 Customization Guide

### Adding Your Own Images
1. Place images in the `images/` directory
2. Update the HTML:
```html
<!-- Replace placeholder gradients with images -->
<div style="background-image: url('images/your-image.jpg');">
```

### Changing Colors
Edit the CSS variables in [styles/main.css](styles/main.css):
```css
:root {
  --primary-bg: #0a0a0a;
  --accent-color: #00d9ff;
  /* etc. */
}
```

### Modifying Content
- Edit HTML files directly to change text, links, and structure
- All pages follow the same layout pattern for consistency

## ✨ Special Features

### Mobile Responsive
- Breakpoints at 768px and 480px
- Hamburger menu for mobile navigation
- Stacked layouts for small screens

### Animations
- Fade-in on scroll
- Parallax effects on banners
- Smooth transitions on all interactive elements
- Loading animation on page load

### Accessibility
- Semantic HTML structure
- ARIA labels on social links
- Keyboard navigation support
- High contrast color scheme

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid and Flexbox
- **Vanilla JavaScript**: No frameworks, pure performance
- **Responsive Design**: Mobile-first approach

## 📝 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Design Inspiration

This website is inspired by the Gorillaz official website, featuring:
- Dark, immersive aesthetic
- Bold typography and gradients
- Interactive elements
- Virtual/digital theme
- Music-first approach

## 🔧 Future Enhancements

Consider adding:
- Actual images and videos
- Working e-commerce functionality
- Newsletter signup integration
- Social media API integration
- Music player widget
- 3D animations with Three.js
- Real VR/AR experiences

## 📄 License

Feel free to use this template for your own projects!

## 🎵 Enjoy!

Open [index.html](index.html) in your browser to explore the Virtual Band website!
