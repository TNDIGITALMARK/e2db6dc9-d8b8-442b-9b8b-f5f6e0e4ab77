'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  SkipBack,
  SkipForward,
  ArrowLeft,
  Subtitles,
} from 'lucide-react';
import { allContent } from '@/lib/mockData';

export default function WatchPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(allContent.find(c => c.id === params.id));

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('Auto');
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);

  let controlsTimeout: NodeJS.Timeout;

  useEffect(() => {
    // Simulate video duration (in seconds)
    setDuration(7200); // 2 hours

    // Auto-play simulation
    const playTimeout = setTimeout(() => {
      setIsPlaying(true);
      startTimeSimulation();
    }, 1000);

    return () => clearTimeout(playTimeout);
  }, []);

  const startTimeSimulation = () => {
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          clearInterval(interval);
          return duration;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseInt(e.target.value));
  };

  const skipTime = (seconds: number) => {
    setCurrentTime((prev) => Math.min(Math.max(0, prev + seconds), duration));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  if (!content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <p>Content not found</p>
      </div>
    );
  }

  return (
    <div
      ref={videoContainerRef}
      className="relative h-screen w-screen bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Player Area (Simulated) */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white/30">
          <div className="text-8xl mb-4">▶</div>
          <p className="text-2xl font-semibold">{content.title}</p>
          <p className="text-lg mt-2">Simulated Video Playback</p>
        </div>
      </div>

      {/* Top Gradient Overlay */}
      <div
        className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 text-white hover:text-gray-300 transition-colors"
        >
          <ArrowLeft size={32} />
        </button>
      </div>

      {/* Center Play/Pause Button (when paused) */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-24 h-24 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors">
            <Play size={48} className="text-white ml-2" fill="white" />
          </div>
        </button>
      )}

      {/* Bottom Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="px-8 pb-8 pt-16">
          {/* Timeline Slider */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleTimelineChange}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #E50914 0%, #E50914 ${progress}%, #4A4A4A ${progress}%, #4A4A4A 100%)`,
              }}
            />
            <div className="flex justify-between text-white text-sm mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center gap-4">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </button>

              {/* Skip Backward */}
              <button
                onClick={() => skipTime(-10)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <SkipBack size={28} />
              </button>

              {/* Skip Forward */}
              <button
                onClick={() => skipTime(10)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <SkipForward size={28} />
              </button>

              {/* Volume Control */}
              <div className="flex items-center gap-2 group">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX size={28} />
                  ) : (
                    <Volume2 size={28} />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-0 group-hover:w-24 transition-all duration-300 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FFFFFF 0%, #FFFFFF ${volume}%, #4A4A4A ${volume}%, #4A4A4A 100%)`,
                  }}
                />
              </div>

              {/* Title */}
              <div className="ml-4">
                <p className="text-white font-semibold text-lg">{content.title}</p>
                <p className="text-gray-400 text-sm">{content.type === 'series' ? 'S1:E1 - "Pilot"' : content.genre[0]}</p>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              {/* Subtitles */}
              <button
                onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                className={`transition-colors ${
                  subtitlesEnabled ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Subtitles size={28} />
              </button>

              {/* Settings */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Settings size={28} />
                </button>

                {/* Settings Dropdown */}
                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-4 bg-black/95 border border-gray-700 rounded p-4 min-w-[200px]">
                    <div className="text-white">
                      <p className="font-semibold mb-3">Quality</p>
                      {['Auto', '1080p', '720p', '480p'].map((quality) => (
                        <button
                          key={quality}
                          onClick={() => {
                            setSelectedQuality(quality);
                            setShowSettings(false);
                          }}
                          className={`block w-full text-left py-2 px-3 rounded hover:bg-gray-800 ${
                            selectedQuality === quality ? 'text-[#E50914]' : 'text-white'
                          }`}
                        >
                          {quality} {selectedQuality === quality && '✓'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Maximize size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtitles Display Area */}
      {subtitlesEnabled && isPlaying && (
        <div className="absolute bottom-32 left-0 right-0 flex justify-center">
          <div className="bg-black/80 px-4 py-2 rounded text-white text-xl">
            [Simulated subtitle text appears here]
          </div>
        </div>
      )}
    </div>
  );
}
