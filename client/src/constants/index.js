export const navLinks = [
  { id: 1, path: '/', label: 'Home' },
  { id: 2, path: '/menu', label: 'Menu' },
  { id: 3, path: '/login', label: 'Login' },
  { id: 4, path: '*', label: '404' },
];

export const slide = [
  { id: 1,name: 'Lunch', image_url: './src/assets/images/slide/lunch-slide.png' },
  { id: 2,name: 'Drinks', image_url: './src/assets/images/slide/drinks-slide.png' },
  { id: 3,name: 'Breakfast', image_url: './src/assets/images/slide/breakfast-slide.png' },
  { id: 4,name: 'Desserts', image_url: './src/assets/images/slide/desserts-slide.png' },
  { id: 5,name: 'Appetizers', image_url: './src/assets/images/slide/appetizers-slide.png' },
]

export const storeCards = [
  { 
    id: 1,
    icon: './src/assets/icons/happy.svg', 
    content: "We've served over 10,000 meals to happy customers since opening!" 
  },
  {
    id: 2,
    icon: './src/assets/icons/heart.svg',
    content: 'Our team is trained to ensure every guest feels at home.'
  },
  {
    id: 3,
    icon: './src/assets/icons/customers.svg',
    content: 'Over 80% of our guests are repeat customers—proof of the care and quality we serve every day.'
  },
  {
    id: 4,
    icon: './src/assets/icons/sauce.svg',
    content: 'All our sauces and dressings are made fresh in-house daily.'
  }
]

export const reviews = [
  {
    id: 1,
    image: './src/assets/images/reviews/review1.jpg',
    name: 'Jonesy J.',
    stars: 4,
    content: "Every dish feels like it's made with love. Can't wait to come back!"
  },
  {
    id: 2,
    image: './src/assets/images/reviews/review2.jpg',
    name: 'Olivia T.',
    stars: 4,
    content: 'Cozy atmosphere, friendly staff, and flavors that remind me of home. A must-visit!'
  },
  {
    id: 3,
    image: './src/assets/images/reviews/review3.jpg',
    name: 'Noah R.',
    stars: 4,
    content: "The best burger I've ever had! Highly recommend this place."
  },
  {
    id: 4,
    image: './src/assets/images/reviews/review4.jpg',
    name: 'Jason S.',
    stars: 5,
    content: 'The food is amazing, and the service is even better! Definitely my new favorite spot.'
  },
  {
    id: 5,
    image: './src/assets/images/reviews/review5.jpg',
    stars: 4,
    name: 'Ava.P',
    content: 'Incredible food and top-notch service. The staff really go above and beyond.'
  },
  {
    id: 6,
    image: './src/assets/images/reviews/review6.jpg',
    name: 'Mason K.',
    stars: 4,
    content: "I've been coming here for years, and it just keeps getting better. Thank you for such wonderful meals!"
  },
  {
    id: 7,
    image: './src/assets/images/reviews/review7.jpg',
    name: 'Emma J.',
    stars: 3,
    content: "Tried it on a whim, and now I'm hooked. This place is a hidden gem!"
  },
]

export const location = [
  { id: 1, title: 'Location', content: '200 Risky Reels Road, Houston TX' },
  { 
    id: 2, title: 'Hours', 
    content: [
      'Monday to Friday 8am - 8pm',
      'Saturday 8am - 10pm',
      'Sunday 10am - 8pm'
    ]
  }
]

export const footer = [
  {
    id: 1,
    title: 'Contact Us',
    content: [
      'corner.store@gmail.com',
      '713-024-2002'
    ],
  },
  {
    id: 2,
    title: 'Job Opportunities',
    content: [
      "Love food and people? We're hiring!",
      'Stop by or send your resume',
      'cs.hiring@jobs.com'
    ]
  },
  {
    id: 3,
    title: 'Accesibility',
    content: [
      "For questions about accessibility, feel free to reach out—we're here to help!"
    ]
  },
  { 
    id: 4, 
    title: '2024 Corner Store All Rights Reserved', 
    content: {
      logo: './src/assets/icons/logo-footer.svg',
      socials: [
        './src/assets/icons/facebook.svg',
        './src/assets/icons/instagram.svg'
      ]   
    }
  }
]