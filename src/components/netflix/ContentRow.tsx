'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ContentCard } from './ContentCard';
import type { Content } from '@/lib/mockData';

interface ContentRowProps {
  title: string;
  content: Content[];
  showProgress?: boolean;
}

export function ContentRow({ title, content, showProgress = false }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!content || content.length === 0) return null;

  return (
    <div className="relative mb-12 group/row">
      {/* Section Title */}
      <h2 className="text-white text-2xl font-semibold mb-4 px-[4%]">{title}</h2>

      {/* Scrollable Content Container */}
      <div className="relative px-[4%]">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-20 w-[4%] bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          aria-label="Scroll left"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-20 w-[4%] bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          aria-label="Scroll right"
        >
          <ChevronRight size={32} />
        </button>

        {/* Content Grid */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar scroll-smooth"
        >
          {content.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-[280px]">
              <ContentCard content={item} showProgress={showProgress} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
