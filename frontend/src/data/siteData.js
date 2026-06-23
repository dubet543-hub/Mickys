import makhaniImg       from '../assets/products/makhani-gravy-pouch.png';
import khadhaiImg       from '../assets/products/kadhai-gravy-pouch.png';
import malabariImg      from '../assets/products/malabari-gravy-pouch.png';
import onionTomatoImg   from '../assets/products/onion-tomato-masala-pouch.png';
import gingerGarlicImg  from '../assets/products/ginger-garlic-paste-pouch.png';
import pizzaPastaImg    from '../assets/products/pizza-pasta-sauce-pouch.png';
import yellowGravyImg   from '../assets/products/yellow-gravy-pouch.png';
import tomatoConcasseImg from '../assets/products/tomato-concasse-pouch.png';
import bundleGraviesImg from '../assets/products/Bundle Pack (4) Gravies.png';
import bundlePastesImg from '../assets/products/Bundle Pack (4) Paste and Sauces.png';
import bundlePulsesImg from '../assets/products/Bundle Pack (4) Grains And Pulses.png';
import makhaniRecipeImg from '../assets/recipes/makhani-gravy.jpg';
import kadhaiRecipeImg from '../assets/recipes/kadhai-gravy.jpg';
import onionTomatoRecipeImg from '../assets/recipes/onion-tomato-masala.jpg';

