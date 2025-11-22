'use client';

import React from 'react';
import { Play, Info } from 'lucide-react';
import type { Content } from '@/lib/mockData';
import Link from 'next/link';

interface HeroBannerProps {
  content: Content;
}

export function HeroBanner({ content }: HeroBannerProps) {
  return (
    <div className="relative h-[80vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/generated/hero-shadow-protocol.png"
          alt={content.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-[4%] max-w-2xl">
        {/* Title */}
        <h1 className="text-white text-6xl font-bold mb-4 drop-shadow-lg">
          {content.title}
        </h1>

        {/* Metadata */}
        <div className="flex items-center gap-3 mb-4 text-white">
          <span className="text-green-500 font-semibold text-lg">
            {Math.round(content.rating * 10)}% Match
          </span>
          <span className="font-medium">{content.year}</span>
          <span className="border border-gray-400 px-2 py-0.5 text-sm">
            {content.maturityRating}
          </span>
          <span className="font-medium">
            {content.duration || `${content.seasons} Season${content.seasons !== 1 ? 's' : ''}`}
          </span>
        </div>

        {/* Description */}
        <p className="text-white text-lg leading-relaxed mb-6 line-clamp-3 drop-shadow-md">
          {content.description}
        </p>

        {/* Genres */}
        <div className="flex gap-2 mb-8 text-white text-sm">
          {content.genre.slice(0, 3).map((genre, idx) => (
            <React.Fragment key={genre}>
              {idx > 0 && <span className="text-gray-400">•</span>}
              <span className="font-medium">{genre}</span>
            </React.Fragment>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {/* Play Button */}
          <Link href={`/watch/${content.id}`}>
            <button className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 transition-all duration-300 font-semibold text-lg">
              <Play size={24} fill="black" />
              Play
            </button>
          </Link>

          {/* More Info Button */}
          <Link href={`/title/${content.id}`}>
            <button className="flex items-center gap-3 bg-gray-500/70 hover:bg-gray-500/50 text-white px-8 py-3 rounded transition-all duration-300 font-semibold text-lg backdrop-blur-sm">
              <Info size={24} />
              More Info
            </button>
          </Link>
        </div>
      </div>

      {/* Fade to Black at Top (for navbar overlay) */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 to-transparent" />
    </div>
  );
}
