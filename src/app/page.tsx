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

      {/* Content Rows */}
      <div className="relative z-10 -mt-32 pb-20">
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

        <ContentRow title="Action & Adventure" content={actionContent} />

        <ContentRow title="Award-Winning Dramas" content={dramaContent} />

        <ContentRow title="Comedy Specials" content={comedyContent} />

        <ContentRow title="Documentaries" content={documentaries} />
      </div>
    </div>
  );
}
