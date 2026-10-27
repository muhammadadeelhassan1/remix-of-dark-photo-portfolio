import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'BS Computer Science',
    company: 'Degree Program',
    location: 'Academic',
    period: '2022 — 2026',
    description: 'Pursuing a Bachelor of Science in Computer Science, developing strong foundations in software engineering, computing systems, algorithms, and modern web technologies.',
    skills: ['Computer Science', 'Software Engineering', 'Algorithms', 'Web Systems', 'Databases'],
  },
  {
    title: 'Website Developer',
    company: 'Freelance',
    location: 'Remote',
    period: '2024 — Present',
    description: 'Building fast, responsive, and modern websites for clients and businesses. Focused on clean frontend architecture, intuitive user interfaces, and optimal performance across all devices.',
    skills: ['Website Development', 'React', 'TypeScript', 'Responsive Design', 'Frontend'],
  },
  {
    title: 'Digital Marketing & Social Media Specialist',
    company: 'Beasyai',
    location: 'Remote',
    period: '2026 — Present',
    description: 'Planning and executing paid ad campaigns on Meta and Google, managing business social media accounts, and shaping content strategies to drive engagement, generate leads, and maximize ROAS.',
    skills: ['Digital Marketing', 'Paid Ads', 'Meta Ads', 'Google Ads', 'Social Media Handling', 'Analytics'],
  },
  {
    title: 'Video Editor & Graphic Designer',
    company: 'Freelance',
    location: 'Remote',
    period: '2023 — Present',
    description: "Editing a full library of kids' educational animations and videos — nursery rhymes, phonics lessons, and Urdu alphabet series. Alongside the edits, I design the logos, thumbnails, and social graphics that carry each release.",
    skills: ['Video Editing', 'Educational Content', 'Color Grading', 'Sound Design', 'Thumbnails', 'Logo & Branding'],
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 1, ease: 'easeOut' }
}

export function Work() {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Career &amp; Education</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          WORK &amp;<br />EDUCATION
        </motion.h2>

        {/* Experiences */}
        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.title + exp.period}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
              className="border-t border-gray-800 py-8 md:py-12 lg:py-16 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                {/* Left Column - Title & Company */}
                <div className="lg:col-span-5">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-base lg:text-lg text-gray-400">
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {exp.location}
                  </p>
                </div>

                {/* Middle Column - Period */}
                <div className="lg:col-span-2">
                  <p className="text-sm text-gray-500 tracking-widest uppercase">
                    {exp.period}
                  </p>
                </div>

                {/* Right Column - Description & Skills */}
                <div className="lg:col-span-5">
                  <p className="text-gray-400 leading-relaxed mb-6 text-sm lg:text-base">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs text-gray-500 border border-gray-800 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
          <div className="border-t border-gray-800" />
        </div>
      </div>
    </section>
  )
}
