import type { FlowerProduct } from '@domain/models/FlowerProduct'

export const FLOWER_PRODUCTS: FlowerProduct[] = [
  {
    id: 'fl-01',
    name: 'Eternal Rose Blossom',
    category: 'buket',
    price: 385000,
    originalPrice: 450000,
    rating: 4.9,
    reviewsCount: 128,
    image:
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    tags: ['Best Seller', 'Mawar Merah'],
    isBestSeller: true,
    description:
      'Rangkaian 12 tangkai mawar merah Ecuadorian pilihan dengan aksen baby breath impor.',
    flowersIncluded: ['Mawar Merah', 'Baby Breath', 'Eucalyptus Parvifolia'],
  },
  {
    id: 'fl-02',
    name: 'Pastel Dream Peony',
    category: 'buket',
    price: 495000,
    originalPrice: 550000,
    rating: 5.0,
    reviewsCount: 84,
    image:
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
    tags: ['Favorit', 'Peony'],
    isBestSeller: true,
    description:
      'Kombinasi peony merah muda lembut dan ranunculus bernuansa pastel hangat yang memikat.',
    flowersIncluded: ['Peony Pink', 'White Ranunculus', 'Hydrangea Lilac'],
  },
  {
    id: 'fl-03',
    name: 'Sunlight Radiance Table',
    category: 'meja',
    price: 320000,
    rating: 4.8,
    reviewsCount: 47,
    image:
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80',
    tags: ['Dekorasi', 'Bunga Matahari'],
    isNew: true,
    description:
      'Rangkaian vas keramik minimalis dengan bunga matahari segar pembawa energi positif.',
    flowersIncluded: ['Bunga Matahari', 'Solidago Kuning', 'Chamomile'],
  },
  {
    id: 'fl-04',
    name: 'Grand Celebration Standing',
    category: 'standing',
    price: 850000,
    originalPrice: 950000,
    rating: 4.9,
    reviewsCount: 92,
    image:
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80',
    tags: ['Standing', 'Grand Opening'],
    isBestSeller: true,
    description:
      'Standing flower megah untuk ucapan selamat pernikahan, wisuda, atau pembukaan bisnis baru.',
    flowersIncluded: ['Lily Casablanca', 'Mawar Kuning', 'Gerbera Oranye', 'Palem Hias'],
  },
  {
    id: 'fl-05',
    name: 'Graduation Glow Bouquet',
    category: 'wisuda',
    price: 275000,
    rating: 4.9,
    reviewsCount: 210,
    image:
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    tags: ['Wisuda', 'Populer'],
    isBestSeller: true,
    description:
      'Buket kelulusan elegan dilengkapi boneka toga mini dan wrapping waterproof berkelas.',
    flowersIncluded: ['Mawar Putih', 'Statice Ungu', 'Aster Kuning'],
  },
  {
    id: 'fl-06',
    name: 'Sweet Romance Tulip Box',
    category: 'anniversary',
    price: 540000,
    originalPrice: 620000,
    rating: 4.9,
    reviewsCount: 63,
    image:
      'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80',
    tags: ['Anniversary', 'Bloom Box'],
    isNew: true,
    description:
      'Bloom box silinder eksklusif berisikan tulip Belanda segar dengan pita satin sutra.',
    flowersIncluded: ['Tulip Merah Muda', 'Carnation Putih', 'Ruscus Greenery'],
  },
  {
    id: 'fl-07',
    name: 'Serenity Orchid Arrangement',
    category: 'meja',
    price: 450000,
    rating: 4.8,
    reviewsCount: 39,
    image:
      'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80',
    tags: ['Anggrek', 'Living Room'],
    description: 'Anggrek bulan putih anggun dalam pot marmer elegan, tahan berminggu-minggu.',
    flowersIncluded: ['Anggrek Bulan Putih', 'Lumut Hutan', 'Akar Hias'],
  },
  {
    id: 'fl-08',
    name: 'Royal Velvet Anniversary Bouquet',
    category: 'anniversary',
    price: 680000,
    rating: 5.0,
    reviewsCount: 51,
    image:
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    tags: ['Premium', 'Luxury'],
    description:
      'Buket mewah 24 tangkai mawar beludru merah marun dengan sentuhan daun emas metalik.',
    flowersIncluded: ['Mawar Merah Velvet', 'Baby Breath Hitam/Emas', 'Eucalyptus'],
  },
]
