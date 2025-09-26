# Herbal Wellness E-commerce Website

## Overview

This is a complete herbal products e-commerce website built entirely with vanilla web technologies (HTML, CSS, and JavaScript). The application features a professional natural wellness brand design with a comprehensive product catalog, shopping cart functionality, and an interactive herb finder quiz. The site is designed to be lightweight, accessible, and performant without requiring any frameworks, build tools, or backend infrastructure.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Pure Vanilla JavaScript**: Single-page application using ES6+ features with a class-based architecture (`HerbalStore` class)
- **Component-based Structure**: Modular methods for different features (product rendering, cart management, quiz functionality)
- **Event-driven Architecture**: Centralized event listener setup with delegation patterns for dynamic content
- **State Management**: Local state management within the main class, with persistent cart storage

### Data Layer
- **JSON-based Product Database**: Static `products.json` file containing all product information
- **LocalStorage Persistence**: Shopping cart data persists across browser sessions
- **Fallback Data**: Hardcoded product data as backup if JSON loading fails

### UI/UX Design System
- **CSS Custom Properties**: Centralized design tokens for colors, typography, and spacing
- **Mobile-First Responsive Design**: Breakpoint-based responsive layout using CSS Grid and Flexbox
- **Accessibility Standards**: Semantic HTML, ARIA labels, keyboard navigation support, and screen reader compatibility
- **Natural Color Palette**: Earth-tones and green-based color scheme reflecting herbal wellness branding

### Performance Optimizations
- **Lazy Loading**: Deferred image loading for better initial page performance
- **Animation System**: CSS-based smooth transitions and JavaScript-powered cart animations
- **Efficient DOM Manipulation**: Minimal DOM queries with element caching
- **Modular Loading**: Asynchronous product data loading with loading states

### Key Features Implementation
- **Dynamic Product Filtering**: Real-time search and category/price filtering system
- **Modal System**: Accessible product detail modals with keyboard navigation
- **Shopping Cart**: Persistent cart with quantity management and local storage
- **Interactive Quiz**: Multi-step herb finder quiz with recommendation engine
- **Form Validation**: Client-side checkout form validation with user feedback

## External Dependencies

### Data Sources
- **products.json**: Local JSON file serving as the product database containing product details, pricing, ingredients, and benefits

### Browser APIs
- **LocalStorage API**: For persistent shopping cart data across sessions
- **Fetch API**: For loading product data from JSON file
- **DOM APIs**: Standard browser APIs for element manipulation and event handling

### Asset Management
- **Inline SVG Graphics**: Self-contained SVG illustrations for product placeholders and hero imagery
- **Data URIs**: Base64 encoded images embedded directly in the JSON data to eliminate external image dependencies

### No External Services
- The application is completely self-contained with no third-party API integrations, CDNs, or external service dependencies
- All functionality runs entirely in the browser without requiring server-side processing