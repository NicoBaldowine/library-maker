'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

type ColorConfig = {
  background: string
  primary: string
  secondary: string
}

export default function CustomizeColors() {
  const router = useRouter()
  const [libraryName, setLibraryName] = useState('')
  const [colors, setColors] = useState<ColorConfig>({
    background: '#FFFFFF',
    primary: '#000000',
    secondary: '#666666'
  })
  
  // Refs for the hidden color inputs
  const backgroundRef = useRef<HTMLInputElement>(null)
  const primaryRef = useRef<HTMLInputElement>(null)
  const secondaryRef = useRef<HTMLInputElement>(null)

  const validateHexColor = (color: string) => {
    const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    return regex.test(color)
  }

  const handleColorChange = (key: keyof ColorConfig, value: string) => {
    // Always convert to uppercase for consistency
    const formattedValue = value.toUpperCase()
    
    // Add # if it's missing and the input is valid hex
    const colorValue = formattedValue.startsWith('#') 
      ? formattedValue 
      : `#${formattedValue}`

    setColors(prev => ({
      ...prev,
      [key]: colorValue
    }))
  }

  const handleSubmit = () => {
    if (!libraryName.trim()) {
      toast.error('Library name is required')
      return
    }

    // Validate all colors
    const isValid = Object.entries(colors).every(([key, value]) => {
      const valid = validateHexColor(value)
      if (!valid) {
        toast.error(`Invalid ${key} color`, {
          description: "Please enter a valid hex color (e.g., #FF0000)"
        })
      }
      return valid
    })

    if (isValid) {
      // Here you would typically save the colors and create the library
      console.log('Creating library:', {
        name: libraryName,
        colors
      })
      toast.success('Library created successfully!')
      router.push('/dashboard')
    }
  }

  const colorInputs = [
    {
      id: 'backgroundColor',
      label: 'Background Color',
      key: 'background' as const,
      ref: backgroundRef,
    },
    {
      id: 'primaryColor',
      label: 'Primary Color',
      key: 'primary' as const,
      ref: primaryRef,
    },
    {
      id: 'secondaryColor',
      label: 'Secondary Color',
      key: 'secondary' as const,
      ref: secondaryRef,
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-[#F1F1F1]">
        <div className="container max-w-3xl mx-auto py-12 px-4 pb-32">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="rounded-full"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Step 3</p>
                <h1 className="text-3xl font-bold">Customize Your Library</h1>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  {/* Library Name */}
                  <div className="space-y-2">
                    <Label htmlFor="libraryName">Library Name</Label>
                    <Input
                      id="libraryName"
                      value={libraryName}
                      onChange={(e) => setLibraryName(e.target.value)}
                      placeholder="My Icon Library"
                    />
                  </div>

                  {/* Color Configuration */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Color Configuration</h2>
                    
                    <div className="grid gap-6">
                      {colorInputs.map(({ id, label, key, ref }) => (
                        <div key={id} className="space-y-2">
                          <Label htmlFor={id}>{label}</Label>
                          <div className="flex gap-4 items-center">
                            <Input
                              id={id}
                              value={colors[key]}
                              onChange={(e) => handleColorChange(key, e.target.value)}
                              placeholder={colors[key]}
                              className="font-mono uppercase"
                              maxLength={7}
                            />
                            <div 
                              className="w-10 h-10 rounded border cursor-pointer"
                              style={{ backgroundColor: validateHexColor(colors[key]) ? colors[key] : colors[key] }}
                              onClick={() => ref.current?.click()}
                            />
                            <input
                              ref={ref}
                              type="color"
                              className="hidden"
                              value={colors[key]}
                              onChange={(e) => handleColorChange(key, e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="flex justify-between items-center h-[85px]">
            <div className="text-sm">
              <span className="font-medium">Final Step</span>
              <p className="text-muted-foreground">Customize Your Colors</p>
            </div>
            <Button
              onClick={handleSubmit}
              size="lg"
              disabled={!libraryName.trim()}
            >
              Create Library
            </Button>
          </div>
        </div>
      </div>
    </>
  )
} 