import { NavBar } from '@/components/netflix/NavBar';
import { ContentCard } from '@/components/netflix/ContentCard';
import { allContent } from '@/lib/mockData';

export default function MyListPage() {
  // Mock user's saved list (first 12 items)
  const myList = allContent.slice(0, 12);

  return (
    <div className="min-h-screen bg-[#141414]">
      <NavBar />

      {/* Page Header */}
      <div className="pt-24 px-[4%] pb-8">
        <h1 className="text-white text-4xl font-bold mb-2">My List</h1>
        <p className="text-gray-400 text-lg">
          {myList.length} {myList.length === 1 ? 'title' : 'titles'}
        </p>
      </div>

      {/* Content Grid */}
      <div className="px-[4%] pb-20">
        {myList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {myList.map((item) => (
              <ContentCard key={item.id} content={item} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-20">
            <p className="text-xl mb-4">Your list is empty</p>
            <p className="text-base">
              Add movies and shows to your list to watch them later
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
