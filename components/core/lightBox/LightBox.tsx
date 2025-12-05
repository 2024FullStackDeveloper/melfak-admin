"use client";
import React, { MouseEvent, useState } from "react";
import Row from "../template/row/Row";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Col from "../template/col/Col";
import Image from "next/image";

interface LightboxProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  initialIndex?: number;
  className?: string;
  imageClassName?: string;
  isOpen: boolean;
  onClose: () => void;
}

const Lightbox = ({
  images,
  initialIndex = 0,
  className = "",
  imageClassName = "",
  isOpen,
  onClose,
}: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen) return null;

  const handlePrevious = (e: MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-background bg-opacity-90"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <Row
          fullHeight
          alignVertical="center"
          alignHorizontal="center"
          className="p-4"
        >
          <div className="flex items-center gap-8">
            {images.length > 1 && (
              <div className="flex flex-col gap-2">
                <button
                  className="text-white bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-75 transition-opacity"
                  onClick={handlePrevious}
                >
                  <ArrowRight size={24} />
                </button>
              </div>
            )}
            <Col
              className={`relative max-w-[90vw] max-h-[90vh] ${className}`}
              onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className={`max-w-full  max-h-[90vh] object-contain ${imageClassName}`}
              />
              <button
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-75 transition-opacity"
                onClick={onClose}
              >
                <X size={24} />
              </button>
            </Col>

            {images.length > 1 && (
              <div className="flex flex-col gap-2">
                <button
                  className="text-white bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-75 transition-opacity"
                  onClick={handleNext}
                >
                  <ArrowLeft size={24} />
                </button>
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <div className="flex gap-2 bg-black bg-opacity-50 p-2 rounded-lg overflow-x-auto max-w-[80vw]">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className={`w-16 h-16 object-cover cursor-pointer rounded-lg transition-opacity ${
                      index === currentIndex
                        ? "opacity-100 ring-2 ring-white"
                        : "opacity-50 hover:opacity-75"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </Row>
      </div>
    </div>
  );
};

export default Lightbox;
