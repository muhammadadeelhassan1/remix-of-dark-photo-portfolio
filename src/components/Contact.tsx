import { motion } from 'framer-motion'

const contacts = [
  { label: 'EMAIL', type: 'email', link: 'mailto:naeembscs786@gmail.com' },
  { label: 'PHONE', type: 'phone', link: 'tel:03260983142' },
  { label: 'WHATSAPP', type: 'phone', link: 'https://wa.me/923260983142' },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Contact</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        {/* Giant Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-display text-[12vw] lg:text-hero leading-none tracking-tight mb-8"
        >
          Get in touch
        </motion.h2>

        <motion.div
          {...fadeInUp}
          className="w-full h-px bg-gray-700 mb-12 lg:mb-16"
        />

        {/* Informal Text */}
        <motion.div
          {...fadeInUp}
          className="mb-12 lg:mb-16 max-w-2xl"
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl text-white font-light leading-[1.4] md:leading-snug lg:leading-tight mb-4">
            HAVE A WEBSITE,<br />
            AD CAMPAIGN, OR<br />
            VIDEO TO BUILD?
          </h3>
          <p className="text-sm text-gray-500 tracking-widest uppercase">
            I REPLY FASTER THAN MY TURNAROUND — USUALLY WITHIN A DAY
          </p>
        </motion.div>

        {/* Contact Links */}
        <div className="space-y-0 max-w-2xl">
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.link}
              target={contact.link.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between border-t border-gray-800 py-5 md:py-6 group hover:bg-gray-900/30 transition-colors px-4 -mx-4"
            >
              <span className="text-sm text-gray-400 tracking-widest">
                {contact.label}
              </span>
              <span className="text-gray-500 group-hover:text-white transition-colors">
                ↗
              </span>
            </motion.a>
          ))}
          <div className="border-t border-gray-800" />
        </div>

        {/* Direct Contact */}
        <motion.div
          {...fadeInUp}
          className="mt-16 lg:mt-24 pt-12 lg:pt-16 border-t border-gray-800"
        >
          <p className="text-sm text-gray-500 mb-6 lg:mb-8 tracking-widest uppercase">
            Or reach me directly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-16">
            <a
              href="mailto:naeembscs786@gmail.com"
              className="text-lg lg:text-xl text-gray-300 hover:text-white transition-colors underline underline-offset-4 break-all"
            >
              naeembscs786@gmail.com
            </a>
            <a
              href="tel:03260983142"
              className="text-lg lg:text-xl text-gray-300 hover:text-white transition-colors underline underline-offset-4"
            >
              0326 0983142
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          {...fadeInUp}
          className="mt-24 lg:mt-32 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Muhammad Naeem. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Website Developer &amp; Digital Marketer &amp; Video Editor
          </p>
        </motion.footer>
      </div>
    </section>
  )
}
