'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings, Moon, Sun, LogOut, User, MessageSquare, Gift, FileText, Briefcase, HelpCircle, ChevronDown, Plus, MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Library = {
  id: string
  name: string
  assetCount: number
  dateCreated: string
  previewImage?: string
}

// Mock data - replace with real data later
const MOCK_LIBRARIES: Library[] = [
  {
    id: '1',
    name: 'My Icon Library',
    assetCount: 5,
    dateCreated: '2024-02-20'
  }
]

export default function Dashboard() {
  const [libraries] = useState<Library[]>(MOCK_LIBRARIES)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F1F1F1]">
      {/* Top Navigation */}
      <nav className="border-b bg-white">
        <div className="container max-w-7xl mx-auto h-16 flex items-center justify-between px-4">
          <span className="text-xl font-semibold">Iconify</span>
          
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 px-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="text-sm text-left">
                      <p className="font-medium">Nico Baldovino</p>
                      <p className="text-muted-foreground text-xs">Free plan</p>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 ml-1 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Give feedback</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Pricing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Blog</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Libraries Grid */}
      <main className="container max-w-7xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">My Libraries</h2>
          <Button size="lg" onClick={() => router.push('/onboarding')}>
            <Plus className="h-5 w-5 mr-2" />
            Create New Library
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {libraries.map((library) => (
            <Card 
              key={library.id} 
              className="overflow-hidden group transition-all hover:shadow-lg cursor-pointer"
              onClick={() => router.push(`/library/${library.id}`)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">No preview available</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-lg">{library.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {library.assetCount} assets
                      </p>
                    </div>
                    
                    <div onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onSelect={() => router.push(`/library/${library.id}`)}>
                            View library
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Download library
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
} 