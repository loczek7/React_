import { Image, Video, FileText, Smile } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CreatePostProps {
  onCreateClick: () => void;
}

export function CreatePost({ onCreateClick }: CreatePostProps) {
  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-muted overflow-hidden shrink-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzMxMjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Your profile"
            className="w-full h-full object-cover"
          />
        </div>
        <button 
          onClick={onCreateClick}
          className="flex-1 text-left px-4 py-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-muted-foreground"
        >
          Share your learning journey...
        </button>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 text-muted-foreground hover:text-primary"
            onClick={onCreateClick}
          >
            <Image className="w-5 h-5" />
            <span className="hidden sm:inline">Photo</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 text-muted-foreground hover:text-primary"
            onClick={onCreateClick}
          >
            <Video className="w-5 h-5" />
            <span className="hidden sm:inline">Video</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 text-muted-foreground hover:text-primary"
            onClick={onCreateClick}
          >
            <FileText className="w-5 h-5" />
            <span className="hidden sm:inline">Article</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
