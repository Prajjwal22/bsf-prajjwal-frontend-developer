import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className="h-20 w-full shadow-md p-2">
        <div className="flex justify-between max-w-screen-xl items-center h-full m-auto">
            <Image src="/logo.webp" alt="spaxe x logo" width={200} height={100}/>
            <nav className="flex gap-8">
                <Link href="#">Home</Link>
                <Link href="#">Rockets</Link>
                <Link href="#">Capsules</Link>
            </nav>
        </div>
    </header>
  )
}
