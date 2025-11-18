"use client";

import { Home, BookOpen, Library, MessageSquare, Bell, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LeftSidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    { id: "home", icon: Home, label: "Home", href: "/", count: null },
    { id: "courses", icon: BookOpen, label: "Courses", href: "/courses", count: null },
    { id: "library", icon: Library, label: "My Library", href: "/library", count: null },
    { id: "messages", icon: MessageSquare, label: "Messages", href: "/messages", count: 3 },
    { id: "notifications", icon: Bell, label: "Notifications", href: "/notifications", count: 12 },
    { id: "progress", icon: TrendingUp, label: "My Progress", href: "/progress", count: null },
  ];

  return (
    <aside className="w-64 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] py-6">
      <nav className="space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.count !== null && (
                  <span className="ml-2 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </aside>
  );
}
