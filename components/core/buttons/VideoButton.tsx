"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useLocalizer from "@/hooks/useLocalizer";
import { cn } from "@/lib/utils";

import { PlayIcon } from "lucide-react";

interface VideoModalButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  videoUrl: string;
  posterUrl?: string;
}

const VideoModalButton: React.FC<VideoModalButtonProps> = ({
  className,
  videoUrl,
  posterUrl,
}) => {
  const { isRtl } = useLocalizer();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="accent"
          className={cn(
            "absolute h-12 w-12 hover:[&_.play-icon]:animate-none -bottom-5 -right-5 m-2",
            isRtl && "-left-5 right-auto",
            className
          )}
        >
          <PlayIcon size={20} className={cn(isRtl && " rotate-60 ")} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] bg-transparent! border-0 shadow-none overflow-hidden ring-0 outline-0">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <div className="w-full aspect-video">
          <video
            controls
            preload="none"
            autoPlay
            muted
            className="w-full h-full rounded-md"
            poster={posterUrl}
            aria-label="Video player"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModalButton;