export const PRODUCTS = [
  {
    id: 'makhani-gravy',
    name: 'Makhani Gravy',
    tagline: 'Professionally balanced gravy for commercial kitchens',
    price: 349,
    mrp: 399,
    label: 'Bestseller',
    category: 'Gravies',
    weight: '1kg',
    serves: 'Serves 4',
    shelfLife: '12 months',
    image: makhaniImg,
    description:
      'The ultimate base for Butter Chicken, Paneer Makhani and more. Made from slow-roasted tomatoes, cashews and aromatic spices for restaurant flavour in minutes.',
    ingredients: 'Tomatoes, cashews, onions, butter, spices and salt',
    recipe: 'Butter Chicken',
  },
  {
    id: 'kadhai-gravy',
    name: 'Kadhai Gravy',
    tagline: 'Consistent colour, texture and taste across every service',
    price: 349,
    mrp: 399,
    label: 'Chef Pick',
    category: 'Gravies',
    weight: '1kg',
    serves: 'Serves 4',
    shelfLife: '12 months',
    image: khadhaiImg,
    description:
      'Bring the bold flavours of a traditional kadhai dish to your kitchen. Crushed spices, peppers and a smoky tomato base do the heavy lifting.',
    ingredients: 'Tomatoes, onions, capsicum, whole spices, oil and salt',
    recipe: 'Kadhai Paneer',
  },
  {
    id: 'malabari-gravy',
    name: 'Malabari Gravy',
    tagline: 'Coastal cooking base for faster professional finishing',
    price: 449,
    mrp: 499,
    label: 'Coastal',
    category: 'Gravies',
    weight: '1kg',
    serves: 'Serves 4',
    shelfLife: '12 months',
    image: malabariImg,
    description:
      'A rich, coconut-based gravy with curry leaves, mustard and warm coastal spices. Built for fish curry, vegetables or chicken.',
    ingredients: 'Coconut milk, tomatoes, curry leaves, mustard, turmeric and salt',
    recipe: 'Kerala Fish Curry',
  },
  {
    id: 'onion-tomato-masala',
    name: 'Onion Tomato Masala',
    tagline: 'A neutral base that never dominates your recipe',
    price: 249,
    mrp: 299,
    label: 'Essential',
    category: 'Pastes',
    weight: '1kg',
    serves: 'Serves 4',
    shelfLife: '12 months',
    image: onionTomatoImg,
    description:
      'Slow-cooked onions and tomatoes with whole spices. A ready base for everyday sabzis, dals and curries.',
    ingredients: 'Onions, tomatoes, ginger, garlic, whole spices, oil and salt',
    recipe: 'Everyday Curry',
  },
  {
    id: 'dal-makhani',
    name: 'Dal Makhani',
    tagline: 'Three-hour prep brought down to fast service speed',
    price: 249,
    mrp: 299,
    label: 'RTC',
    category: 'Gravies',
    weight: '1kg',
    serves: 'Serves 4',
    shelfLife: '12 months',
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=1000&q=80',
    description:
      'A ready-to-cook Dal Makhani solution designed to reduce flame time while keeping the familiar taste guests expect.',
    ingredients: 'Black lentils, tomato base, butter notes, cream notes and spices',
    recipe: 'Dal Makhani',
  },
  {
    id: 'ginger-garlic-paste',
    name: 'Ginger-Garlic Paste',
    tagline: 'Everyday paste for faster mise-en-place',
    price: 179,
    mrp: 199,
    label: 'Staple',
    category: 'Pastes',
    weight: '1kg',
    serves: 'Serves 8',
    shelfLife: '6 months',
    image: gingerGarlicImg,
    description:
      'Stone-ground ginger and garlic paste for fast everyday cooking without preservatives or fillers.',
    ingredients: 'Ginger, garlic and salt',
    recipe: 'Quick Dal Tadka',
  },
  {
    id: 'black-chana',
    name: 'Black Chana',
    tagline: 'Ready pantry support for high-volume kitchens',
    price: 179,
    mrp: 199,
    label: 'Pulses',
    category: 'Graines & Pulses',
    weight: 'Pack',
    serves: 'Bulk-friendly',
    shelfLife: 'Long shelf life',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=1000&q=80',
    description: "A grain and pulse product from Micky's range for simplified procurement and lower storage complexity.",
    ingredients: 'Black chana',
    recipe: 'Chana Masala',
  },
  {
    id: 'kabuli-chana',
    name: 'Kabuli Chana',
    tagline: 'Consistent pulse quality for professional kitchens',
    price: 249,
    mrp: 279,
    label: 'Pulses',
    category: 'Graines & Pulses',
    weight: 'Pack',
    serves: 'Bulk-friendly',
    shelfLife: 'Long shelf life',
    image: 'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=1000&q=80',
    description: 'Kabuli chana for hotels, restaurants, cloud kitchens, caterers and QSRs that need predictable kitchen inputs.',
    ingredients: 'Kabuli chana',
    recipe: 'Chole',
  },
  {
    id: 'kidney-beans',
    name: 'Kidney Beans',
    tagline: 'Stable ingredient planning for commercial service',
    price: 299,
    mrp: 329,
    label: 'Pulses',
    category: 'Graines & Pulses',
    weight: 'Pack',
    serves: 'Bulk-friendly',
    shelfLife: 'Long shelf life',
    image: 'https://images.unsplash.com/photo-1597850688756-1b057b1b971e?w=1000&q=80',
    description: 'Kidney beans that support simplified procurement, reduced storage needs and dependable menu execution.',
    ingredients: 'Kidney beans',
    recipe: 'Rajma',
  },
  {
    id: 'pizza-pasta-sauce',
    name: 'Pizza Pasta Sauce',
    tagline: 'Signature sauce and dip range for smarter kitchens',
    price: 299,
    mrp: 349,
    label: 'Sauce',
    category: 'Paste',
    weight: 'Pack',
    serves: 'Food service',
    shelfLife: 'Long shelf life',
    image: pizzaPastaImg,
    description: 'A ready-to-use sauce base for faster continental and fusion menu execution.',
    ingredients: 'Tomatoes, herbs, spices and seasoning',
    recipe: 'Pizza Pasta',
  },
  {
    id: 'yellow-gravy',
    name: 'Yellow Gravy',
    tagline: 'Mild, creamy base for korma and shahi dishes',
    price: 349,
    mrp: 399,
    label: 'New',
    category: 'Gravies',
    weight: '1kg',
    serves: 'Serves 10–12',
    shelfLife: '12 months',
    image: yellowGravyImg,
    description:
      'A rich, golden onion-cashew base with warm whole spices. Perfect for Shahi Paneer, Korma, Navratan curry and creamy vegetable dishes.',
    ingredients: 'Onions, cashews, cream, whole spices, oil and salt',
    recipe: 'Shahi Paneer',
  },
  {
    id: 'tomato-concasse',
    name: 'Tomato Concassé',
    tagline: 'Blanched tomato base for fast professional finishing',
    price: 299,
    mrp: 349,
    label: 'New',
    category: 'Pastes',
    weight: '1kg',
    serves: 'Serves 10–12',
    shelfLife: '12 months',
    image: tomatoConcasseImg,
    description:
      'Blanched, peeled and diced tomatoes slow-cooked to a smooth base. Cuts prep time for gravies, soups, pasta and pizza sauces.',
    ingredients: 'Tomatoes, spices and salt',
    recipe: 'Tomato Curry Base',
  },
  {
    id: 'bundle-gravies',
    name: 'Bundle Pack (4) Gravies',
    tagline: 'Bundle gravies for professional kitchen planning',
    price: 1396,
    mrp: 1596,
    label: 'Bundle',
    category: 'Gravies Bundle',
    weight: '4 packs',
    serves: 'Commercial use',
    shelfLife: 'Long shelf life',
    image: bundleGraviesImg,
    description: "A Micky's gravies bundle for kitchens that need consistency, speed and food-cost stability.",
    ingredients: "Assorted Micky's gravies",
    recipe: 'Multi-menu service',
  },
  {
    id: 'bundle-pulses',
    name: 'Bundle Pack (4) Grains And Pulses',
    tagline: 'Bundle grains and pulses for simplified procurement',
    price: 716,
    mrp: 796,
    label: 'Bundle',
    category: 'Bundle Grain',
    weight: '4 packs',
    serves: 'Commercial use',
    shelfLife: 'Long shelf life',
    image: bundlePulsesImg,
    description: 'A grain and pulse bundle designed to reduce inventory complexity and wastage.',
    ingredients: 'Assorted grains and pulses',
    recipe: 'Bulk prep',
  },
];

