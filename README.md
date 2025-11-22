# StreamFlix - Netflix Clone

A pixel-perfect Netflix clone built with Next.js 15, featuring a modern streaming platform interface with dark theme, content carousels, and video player functionality.

## 🎬 Features

### Core Pages
- **Home Dashboard** - Hero banner, trending content, continue watching, and genre-based content rows
- **Content Detail** - Comprehensive movie/show information with cast, director, ratings, and similar recommendations
- **Video Player** - Full-featured player with timeline scrubbing, volume control, quality settings, and subtitles
- **Browse Pages** - Genre-specific browsing for Movies, TV Shows, and categories
- **My List** - Personal watchlist management

### Components
- **Navigation Bar** - Fixed header with search, notifications, and profile dropdown
- **Hero Banner** - Full-width featured content showcase with Play and More Info actions
- **Content Rows** - Horizontal scrolling carousels with hover previews
- **Content Cards** - Interactive cards with hover effects, progress bars, and action buttons

### Design System
- **Netflix Color Palette** - Exact colors (#E50914 red, #141414 black, #2F2F2F charcoal)
- **Inter Font Family** - Modern typography matching Netflix's aesthetic
- **Smooth Animations** - 300ms transitions, hover scaling, and elegant interactions
- **Responsive Layout** - Mobile-first design with adaptive grid systems

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:4006](http://localhost:4006) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home dashboard
│   ├── title/[id]/page.tsx         # Content detail page
│   ├── watch/[id]/page.tsx         # Video player
│   ├── browse/[category]/page.tsx  # Browse by category
│   ├── my-list/page.tsx            # User's watchlist
│   ├── layout.tsx                  # Root layout with providers
│   └── globals.css                 # Global styles and design system
├── components/
│   └── netflix/
│       ├── NavBar.tsx              # Navigation header
│       ├── HeroBanner.tsx          # Featured content banner
│       ├── ContentRow.tsx          # Horizontal content carousel
│       └── ContentCard.tsx         # Individual content card
└── lib/
    └── mockData.ts                 # Mock content library (150 titles)
```

## 🎨 Design System

### Color Variables
```css
--netflix-red: #E50914        /* Primary CTA buttons */
--deep-black: #141414         /* Main background */
--charcoal: #2F2F2F          /* Card backgrounds */
--pure-white: #FFFFFF        /* Primary text */
--light-gray: #B3B3B3        /* Secondary text */
```

### Typography Scale
- **Hero Title**: 56px, Bold, -0.02em letter-spacing
- **Section Headers**: 24px, Semibold
- **Body Text**: 16px, Regular
- **Card Titles**: 16px, Medium

### Spacing System
- **Navigation Height**: 68px
- **Card Gap**: 16px
- **Section Gap**: 48px
- **Container Padding**: 4% (responsive)

## 📊 Mock Data

The application includes a comprehensive mock data library with:
- **150+ Content Titles** across multiple genres
- **5 Genre Categories**: Action, Drama, Comedy, Documentary, International
- **Content Metadata**: Cast, director, ratings, descriptions, tags
- **User Profiles**: Mock user preferences and watch history
- **Continue Watching**: Progress tracking for resumed content

### Content Types
- Movies with duration
- TV Series with seasons
- Trending content flags
- New release indicators
- Top-rated sorting

## 🎯 Key Features

### Home Page
- Dynamic hero banner with featured content
- Continue Watching row with progress indicators
- Trending Now carousel
- Multiple genre-based content rows
- Smooth horizontal scrolling with navigation arrows

### Content Detail Page
- Full-width backdrop with gradient overlays
- Comprehensive metadata (rating, year, duration, genre)
- Cast and director information
- Content tags and descriptors
- "More Like This" recommendations section

### Video Player
- Full-screen video player interface
- Interactive timeline with scrubbing
- Volume control with slider
- Quality settings (Auto, 1080p, 720p, 480p)
- Subtitle toggle
- Keyboard shortcut support
- Back navigation to previous page

### Responsive Design
- Mobile-first approach
- Adaptive grid layouts (2-6 columns)
- Touch-optimized controls
- Responsive typography scaling
- Flexible content carousels

## 🛠️ Technologies

- **Next.js 15.5.2** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Inter Font** - Google Fonts typography
- **Lucide Icons** - Beautiful icon library
- **next-themes** - Dark mode support

## 🎬 Content Management

All content is managed through `src/lib/mockData.ts`:

```typescript
import { allContent, getTrendingContent, getNewReleases } from '@/lib/mockData';

// Get all content
const content = allContent;

// Get trending content
const trending = getTrendingContent();

// Get content by genre
const actionMovies = getContentByGenre('Action');

// Get user's continue watching
const continueWatching = getContinueWatching('user-id');
```

## 🎨 Customization

### Changing Colors

Edit `src/app/globals.css`:

```css
:root {
  --netflix-red: 0 98% 48%;      /* Change to your brand color */
  --deep-black: 0 0% 8%;         /* Main background */
  --charcoal: 0 0% 18%;          /* Card backgrounds */
}
```

### Adding New Content

Edit `src/lib/mockData.ts`:

```typescript
const newContent: Content = {
  id: 'unique-id',
  title: 'Your Title',
  type: 'movie',
  genre: ['Action', 'Thriller'],
  rating: 8.5,
  year: 2024,
  // ... additional fields
};

allContent.push(newContent);
```

## 📱 Pages Overview

### Home (`/`)
Main landing page with hero banner and content carousels

### Title Detail (`/title/[id]`)
Individual content information and recommendations

### Watch (`/watch/[id]`)
Full-screen video player with controls

### Browse (`/browse/[category]`)
Genre-specific browsing (movies, tv-shows, new, etc.)

### My List (`/my-list`)
User's personal watchlist

## 🎯 Performance

- **Dark Theme Default** - Reduces eye strain and saves power
- **Smooth Scrolling** - Hardware-accelerated animations
- **Lazy Loading** - Content cards load on scroll
- **Optimized Images** - Responsive image placeholders
- **CSS Variables** - Fast theme switching

## 🔧 Development Tips

### Adding New Pages
1. Create page in `src/app/`
2. Import NavBar component
3. Use Netflix color variables
4. Follow 4% horizontal padding convention

### Creating Components
1. Place in `src/components/netflix/`
2. Use TypeScript for type safety
3. Follow existing naming conventions
4. Apply hover states and transitions

### Styling Guidelines
- Use Tailwind utility classes
- Reference CSS variables for colors
- Maintain consistent spacing (4%, 16px, 48px)
- Apply smooth transitions (300ms)

## 📄 License

This is a demo project for educational purposes.

## 🙏 Credits

Built with inspiration from Netflix's interface design, focusing on pixel-perfect replication and modern web development practices.
