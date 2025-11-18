import { Bell, Heart, MessageCircle, UserPlus, BookOpen, Award } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";

const notifications = [
  {
    id: "1",
    type: "like",
    icon: Heart,
    avatar: "https://images.unsplash.com/photo-1758685734511-4f49ce9a382b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBlZHVjYXRvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzM1NjExMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    user: "Dr. Maria Silva",
    action: "liked your post about React patterns",
    timestamp: "2 hours ago",
    unread: true
  },
  {
    id: "2",
    type: "comment",
    icon: MessageCircle,
    avatar: "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzMxMjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    user: "Prof. Jan Nowak",
    action: "commented on your post",
    comment: "Great insights! I especially liked the compound components pattern.",
    timestamp: "5 hours ago",
    unread: true
  },
  {
    id: "3",
    type: "follow",
    icon: UserPlus,
    avatar: "https://images.unsplash.com/photo-1758685734511-4f49ce9a382b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBlZHVjYXRvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzM1NjExMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    user: "Emma Williams",
    action: "started following you",
    timestamp: "1 day ago",
    unread: false
  },
  {
    id: "4",
    type: "course",
    icon: BookOpen,
    avatar: "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzMxMjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    user: "Learning Platform",
    action: "New lesson available in React Mastery",
    timestamp: "2 days ago",
    unread: false
  },
  {
    id: "5",
    type: "achievement",
    icon: Award,
    avatar: "https://images.unsplash.com/photo-1758685734511-4f49ce9a382b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBlZHVjYXRvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzM1NjExMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    user: "Learning Platform",
    action: "You've earned a new badge: \"7-Day Streak\"",
    timestamp: "3 days ago",
    unread: false
  },
  {
    id: "6",
    type: "like",
    icon: Heart,
    avatar: "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzMxMjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    user: "Alex Martinez",
    action: "and 12 others liked your post",
    timestamp: "5 days ago",
    unread: false
  }
];

export function NotificationsView() {
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <h1>Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-primary text-primary-foreground text-sm px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            Mark all as read
          </Button>
        </div>
        <p className="text-muted-foreground">
          Stay updated with your learning community
        </p>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={`bg-card rounded-lg border border-border shadow-sm p-4 hover:bg-secondary/50 transition-colors cursor-pointer ${
                notification.unread ? "border-l-4 border-l-primary" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-muted overflow-hidden shrink-0">
                    <ImageWithFallback 
                      src={notification.avatar}
                      alt={notification.user}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                    notification.type === "like" ? "bg-red-500" :
                    notification.type === "comment" ? "bg-blue-500" :
                    notification.type === "follow" ? "bg-green-500" :
                    notification.type === "course" ? "bg-primary" :
                    "bg-purple-500"
                  }`}>
                    <Icon className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="mb-1">
                    <span className={notification.unread ? "font-semibold" : ""}>
                      {notification.user}
                    </span>{" "}
                    <span className="text-muted-foreground">
                      {notification.action}
                    </span>
                  </p>
                  {notification.comment && (
                    <p className="text-sm text-muted-foreground bg-secondary rounded-lg p-2 mt-2">
                      "{notification.comment}"
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.timestamp}
                  </p>
                </div>

                {/* Unread Indicator */}
                {notification.unread && (
                  <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-2" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      <div className="text-center py-4">
        <Button variant="ghost" className="text-muted-foreground hover:text-primary">
          Load more notifications
        </Button>
      </div>
    </div>
  );
}
