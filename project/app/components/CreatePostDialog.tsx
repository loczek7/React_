import { useState } from "react";
import { Image, X, Hash } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPublish: (post: {
    text: string;
    image?: string;
    tags: string[];
  }) => void;
  userImage: string;
  userName: string;
}

export function CreatePostDialog({ 
  open, 
  onOpenChange, 
  onPublish, 
  userImage,
  userName 
}: CreatePostDialogProps) {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handlePublish = () => {
    if (!text.trim()) return;

    onPublish({
      text,
      image: imageUrl || undefined,
      tags
    });

    // Reset form
    setText("");
    setImageUrl("");
    setTags([]);
    setTagInput("");
    setShowImageInput(false);
    onOpenChange(false);
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim().replace(/^#/, "");
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>Create a post</DialogTitle>
          <DialogDescription className="sr-only">
            Share your learning journey with your network
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted overflow-hidden shrink-0">
              <ImageWithFallback 
                src={userImage}
                alt={userName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p>{userName}</p>
              <p className="text-xs text-muted-foreground">Share with your network</p>
            </div>
          </div>

          {/* Text Input */}
          <Textarea 
            placeholder="What do you want to share today?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[150px] resize-none bg-secondary border-none focus-visible:ring-primary"
          />

          {/* Image Preview */}
          {imageUrl && (
            <div className="relative rounded-lg overflow-hidden">
              <ImageWithFallback 
                src={imageUrl}
                alt="Post preview"
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setImageUrl("")}
                className="absolute top-2 right-2 w-8 h-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Image URL Input */}
          {showImageInput && !imageUrl && (
            <div className="flex gap-2">
              <Input 
                placeholder="Enter image URL..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="bg-secondary border-none"
              />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowImageInput(false)}
              >
                Cancel
              </Button>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span 
                  key={tag}
                  className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-primary/80"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Tag Input */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Add tags (press Enter)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-9 bg-secondary border-none"
              />
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleAddTag}
              disabled={!tagInput.trim()}
            >
              Add tag
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 text-muted-foreground hover:text-primary"
                onClick={() => setShowImageInput(!showImageInput)}
              >
                <Image className="w-5 h-5" />
                <span>Add image</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handlePublish}
                disabled={!text.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Publish
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
