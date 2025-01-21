import * as slideImages from '../assets/images/slide';
import * as reviewImages from '../assets/images/reviews';
import icons from '../assets/icons';

export const navLinks = [
  { id: 1, path: '/', label: 'Home' },
  { id: 2, path: '/menu', label: 'Menu' },
  { id: 3, path: '/login', label: 'Login' },
  { id: 4, path: '*', label: '404' },
];

export const adminLinks = [
  { id: 5, path: '/admin/add-item', label: 'Add Item' },
  { id: 6, path: '/admin/menu-items', label: 'Edit Item' },
];

export const slide = [
  {
    id: 1,
    name: 'Lunch',
    image_url: slideImages.lunch,
  },
  {
    id: 2,
    name: 'Drinks',
    image_url: slideImages.drinks,
  },
  {
    id: 3,
    name: 'Breakfast',
    image_url: slideImages.breakfast,
  },
  {
    id: 4,
    name: 'Desserts',
    image_url: slideImages.desserts,
  },
  {
    id: 5,
    name: 'Appetizers',
    image_url: slideImages.appetizers,
  },
];

export const storeCards = [
  {
    id: 1,
    icon: icons.happy,
    content: "We've served over 10,000 meals to happy customers since opening!",
  },
  {
    id: 2,
    icon: icons.heart,
    content: 'Our team is trained to ensure every guest feels at home.',
  },
  {
    id: 3,
    icon: icons.customers,
    content:
      'Over 80% of our guests are repeat customers—proof of the care and quality we serve every day.',
  },
  {
    id: 4,
    icon: icons.sauce,
    content: 'All our sauces and dressings are made fresh in-house daily.',
  },
];

export const rvs = [
  {
    id: 1,
    image: reviewImages.review1,
    name: 'Jonesy J.',
    stars: 4,
    content:
      "Every dish feels like it's made with love. Can't wait to come back!",
  },
  {
    id: 2,
    image: reviewImages.review2,
    name: 'Olivia T.',
    stars: 4,
    content:
      'Cozy atmosphere, friendly staff, and flavors that remind me of home. A must-visit!',
  },
  {
    id: 3,
    image: reviewImages.review3,
    name: 'Noah R.',
    stars: 4,
    content: "The best burger I've ever had! Highly recommend this place.",
  },
  {
    id: 4,
    image: reviewImages.review4,
    name: 'Jason S.',
    stars: 5,
    content:
      'The food is amazing, and the service is even better! Definitely my new favorite spot.',
  },
  {
    id: 5,
    image: reviewImages.review5,
    stars: 4,
    name: 'Ava.P',
    content:
      'Incredible food and top-notch service. The staff really go above and beyond.',
  },
  {
    id: 6,
    image: reviewImages.review6,
    name: 'Mason K.',
    stars: 4,
    content:
      "I've been coming here for years, and it just keeps getting better. Thank you for such wonderful meals!",
  },
  {
    id: 7,
    image: reviewImages.review7,
    name: 'Emma J.',
    stars: 3,
    content:
      "Tried it on a whim, and now I'm hooked. This place is a hidden gem!",
  },
];

export const location = [
  { id: 1, title: 'Location', content: '200 Risky Reels Road, Houston TX' },
  {
    id: 2,
    title: 'Hours',
    content: [
      'Monday to Friday 8am - 8pm',
      'Saturday 8am - 10pm',
      'Sunday 10am - 8pm',
    ],
  },
];

export const footer = [
  {
    id: 1,
    title: 'Contact Us',
    content: ['corner.store@gmail.com', '713-024-2002'],
  },
  {
    id: 2,
    title: 'Job Opportunities',
    content: [
      "Love food and people? We're hiring!",
      'Stop by or send your resume',
      'cs.hiring@jobs.com',
    ],
  },
  {
    id: 3,
    title: 'Accesibility',
    content: [
      "For questions about accessibility, feel free to reach out—we're here to help!",
    ],
  },
  {
    id: 4,
    title: '2024 Corner Store All Rights Reserved',
    content: {
      logo: icons.logoFooter,
      socials: [icons.facebook, icons.instagram],
    },
  },
];
