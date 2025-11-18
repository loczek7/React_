"use client";

import { ProgressView } from "./components/ProgressView";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "./components/Header";
import { LeftSidebar } from "./components/LeftSidebar";
import { RightSidebar } from "./components/RightSidebar";
import { CreatePost } from "./components/CreatePost";
import { FeedPost } from "./components/FeedPost";
import { CourseCard } from "./components/CourseCard";
import { CoursesView } from "./components/CoursesView";
import { LibraryView } from "./components/LibraryView";
import { MessagesView } from "./components/MessagesView";
import { NotificationsView } from "./components/NotificationsView";
import { CreatePostDialog } from "./components/CreatePostDialog";
import { EditPostDialog } from "./components/EditPostDialog";
import { LoginDialog } from "./components/LoginDialog";
import { RegisterDialog } from "./components/RegisterDialog";
import { getPosts, getCourses, createPost } from "./lib/api";
import { transformPost, transformCourse, formatTimestamp } from "./lib/api-helpers";
import { Post, Course } from "./types/api";

// Domyślne dane jako fallback
const feedPosts = [
  {
    id: "1",
    author: {
      name: "Dr. Maria Silva",
      title: "AI & Machine Learning Expert",
      image: "https://images.unsplash.com/photo-1758685734511-4f49ce9a382b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBlZHVjYXRvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzM1NjExMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      timestamp: "2h ago"
    },
    content: {
      text: "Just published a new course on Neural Networks! 🚀\n\nThis comprehensive guide covers everything from basic perceptrons to advanced deep learning architectures. Perfect for intermediate learners looking to level up their AI skills.\n\nKey topics:\n• Understanding neural network architectures\n• Backpropagation and optimization\n• Real-world applications and case studies\n\nExcited to share this with the community!",
      image: "https://images.unsplash.com/photo-1546430498-05c7b929830e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBlZHVjYXRpb24lMjBsYXB0b3B8ZW58MXx8fHwxNzYzMjk5MTA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["AI", "MachineLearning", "NeuralNetworks", "DeepLearning"]
    },
    engagement: {
      likes: 342,
      comments: 47,
      saves: 89
    }
  },
  {
    id: "2",
    author: {
      name: "Prof. Jan Nowak",
      title: "Web Development Lead",
      image: "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzMxMjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      timestamp: "5h ago"
    },
    content: {
      text: "5 React patterns every developer should know 💡\n\n1. Compound Components - Build flexible, reusable components\n2. Render Props - Share code between components\n3. Custom Hooks - Extract and reuse stateful logic\n4. HOCs - Add functionality to existing components\n5. Context + useReducer - Manage complex state\n\nWhich pattern do you use most often? Let me know in the comments!",
      tags: ["React", "JavaScript", "WebDevelopment", "Programming"]
    },
    engagement: {
      likes: 567,
      comments: 93,
      saves: 234
    }
  },
  {
    id: "3",
    author: {
      name: "Anna Wiśniewska",
      title: "UX Design Mentor",
      image: "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzMxMjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      timestamp: "1d ago"
    },
    content: {
      text: "The importance of user research cannot be overstated 📊\n\nToo many designers jump straight into wireframes without understanding their users. Here's my process:\n\n✓ User interviews\n✓ Persona development\n✓ Journey mapping\n✓ Usability testing\n\nInvesting time in research upfront saves countless hours of revisions later. What's your UX research process?",
      image: "https://images.unsplash.com/photo-1608120663152-fe60f4f55fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFybmluZyUyMHN0dWR5aW5nJTIwYm9va3N8ZW58MXx8fHwxNzYzMzY5NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["UXDesign", "UserResearch", "DesignThinking", "ProductDesign"]
    },
    engagement: {
      likes: 423,
      comments: 68,
      saves: 156
    }
  }
];

const recommendedCourses = [
  {
    id: "1",
    title: "Advanced React Patterns & Best Practices",
    educator: "Prof. Jan Nowak",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMGNvZGluZ3xlbnwxfHx8fDE3NjMyOTkxMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "8 weeks",
    students: "15.4K",
    rating: 4.9,
    level: "Advanced",
    price: "$99"
  },
  {
    id: "2",
    title: "Machine Learning Fundamentals with Python",
    educator: "Dr. Maria Silva",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzYzMzcwNTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "10 weeks",
    students: "23.1K",
    rating: 4.8,
    level: "Intermediate",
    price: "$129"
  },
  {
    id: "3",
    title: "Complete UX Design Masterclass 2024",
    educator: "Anna Wiśniewska",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1eCUyMGRlc2lnbnxlbnwxfHx8fDE3NjMzNzA2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "6 weeks",
    students: "18.3K",
    rating: 4.7,
    level: "Beginner",
    price: "$79"
  }
];

