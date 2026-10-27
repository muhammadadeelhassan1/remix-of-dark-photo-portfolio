import t01 from '../assets/thumbnails/v01.jpg'
import t02 from '../assets/thumbnails/v02.jpg'
import t03 from '../assets/thumbnails/v03.jpg'
import t04 from '../assets/thumbnails/v04.jpg'
import t05 from '../assets/thumbnails/v05.jpg'
import t06 from '../assets/thumbnails/v06.jpg'
import t07 from '../assets/thumbnails/v07.jpg'
import t08 from '../assets/thumbnails/v08.jpg'
import t09 from '../assets/thumbnails/v09.jpg'
import t10 from '../assets/thumbnails/v10.jpg'

export interface GalleryVideo {
  id: string
  youtubeId: string
  title: string
  category: string
  poster: string
}

export const videos: GalleryVideo[] = [
  {
    id: 'xd0revgyYrc',
    youtubeId: 'xd0revgyYrc',
    title: 'Urdu Alphabet — ض (Daad)',
    category: 'Urdu Alphabet',
    poster: t01,
  },
  {
    id: 'fnBLK9y_4AA',
    youtubeId: 'fnBLK9y_4AA',
    title: "Kids' Animation — Enchanted Garden",
    category: "Kids' Animation",
    poster: t02,
  },
  {
    id: 'BNBpTBWCx-M',
    youtubeId: 'BNBpTBWCx-M',
    title: 'What Can You Do — Rhyme',
    category: "Kids' Rhyme",
    poster: t03,
  },
  {
    id: 'T6V5_6lSyGA',
    youtubeId: 'T6V5_6lSyGA',
    title: "Let's Learn Number 4! — Counting Rhyme",
    category: 'Counting & Math',
    poster: t04,
  },
  {
    id: 'nsc8bLFOi6k',
    youtubeId: 'nsc8bLFOi6k',
    title: "Let's Learn Number 10! — Counting Rhyme",
    category: 'Counting & Math',
    poster: t05,
  },
  {
    id: 'XKK1q987VTs',
    youtubeId: 'XKK1q987VTs',
    title: "Salam Salam — Islamic Kids' Greeting Song",
    category: "Kids' Rhyme",
    poster: t06,
  },
  {
    id: 'uUClwtg0m2o',
    youtubeId: 'uUClwtg0m2o',
    title: "Tamatar — Kids' Urdu Rhyme",
    category: 'Urdu Rhyme',
    poster: t07,
  },
  {
    id: 'kti5LiYcJcU',
    youtubeId: 'kti5LiYcJcU',
    title: 'Alphabet Lesson — Letter D Phonics',
    category: 'Phonics & Alphabet',
    poster: t08,
  },
  {
    id: 'DTIaKTnG5Xk',
    youtubeId: 'DTIaKTnG5Xk',
    title: 'Phonics Lesson — Letter P Phonics',
    category: 'Phonics & Alphabet',
    poster: t09,
  },
  {
    id: 'inm8cXqLziU',
    youtubeId: 'inm8cXqLziU',
    title: 'Urdu Alphabet — ت (Tay) Phonics Lesson',
    category: 'Urdu Alphabet',
    poster: t10,
  },
]
