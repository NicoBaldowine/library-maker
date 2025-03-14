'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from "sonner"
import { Upload, X } from 'lucide-react'

export default function OnboardingUpload() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (file: File) => {
    if (!file) return
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Invalid file type", {
        description: "Please upload an image file (PNG, JPG, etc.)"
      })
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Please upload an image less than 5MB"
      })
      return
    }

    // Create preview URL
    const url = URL.createObjectURL(file)
    setSelectedFile(file)
    setPreviewUrl(url)
  }

  const handleClear = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    handleFileChange(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  return (
    <>
      <div className="min-h-screen bg-[#F1F1F1]">
        <div className="container max-w-3xl mx-auto py-12 px-4 pb-32">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Step 1</p>
              <h1 className="text-3xl font-bold">Add A Reference</h1>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Upload Image</h2>
                  
                  <div
                    className={`border-2 border-dashed rounded-lg p-12 transition-colors relative ${
                      isDragging 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted-foreground/25'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    {!previewUrl ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-4 rounded-full bg-muted">
                          <Upload className="w-8 h-8 text-muted-foreground" />
                        </div>
                        
                        <div className="text-center">
                          <p className="text-lg font-medium">
                            Drop Your Image Here Or Browse
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Supports PNG, JPG No More Than 5 MB
                          </p>
                        </div>

                        <input
                          type="file"
                          accept="image/png,image/jpeg"
                          onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                          className="hidden"
                          id="image-upload"
                        />
                        <Button 
                          variant="outline" 
                          onClick={() => document.getElementById('image-upload')?.click()}
                        >
                          Browse Files
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="absolute right-4 top-4 z-10">
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={handleClear}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="relative w-full aspect-video">
                          <Image
                            src={previewUrl}
                            alt="Preview"
                            fill
                            className="object-contain rounded-lg"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="flex justify-end h-[85px] items-center">
            <Button
              onClick={() => router.push('/onboarding/assets')}
              size="lg"
              disabled={!selectedFile}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </>
  )
} 