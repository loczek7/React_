import { Star, Clock, Users, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "framer-motion";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    educator: string;
    image: string;
    duration: string;
    students: string;
    rating: number;
    level: string;
    price?: string;
  };
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.div 
      className="bg-card rounded-lg border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Course Image */}
      <div className="relative h-40 bg-muted overflow-hidden">
        <ImageWithFallback 
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
          {course.level}
        </div>
      </div>

      {/* Course Info */}
      <div className="p-4">
        <h3 className="mb-1 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{course.educator}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {course.students}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            {course.rating}
          </span>
        </div>

        {/* Action */}
        <div className="flex items-center justify-between gap-2">
          {course.price && (
            <span className="text-primary">{course.price}</span>
          )}
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground ml-auto"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Enroll
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
