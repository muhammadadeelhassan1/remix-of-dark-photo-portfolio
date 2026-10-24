import { motion } from 'framer-motion'
import heroImage from '@/assets/hero.png'

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image - Responsive */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroImage}
          alt="Muhammad Naeem"
          className="w-full h-full object-cover object-[90%_center] md:object-center"
        />
        {/* Left side black shadow on mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent md:hidden" />
        {/* Bottom gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end md:items-center pb-32 md:pb-0 px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="w-full max-w-5xl">
          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="font-display leading-none tracking-tighter text-[15vw] sm:text-[12vw] md:text-hero">
              <span className="block text-white">MUHAMMAD</span>
              <span className="block text-white">NAEEM</span>
            </h1>
            <p className="font-display text-white/90 text-2xl sm:text-3xl md:text-4xl mt-2 tracking-wide">
              WEBSITE DEVELOPER <span className="text-gray-400">&amp;</span> DIGITAL MARKETER <span className="text-gray-400">&amp;</span> VIDEO EDITOR
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 md:mt-8 text-sm sm:text-base text-white/80 max-w-sm md:max-w-md leading-relaxed"
            >
              I build modern websites, scale businesses through high-performing ad campaigns and social media management, and craft engaging educational videos.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
