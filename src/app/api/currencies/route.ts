import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const format = searchParams.get('base')?.toUpperCase() ?? 'BRL'
  console.log(format)
  const res = await fetch(`https://api.fxratesapi.com/latest?base=${format}`, {
    next: { revalidate: 60 * 60 * 24 }, // 1 day
  })

  const data = (await res.json()) as object

  return NextResponse.json({ ...data })
}
