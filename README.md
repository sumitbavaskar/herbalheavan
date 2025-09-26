# 🌿 Herbal Wellness - E-commerce Website

A complete, professional-looking herbal products e-commerce website built with **pure HTML, CSS, and vanilla JavaScript** - no frameworks, no backend, no build tools required!

## ✨ Features

### 🏠 Landing Page
- **Professional herbal branding** with natural green and earthy color palette
- Eye-catching hero section with compelling headline and call-to-action
- Smooth scrolling navigation and responsive design

### 🛍️ Product Catalog
- **Dynamic product loading** from JSON data
- **Responsive product grid** optimized for mobile-first design
- **Advanced filtering** by category and price range
- **Smart sorting** options (price, popularity, rating)
- **Instant search** with real-time filtering
- **Lazy loading** for optimal performance

### 🔍 Product Details
- **Interactive product modals** with detailed information
- Complete product descriptions, ingredients, and benefits
- Usage instructions for each product
- **Accessible design** with keyboard navigation support

### 🛒 Shopping Cart & Checkout
- **Smooth add-to-cart animations** with flying product effect
- **Persistent cart** using localStorage
- **Cart sidebar** with quantity controls and item management
- **Complete checkout form** with validation
- **Order summary** and total calculation

### 🎯 Herb Finder Quiz
- **Interactive 3-question quiz** to recommend products
- Personalized product suggestions based on user preferences
- Smart recommendation engine based on wellness goals

### 📱 Mobile-Optimized Design
- **100% responsive** across all device sizes
- **Mobile-first approach** with hamburger navigation
- **Touch-friendly** interactions and controls
- **Fast loading** with optimized images

### ♿ Accessibility Features
- **Semantic HTML** structure
- **ARIA labels** and proper focus management
- **Alt text** for all images
- **Keyboard navigation** support
- **High contrast** and reduced motion support

## 🚀 How to Run on Replit

### Quick Start
1. **Open the project** in Replit
2. **Click the "Run" button** - that's it! 
3. The website will automatically open in the preview pane
4. View your live website at the provided Replit URL

### Manual Setup (if needed)
1. Ensure all files are in the root directory:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `products.json`
   - `README.md`
   - `assets/` directory

2. **No installation required** - pure HTML/CSS/JS runs directly in browser

3. **Access your site** via the Replit preview or webview URL

## 📝 How to Edit Products

### Adding New Products
Edit the `products.json` file to add new herbal products:

```json
{
    "id": 9,
    "name": "Your Product Name",
    "price": 25.99,
    "category": "tea|supplement|oil|powder",
    "rating": 4.5,
    "popularity": 80,
    "image": "your-image-url-or-svg",
    "description": "Product description here",
    "ingredients": ["Ingredient 1", "Ingredient 2"],
    "benefits": ["Benefit 1", "Benefit 2"],
    "usage": "Usage instructions here"
}
```

### Product Categories
- `tea` - Herbal Teas
- `supplement` - Capsules & Supplements  
- `oil` - Essential Oils
- `powder` - Powders & Extracts

### Image Options
1. **Use provided SVG placeholders** (automatically generated)
2. **Add custom image URLs** for real product photos
3. **Replace SVG generation** in `app.js` for custom placeholder system

## 🎭 Demo Script for Hackathon Presentation

### 30-Second Pitch
> "We've built Herbal Wellness - a complete e-commerce platform for natural health products. Using only vanilla web technologies, we've created a mobile-responsive store with advanced features like smart product filtering, an interactive quiz for personalized recommendations, and a smooth shopping experience that works offline."

### 2-Minute Demo Flow

**1. Homepage & Branding (15 seconds)**
- "Here's our landing page with natural, earthy branding that immediately communicates trust and wellness"
- Scroll through hero section showing responsive design

**2. Product Discovery (30 seconds)**
- "Users can browse our curated collection of herbal products"
- Demonstrate search: "Let's search for 'energy'"
- Show filtering: "Filter by category - supplements only"
- Show sorting: "Sort by price low to high"

**3. Smart Recommendations (30 seconds)**
- "Our Herb Finder Quiz provides personalized recommendations"
- Take the quiz quickly: Energy → Capsules → Beginner
- "Based on your answers, we recommend Ginseng Energy Powder"

**4. Shopping Experience (30 seconds)**
- Click on a product to show detailed modal
- "Complete product information including ingredients, benefits, and usage"
- Add to cart with animation
- Show cart sidebar with quantity controls

**5. Mobile & Accessibility (15 seconds)**
- Resize browser to show mobile responsiveness
- "Fully accessible with keyboard navigation and screen reader support"

### Key Technical Highlights
- **"Zero dependencies"** - pure HTML/CSS/JS
- **"Offline-capable"** - localStorage persistence
- **"Accessibility-first"** - WCAG compliant
- **"Performance-optimized"** - lazy loading, efficient animations
- **"Production-ready"** - can handle real product catalogs

## 🛠️ Technical Stack

- **Frontend**: Pure HTML5, CSS3, ES6+ JavaScript
- **Data**: JSON for product information
- **Storage**: localStorage for cart persistence
- **Images**: SVG placeholders (easily replaceable)
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Features**: Intersection Observer, CSS Animations

## 🔧 Customization Options

### Colors & Branding
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-green: #2E7D32;
    --secondary-green: #4CAF50;
    /* ... more color variables */
}
```

### Add Real Images
Replace SVG placeholders in `products.json` with actual product photos:
```json
"image": "https://your-image-hosting.com/product.jpg"
```

### Modify Quiz Logic
Update recommendation algorithm in `app.js` `getProductRecommendation()` method.

## 📦 Project Structure

```
herbal-wellness/
├── index.html          # Main HTML file
├── styles.css          # All styling and responsive design
├── app.js              # JavaScript functionality
├── products.json       # Product data
├── assets/             # Asset directory (images, etc.)
└── README.md          # This documentation
```

## 🌟 Browser Support

- **Chrome/Edge**: Full support
- **Firefox**: Full support  
- **Safari**: Full support
- **Mobile browsers**: Optimized for all major mobile browsers

## 📈 Performance Features

- **Lazy loading** for images
- **Efficient filtering** with minimal DOM manipulation
- **CSS-only animations** for smooth performance
- **Optimized SVG** placeholders
- **localStorage caching** for cart data

---

**Built with 🌱 for natural living and hackathon success!**

*Ready to impress judges with a complete, professional e-commerce solution built from scratch.*