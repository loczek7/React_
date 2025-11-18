"use client";

import { Header } from "../components/Header";
import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";
import { MessagesView } from "../components/MessagesView";
import { useState } from "react";

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated] = useState(true);

  const handleLogout = () => {
    // TODO: Implement logout
  };

  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated && (
        <>
          <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} onLogout={handleLogout} />
          
          <div className="max-w-[1440px] mx-auto flex gap-6">
            <LeftSidebar />
            
            <main className="flex-1 min-w-0 py-6">
              <MessagesView />
            </main>

            <RightSidebar />
          </div>
        </>
      )}
    </div>
  );
}

