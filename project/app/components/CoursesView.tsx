"use client";

import { CourseCard } from "./CourseCard";
import { Search, Filter } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { getCourses } from "../lib/api";
import { transformCourse } from "../lib/api-helpers";
import { Course } from "../types/api";

// Domyślne dane jako fallback
const allCoursesDefault: Course[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    educator: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMGNvZGluZ3xlbnwxfHx8fDE3NjMyOTkxMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "8h 30m",
    students: "12.5k",
    rating: 4.8,
    price: "$89",
    level: "Advanced"
  },
  {
    id: "2",
    title: "Machine Learning Fundamentals",
    educator: "Dr. Michael Chen",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzYzMzcwNTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "12h 15m",
    students: "18.2k",
    rating: 4.9,
    price: "$129",
    level: "Intermediate"
  },
  {
    id: "3",
    title: "UI/UX Design Masterclass",
    educator: "Emma Williams",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1eCUyMGRlc2lnbnxlbnwxfHx8fDE3NjMzNzA2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "6h 45m",
    students: "9.8k",
    rating: 4.7,
    price: "$79",
    level: "Beginner"
  },
  {
    id: "4",
    title: "Python for Data Science",
    educator: "Prof. David Brown",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxweXRob24lMjBjb2Rpbmd8ZW58MXx8fHwxNzYzMzcwNjIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "10h 20m",
    students: "15.4k",
    rating: 4.8,
    price: "$99",
    level: "Intermediate"
  },
  {
    id: "5",
    title: "Full Stack Web Development",
    educator: "Alex Martinez",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NjMzNzA2Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "24h 00m",
    students: "22.1k",
    rating: 4.9,
    price: "$149",
    level: "Advanced"
  },
  {
    id: "6",
    title: "Digital Marketing Strategy",
    educator: "Lisa Anderson",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDF8fHx8MTc2MzM3MDY1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "5h 30m",
    students: "11.3k",
    rating: 4.6,
    price: "$69",
    level: "Beginner"
  },
  {
    id: "7",
    title: "Cybersecurity Essentials",
    educator: "Robert Kim",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5fGVufDF8fHx8MTc2MzM3MDY2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "9h 15m",
    students: "14.2k",
    rating: 4.7,
    price: "$99",
    level: "Intermediate"
  },
  {
    id: "8",
    title: "Graphic Design Fundamentals",
    educator: "Maria Garcia",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWdufGVufDF8fHx8MTc2MzM3MDY3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "7h 00m",
    students: "10.5k",
    rating: 4.6,
    price: "$75",
    level: "Beginner"
  },
  {
    id: "9",
    title: "Cloud Computing with AWS",
    educator: "John Smith",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZ3xlbnwxfHx8fDE3NjMzNzA2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "11h 30m",
    students: "16.8k",
    rating: 4.8,
    price: "$119",
    level: "Advanced"
  }
];

export function CoursesView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allCourses, setAllCourses] = useState<Course[]>(allCoursesDefault);
  const [isLoading, setIsLoading] = useState(true);

  const categories = ["All", "Development", "Design", "Business", "Marketing", "Data Science", "Security"];

  // Pobierz kursy z API przy pierwszym renderze
  useEffect(() => {
    async function fetchCourses() {
      try {
        setIsLoading(true);
        const apiCourses = await getCourses();
        const transformedCourses = apiCourses.map(transformCourse);
        if (transformedCourses.length > 0) {
          setAllCourses(transformedCourses);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania kursów:', error);
        // W przypadku błędu, użyj domyślnych danych
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCourses();
  }, []);

  // Filter courses based on search query and category
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.educator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.level.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All" || 
      (selectedCategory === "Development" && (course.title.includes("React") || course.title.includes("Python") || course.title.includes("Web") || course.title.includes("Cloud"))) ||
      (selectedCategory === "Design" && (course.title.includes("Design") || course.title.includes("UX"))) ||
      (selectedCategory === "Business" && course.title.includes("Business")) ||
      (selectedCategory === "Marketing" && course.title.includes("Marketing")) ||
      (selectedCategory === "Data Science" && (course.title.includes("Machine Learning") || course.title.includes("Data Science"))) ||
      (selectedCategory === "Security" && course.title.includes("Cybersecurity"));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <h1 className="mb-2">Explore Courses</h1>
        <p className="text-muted-foreground">
          Discover thousands of courses from industry experts
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search courses, instructors, topics..."
              className="pl-9 bg-secondary border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </Button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                category === selectedCategory
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      {searchQuery && (
        <p className="text-sm text-muted-foreground">
          Found {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} matching "{searchQuery}"
        </p>
      )}

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border shadow-sm p-12 text-center">
          <p className="text-muted-foreground">
            No courses found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
