import React from 'react'

type titleProps = {
    title: string;
}

export default function SectionHead({title}:titleProps) {
  return (
    <span className="text-4xl font-bold uppercase text-center mb-8">{title}</span>
  )
}
