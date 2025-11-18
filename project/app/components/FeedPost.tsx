import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface FeedPostProps {
  postId: string;
  author: {
    name: string;
    title: string;
    image: string;
    timestamp: string;
  };
  content: {
    text: string;
    image?: string;
    tags?: string[];
  };
  engagement: {
    likes: number;
    comments: number;
    saves: number;
  };
  isOwnPost?: boolean;
  onEdit?: (postId: string) => void;
  onDelete?: (postId: string) => void;
}

export function FeedPost({ postId, author, content, engagement, isOwnPost, onEdit, onDelete }: FeedPostProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(engagement.likes);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleDelete = () => {
    setShowDeleteDialog(false);
    onDelete?.(postId);
  };

  return (
    <>
      <article className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
        {/* Post Header */}
        <div className="p-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-muted overflow-hidden shrink-0">
              <ImageWithFallback 
                src={author.image}
                alt={author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p>{author.name}</p>
              <p className="text-sm text-muted-foreground">{author.title}</p>
              <p className="text-xs text-muted-foreground">{author.timestamp}</p>
            </div>
          </div>
          
          {isOwnPost ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-secondary transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem 
                  onClick={() => onEdit?.(postId)}
                  className="gap-2 cursor-pointer focus:bg-secondary focus:text-foreground"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit post</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setShowDeleteDialog(true)}
                  className="gap-2 cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete post</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Post Content */}
        <div className="px-4 pb-3">
          <p className="text-sm leading-relaxed whitespace-pre-line">{content.text}</p>
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {content.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs text-primary hover:underline cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Post Image */}
        {content.image && (
          <div className="w-full">
            <ImageWithFallback 
              src={content.image}
              alt="Post content"
              className="w-full h-80 object-cover"
            />
          </div>
        )}

        {/* Engagement Stats */}
        <div className="px-4 py-2 flex items-center justify-between text-sm text-muted-foreground border-t border-border">
          <span>{likes} likes</span>
          <div className="flex items-center gap-3">
            <span>{engagement.comments} comments</span>
            <span>{engagement.saves} saves</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 py-2 border-t border-border flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLike}
              className={`gap-2 ${liked ? "text-primary" : "text-muted-foreground"} hover:text-primary`}
            >
              <motion.div
                animate={{ scale: liked ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart className={`w-5 h-5 ${liked ? "fill-primary" : ""}`} />
              </motion.div>
              <span>Like</span>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
              <MessageCircle className="w-5 h-5" />
              <span>Comment</span>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSaved(!saved)}
              className={`gap-2 ${saved ? "text-primary" : "text-muted-foreground"} hover:text-primary`}
            >
              <motion.div
                animate={{ scale: saved ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Bookmark className={`w-5 h-5 ${saved ? "fill-primary" : ""}`} />
              </motion.div>
              <span>Save</span>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </Button>
          </motion.div>
        </div>
      </article>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete post?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This action cannot be undone. This will permanently delete your post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary hover:bg-secondary/80">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
