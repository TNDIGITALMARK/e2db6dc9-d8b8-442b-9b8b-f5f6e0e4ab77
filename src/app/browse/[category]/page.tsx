import { NavBar } from '@/components/netflix/NavBar';
import { ContentCard } from '@/components/netflix/ContentCard';
import { allContent, getContentByGenre, getTrendingContent, getNewReleases } from '@/lib/mockData';

export default function BrowsePage({ params }: { params: { category: string } }) {
  // Determine content based on category
  let pageTitle = '';
  let content = allContent;

  switch (params.category) {
    case 'movies':
      pageTitle = 'Movies';
      content = allContent.filter(c => c.type === 'movie');
      break;
    case 'tv-shows':
      pageTitle = 'TV Shows';
      content = allContent.filter(c => c.type === 'series');
      break;
    case 'new':
      pageTitle = 'New & Popular';
      content = getNewReleases();
      break;
    case 'trending':
      pageTitle = 'Trending Now';
      content = getTrendingContent();
      break;
    default:
      // Try to find by genre
      const genre = params.category.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      pageTitle = genre;
      content = getContentByGenre(genre);
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      <NavBar />

      {/* Page Header */}
      <div className="pt-24 px-[4%] pb-8">
        <h1 className="text-white text-4xl font-bold">{pageTitle}</h1>
      </div>

      {/* Content Grid */}
      <div className="px-[4%] pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {content.map((item) => (
            <ContentCard key={item.id} content={item} />
          ))}
        </div>

        {content.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            <p className="text-xl">No content found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
