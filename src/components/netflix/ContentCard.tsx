'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import type { Content } from '@/lib/mockData';

interface ContentCardProps {
  content: Content;
  showProgress?: boolean;
}

export function ContentCard({ content, showProgress = false }: ContentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/watch/${content.id}`}>
      <div
        className="group relative cursor-pointer transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video rounded overflow-hidden bg-[#2F2F2F]">
          {/* Actual Thumbnail Image */}
          <img
            src={content.thumbnailUrl}
            alt={content.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Fallback gradient (Netflix-style) - shown if image fails to load */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center -z-10">
            <div className="text-center text-white/50">
              <p className="text-sm font-semibold">{content.title}</p>
              <p className="text-xs mt-1">{content.genre.join(' • ')}</p>
            </div>
          </div>

          {/* NEW Badge */}
          {content.isNew && (
            <div className="absolute top-2 right-2 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded">
              NEW
            </div>
          )}

          {/* Progress Bar (Continue Watching) */}
          {showProgress && content.watchProgress !== undefined && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
              <div
                className="h-full bg-[#E50914]"
                style={{ width: `${content.watchProgress}%` }}
              />
            </div>
          )}

          {/* Hover Overlay with Scale Effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          >
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {/* Action Buttons */}
              <div className="flex items-center gap-2 mb-2">
                <button
                  className="w-8 h-8 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center transition-colors"
                  aria-label="Play"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle play action
                  }}
                >
                  <Play size={16} className="text-black ml-0.5" fill="black" />
                </button>
                <button
                  className="w-8 h-8 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center transition-colors"
                  aria-label="Add to My List"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle add to list
                  }}
                >
                  <Plus size={16} className="text-white" />
                </button>
                <button
                  className="w-8 h-8 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center transition-colors"
                  aria-label="Like"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle like
                  }}
                >
                  <ThumbsUp size={16} className="text-white" />
                </button>
                <button
                  className="w-8 h-8 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center ml-auto transition-colors"
                  aria-label="More Info"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle more info
                  }}
                >
                  <ChevronDown size={16} className="text-white" />
                </button>
              </div>

              {/* Content Info */}
              <div className="text-white">
                <h4 className="font-semibold text-sm mb-1 line-clamp-1">{content.title}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <span className="text-green-500 font-semibold">{Math.round(content.rating * 10)}% Match</span>
                  <span className="border border-gray-400 px-1">{content.maturityRating}</span>
                  <span>{content.duration || `${content.seasons} Season${content.seasons !== 1 ? 's' : ''}`}</span>
                </div>
                <div className="flex gap-1 mt-1 text-xs text-gray-400">
                  {content.genre.slice(0, 3).map((genre, idx) => (
                    <React.Fragment key={genre}>
                      {idx > 0 && <span>•</span>}
                      <span>{genre}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card transforms on hover */}
        <style jsx>{`
          .group:hover {
            transform: scale(1.05);
            z-index: 10;
          }
        `}</style>
      </div>
    </Link>
  );
}