export const WHY_CHOOSE = [
  {
    img: 'https://mickys.in/wp-content/uploads/2026/03/chef-hat.png',
    title: 'YOU ARE IN CHARGE',
    text: 'You control the dish; we just simplify the hard prep.',
    points: ['A neutral base that never dominates your recipe.', 'One base with endless applications.'],
  },
  {
    img: 'https://mickys.in/wp-content/uploads/2026/03/rupee-indian-1.svg',
    title: 'SMART SAVINGS',
    text: 'Lower overall input cost, less fuel and energy use, and stable pricing year-round.',
    points: ['Lower overall input cost.', 'Less fuel and energy use.', 'Stable pricing year-round.'],
  },
  {
    img: 'https://mickys.in/wp-content/uploads/2026/03/like-1.svg',
    title: 'RELIABILITY',
    text: 'Consistent quality, long shelf life and simplified procurement.',
    points: ['Consistent quality.', 'Long shelf life.', 'Simplified procurement.'],
  },
  {
    img: 'https://mickys.in/wp-content/uploads/2026/03/cogwheel-1.svg',
    title: 'EFFICIENCY',
    text: 'Faster turnaround, fewer prep steps, and use exactly what you need when you need it.',
    points: ['Faster turnaround = more sales.', 'Fewer prep steps.', 'Use exactly what you need.'],
  },
  {
    img: 'https://mickys.in/wp-content/uploads/2026/03/cutlery-1.svg',
    title: 'LOWER EQUIPMENT COST',
    text: 'Minimal kitchen setup with no heavy machines. Basic cookware is enough.',
    points: ['Minimal kitchen setup.', 'No heavy machines.', 'Basic cookware is enough.'],
  },
  {
    img: 'https://mickys.in/wp-content/uploads/2026/03/shopping-bag-2.svg',
    title: 'REDUCED STORAGE',
    text: 'Fewer raw ingredients, lower inventory load, less wastage and no refrigeration required.',
    points: ['Fewer raw ingredients needed.', 'Lower inventory load.', 'No refrigeration required.'],
  },
];

