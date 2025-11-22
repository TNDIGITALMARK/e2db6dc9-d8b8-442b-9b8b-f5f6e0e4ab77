'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Bell, ChevronDown, User } from 'lucide-react';

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
      style={{ height: 'var(--nav-height)' }}
    >
      <div className="flex items-center justify-between h-full px-[4%]">
        {/* Left Section: Logo + Navigation */}
        <div className="flex items-center gap-8">
          {/* Netflix Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-[#E50914] text-3xl font-bold tracking-tight">
              STREAMFLIX
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/"
              className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/browse/tv-shows"
              className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
            >
              TV Shows
            </Link>
            <Link
              href="/browse/movies"
              className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
            >
              Movies
            </Link>
            <Link
              href="/browse/new"
              className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
            >
              New & Popular
            </Link>
            <Link
              href="/my-list"
              className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
            >
              My List
            </Link>
          </div>
        </div>

        {/* Right Section: Search + Notifications + Profile */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Notifications */}
          <button
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded bg-[#E50914] flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
            <ChevronDown
              size={16}
              className="text-white group-hover:rotate-180 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Search Bar Overlay */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 p-4">
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search titles, people, genres..."
              className="w-full px-4 py-3 bg-[#2F2F2F] text-white border border-gray-700 rounded focus:outline-none focus:border-[#E50914] transition-colors"
              autoFocus
            />
          </div>
        </div>
      )}
    </nav>
  );
}