export default function Home() {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>(feedPosts);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authView, setAuthView] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = {
    name: "Anna Kowalska",
    image: "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzMxMjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  };

  // Pobierz dane z API przy pierwszym renderze
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        
        // Pobierz posty
        const apiPosts = await getPosts();
        const transformedPosts = apiPosts.map(transformPost).map(post => ({
          ...post,
          author: {
            ...post.author,
            timestamp: formatTimestamp(post.author.timestamp),
          },
        }));
        if (transformedPosts.length > 0) {
          setPosts(transformedPosts);
        }
        
        // Pobierz kursy
        const apiCourses = await getCourses();
        const transformedCourses = apiCourses.map(transformCourse);
        if (transformedCourses.length > 0) {
          setRecommendedCourses(transformedCourses.slice(0, 3)); // Pokaż tylko 3 pierwsze
        }
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
        // W przypadku błędu, użyj domyślnych danych
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  const handlePublishPost = async (postData: { text: string; image?: string; tags: string[] }) => {
    try {
      // Wyślij post do API
      const apiPost = await createPost({
        title: postData.text.substring(0, 100), // Użyj pierwszych 100 znaków jako tytuł
        content: postData.text,
        author_id: 1, // TODO: Pobierz z sesji użytkownika
        author: currentUser.name,
        avatar: currentUser.image,
        image: postData.image,
        tags: postData.tags.join(','),
      });

      // Transformuj odpowiedź z API do formatu frontendu
      const transformedPost = transformPost(apiPost);
      const newPost: Post = {
        ...transformedPost,
        author: {
          ...transformedPost.author,
          title: "Learner & Explorer",
          timestamp: "Just now",
        },
      };

      // Dodaj nowy post na początku listy
      setPosts([newPost, ...posts]);
    } catch (error) {
      console.error('Błąd podczas tworzenia posta:', error);
      // W przypadku błędu, dodaj lokalnie (fallback)
      const newPost: Post = {
        id: Date.now().toString(),
        author: {
          name: currentUser.name,
          title: "Learner & Explorer",
          image: currentUser.image,
          timestamp: "Just now"
        },
        content: {
          text: postData.text,
          image: postData.image,
          tags: postData.tags
        },
        engagement: {
          likes: 0,
          comments: 0,
          saves: 0
        }
      };
      setPosts([newPost, ...posts]);
    }
  };

  const handleEditPost = (postId: string) => {
    setEditingPostId(postId);
    setIsEditPostOpen(true);
  };

  const handleSaveEdit = (postData: { text: string; image?: string; tags: string[] }) => {
    setPosts(posts.map(post => 
      post.id === editingPostId 
        ? {
            ...post,
            content: {
              text: postData.text,
              image: postData.image,
              tags: postData.tags
            }
          }
        : post
    ));
    setEditingPostId(null);
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthView("login");
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };

  const editingPost = editingPostId ? posts.find(p => p.id === editingPostId) : null;

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    const matchesContent = post.content.text.toLowerCase().includes(searchLower);
    const matchesAuthor = post.author.name.toLowerCase().includes(searchLower);
    const matchesTitle = post.author.title.toLowerCase().includes(searchLower);
    const matchesTags = post.content.tags?.some(tag => 
      tag.toLowerCase().includes(searchLower)
    );
    
    return matchesContent || matchesAuthor || matchesTitle || matchesTags;
  });

  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated ? (
        <>
          <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} onLogout={handleLogout} />
          
          <div className="max-w-[1440px] mx-auto flex gap-6">
            {/* Left Sidebar */}
            <LeftSidebar />

            {/* Main Content */}
            <main className="flex-1 min-w-0 py-6 space-y-4">
              {/* Create Post */}
              <CreatePost onCreateClick={() => setIsCreatePostOpen(true)} />

              {/* Search Results Info */}
              {searchQuery && (
                <div className="bg-card rounded-lg border border-border shadow-sm p-4">
                  <p className="text-sm">
                    Found <span className="text-primary">{filteredPosts.length}</span> post{filteredPosts.length !== 1 ? 's' : ''} matching "{searchQuery}"
                  </p>
                </div>
              )}

              {/* Feed Posts */}
              {filteredPosts.length > 0 ? (
                <AnimatePresence mode="popLayout">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                    >
                      <FeedPost 
                        postId={post.id}
                        author={post.author}
                        content={post.content}
                        engagement={post.engagement}
                        isOwnPost={post.author.name === currentUser.name}
                        onEdit={handleEditPost}
                        onDelete={handleDeletePost}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : searchQuery ? (
                <motion.div 
                  className="bg-card rounded-lg border border-border shadow-sm p-12 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-muted-foreground">
                    No posts found matching "{searchQuery}"
                  </p>
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="text-primary hover:text-primary/80 text-sm mt-2"
                  >
                    Clear search
                  </button>
                </motion.div>
              ) : null}

              {/* Recommended Courses Section */}
              {recommendedCourses.length > 0 && (
                <motion.div 
                  className="bg-card rounded-lg border border-border shadow-sm p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <h2 className="mb-4">Recommended Courses for You</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendedCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                      >
                        <CourseCard course={course} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Load More */}
              <div className="text-center py-6">
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Load more posts
                </button>
              </div>
            </main>

            {/* Right Sidebar */}
            <RightSidebar />
          </div>

          {/* Create Post Dialog */}
          <CreatePostDialog 
            open={isCreatePostOpen}
            onOpenChange={setIsCreatePostOpen}
            onPublish={handlePublishPost}
            userImage={currentUser.image}
            userName={currentUser.name}
          />

          {/* Edit Post Dialog */}
          {editingPost && (
            <EditPostDialog 
              open={isEditPostOpen}
              onOpenChange={setIsEditPostOpen}
              onSave={handleSaveEdit}
              userImage={currentUser.image}
              userName={currentUser.name}
              initialData={{
                text: editingPost.content.text,
                image: editingPost.content.image,
                tags: editingPost.content.tags || []
              }}
            />
          )}
        </>
      ) : null}

      {/* Login Dialog */}
      <LoginDialog 
        open={authView === "login" && !isAuthenticated}
        onLogin={handleLogin}
        onSwitchToRegister={() => setAuthView("register")}
      />

      {/* Register Dialog */}
      <RegisterDialog 
        open={authView === "register" && !isAuthenticated}
        onRegister={handleRegister}
        onSwitchToLogin={() => setAuthView("login")}
      />
    </div>
  );
}
