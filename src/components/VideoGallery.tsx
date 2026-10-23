import { useEffect, useState } from 'react'
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={close}
          >
            {/* Close */}
            <button
              onClick={close}
              aria-label="Close video"
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white text-sm tracking-widest uppercase hover:opacity-60 transition-opacity z-10"
            >
              Close ✕
            </button>

            {/* Prev / Next */}
            <button
              onClick={(e) => { e.stopPropagation(); step(-1) }}
              aria-label="Previous video"
              className="absolute left-2 md:left-8 text-white text-3xl hover:opacity-60 transition-opacity z-10 px-2"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); step(1) }}
              aria-label="Next video"
              className="absolute right-2 md:right-8 text-white text-3xl hover:opacity-60 transition-opacity z-10 px-2"
            >
              ›
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                key={videos[selected].src}
                src={videos[selected].src}
                poster={videos[selected].poster}
                controls
                autoPlay
                playsInline
                className="w-full aspect-video bg-black"
              />
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg lg:text-xl text-white font-light">
                    {videos[selected].title}
                  </h3>
                  <p className="text-xs text-gray-500 tracking-widest uppercase mt-1">
                    {videos[selected].category}
                  </p>
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {selected + 1} / {videos.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
