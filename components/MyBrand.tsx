import Link from 'next/link'
import React from 'react'

type Props = {}

export default function MyBrand({}: Props) {
  return <Link href="/" className="text-green-500 font-bold text-3xl">AyShop</Link>
}