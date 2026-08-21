"use client";

import React, { useState } from "react";
import Homepage from "./homepage/page";
// import { HomePage, SearchPage, LibraryPage, ActivityPage, ProfilePage } from "";

// type TabType = "home" | "search" | "library" | "activity" | "profile";

// export default function App() {
//   const [activeTab, setActiveTab] = useState<TabType>("home");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "home":
//         return <HomePage />;
//       case "search":
//         return <SearchPage />;
//       case "library":
//         return <LibraryPage />;
//       case "activity":
//         return <ActivityPage />;
//       case "profile":
//         return <ProfilePage />;
//       default:
//         return <HomePage />;
//     }
//   };

//   const navItems: { key: TabType; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
//     { key: "home", label: "Home", Icon: Ic.Home },
//     { key: "search", label: "Search", Icon: Ic.Search },
//     { key: "library", label: "Library", Icon: Ic.Library },
//     { key: "activity", label: "Activity", Icon: Ic.Activity },
//     { key: "profile", label: "Profile", Icon: Ic.Profile },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
//       <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">{LOGO_ICON}</div>
//           <div>
//             <span className="font-extrabold text-base tracking-tight text-slate-100">
//               BOOK<span className="text-cyan-400">LOG</span>
//             </span>
//             <span className="text-[10px] font-mono text-slate-500 block -mt-1">v2.4 • BETA</span>
//           </div>
//         </div>

//         <div className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
//           {navItems.map(({ key, label, Icon }) => (
//             <button
//               key={key}
//               onClick={() => setActiveTab(key)}
//               className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
//                 activeTab === key
//                   ? "bg-slate-800 text-cyan-400 border border-slate-700/60 shadow-sm"
//                   : "text-slate-400 hover:text-slate-200"
//               }`}
//             >
//               <Icon className="w-4 h-4" />
//               {label}
//             </button>
//           ))}
//         </div>

//         <div className="flex items-center gap-3">
//           <button className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition relative">
//             <Ic.Bell className="w-4 h-4" />
//             <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-950" />
//           </button>
//           <div className="cursor-pointer" onClick={() => setActiveTab("profile")}>
//             <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" name="Alex" size="w-8 h-8" />
//           </div>
//         </div>
//       </header>

//       <main className="flex-1 max-w-6xl w-full mx-auto px-4 lg:px-8 py-6 mb-20 md:mb-8">{renderContent()}</main>

//       <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-md border-t border-slate-800/80 px-2 py-2 flex justify-around">
//         {navItems.map(({ key, label, Icon }) => (
//           <button
//             key={key}
//             onClick={() => setActiveTab(key)}
//             className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition ${
//               activeTab === key ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
//             }`}
//           >
//             <Icon className="w-5 h-5" />
//             <span className="text-[10px] font-medium">{label}</span>
//           </button>
//         ))}
//       </nav>
//     </div>
//   );
// }

export default function app() {

return (
  <div>

<Homepage />

  </div>

);  
}