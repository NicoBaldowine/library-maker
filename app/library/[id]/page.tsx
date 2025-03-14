'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Download } from 'lucide-react'

type Asset = {
  id: string
  name: string
  preview: string
}

type LibraryData = {
  id: string
  name: string
  assets: Asset[]
}

export default function LibraryDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  
  const [library] = useState<LibraryData>({
    id,
    name: 'My Icon Library',
    assets: [
      { id: '1', name: 'Checkmark', preview: '' },
      { id: '2', name: 'Warning', preview: '' },
      { id: '3', name: 'Information', preview: '' },
      { id: '4', name: 'Success', preview: '' },
      { id: '5', name: 'Error', preview: '' },
    ]
  })

  const handleDownloadLibrary = () => {
    // Add library download logic here
    console.log('Downloading entire library')
  }

  const handleDownloadAsset = (assetId: string) => {
    // Add individual asset download logic here
    console.log('Downloading asset:', assetId)
  }

  return (
    <div className="min-h-screen bg-[#F1F1F1]">
      <nav className="border-b bg-white">
        <div className="container max-w-7xl mx-auto h-16 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">{library.name}</h1>
          </div>

          <Button onClick={handleDownloadLibrary}>
            <Download className="h-4 w-4 mr-2" />
            Download Library
          </Button>
        </div>
      </nav>

      <main className="container max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {library.assets.map((asset) => (
            <Card key={asset.id}>
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <p className="text-gray-400 text-sm">Icon preview</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm truncate">{asset.name}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDownloadAsset(asset.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
} 