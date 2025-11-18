import { BookmarkIcon, Clock, CheckCircle2, PlayCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const savedCourses = [
  {
    id: "1",
    title: "React Mastery",
    instructor: "John Doe",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMGNvZGluZ3xlbnwxfHx8fDE3NjMyOTkxMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    progress: 75,
    totalDuration: "8h 30m",
    lastAccessed: "2 days ago"
  },
  {
    id: "2",
    title: "UX Design Pro",
    instructor: "Emma Smith",
    thumbnail: "https://images.unsplash.com/photo-1608120663152-fe60f4f55fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFybmluZyUyMHN0dWR5aW5nJTIwYm9va3N8ZW58MXx8fHwxNzYzMzY5NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    progress: 40,
    totalDuration: "6h 15m",
    lastAccessed: "5 days ago"
  },
  {
    id: "3",
    title: "Python Fundamentals",
    instructor: "Mike Johnson",
    thumbnail: "https://images.unsplash.com/photo-1546430498-05c7b929830e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBlZHVjYXRpb24lMjBsYXB0b3B8ZW58MXx8fHwxNzYzMjk5MTA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    progress: 100,
    totalDuration: "10h 00m",
    lastAccessed: "1 week ago"
  }
];

const savedPosts = [
  {
    id: "1",
    author: "Dr. Maria Silva",
    content: "Just published a new course on Neural Networks! This comprehensive guide covers everything from basic perceptrons to advanced deep learning architectures.",
    savedDate: "3 days ago"
  },
  {
    id: "2",
    author: "Prof. Jan Nowak",
    content: "5 React patterns every developer should know. Build flexible, reusable components with these advanced techniques.",
    savedDate: "1 week ago"
  }
];

export function LibraryView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <h1 className="mb-2">My Library</h1>
        <p className="text-muted-foreground">
          Your saved courses and bookmarked content
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="bg-card border border-border w-full justify-start rounded-lg p-1">
          <TabsTrigger value="courses" className="flex-1">
            In Progress
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">
            Completed
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex-1">
            Saved Posts
          </TabsTrigger>
        </TabsList>

        {/* In Progress Courses */}
        <TabsContent value="courses" className="space-y-4 mt-4">
          {savedCourses.filter(c => c.progress < 100).map((course) => (
            <div key={course.id} className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="flex gap-4 p-4">
                <div className="w-40 h-24 rounded-lg overflow-hidden shrink-0 bg-muted">
                  <ImageWithFallback 
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">by {course.instructor}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.totalDuration}
                    </span>
                    <span className="flex items-center gap-1">
                      <PlayCircle className="w-3 h-3" />
                      Last accessed {course.lastAccessed}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-secondary h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-full rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-primary">{course.progress}%</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        {/* Completed Courses */}
        <TabsContent value="completed" className="space-y-4 mt-4">
          {savedCourses.filter(c => c.progress === 100).map((course) => (
            <div key={course.id} className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="flex gap-4 p-4">
                <div className="w-40 h-24 rounded-lg overflow-hidden shrink-0 bg-muted">
                  <ImageWithFallback 
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-1">
                    <h3>{course.title}</h3>
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">by {course.instructor}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.totalDuration}
                    </span>
                    <span className="text-primary">Completed {course.lastAccessed}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button variant="outline">
                    Review
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        {/* Saved Posts */}
        <TabsContent value="saved" className="space-y-4 mt-4">
          {savedPosts.map((post) => (
            <div key={post.id} className="bg-card rounded-lg border border-border shadow-sm p-4">
              <div className="flex items-start gap-3 mb-3">
                <BookmarkIcon className="w-5 h-5 text-primary fill-primary shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="mb-1">{post.author}</p>
                  <p className="text-sm text-muted-foreground">{post.content}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground pl-8">
                <span>Saved {post.savedDate}</span>
                <Button variant="ghost" size="sm">
                  View post
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
