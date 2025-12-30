import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Walkin Air Pro',
    price: 189.99,
    category: 'Running',
    description: 'Designed for the marathon runner, featuring ultra-lightweight foam and breathable mesh.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
    sizes: [7, 8, 9, 10, 11, 12],
    featured: true,
    reviews: [
      { id: 'r1', userId: 'u1', userName: 'Alex R.', rating: 5, comment: 'Best running shoes I have ever owned!', date: '2023-10-15' },
      { id: 'r2', userId: 'u2', userName: 'Sarah M.', rating: 4, comment: 'Great cushion, but runs a bit small.', date: '2023-11-02' }
    ]
  },
  {
    id: '2',
    name: 'Urban Drifter',
    price: 129.50,
    category: 'Lifestyle',
    description: 'Street-ready aesthetics with all-day comfort. The perfect daily driver.',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop',
    sizes: [6, 7, 8, 9, 10, 11],
    featured: true,
    reviews: []
  },
  {
    id: '3',
    name: 'Court Master V',
    price: 159.00,
    category: 'Basketball',
    description: 'Dominate the court with superior ankle support and high-traction soles.',
    // Updated image to a high quality basketball sneaker
    image: 'https://images.unsplash.com/photo-1515555230216-82228b88ea98?q=80&w=1000&auto=format&fit=crop',
    sizes: [8, 9, 10, 11, 12, 13, 14],
    featured: true,
    reviews: [
       { id: 'r3', userId: 'u3', userName: 'Mike J.', rating: 5, comment: 'Grip is insane on these.', date: '2023-12-10' }
    ]
  },
  {
    id: '4',
    name: 'Trail Blazer',
    price: 145.00,
    category: 'Outdoor',
    description: 'Rugged durability meets modern style. Water-resistant and ready for any terrain.',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop',
    sizes: [7, 8, 9, 10, 11],
    featured: false,
    reviews: []
  },
  {
    id: '5',
    name: 'Retro High',
    price: 110.00,
    category: 'Lifestyle',
    description: 'A nod to the classics. Vintage colorways with modern materials.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop',
    sizes: [5, 6, 7, 8, 9, 10],
    featured: false,
    reviews: []
  },
  {
    id: '6',
    name: 'Velocity X',
    price: 210.00,
    category: 'Running',
    description: 'Our fastest shoe yet. Carbon plate technology for maximum energy return.',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop',
    sizes: [8, 9, 10, 11, 12],
    featured: true,
    reviews: []
  },
];

export const CATEGORIES = ['All', 'Running', 'Lifestyle', 'Basketball', 'Outdoor'];