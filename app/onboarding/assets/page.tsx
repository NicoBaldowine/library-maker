'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type Asset = {
  id: string
  name: string
  description: string
  selected?: boolean
}

const ASSETS: Asset[] = [
  {
    id: 'checkmark',
    name: 'Checkmark',
    description: 'Indicates A Completed Action Or Positive Result.'
  },
  {
    id: 'warning',
    name: 'Warning Triangle',
    description: 'Signals Caution Or A Potential Issue.'
  },
  {
    id: 'cross',
    name: 'Cross',
    description: 'Indicates A Completed Action Or Positive Result.'
  },
  {
    id: 'info',
    name: 'Information Circle',
    description: 'Indicates A Completed Action Or Positive Result.'
  },
  {
    id: 'locked',
    name: 'Locked Padlock',
    description: 'Indicates A Completed Action Or Positive Result.'
  },
  {
    id: 'unlocked',
    name: 'Unlocked Padlock',
    description: 'Indicates A Completed Action Or Positive Result.'
  },
  {
    id: 'hourglass',
    name: 'Hourglass',
    description: 'Indicates A Completed Action Or Positive Result.'
  },
  {
    id: 'stop',
    name: 'Stop Sign',
    description: 'Indicates A Completed Action Or Positive Result.'
  }
]

export default function AssetsSelection() {
  const router = useRouter()
  const [assets, setAssets] = useState<Asset[]>(ASSETS)
  const selectedCount = assets.filter(asset => asset.selected).length

  const toggleAsset = (assetId: string) => {
    setAssets(assets.map(asset => 
      asset.id === assetId 
        ? { ...asset, selected: !asset.selected }
        : asset
    ))
  }

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
                <p className="text-sm text-muted-foreground mb-1">Step 2</p>
                <h1 className="text-3xl font-bold">Select Your Assets</h1>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">UI System Icons</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {assets.map((asset) => (
                      <div
                        key={asset.id}
                        className={cn(
                          "p-4 border rounded-lg cursor-pointer transition-all",
                          "hover:border-primary/50",
                          asset.selected && "border-primary ring-2 ring-primary/10"
                        )}
                        onClick={() => toggleAsset(asset.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Check className={cn(
                            "h-5 w-5",
                            asset.selected ? "text-primary" : "text-muted-foreground/40"
                          )} />
                        </div>
                        <div>
                          <h3 className="font-medium">{asset.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {asset.description}
                          </p>
                        </div>
                      </div>
                    ))}
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
              <span className="font-medium">{selectedCount}/5 Assets Selected</span>
              <p className="text-muted-foreground">Free Plan</p>
            </div>
            <Button
              onClick={() => router.push('/onboarding/customize')}
              size="lg"
              disabled={selectedCount === 0}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </>
  )
} 