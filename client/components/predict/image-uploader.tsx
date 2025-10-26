"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isLoading?: boolean;
}

export function ImageUploader({ onImageSelect, isLoading }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file ảnh");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    onImageSelect(file);
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileSelect}
      />

      {!preview ? (
        <div className="border-2 border-dashed rounded-lg p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-primary/10 p-6">
              <Camera className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Chụp ảnh hoặc chọn file
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Chọn ảnh lá cây để nhận diện bệnh
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={handleCameraClick}
                disabled={isLoading}
                size="lg"
              >
                <Camera className="mr-2 h-5 w-5" />
                Chụp ảnh
              </Button>
              <Button
                onClick={handleFilePicker}
                variant="outline"
                disabled={isLoading}
                size="lg"
              >
                <Upload className="mr-2 h-5 w-5" />
                Chọn ảnh
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full rounded-lg border"
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <Button
              onClick={() => {
                setPreview(null);
                fileInputRef.current!.value = "";
                cameraInputRef.current!.value = "";
              }}
              variant="outline"
              disabled={isLoading}
            >
              Chọn ảnh khác
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

