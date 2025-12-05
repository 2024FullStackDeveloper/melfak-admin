"use client";
import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import { ControllerRenderProps } from "react-hook-form";
import Col from "../template/col/Col";
import Row from "../template/row/Row";
import Text from "../text/Text";
import Image from "next/image";
import Lightbox from "../lightBox/LightBox";
import { X } from "lucide-react";
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
  orientation?: "portrait" | "landscape";
  multiple?: boolean;
};

const ImageInput: React.FC<InputProps & Partial<ControllerRenderProps>> = ({
  src,
  value,
  label,
  onChange,
  className = "",
  error = false,
  errorMessage = "",
  required = false,
  orientation = "portscape",
  multiple = false,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleImageClick = (index: number) => {
    if (previews[index]) {
      setSelectedImageIndex(index);
      setLightboxOpen(true);
    } else {
      handleClick();
    }
  };

  const dimensions = orientation === "landscape" ? "h-24 w-36" : "h-24 w-24";

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
        {previews.length > 0 ? (
          previews.map((preview, index) => (
            <div
              key={index}
              className={`relative ${dimensions} items-center justify-center rounded-md border border-primary p-2`}
            >
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                fill
                objectFit="cover"
                className="h-full w-full rounded-md cursor-pointer"
                onClick={() => handleImageClick(index)}
              />
              <Text
                type="bodyBaseMedium"
                className="absolute top-1 right-1 z-50 h-8 w-8 flex items-center justify-center rounded-full bg-black/70 cursor-pointer text-red-500 hover:text-red-600"
                onClick={() => handleRemove(index)}
              >
                <X size={16} />
              </Text>
            </div>
          ))
        ) : (
          <div
            className={`relative ${dimensions} items-center justify-center rounded-md border border-gray-200 bg-white p-2`}
          >
            <Image
              src={src || "/images/default.png"}
              alt="Default"
              fill
              objectFit="cover"
              className="h-full w-full cursor-pointer rounded-md"
              onClick={handleClick}
              priority
            />
          </div>
        )}
        {multiple && previews.length > 0 && (
          <div
            className={`relative ${dimensions} items-center justify-center rounded-md border border-gray-200 bg-white p-2`}
          >
            <Image
              src={src || "/images/default.png"}
              alt="Add More"
              fill
              objectFit="cover"
              className="h-full w-full cursor-pointer rounded-md opacity-50"
              onClick={handleClick}
              priority
            />
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
          id={label || "file-input"}
          type="file"
          accept="image/*"
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
      {previews.length > 0 && (
        <Lightbox
          images={previews.map((src, index) => ({
            src,
            alt: `Preview ${index + 1}`,
          }))}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          initialIndex={selectedImageIndex}
        />
      )}
    </Col>
  );
};

export default ImageInput;
