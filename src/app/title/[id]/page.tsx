import { NavBar } from '@/components/netflix/NavBar';
import { ContentRow } from '@/components/netflix/ContentRow';
import { allContent, getContentByGenre } from '@/lib/mockData';
import { Play, Plus, ThumbsUp, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function TitleDetail({ params }: { params: { id: string } }) {
  const content = allContent.find(c => c.id === params.id);

  if (!content) {
    notFound();
  }

  // Get similar content (same genre)
  const similarContent = getContentByGenre(content.genre[0]).filter(c => c.id !== content.id).slice(0, 12);

  return (
    <div className="min-h-screen bg-[#141414]">
      <NavBar />

      {/* Hero Section with Backdrop */}
      <div className="relative h-[90vh]">
        {/* Backdrop Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
          <div className="absolute inset-0 opacity-40 bg-gradient-to-r from-gray-700 to-gray-900" />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent" />

        {/* Content Information */}
        <div className="relative z-10 h-full flex flex-col justify-end px-[4%] pb-24 max-w-3xl">
          {/* Title */}
          <h1 className="text-white text-7xl font-bold mb-6 drop-shadow-lg">
            {content.title}
          </h1>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <Link href={`/watch/${content.id}`}>
              <button className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded hover:bg-gray-200 transition-all duration-300 font-semibold text-xl">
                <Play size={28} fill="black" />
                Play
              </button>
            </Link>
            <button className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-gray-400 hover:border-white transition-colors bg-[#2F2F2F]/80 backdrop-blur-sm">
              <Plus size={28} className="text-white" />
            </button>
            <button className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-gray-400 hover:border-white transition-colors bg-[#2F2F2F]/80 backdrop-blur-sm">
              <ThumbsUp size={24} className="text-white" />
            </button>
            <button className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-gray-400 hover:border-white transition-colors bg-[#2F2F2F]/80 backdrop-blur-sm ml-auto">
              <Volume2 size={24} className="text-white" />
            </button>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-white text-lg mb-4">
            <span className="text-green-500 font-bold text-xl">
              {Math.round(content.rating * 10)}% Match
            </span>
            <span className="font-medium">{content.year}</span>
            <span className="border border-gray-400 px-2 py-1 text-sm">
              {content.maturityRating}
            </span>
            <span className="font-medium">
              {content.duration || `${content.seasons} Season${content.seasons !== 1 ? 's' : ''}`}
            </span>
            <span className="border border-gray-400 px-2 py-1 text-sm">HD</span>
          </div>

          {/* Genres */}
          <div className="flex gap-2 text-white">
            {content.genre.map((genre, idx) => (
              <span key={genre}>
                {idx > 0 && <span className="text-gray-400 mr-2">•</span>}
                <span className="font-medium">{genre}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="px-[4%] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-white text-2xl font-semibold mb-4">About {content.title}</h2>
              <p className="text-white text-lg leading-relaxed">{content.description}</p>
            </div>

            {/* Cast */}
            <div className="mb-8">
              <h3 className="text-white text-xl font-semibold mb-3">Cast</h3>
              <div className="flex flex-wrap gap-2">
                {content.cast.map((actor) => (
                  <span key={actor} className="text-gray-300 text-base">
                    {actor}
                  </span>
                )).reduce((acc, curr, idx) => {
                  if (idx === 0) return [curr];
                  return [...acc, <span key={`sep-${idx}`} className="text-gray-500">, </span>, curr];
                }, [] as React.ReactNode[])}
              </div>
            </div>

            {/* Director */}
            {content.director && (
              <div className="mb-8">
                <h3 className="text-white text-xl font-semibold mb-3">Director</h3>
                <p className="text-gray-300 text-base">{content.director}</p>
              </div>
            )}

            {/* Tags */}
            <div>
              <h3 className="text-white text-xl font-semibold mb-3">This {content.type} is</h3>
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#2F2F2F] text-white text-sm rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* More Details Card */}
            <div className="bg-[#2F2F2F] rounded p-6">
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-gray-400">Type: </span>
                  <span className="text-white capitalize">{content.type}</span>
                </div>
                <div>
                  <span className="text-gray-400">Rating: </span>
                  <span className="text-white">{content.rating}/10</span>
                </div>
                <div>
                  <span className="text-gray-400">Released: </span>
                  <span className="text-white">{content.year}</span>
                </div>
                {content.seasons && (
                  <div>
                    <span className="text-gray-400">Seasons: </span>
                    <span className="text-white">{content.seasons}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Content */}
      <div className="pb-20">
        <ContentRow title="More Like This" content={similarContent} />
      </div>
    </div>
  );
}
