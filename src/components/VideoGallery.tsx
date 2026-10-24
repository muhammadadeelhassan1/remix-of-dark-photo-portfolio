import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { videos } from '@/data/videos'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function VideoGallery() {
  const [selected, setSelected] = useState<number | null>(null)

  const close = () => setSelected(null)
  const step = (dir: 1 | -1) =>
    setSelected((current) =>
      current === null ? null : (current + dir + videos.length) % videos.length
    )

  useEffect(() => {
    if (selected === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

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

        <motion.p
          {...fadeInUp}
          className="text-sm text-gray-500 tracking-widest uppercase mb-16 lg:mb-24"
        >
          {videos.length} videos — rhymes, phonics &amp; urdu alphabet lessons
        </motion.p>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {videos.map((video, index) => (
            <motion.button
              key={video.src}
              onClick={() => setSelected(index)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              className="group text-left focus:outline-none"
            >
              <div className="relative overflow-hidden border border-gray-800 group-hover:border-gray-600 transition-colors">
                <img
                  src={video.poster}
                  alt={video.title}
                  loading="lazy"
                  className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-14 h-14 rounded-full border border-white flex items-center justify-center text-white text-xl pl-1">
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
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <VideoModal
            video={videos[selected]}
            index={selected}
            total={videos.length}
            onClose={close}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

interface VideoModalProps {
  video: (typeof videos)[0]
  index: number
  total: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function VideoModal({ video, index, total, onClose, onPrev, onNext }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)

  // Auto-play attempt when modal opens
  useEffect(() => {
    const el = videoRef.current
    if (el) {
      el.play().catch(() => {
        // Autoplay blocked by browser policy; user can click the center play button
        setIsPlaying(false)
      })
    }
  }, [video.src])

  const togglePlay = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      el.play().catch((err) => {
        console.warn('Play error:', err)
      })
    } else {
      el.pause()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 select-none"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close video"
        className="absolute top-4 right-4 md:top-8 md:right-8 text-white text-sm tracking-widest uppercase hover:text-cyan-400 transition-colors z-20 flex items-center gap-2 bg-black/70 px-4 py-2 rounded-full border border-white/20"
      >
        <span>Close</span>
        <span className="text-base">✕</span>
      </button>

      {/* Prev / Next Navigation */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Previous video"
        className="absolute left-2 md:left-6 text-white text-3xl hover:text-cyan-400 transition-colors z-20 p-3 bg-black/60 hover:bg-black/90 rounded-full border border-white/20"
      >
        ‹
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Next video"
        className="absolute right-2 md:right-6 text-white text-3xl hover:text-cyan-400 transition-colors z-20 p-3 bg-black/60 hover:bg-black/90 rounded-full border border-white/20"
      >
        ›
      </button>

      {/* Main Video Container */}
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-gray-800 shadow-2xl">
          <video
            ref={videoRef}
            key={video.src}
            src={video.src}
            poster={video.poster}
            controls
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPlaying={() => { setIsPlaying(true); setIsBuffering(false) }}
            onPause={() => setIsPlaying(false)}
            onWaiting={() => setIsBuffering(true)}
            onCanPlay={() => setIsBuffering(false)}
            className="w-full h-full object-contain bg-black"
          />

          {/* Large Clickable Play Overlay when Paused */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              aria-label="Play video"
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-all group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full bg-cyan-400 text-black flex items-center justify-center text-3xl pl-1 shadow-2xl shadow-cyan-400/50 group-hover:scale-110 group-hover:bg-cyan-300 transition-transform">
                ▶
              </div>
            </button>
          )}

          {/* Discreet Buffering indicator only when playing */}
          {isPlaying && isBuffering && (
            <div className="absolute top-4 right-4 bg-black/80 text-cyan-400 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 border border-cyan-400/30 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Buffering...</span>
            </div>
          )}
        </div>

        {/* Video Info Footer */}
        <div className="mt-4 flex items-start justify-between gap-4 px-1">
          <div>
            <h3 className="text-lg lg:text-xl text-white font-light">
              {video.title}
            </h3>
            <p className="text-xs text-cyan-400 tracking-widest uppercase mt-1">
              {video.category}
            </p>
          </div>
          <span className="text-sm text-gray-500 font-mono whitespace-nowrap">
            {index + 1} / {total}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
