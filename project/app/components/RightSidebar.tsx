import { UserPlus, TrendingUp, Users, Award, Star } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "framer-motion";

const recommendedEducators = [
  {
    id: 1,
    name: "Dr. Maria Silva",
    title: "AI & Machine Learning Expert",
    followers: "45.2K",
    image: "https://images.unsplash.com/photo-1758685734511-4f49ce9a382b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBlZHVjYXRvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzM1NjExMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    name: "Prof. Jan Nowak",
    title: "Web Development Lead",
    followers: "38.5K",
    image: "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzMxMjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    name: "Anna Wiśniewska",
    title: "UX Design Mentor",
    followers: "52.1K",
    image: "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzMxMjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

const trendingCourses = [
  { id: 1, title: "Advanced React Patterns", students: "12.5K", rating: 4.8 },
  { id: 2, title: "AI for Beginners", students: "23.1K", rating: 4.9 },
  { id: 3, title: "Product Design Fundamentals", students: "18.3K", rating: 4.7 }
];

export function RightSidebar() {
  return (
    <aside className="w-80 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Your Stats */}
        <motion.div 
          className="bg-card rounded-lg p-5 border border-border shadow-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-primary" />
            <h3>Your Learning Stats</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 12, label: "Active Courses" },
              { value: 156, label: "Hours Learned" },
              { value: 8, label: "Completed" },
              { value: 24, label: "Certificates" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center p-3 bg-secondary rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommended Educators */}
        <motion.div 
          className="bg-card rounded-lg p-5 border border-border shadow-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <h3>Recommended Educators</h3>
            </div>
          </div>
          <div className="space-y-4">
            {recommendedEducators.map((educator) => (
              <div key={educator.id} className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-muted overflow-hidden shrink-0">
                  <ImageWithFallback 
                    src={educator.image}
                    alt={educator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm">{educator.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{educator.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{educator.followers} followers</p>
                </div>
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 h-7 px-3 text-xs"
                >
                  Follow
                </Button>
              </div>
            ))}
          </div>
          <button className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors mt-4">
            View all recommendations
          </button>
        </motion.div>

        {/* Trending Courses */}
        <motion.div 
          className="bg-card rounded-lg p-5 border border-border shadow-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3>Trending Courses</h3>
          </div>
          <div className="space-y-3">
            {trendingCourses.map((course) => (
              <div key={course.id} className="pb-3 border-b border-border last:border-0 last:pb-0">
                <p className="text-sm mb-1">{course.title}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {course.students}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    {course.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors mt-4">
            Explore more courses
          </button>
        </motion.div>
      </div>
    </aside>
  );
}
