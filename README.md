# 📚 BookShelf

> A modern, full-stack book-tracking and social reading platform built to manage reading momentum, track daily page progress, explore literary collections, and stay connected with a community of readers.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server & Client Components)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with custom design system variables
- **Fonts:** Google Fonts (Montserrat Alternates, Cairo Play, Rubik Storm)
- **Authentication & State:** Custom Context Providers (`AuthContext`) with Protected Route routing
- **Performance & Analytics:** Vercel Analytics & Speed Insights

---

## ✨ Key Features

- **📖 Interactive "Currently Reading" Widget:**
  - Real-time progress tracking with dynamic percentage calculation and visual progress bars.
  - Quick page updates (`+10 Pages` or custom page number inputs) syncing directly with the backend API.
  - Interactive **Book Details Modal** showing descriptions, author metadata, and reading progress stats.
- **📂 Libraries & Shelves:**
  - Organize books across dedicated views (`CurrentlyReadingCard`, `WantToReadCard`, `BrowseByGenreCard`).
  - Add new books seamlessly via dedicated modal forms (`AddBookModal`).
- **🌐 Social Activity & Community:**
  - Browse network activity feeds (`/activity`) to track friends' reading milestones and engagement.
- **🔍 Search & Discovery:**
  - Find books, trending titles, popular authors, and recent searches (`/search`).
- **👤 User Profiles & Settings:**
  - Customizable profile headers, avatars (`ProfileAvatarModal`), tabs view, and comprehensive account settings (genres, email changes, password updates).
- **🔒 Secure Authentication:**
  - Full authentication flow including Sign In, Sign Up, Forgot Password, Reset Password, and Email Verification.

---

## 📁 Project Structure

```text
book-shelf/
├── src/
│   ├── app/                      # Next.js App Router pages and layouts
│   │   ├── activity/             # Social reading activity feed
│   │   ├── auth/                 # Authentication pages (sign-in, sign-up, verification, password reset)
│   │   ├── homepage/             # Main dashboard view
│   │   ├── library/              # Library management & shelves
│   │   ├── profile/              # User profile and edit views
│   │   ├── search/               # Discovery & search views
│   │   ├── settings/             # Account configuration & preferences
│   │   ├── clientlayout.tsx      # Root client layout with Navbar & Sidebars
│   │   └── layout.tsx            # Root server layout & font configuration
│   ├── components/               # Modular UI components
│   │   ├── activity/             # Activity widgets and sidebars
│   │   ├── auth/                 # Route protection utilities
│   │   ├── home/                 # Dashboard cards (ContinueReading, Stats, Friends)
│   │   ├── layout/               # Global navigation, sidebars, and dropdowns
│   │   ├── library/              # Library cards and modals
│   │   ├── profile/              # Profile headers, tabs, and avatar modals
│   │   ├── search/               # Search accordions and trending cards
│   │   └── settings/             # Settings rows, toggles, and update modals
│   ├── context/                  # Global context providers (AuthContext)
│   ├── lib/                      # API integration and fetch utilities (api.ts)
│   └── types.ts                  # Shared TypeScript interfaces & models
├── public/                       # Static assets and SVGs
├── data/                         # Mock data fallbacks
├── globals.css                   # Tailwind v4 configuration, theme variables, and scrollbar styles
└── package.json                  # Dependencies and build scripts

🚀 Getting Started Locally
Follow these steps to set up and run the frontend application on your local machine.

Prerequisites
Make sure you have the following installed:

Node.js (v18 or higher recommended)

npm, yarn, pnpm, or bun

Installation & Setup
Clone the repository:

Bash
git clone [https://github.com/MuhammadZaeem500/book-shelf.git](https://github.com/MuhammadZaeem500/book-shelf.git)
cd book-shelf
Install dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env.local file in the root of your project directory:

Code snippet
NEXT_PUBLIC_API_URL=http://localhost:3000/api
Run the development server:

Bash
npm run dev
Open http://localhost:3000 in your browser to view the application.

📦 Building for Production
To test production compilation and TypeScript type checking locally:

Bash
npm run build
npm start
👤 Author
Muhammad Zaeem

GitHub: @MuhammadZaeem500

📝 License
This project is open-source and available under the MIT License.
