# 📚 BookShelf

A modern, full-stack book-tracking and social reading platform built to help readers manage their reading goals, track daily progress, explore books, and connect with a community of readers.

## ✨ Features

### 📖 Reading Progress Tracking
- Track your currently reading books and reading progress.
- Calculate reading progress automatically using completed and total pages.
- Update progress quickly using the **+10 Pages** button or a custom page number.
- View book details, author information, descriptions, and reading statistics.

### 📚 Personal Library
- Organize books into dedicated reading shelves.
- Manage your currently reading and want-to-read lists.
- Explore books by genre.
- Add new books through interactive modal forms.

### 🌐 Social Reading Community
- View friends' reading activity through the activity feed.
- Follow reading milestones and progress updates.
- Stay connected with other readers and share your reading journey.

### 🔍 Search and Discovery
- Search for books and authors.
- Explore trending titles and popular authors.
- Access recent searches for faster discovery.

### 👤 User Profiles and Settings
- Customize your profile and avatar.
- Explore profile tabs and reading information.
- Manage favorite genres and account preferences.
- Update your email address and password.

### 🔐 Authentication and Account Security
- Sign up and sign in.
- Verify email addresses.
- Recover forgotten passwords.
- Reset passwords securely.
- Protect restricted pages using authentication and route protection.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js** | React framework using the App Router, Server Components, and Client Components |
| **TypeScript** | Type safety and maintainable code |
| **Tailwind CSS v4** | Responsive styling and a custom design system |
| **React Context API** | Shared authentication state through `AuthContext` |
| **REST API** | Communication between the frontend and backend |
| **Google Fonts** | Montserrat Alternates, Cairo Play, and Rubik Storm |
| **Vercel Analytics** | Website usage analytics |
| **Vercel Speed Insights** | Website performance monitoring |

## 📁 Project Structure

```text
book-shelf/
├── src/
│   ├── app/
│   │   ├── activity/             # Social reading activity feed
│   │   ├── auth/                 # Authentication pages and flows
│   │   ├── homepage/             # Main dashboard
│   │   ├── library/              # Library management and shelves
│   │   ├── profile/              # User profiles and editing
│   │   ├── search/               # Book and author discovery
│   │   ├── settings/             # Account settings and preferences
│   │   ├── clientlayout.tsx      # Client layout and navigation
│   │   └── layout.tsx            # Root server layout and fonts
│   ├── components/
│   │   ├── activity/             # Activity feed components
│   │   ├── auth/                 # Route protection utilities
│   │   ├── home/                 # Dashboard cards and widgets
│   │   ├── layout/               # Navigation, sidebars, and menus
│   │   ├── library/              # Book cards and library modals
│   │   ├── profile/              # Profile components and avatar modals
│   │   ├── search/                # Search and trending components
│   │   └── settings/             # Settings components and modals
│   ├── context/                  # Global context providers
│   ├── lib/                      # API integration and fetch utilities
│   └── types.ts                  # Shared TypeScript types
├── public/                       # Static assets and SVGs
├── data/                         # Mock data and fallback content
├── globals.css                   # Global styles and theme variables
└── package.json                  # Dependencies and project scripts
```

## 🚀 Getting Started

Follow these steps to run the frontend application locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- npm, yarn, pnpm, or bun
- Access to the backend API, if required by the application

### 1. Clone the Repository

```bash
git clone https://github.com/MuhammadZaeem500/book-shelf.git
cd book-shelf
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root and add your backend API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Note:** Replace the example URL with the actual backend API URL if your backend runs on a different port or domain.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

To create an optimized production build, run:

```bash
npm run build
```

To start the production server after a successful build:

```bash
npm start
```

## 🔗 Links

- **GitHub Repository:** [MuhammadZaeem500/book-shelf](https://github.com/MuhammadZaeem500/book-shelf)
- **Developer Portfolio:** [View Portfolio](https://zaeem-dev-portfolio-ndyr.vercel.app/)

## 👨‍💻 Author

**Muhammad Zaeem**

- GitHub: [@MuhammadZaeem500](https://github.com/MuhammadZaeem500)

## 📄 License

This project is open-source and available under the [MIT License](https://opensource.org/license/mit/).
