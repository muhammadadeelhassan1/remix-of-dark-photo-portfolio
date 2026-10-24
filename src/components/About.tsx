import { motion } from 'framer-motion'
import about1 from '@/assets/about-1.png'
import about2 from '@/assets/about-2.jpg'
import about3 from '@/assets/about-3.png'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">About Muhammad Naeem</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        {/* First Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
          <motion.div
            {...fadeInUp}
            className="order-2 lg:order-1"
          >
            <img
              src={about1}
              alt="Muhammad Naeem — Website development and creative design"
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
            />
            <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
              WEBSITES, BRANDING &amp; CREATIVE ASSETS
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="order-1 lg:order-2 flex items-center"
          >
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              I'm Muhammad Naeem — currently pursuing my BS in Computer Science (2022–2026).
              I work across website development, digital marketing, and video editing.
              I craft clean, fast, and responsive websites for businesses, while producing
              compelling visual media and branded graphics that keep viewers engaged.
            </p>
          </motion.div>
        </div>

        {/* Quote Block */}
        <motion.div
          {...fadeInUp}
          className="mb-24 lg:mb-32"
        >
          <h2 className="font-display text-[8vw] lg:text-section leading-[0.95] md:leading-none tracking-tight text-gray-300">
            "EVERY LINE OF CODE,<br />
            <span className="text-white underline underline-offset-2 sm:underline-offset-4 md:underline-offset-8">EVERY CAMPAIGN,</span><br />
            EVERY CUT<br />
            EARNS ITS PLACE."
          </h2>
          <p className="mt-6 text-sm text-gray-500 tracking-widest uppercase">
            HOW I APPROACH<br />
            EVERY PROJECT
          </p>
        </motion.div>

        {/* Second Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
          <motion.div
            {...fadeInUp}
            className="flex items-center lg:text-right"
          >
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              In digital marketing, I manage business social media accounts and set up targeted,
              high-performing ad campaigns across Meta and Google. My focus is on tangible growth:
              crafting ad creatives that stop the scroll, targeting the right demographics, and optimizing
              conversions to maximize return on ad spend.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <img
              src={about2}
              alt="Digital marketing ads and video timeline"
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
            />
            <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
              PAID ADS, SOCIAL STRATEGY &amp; PERFORMANCE
            </p>
          </motion.div>
        </div>

        {/* Third Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
          <motion.div {...fadeInUp}>
            <img
              src={about3}
              alt="Muhammad Naeem editing video projects"
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
            />
            <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
              29+ EDUCATIONAL EPISODES &amp; BRAND CONTENT
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="flex items-center"
          >
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              I've edited a comprehensive library of 29+ kids' educational videos — nursery rhymes,
              phonics lessons, and Urdu alphabet series — and designed the thumbnails, logos, and channel
              branding that go with each release. Scroll down to watch a selection of my recent video work.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
