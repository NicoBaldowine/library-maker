import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'
import { writeFile } from 'fs/promises'
import sharp from 'sharp'
import Replicate from 'replicate'

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('image') as File
    const assetType = formData.get('assetType') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    if (!assetType) {
      return NextResponse.json(
        { error: 'Asset type is required' },
        { status: 400 }
      )
    }

    // Create a temporary file path
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Process image with sharp
    const processedImage = await sharp(buffer)
      .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toBuffer()

    // Save to temporary file
    const tempPath = join('/tmp', `upload-${Date.now()}.png`)
    await writeFile(tempPath, processedImage)

    // Create prompt based on asset type
    const prompt = generatePrompt(assetType)

    // Call Replicate API
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: prompt,
          image: tempPath,
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 50,
          style_preset: "icon",
        }
      }
    )

    // Return the generated image URL
    return NextResponse.json({ 
      success: true,
      imageUrl: output[0],
      assetType 
    })

  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}

function generatePrompt(assetType: string): string {
  const prompts: Record<string, string> = {
    'checkmark': 'A simple, clean checkmark icon in a minimalist style',
    'warning': 'A minimalist warning triangle icon with exclamation mark',
    'information': 'A clean information icon with letter i',
    'success': 'A simple success icon with checkmark',
    'error': 'A minimalist error or close icon with X mark',
    // Add more asset types as needed
  }

  return prompts[assetType.toLowerCase()] || 
    `A simple, minimalist ${assetType} icon in a clean style`
}

// Increase payload size limit for file uploads
export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
} 