export const BUNDLES = [
  {
    id: 'bundle-gravies',
    name: 'Gravies Bundle',
    category: 'Gravies',
    tag: 'Pack of 4',
    price: 1199,
    mrp: 1596,
    image: bundleGraviesImg,
    description: 'Four signature ready-to-cook gravy bases — restaurant flavour in minutes.',
    items: ['Makhani Gravy', 'Kadhai Gravy', 'Malabari Gravy', 'Yellow Gravy'],
  },
  {
    id: 'bundle-pastes',
    name: 'Pastes & Sauces Bundle',
    category: 'Pastes & Sauces',
    tag: 'Pack of 4',
    price: 999,
    mrp: 1296,
    image: bundlePastesImg,
    description: 'Everyday cooking pastes and finishing sauces for fast, consistent prep.',
    items: ['Ginger Garlic Paste', 'Onion Tomato Masala', 'Pizza Pasta Sauce', 'Tomato Concasse'],
  },
  {
    id: 'bundle-pulses',
    name: 'Grains & Pulses Bundle',
    category: 'Grains & Pulses',
    tag: 'Pack of 4',
    price: 899,
    mrp: 1196,
    image: bundlePulsesImg,
    description: 'Hearty, wholesome dals and grain essentials, slow-cooked and ready to serve.',
    items: ['Dal Makhani', 'Yellow Dal', 'Rajma Masala', 'Chana Masala'],
  },
];

export const HOME_FEATURES = [
  { icon: 'Leaf',         title: '100% Natural',        desc: 'No artificial colours, flavours or additives — ever.' },
  { icon: 'Zap',          title: 'Ready in 10 Mins',    desc: 'Restaurant-quality results with minimal effort.' },
  { icon: 'ShieldCheck',  title: 'No Preservatives',    desc: 'Retort-sealed freshness with no chemical shortcuts.' },
  { icon: 'Award',        title: 'Retort Technology',   desc: 'Hospitality-grade consistency in every single pouch.' },
];

export const WHAT_WE_OFFER = [
  'Zero Prep Time',
  'Simplified Cooking',
  'Healthy & Balanced Meals',
  'Home-Like Taste',
  'Next Level Convenience',
  'Chef Crafted Recipes',
];

export const PREP_STEPS = [
  {
    number: 'Step 01',
    title: 'Chef-Crafted Base',
    text: 'Expertly developed recipes by professional chefs',
    img: 'https://mickys.in/wp-content/uploads/2026/03/Gemini_Generated_Image_oxsrokoxsrokoxsr-removebg-preview.png',
  },
  {
    number: 'Step 02',
    title: 'Retort-Sealed Quality',
    text: 'Locked in freshness with advanced retort technology',
    img: 'https://mickys.in/wp-content/uploads/2026/03/Gemini_Generated_Image_sov8kwsov8kwsov8-removebg-preview.png',
  },
  {
    number: 'Step 03',
    title: 'Fast Final Execution',
    text: 'Ready in minutes, tastes like it took hours',
    img: 'https://mickys.in/wp-content/uploads/2026/03/Gemini_Generated_Image_ds54p0ds54p0ds54-removebg-preview.png',
  },
];

export const RECIPES = [
  {
    title: 'Makhani Gravy',
    text: 'For Butter Chicken & Paneer Makhani',
    time: '10 mins',
    image: makhaniRecipeImg,
  },
  {
    title: 'Kadhai Gravy',
    text: 'For Kadhai Paneer & veg sabzis',
    time: '10 mins',
    image: kadhaiRecipeImg,
  },
  {
    title: 'Onion Tomato Masala',
    text: 'Everyday base for sabzis & dals',
    time: '10 mins',
    image: onionTomatoRecipeImg,
  },
];

