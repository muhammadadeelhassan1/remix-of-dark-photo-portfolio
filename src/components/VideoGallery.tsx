import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { videos, GalleryVideo } from '@/data/videos'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('All')

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>()
    videos.forEach((v) => set.add(v.category))
    return ['All', ...Array.from(set)]
  }, [])

  // Filtered list based on active category tab
  const filteredVideos = useMemo(() => {
    if (activeCategory === 'All') return videos
    return videos.filter((v) => v.category === activeCategory)
  }, [activeCategory])

  const currentIndex = useMemo(() => {
    if (!selectedVideo) return -1
    return filteredVideos.findIndex((v) => v.id === selectedVideo.id)
  }, [selectedVideo, filteredVideos])

  const close = () => {
    setSelectedVideo(null)
  }

  const step = (dir: 1 | -1) => {
    if (currentIndex === -1 || filteredVideos.length === 0) return
    const nextIdx = (currentIndex + dir + filteredVideos.length) % filteredVideos.length
    setSelectedVideo(filteredVideos[nextIdx])
  }

  useEffect(() => {
    if (!selectedVideo) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedVideo, currentIndex, filteredVideos])

  return (
    <section id="work" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Portfolio</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-6 lg:mb-8"
        >
          SELECTED<br />WORK
        </motion.h2>

        <motion.div
          {...fadeInUp}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
        >
          <p className="text-sm text-gray-500 tracking-widest uppercase">
            {videos.length} Featured Animations — Rhymes, Phonics &amp; Urdu Lessons
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-widest transition-all rounded-full border ${
                    isActive
                      ? 'bg-white text-black border-white'
                      : 'bg-black/40 text-gray-400 border-gray-800 hover:border-gray-600 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredVideos.map((video, index) => (
              <motion.button
                key={video.id}
                layout
                onClick={() => setSelectedVideo(video)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                className="group text-left focus:outline-none block w-full"
              >
                <div className="relative overflow-hidden border border-gray-800 group-hover:border-gray-500 transition-colors bg-neutral-900 rounded-sm">
                  <img
                    src={video.poster}
                    alt={video.title}
                    loading="lazy"
                    className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Play overlay button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/80 flex items-center justify-center text-white text-xl pl-1 shadow-lg transform group-hover:scale-110 transition-transform">
                      ▶
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base lg:text-lg text-white font-light group-hover:text-gray-300 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-gray-500 tracking-widest uppercase mt-1">
                      {video.category}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 select-none"
          onClick={close}
          style={{ isolation: 'isolate' }}
        >
          {/* Close button */}
          <button
            onClick={close}
            aria-label="Close video"
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white text-sm tracking-widest uppercase hover:opacity-60 transition-opacity z-20 px-3 py-1.5 rounded-full border border-gray-800 bg-black/50"
          >
            Close ✕
          </button>

          {/* Prev / Next buttons */}
          {filteredVideos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  step(-1)
                }}
                aria-label="Previous video"
                className="absolute left-2 md:left-6 text-white text-4xl hover:opacity-60 transition-opacity z-20 p-3 rounded-full hover:bg-white/5"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  step(1)
                }}
                aria-label="Next video"
                className="absolute right-2 md:right-6 text-white text-4xl hover:opacity-60 transition-opacity z-20 p-3 rounded-full hover:bg-white/5"
              >
                ›
              </button>
            </>
          )}

          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
            style={{ transform: 'translateZ(0)' }}
          >
            {/* YouTube Responsive Embed Container */}
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
              <iframe
                key={selectedVideo.youtubeId}
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&cc_load_policy=0&iv_load_policy=3`}
                title={selectedVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Video Metadata & Controls */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1">
              <div>
                <h3 className="text-lg lg:text-xl text-white font-light">
                  {selectedVideo.title}
                </h3>
                <p className="text-xs text-gray-500 tracking-widest uppercase mt-1">
                  {selectedVideo.category}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={`https://youtu.be/${selectedVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-white transition-colors underline underline-offset-4 tracking-wider uppercase"
                >
                  Watch on YouTube ↗
                </a>

                {currentIndex !== -1 && (
                  <span className="text-xs text-gray-500 tracking-wider">
                    {currentIndex + 1} / {filteredVideos.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
