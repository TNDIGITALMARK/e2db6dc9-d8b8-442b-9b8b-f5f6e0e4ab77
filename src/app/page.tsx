import { NavBar } from '@/components/netflix/NavBar';
import { HeroBanner } from '@/components/netflix/HeroBanner';
import { ContentRow } from '@/components/netflix/ContentRow';
import {
  allContent,
  getTrendingContent,
  getNewReleases,
  getTopRated,
  getContinueWatching,
  getContentByGenre,
} from '@/lib/mockData';

export default function Home() {
  // Featured content for hero banner
  const featuredContent = allContent.find(c => c.id === 'action-001') || allContent[0];

  // Get content for different rows
  const trendingContent = getTrendingContent();
  const newReleases = getNewReleases();
  const topRated = getTopRated();
  const continueWatching = getContinueWatching('user-001'); // Mock user
  const actionContent = getContentByGenre('Action');
  const dramaContent = getContentByGenre('Drama');
  const comedyContent = getContentByGenre('Comedy');
  const documentaries = getContentByGenre('Documentary');

  return (
    <div className="min-h-screen bg-[#141414]">
      {/* Navigation */}
      <NavBar />

      {/* Hero Banner */}
      <HeroBanner content={featuredContent} />

      {/* Visual Separator - Creates distinct break between hero and content */}
      <div className="relative h-40 section-separator">
        <div className="absolute inset-0 bg-[url('/generated/hero-shadow-protocol.png')] bg-cover bg-center opacity-5 blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#141414] via-[#0a0a0a] to-[#141414]" />

        {/* Decorative line separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800/50 to-transparent" />
      </div>

      {/* Content Rows */}
      <div className="relative z-10 pb-20 space-y-16">
        {continueWatching.length > 0 && (
          <ContentRow
            title="Continue Watching"
            content={continueWatching}
            showProgress={true}
          />
        )}

        <ContentRow title="Trending Now" content={trendingContent} />

        <ContentRow title="New Releases" content={newReleases} />

        <ContentRow title="Top Rated" content={topRated} />

        <ContentRow
          title="Action & Adventure"
          content={actionContent}
          backgroundImage="/generated/row-bg-action.png"
        />

        <ContentRow
          title="Award-Winning Dramas"
          content={dramaContent}
          backgroundImage="/generated/row-bg-drama.png"
        />

        <ContentRow
          title="Comedy Specials"
          content={comedyContent}
          backgroundImage="/generated/row-bg-comedy.png"
        />

        <ContentRow
          title="Documentaries"
          content={documentaries}
          backgroundImage="/generated/row-bg-documentaries.png"
        />
      </div>
    </div>
  );
}
