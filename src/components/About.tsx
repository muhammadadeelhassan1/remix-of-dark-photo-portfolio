import { motion } from 'framer-motion'
import about1 from '@/assets/about-1.jpg'
import about2 from '@/assets/about-2.jpg'
import about3 from '@/assets/about-3.jpg'

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
          <span className="text-sm text-gray-500 tracking-widest uppercase">About Naeem</span>
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
              alt="Graphic design workspace"
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
            />
            <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
              LOGOS, BRANDING &amp; SOCIAL GRAPHICS
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="order-1 lg:order-2 flex items-center"
          >
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              I'm Naeem — a video editor and graphic designer who turns raw
              footage and blank canvases into stories people actually watch.
              Over the past six months I've edited a full library of kids'
              educational videos — rhymes, phonics and Urdu alphabet lessons —
              and designed the thumbnails, logos and social graphics that
              go with them.
            </p>
          </motion.div>
        </div>

        {/* Quote Block */}
        <motion.div
          {...fadeInUp}
          className="mb-24 lg:mb-32"
        >
          <h2 className="font-display text-[8vw] lg:text-section leading-none tracking-tight text-gray-300">
            "EVERY FRAME,<br />
            <span className="text-white underline underline-offset-8">EVERY CUT,</span><br />
            EVERY COLOR<br />
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
              At Beasyai I work as a digital marketing expert, which means my
              edits don't just look good — they perform. I design and cut
              content built for reach: hooks that hold attention, pacing that
              keeps it, and graphics that make people click.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <img
              src={about2}
              alt="Video editing timeline"
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
            />
            <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
              TIMELINE &amp; COLOR GRADING
            </p>
          </motion.div>
        </div>

        {/* Third Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
          <motion.div {...fadeInUp}>
            <img
              src={about3}
              alt="Naeem editing at night"
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
            />
            <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
              LATE NIGHTS, CLEAN CUTS
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="flex items-center"
          >
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              Whether it's a nursery rhyme, a phonics lesson, a YouTube intro
              or a full brand identity, my goal stays the same: keep the
              audience watching, and make the brand impossible to forget.
              Scroll down to watch a selection of my recent work.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
