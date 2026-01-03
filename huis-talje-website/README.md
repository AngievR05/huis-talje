# 🏡 Huis Talje Website

A redesigned website for Huis Talje Children's Home - a safe haven for severely intellectually and physically handicapped children.

## 📁 Project Structure

```
huis-talje-website/
│
├── index.html                      # Homepage
│
├── css/
│   ├── styles.css                  # Main styles
│   ├── buttons.css                 # Button components (all 4 states)
│   └── responsive.css              # Mobile/tablet breakpoints
│
├── js/
│   ├── main.js                     # Core functionality
│   └── animations.js               # Visual effects & interactions
│
├── images/
│   ├── homepage/
│   │   ├── Logo.svg
│   │   ├── Washing Line.svg
│   │   ├── HeaderBorder.svg
│   │   ├── Doodle animations.svg
│   │   ├── Puzzle1.svg
│   │   ├── Puzzle2.svg
│   │   ├── Puzzle3.svg
│   │   ├── Hand and heart.svg
│   │   └── Footer Doodles.svg
│   │
│   ├── get-involved/
│   ├── inside-talje/
│   ├── profile/
│   └── projects/
│
├── pages/
│   ├── get-involved.html
│   ├── inside-talje.html
│   ├── profile.html
│   ├── projects.html
│   └── contact.html
│
└── README.md                       # This file
```

## 🎨 Design System

### Color Palette

**Primary Colors:**
- Primary: `#e8642f` (Orange)
- Secondary: `#fff9e9` (Cream)
- Accent Purple: `#874fff`
- Accent Blue: `#0074ef`
- Accent Green: `#afab24`
- Accent Pink: `#ff8cb7`

**Accent Colors:**
- Light Purple: `#DAC9FF`
- Light Blue: `#B9D8FF`
- Dark Green: `#445F08`
- Dark Red: `#BD002F`

**Background:**
- Main Background: `#FFF9E9`

**Semantic Colors:**
- Info: `#0074EF`
- Success: `#AFAB24`
- Warning: `#AFAB24`
- Error: `#AFAB24`

### Typography

**Headings:** Over the Rainbow (Regular)
- Fun, playful, eye-catching
- Used for main headings, banners, featured text

**Body Text:** Roboto (Regular/Medium/Bold)
- Clean, readable, versatile
- Used for paragraphs, descriptions, content blocks

## 🚀 Getting Started

### 1. Setup Your Environment

1. Open VS Code
2. Open the `huis-talje-website` folder
3. Make sure all your SVG files are in the correct `images/` subfolders

### 2. Required SVG Files

Place these files in `images/homepage/`:
- ✅ Logo.svg
- ✅ Washing Line.svg
- ✅ HeaderBorder.svg
- ✅ Doodle animations.svg
- ✅ Puzzle1.svg (Current Projects - Orange)
- ✅ Puzzle2.svg (Past Projects - Pink)
- ✅ Puzzle3.svg (Success Stories - Purple with thumbs up)
- ✅ Hand and heart.svg
- ✅ Footer Doodles.svg

### 3. Launch the Website

**Option 1: Live Server (Recommended)**
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

**Option 2: Direct Open**
1. Double-click `index.html` to open in your browser

## ✨ Features

### Interactive Components

**Accordion Cards (Our Story Section)**
- 4 clickable cards with smooth expand/collapse
- Fixed height: 250px when expanded
- Fixed width: 500px when expanded (mobile: 100%)
- Scrollable content inside
- Click outside to close

**Buttons (3 Variants)**
- Orange: Primary actions (Get Involved, Step Inside)
- Green: Secondary actions (Learn More)
- 4 States: Default, Hover, Active/Pressed, Disabled
- Size: 136px × 50px

**Navigation**
- Sticky header
- Dropdown menu for "Contact Us" (Phone, WhatsApp, Email)
- Active page highlighting
- Smooth scroll to sections

**Animations**
- Fade in on scroll
- Parallax doodle background
- Floating clothesline
- Button ripple effects
- Card hover effects

## 📱 Responsive Breakpoints

- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Mobile:** up to 767px

## 🎯 Button Usage Guide

```html
<!-- Primary Orange Button -->
<button class="btn btn-orange">Get Involved</button>

<!-- Secondary Green Button -->
<button class="btn btn-green">Learn More</button>

<!-- Dark Green Button -->
<button class="btn btn-dark-green">Action</button>

<!-- Pink Button -->
<button class="btn btn-pink">Action</button>

<!-- Disabled State -->
<button class="btn btn-orange" disabled>Disabled</button>
```

## 🔧 Customization

### Update Contact Information

In `index.html`, find the dropdown menu and update:
```html
<li><a href="tel:+27123456789">📞 Phone</a></li>
<li><a href="https://wa.me/27123456789">💬 WhatsApp</a></li>
<li><a href="mailto:info@huistalje.org">✉️ Email</a></li>
```

### Update Social Media Links

In `index.html`, find the footer section:
```html
<a href="https://instagram.com/huistalje" class="social-icon">📷</a>
<a href="https://facebook.com/huistalje" class="social-icon">f</a>
<a href="https://tiktok.com/@huistalje" class="social-icon">♪</a>
```

### Enable Optional Features

In `js/animations.js`, uncomment:
- Typewriter effect for hero text
- Loading animation
- Scroll to top button

## 📝 Next Steps

1. ✅ Add all your SVG illustrations to `images/homepage/`
2. ⬜ Create the other page templates (Get Involved, Projects, etc.)
3. ⬜ Update contact information in the dropdown
4. ⬜ Add social media links
5. ⬜ Test on different devices and browsers
6. ⬜ Deploy to web hosting

## 🐛 Troubleshooting

### Images Not Showing?
- Check that SVG files are in the correct folder
- Verify file names match exactly (case-sensitive)
- Check file paths in HTML

### Accordions Not Working?
- Open browser console (F12)
- Check for JavaScript errors
- Ensure `main.js` is loading correctly

### Buttons Not Styled?
- Verify `buttons.css` is linked in HTML
- Clear browser cache (Ctrl+F5)
- Check CSS file for syntax errors

### Dropdown Menu Issues?
- For mobile: Ensure JavaScript is enabled
- Check `main.js` for dropdown functionality
- Test on different screen sizes

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors (F12)
2. Verify all file paths are correct
3. Make sure all CSS and JS files are linked
4. Test in a different browser

## 🎉 Credits

**Design:** Your Figma Redesign
**Development:** Built with HTML5, CSS3, and JavaScript
**Fonts:** Google Fonts (Over the Rainbow, Roboto)

---

Made with ❤️ for the children of Huis Talje