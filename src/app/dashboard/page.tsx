import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1 className="mb-4 text-7xl">Dashboard</h1>
      <Link className="rounded bg-zinc-50 px-8 py-4 text-black" href="/">
        Back to Homepage
      </Link>
    </div>
  )
}
