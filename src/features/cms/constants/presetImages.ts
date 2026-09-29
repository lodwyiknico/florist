export interface PresetImage {
  label: string
  url: string
  category: 'buket' | 'meja' | 'standing' | 'wisuda' | 'anniversary'
}

export const PRESET_FLOWER_IMAGES: PresetImage[] = [
  {
    label: 'Mawar Merah Romantis',
    url: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    category: 'buket',
  },
  {
    label: 'Peony Pastel Pink',
    url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
    category: 'buket',
  },
  {
    label: 'Bunga Matahari Segar Vas',
    url: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80',
    category: 'meja',
  },
  {
    label: 'Anggrek Bulan Putih Elegan',
    url: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80',
    category: 'meja',
  },
  {
    label: 'Standing Flower Grand Opening',
    url: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80',
    category: 'standing',
  },
  {
    label: 'Buket Wisuda Toga & Mawar',
    url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    category: 'wisuda',
  },
  {
    label: 'Tulip Bloom Box Cantik',
    url: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80',
    category: 'anniversary',
  },
  {
    label: 'Mawar Velvet Mewah',
    url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    category: 'anniversary',
  },
  {
    label: 'Buket Lily Putih Casablanca',
    url: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=800&q=80',
    category: 'buket',
  },
  {
    label: 'Hydrangea Biru Pastel',
    url: 'https://images.unsplash.com/photo-1508784411316-02b8cd4d3a3a?auto=format&fit=crop&w=800&q=80',
    category: 'meja',
  },
]
