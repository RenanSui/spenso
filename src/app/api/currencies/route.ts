import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch('https://api.fxratesapi.com/latest?base=BRL', {
    next: { revalidate: 60 * 60 * 24 }, // 1 day
  })

  const data = (await res.json()) as object

  return NextResponse.json({ ...data })
}