// One base → many dishes. Cooking methods and dish lists sourced from
// Micky's chef recipe deck. `productId` links a base to its product page
// (when it exists in PRODUCTS); deck-only bases are listed without it.
export const APPLICATIONS = [
  {
    id: 'makhani-gravy',
    productId: 'makhani-gravy',
    title: 'Makhani Gravy',
    summary:
      'A rich, buttery tomato-cashew base. Temper, add your protein, finish with cream — one base, an entire makhani menu.',
    method: [
      'Heat a pan on medium flame and add butter, oil or desi ghee as preferred.',
      'Add a little red chilli powder and a pinch of salt; sauté briefly.',
      "Add Micky's Makhani Gravy and mix well; cook on low–medium heat, stirring occasionally.",
      'For a sweet, rich profile add a little sugar; for a spicier taste add red chilli powder.',
      'Add paneer cubes (or your protein) and mix gently so they don’t break.',
      'Simmer a few minutes so the main ingredient absorbs the gravy.',
      'Adjust consistency with a little water or cream; finish with butter or fresh cream.',
    ],
    dishes: [
      'Paneer Makhani', 'Butter Chicken', 'Veg Makhani', 'Mushroom Makhani',
      'Egg Makhani', 'Chicken Tikka Makhani', 'Kofta Makhani', 'Soya Chaap Makhani',
      'Malai Kofta Makhani', 'Fish Makhani', 'Prawn Makhani',
    ],
  },
  {
    id: 'kadhai-gravy',
    productId: 'kadhai-gravy',
    title: 'Kadhai Gravy',
    summary:
      'Coarsely ground whole spices with onion, capsicum and tomato for a bold, semi-dry kadhai finish.',
    method: [
      'Heat a kadhai on medium flame with a little oil.',
      'Add whole spices — coriander seeds, cumin seeds and whole dried red chillies — and sauté until aromatic (do not burn).',
      "Add Micky's Ginger-Garlic Paste and cook until the raw aroma disappears.",
      'Add julienned onion, capsicum and tomato; sauté on high to keep a slight crunch.',
      "Add Micky's Kadhai Gravy and cook until the spices are well incorporated.",
      'Adjust to taste — balance chilli for medium spice, add a little water for gravy, adjust salt and tang for a chatpata finish.',
      'Add the main ingredient (paneer, chicken or vegetables) and toss well with the gravy.',
      'Finish with fresh coriander and a light sprinkle of crushed kasuri methi (optional).',
    ],
    dishes: [
      'Kadhai Paneer', 'Kadhai Chicken', 'Kadhai Veg', 'Kadhai Mushroom',
      'Kadhai Egg', 'Kadhai Soya Chaap', 'Kadhai Kofta', 'Kadhai Mutton',
      'Kadhai Fish', 'Kadhai Prawn',
    ],
  },
  {
    id: 'malabari-gravy',
    productId: 'malabari-gravy',
    title: 'Malabari Gravy',
    summary:
      'A coconut-and-curry-leaf coastal base with a mild tamarind tang for authentic South Indian, Kerala-style curries.',
    method: [
      'Heat a pan on medium flame with oil or a little ghee.',
      'For tempering, add mustard seeds and let them crackle, then add fresh curry leaves and sauté until aromatic.',
      "Add Micky's Ginger-Garlic Paste and cook until the raw aroma disappears.",
      "Add Micky's Malabari Gravy and mix well.",
      'Pour in coconut milk and stir gently for a smooth, creamy consistency.',
      'Add a little tamarind water for a mild tang; season with salt and adjust spices.',
      'Simmer on low heat — more coconut milk for creaminess, more tamarind for tang, green chillies for heat.',
      'Cook until balanced, with a distinct Malabar/Kerala-style flavour.',
    ],
    dishes: [
      'Chicken Malabar', 'Fish Malabar', 'Prawn Malabar', 'Egg Malabar',
      'Vegetable Malabar', 'Paneer Malabar', 'Mushroom Malabar', 'Mutton Malabar',
    ],
  },
  {
    id: 'dal-makhani',
    productId: 'dal-makhani',
    title: 'Dal Makhani',
    summary:
      'A pre-cooked black-lentil base that brings three-hour dhaba flavour down to service speed.',
    method: [
      'Heat a pan on medium flame and add an appropriate quantity of butter and oil.',
      'Once the butter melts, add ginger-garlic paste and sauté until the raw aroma disappears.',
      "Add Micky's Dal Makhani base and stir well to blend the butter and spices.",
      'Simmer on low heat, stirring occasionally so it doesn’t stick.',
      'For a creamy texture add fresh cream and a little butter; for a spicier or tangier taste adjust salt, chilli and seasoning.',
      'Cook until rich and smooth; finish with a touch of butter or cream before serving.',
    ],
    dishes: ['Dal Makhani', 'Dal Makhani Dhaba Style'],
  },
  {
    id: 'onion-tomato-masala',
    productId: 'onion-tomato-masala',
    title: 'Onion Tomato Masala (OTM)',
    summary:
      'The everyday workhorse base. Adjust onion for body, tomato for tang — it never dominates your recipe.',
    method: [
      'More onion = thicker, sweeter gravy; more tomato = tangier, redder gravy.',
      'Add oil as needed for richness and shelf life; salt to taste.',
      'Adjust red chilli powder for spice and use turmeric minimally for colour.',
      'Coriander powder builds the base flavour; add garam masala at the finishing stage.',
      'Adjust ginger-garlic paste for aroma, and water to control consistency.',
    ],
    dishes: [
      'Paneer Masala', 'Paneer Butter Masala', 'Kadai Paneer', 'Paneer Bhurji',
      'Egg Curry', 'Egg Masala', 'Chicken Masala', 'Chicken Curry', 'Chicken Kadai',
      'Butter Chicken', 'Mutton Curry', 'Keema Masala', 'Veg Curry', 'Mix Veg Masala',
      'Aloo Masala', 'Aloo Gobi', 'Chole Masala', 'Rajma Masala', 'Mushroom Masala',
      'Soya Chaap Masala',
    ],
  },
  {
    id: 'yellow-gravy',
    productId: 'yellow-gravy',
    title: 'Yellow / Noorani Gravy',
    summary:
      'A creamy cashew-and-cream white base for rich, royal “noor” dishes — korma, shahi and Noorani gravies.',
    method: [
      'Heat a pan on medium flame with butter or oil; add cumin seeds and let them crackle (optional).',
      'Add ginger-garlic paste and sauté until the raw aroma disappears.',
      'Add a little finely chopped onion and cook until light golden (optional).',
      'Add a pinch of turmeric, coriander powder and red chilli powder to taste.',
      "Add Micky's Yellow Gravy (cashew-cream base) and cook on low flame, stirring continuously.",
      'Season with salt, a pinch of sugar and a little garam masala.',
      'Add paneer or your main ingredient and simmer 3–5 minutes; adjust with milk or cream.',
      'Finish with fresh cream, butter and a pinch of kasuri methi.',
    ],
    dishes: [
      'Paneer Noorani', 'Veg Noorani', 'Mushroom Noorani', 'Kofta Noorani',
      'Chicken Noorani', 'Shahi Paneer', 'Navratan Korma', 'Veg Korma', 'Chicken Korma',
    ],
  },
  {
    id: 'ginger-garlic-paste',
    productId: 'ginger-garlic-paste',
    title: 'Ginger-Garlic Paste',
    summary:
      'A versatile, stone-ground base that adds depth and warmth to almost any dish. Add in controlled quantity per recipe — too much can turn bitter.',
    dishes: [
      'Paneer Masala', 'Paneer Butter Masala', 'Kadai Paneer', 'Dal Tadka', 'Dal Fry',
      'Veg Curry', 'Mix Veg', 'Aloo Gobi', 'Chole Masala', 'Rajma Masala',
      'Chicken Curry', 'Butter Chicken', 'Chicken Kadai', 'Chicken Tikka', 'Mutton Curry',
      'Keema Masala', 'Egg Curry', 'Egg Bhurji', 'Fish Curry', 'Prawn Masala',
    ],
  },
  {
    id: 'pizza-pasta-sauce',
    productId: 'pizza-pasta-sauce',
    title: 'Pizza & Pasta Sauce',
    summary:
      'A ready tomato-herb sauce base for faster continental and fusion menu execution.',
    dishes: [
      'Arrabbiata', 'Marinara Sauce', 'Pink Sauce', 'Lasagna', 'Pizza',
      'Garlic Bread with Sauce', 'Stuffed Bread', 'Bruschetta', 'Pasta Bake with Cheese',
      'Sandwiches',
    ],
  },
  {
    id: 'kabuli-chana',
    productId: 'kabuli-chana',
    title: 'Kabuli Chana (Boiled Chole)',
    summary:
      'Pre-boiled Kabuli chickpeas — ready pantry support for high-volume kitchens.',
    dishes: [
      'Chole Masala', 'Chana Masala', 'Pindi Chole', 'Amritsari Chole', 'Chana Kadhai',
      'Chana Palak', 'Chole Bhature', 'Chana Pulao', 'Chana Biryani', 'Hummus',
      'Falafel', 'Chana Chaat', 'Chickpea Soup',
    ],
  },
  {
    id: 'kidney-beans',
    productId: 'kidney-beans',
    title: 'Kidney Beans (Boiled Rajma)',
    summary:
      'Pre-boiled rajma for stable ingredient planning — from classic curries to Mexican menus.',
    dishes: [
      'Rajma Curry', 'Rajma Chawal', 'Rajma Pulao', 'Rajma Biryani', 'Rajma Masala',
      'Rajma Chaat', 'Rajma Tikki', 'Rajma Cutlet', 'Rajma Soup', 'Rajma Wrap',
      'Rajma Stuffed Paratha', 'Rajma Burger Patty', 'Rajma Stir Fry', 'Rajma Burrito',
      'Rajma Tacos', 'Rajma Quesadilla', 'Rajma Nachos', 'Rajma Enchiladas',
      'Rajma Mexican Rice', 'Rajma Chili (Mexican Style)',
    ],
  },
  {
    id: 'black-chana',
    productId: 'black-chana',
    title: 'Black Chana (Kala Chana)',
    summary:
      'Pre-boiled kala chana for simplified procurement and minimal wastage.',
    dishes: [
      'Kala Chana Masala', 'Black Chana Curry', 'Sukha Kala Chana', 'Kala Chana Chaat',
      'Kala Chana Salad', 'Kala Chana Sundal', 'Kala Chana Pulao', 'Kala Chana Biryani',
      'Kala Chana Tikki', 'Kala Chana Cutlet', 'Kala Chana Soup', 'Kala Chana Stir Fry',
      'Kala Chana Wrap', 'Kala Chana Stuffed Paratha',
    ],
  },
  {
    id: 'toor-dal',
    title: 'Toor Dal (Dal Tadka / Dal Fry)',
    summary:
      'Pre-boiled yellow lentils as a base for both Dal Tadka and Dal Fry, finished with a fresh tempering.',
    method: [
      'Heat a pan over medium flame with oil or ghee.',
      "Add Micky's Onion Tomato Masala and sauté briefly.",
      'Season with turmeric, salt and green chillies; cook until well incorporated.',
      'Add the boiled toor dal and mix thoroughly; adjust consistency with water.',
      'Simmer a few minutes so the flavours blend.',
      'Tempering: heat ghee in a small pan, add cumin seeds, chopped garlic (optional) and whole dry red chillies until aromatic, then pour over the dal.',
    ],
    dishes: [
      'Dal Tadka', 'Dal Fry', 'Sambar', 'Gujarati Dal', 'Maharashtrian Amti',
      'Dal Khichdi', 'Varan', 'Rasam Dal', 'Dal Palak', 'Dal Dhokli',
    ],
  },
  {
    id: 'cashew-paste',
    title: 'Cashew Paste',
    summary:
      'A rich, creamy base that naturally thickens gravies and adds a subtle nutty sweetness to premium dishes. Add in controlled quantity per recipe.',
    dishes: [
      'Paneer Butter Masala', 'Paneer Korma', 'Shahi Paneer', 'Malai Kofta', 'Veg Korma',
      'Navratan Korma', 'Chicken Korma', 'Butter Chicken', 'Mutton Korma', 'Mughlai Chicken',
      'Paneer Noorani', 'Veg Noorani', 'Mushroom Korma', 'Soya Chaap Korma',
    ],
  },
  {
    id: 'white-jain-gravy',
    title: 'White Jain Gravy',
    summary:
      'A rich, mild white base made without onion and garlic — cashew, melon seeds, milk and cream for a velvety, Jain-friendly finish.',
    dishes: [
      'Jain Paneer White Masala', 'Jain Mix Veg White Masala', 'Jain Mushroom White Masala',
      'Jain Baby Corn White Masala', 'Jain Veg Kofta White', 'Jain Paneer Korma',
      'Jain Navratan Korma', 'Jain Malai Kofta', 'Jain Soya Chaap White Masala',
    ],
  },
  {
    id: 'tangy-malai-jain-gravy',
    title: 'Tangy Malai Jain Gravy',
    summary:
      'A creamy, mildly tangy Jain base (no onion or garlic) — cream, milk and cashew balanced with a permitted souring agent.',
    dishes: [
      'Paneer Tangy Malai Jain', 'Veg Tangy Malai Jain', 'Mushroom Tangy Malai Jain',
      'Baby Corn Tangy Malai Jain', 'Jain Veg Kofta Tangy Malai', 'Jain Malai Kofta Tangy',
      'Jain Navratan Tangy Malai', 'Jain Corn Capsicum Tangy Malai', 'Jain Paneer Korma Tangy Malai',
    ],
  },
  {
    id: 'tamarind-chutney',
    title: 'Tamarind Chutney',
    summary:
      'A sweet-and-tangy chutney that balances spicy, salty chaat and snacks with a rich brown finish.',
    dishes: [
      'Samosa Chaat', 'Aloo Tikki Chaat', 'Dahi Puri', 'Sev Puri', 'Bhel Puri',
      'Papdi Chaat', 'Ragda Pattice', 'Pani Puri', 'Dahi Bhalla', 'Chana Chaat',
      'Vada Pav', 'Dhokla',
    ],
  },
  {
    id: 'tomato-ketchup',
    title: 'Tomato Ketchup',
    summary:
      'A sweet-tangy condiment for snacks, fast food and Indo-Chinese cooking. Use in controlled quantity.',
    dishes: [
      'Veg Fried Rice', 'Schezwan Fried Rice', 'Veg Noodles', 'Hakka Noodles',
      'Chilli Paneer', 'Chilli Chicken', 'Honey Chilli Potato', 'Spring Rolls',
      'Manchurian', 'Pasta', 'Burger', 'French Fries',
    ],
  },
];

export const TESTIMONIALS = [
  ['Priya S.', 'Mumbai', 'The Makhani Gravy tastes exactly like restaurant butter chicken. My family had no idea it came from a pouch.'],
  ['Rahul M.', 'Delhi', "Finally a ready-to-cook brand that doesn't compromise on taste. The Kadhai Gravy is my weekly staple now."],
  ['Anita K.', 'Pune', 'Perfect for busy evenings. The kids love it, I trust the ingredients, and dinner is calm again.'],
];
