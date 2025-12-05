"use client";
import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import { ControllerRenderProps } from "react-hook-form";
import Col from "../template/col/Col";
import Row from "../template/row/Row";
import Text from "../text/Text";
import { X, Play } from "lucide-react";
import useLocalizer from "@/hooks/useLocalizer";

type InputProps = {
  src?: string;
  label?: string;
  placeholder: string;
  value?: (File | string)[];
  onChange: (files: File[] | null) => void;
  className?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  status?: "add" | "edit";
  multiple?: boolean;
};

const VideoInput: React.FC<InputProps & Partial<ControllerRenderProps>> = ({
  src,
  value,
  label,
  onChange,
  className = "",
  error = false,
  errorMessage = "",
  required = false,
  multiple = false,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const { t } = useLocalizer();

  useEffect(() => {
    if (value) {
      const newPreviews: string[] = [];
      const processValue = async (item: File | string) => {
        if (item instanceof File) {
          const reader = new FileReader();
          reader.onloadend = () => {
            newPreviews.push(reader.result as string);
            setPreviews([...newPreviews]);
          };
          reader.readAsDataURL(item);
        } else if (typeof item === "string") {
          newPreviews.push(item);
          setPreviews([...newPreviews]);
        }
      };

      if (Array.isArray(value)) {
        value.forEach(processValue);
      }
    } else {
      setPreviews([]);
    }
  }, [value]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      // Immediately show previews for selected files
      if (!multiple) {
        setPreviews([]);
      }
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (!multiple) {
            setPreviews([reader.result as string]);
          } else {
            setPreviews((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });

      const newFiles = multiple
        ? [...((value as File[]) || []), ...files]
        : files;
      onChange(newFiles);
    }
  };

  const handleRemove = (index: number) => {
    if (multiple && Array.isArray(value)) {
      const newFiles = [...value];
      newFiles.splice(index, 1);
      onChange(newFiles.length > 0 ? newFiles : null);
      setPreviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      onChange(null);
      setPreviews([]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleVideoClick = (index: number) => {
    if (previews[index]) {
      setSelectedVideoIndex(index);
      const video = videoRefs.current[index];
      if (video) {
        if (video.paused) {
          video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      }
    } else {
      handleClick();
    }
  };

  return (
    <Col className={`${className} w-full`}>
      {label && (
        <Row className="mb-2">
          <Text type="bodyBaseBold">
            {label} {required && <span className="text-danger">*</span>}
          </Text>
        </Row>
      )}
      <Row className="flex flex-wrap gap-2">
        {previews.length > 0
          ? previews.map((preview, index) => (
              <div
                key={index}
                className="relative h-24 w-36 items-center justify-center rounded-md border border-primary p-2"
              >
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={preview}
                  className="h-full w-full rounded-md cursor-pointer object-cover"
                  onClick={() => handleVideoClick(index)}
                  onEnded={() => setIsPlaying(false)}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  onClick={() => handleVideoClick(index)}
                >
                  {!isPlaying && (
                    <div className="bg-black/50 rounded-full p-2 pointer-events-auto cursor-pointer">
                      <Play size={24} className="text-white" fill="white" />
                    </div>
                  )}
                </div>
                <Text
                  type="bodyBaseMedium"
                  className="absolute top-1 right-1 z-50 h-8 w-8 flex items-center justify-center rounded-full bg-black/70 cursor-pointer text-red-500 hover:text-red-600"
                  onClick={() => handleRemove(index)}
                >
                  <X size={16} />
                </Text>
              </div>
            ))
          : (src && (
              <div className="relative h-24 w-36 items-center justify-center rounded-md border border-gray-200 bg-gray-100 p-2">
                <video
                  controls
                  preload="none"
                  src={src}
                  className="h-full w-full rounded-md cursor-pointer object-cover"
                >
                  <source src={src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )) || (
              <div className="relative h-24 w-36 items-center justify-center rounded-md border border-gray-200 bg-gray-100 p-2">
                <div
                  className="h-full w-full cursor-pointer rounded-md flex items-center justify-center"
                  onClick={handleClick}
                >
                  <Play size={32} className="text-gray-400" />
                </div>
              </div>
            )}
        {multiple && previews.length > 0 && (
          <div className="relative h-24 w-36 items-center justify-center rounded-md border border-gray-200 bg-white p-2">
            <div
              className="h-full w-full cursor-pointer rounded-md flex items-center justify-center opacity-50"
              onClick={handleClick}
            >
              <Play size={32} className="text-gray-400" />
            </div>
            <Text
              type="bodyBaseMedium"
              className="absolute inset-0 flex items-center justify-center text-primary-900"
            >
              +
            </Text>
          </div>
        )}
        <input
          ref={fileInputRef}
          id={label || "video-input"}
          type="file"
          accept="video/mp4,video/webm,video/ogg,video/quicktime"
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />
      </Row>
      <Row className="mt-2">
        <Text
          type="bodyBaseMedium"
          className="cursor-pointer hover:text-primary-900"
          onClick={handleClick}
        >
          {previews.length > 0 || src ? t("buttons.update") : t("buttons.add")}
        </Text>
      </Row>
      {error && (
        <Row className="mt-2 w-full items-center justify-start">
          <Text type="bodyXSmallBold" className="text-danger">
            {errorMessage}
          </Text>
        </Row>
      )}
    </Col>
  );
};

export default VideoInput;
