export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  condition: "Like New" | "Good" | "Fair";
  description: string;
  images: string[];
  seller: { name: string; hostel: string; year: string };
  billAvailable?: boolean;
};

const img = (q: string, i = 1) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=1200&q=80&sig=${i}`;

export const CATEGORIES = [
  { slug: "books", name: "Books", icon: "BookOpen", count: 342 },
  { slug: "notes", name: "Notes", icon: "FileText", count: 218 },
  { slug: "electronics", name: "Electronics", icon: "Laptop", count: 176 },
  { slug: "utilities", name: "Utilities", icon: "Plug", count: 129 },
  { slug: "hostel-essentials", name: "Hostel Essentials", icon: "Home", count: 204 },
  { slug: "furniture", name: "Furniture", icon: "Armchair", count: 87 },
  { slug: "sports", name: "Sports Equipment", icon: "Dumbbell", count: 64 },
  { slug: "cycles", name: "Cycles", icon: "Bike", count: 41 },
];

export const PRODUCTS: Product[] = [
  {
    id: "casio-fx991",
    name: "Casio FX-991EX Scientific Calculator",
    brand: "Casio",
    price: 750,
    originalPrice: 1295,
    category: "electronics",
    condition: "Like New",
    description:
      "Barely used scientific calculator. All functions working, screen scratch-free. Perfect for engineering exams.",
    images: [
      img("photo-1587145820266-a5951ee6f620"),
      img("photo-1596495578065-6e0763fa1178", 2),
      img("photo-1518133910546-b6c2fb7d79e3", 3),
    ],
    seller: { name: "Aarav Sharma", hostel: "Aryabhatta Hostel", year: "2nd Year" },
    billAvailable: true,
  },
  {
    id: "engg-drawing-set",
    name: "Engineering Drawing Instrument Set",
    brand: "Camlin",
    price: 320,
    originalPrice: 650,
    category: "utilities",
    condition: "Good",
    description:
      "Complete drawing set with compass, dividers, protractor and scales. Used one semester.",
    images: [img("photo-1611532736597-de2d4265fba3", 4), img("photo-1503676260728-1c00da094a0b", 5)],
    seller: { name: "Priya Patel", hostel: "Kalpana Chawla Hostel", year: "3rd Year" },
  },
  {
    id: "physics-notes",
    name: "Complete Physics Notes — Sem 1 & 2",
    brand: "Handwritten",
    price: 180,
    category: "notes",
    condition: "Like New",
    description:
      "Neatly handwritten physics notes covering mechanics, waves, optics and modern physics. Toppers material.",
    images: [img("photo-1456513080510-7bf3a84b82f8", 6), img("photo-1481627834876-b7833e8f5570", 7)],
    seller: { name: "Rohan Mehta", hostel: "Ramanujan Hostel", year: "3rd Year" },
  },
  {
    id: "study-table",
    name: "Foldable Study Table with Drawer",
    brand: "Nilkamal",
    price: 1400,
    originalPrice: 2499,
    category: "furniture",
    condition: "Good",
    description:
      "Sturdy foldable study table, fits perfectly beside a hostel bed. One drawer for stationery.",
    images: [img("photo-1519710164239-da123dc03ef4", 8), img("photo-1555041469-a586c61ea9bc", 9)],
    seller: { name: "Ishaan Verma", hostel: "Bhaskara Hostel", year: "4th Year" },
    billAvailable: true,
  },
  {
    id: "hero-cycle",
    name: "Hero Sprint Pro 26T Cycle",
    brand: "Hero",
    price: 3200,
    originalPrice: 7999,
    category: "cycles",
    condition: "Good",
    description:
      "Well maintained 21-gear cycle. Serviced recently, tyres in great condition. Perfect campus companion.",
    images: [img("photo-1532298229144-0ec0c57515c7", 10), img("photo-1485965120184-e220f721d03e", 11)],
    seller: { name: "Karan Singh", hostel: "Aryabhatta Hostel", year: "4th Year" },
  },
  {
    id: "extension-board",
    name: "6-Socket Extension Board with USB",
    brand: "Havells",
    price: 240,
    originalPrice: 499,
    category: "utilities",
    condition: "Like New",
    description:
      "Includes 2 USB ports. Great for charging laptop, phone and lamp together. Barely used.",
    images: [img("photo-1558449028-b53a39d100fc", 12)],
    seller: { name: "Sneha Rao", hostel: "Kalpana Chawla Hostel", year: "2nd Year" },
  },
  {
    id: "office-chair",
    name: "Ergonomic Study Chair",
    brand: "Green Soul",
    price: 2600,
    originalPrice: 6499,
    category: "furniture",
    condition: "Good",
    description:
      "Comfortable ergonomic chair with lumbar support. Ideal for long study sessions.",
    images: [img("photo-1580480055273-228ff5388ef8", 13), img("photo-1519947486511-46149fa0a254", 14)],
    seller: { name: "Devansh Kapoor", hostel: "Bhaskara Hostel", year: "3rd Year" },
    billAvailable: true,
  },
  {
    id: "table-lamp",
    name: "LED Rechargeable Table Lamp",
    brand: "Philips",
    price: 350,
    originalPrice: 899,
    category: "hostel-essentials",
    condition: "Like New",
    description:
      "3-mode brightness, USB rechargeable, perfect for night study without disturbing roommate.",
    images: [img("photo-1507473885765-e6ed057f782c", 15), img("photo-1513506003901-1e6a229e2d15", 16)],
    seller: { name: "Ananya Iyer", hostel: "Kalpana Chawla Hostel", year: "1st Year" },
  },
  {
    id: "hp-pavilion",
    name: "HP Pavilion Laptop (i5, 8GB)",
    brand: "HP",
    price: 28500,
    originalPrice: 52990,
    category: "electronics",
    condition: "Good",
    description: "3 years old, battery replaced last month. Great for coding and college work.",
    images: [img("photo-1496181133206-80ce9b88a853", 17), img("photo-1517336714731-489689fd1ca8", 18)],
    seller: { name: "Vikram Nair", hostel: "Ramanujan Hostel", year: "4th Year" },
    billAvailable: true,
  },
  {
    id: "cricket-bat",
    name: "SG Sunny Tonny Cricket Bat",
    brand: "SG",
    price: 1600,
    originalPrice: 3200,
    category: "sports",
    condition: "Good",
    description: "English willow bat, well knocked-in, ready to play.",
    images: [img("photo-1531415074968-036ba1b575da", 19)],
    seller: { name: "Rohit Yadav", hostel: "Bhaskara Hostel", year: "2nd Year" },
  },
  {
    id: "bucket-mug",
    name: "Plastic Bucket + Mug Combo",
    brand: "Milton",
    price: 220,
    category: "hostel-essentials",
    condition: "Like New",
    description: "20L bucket with matching mug. Used one month, moving out.",
    images: [img("photo-1585771724684-38269d6639fd", 20)],
    seller: { name: "Manish Kumar", hostel: "Aryabhatta Hostel", year: "1st Year" },
  },
  {
    id: "dsa-book",
    name: "Data Structures & Algorithms — Narasimha Karumanchi",
    brand: "CareerMonk",
    price: 260,
    originalPrice: 495,
    category: "books",
    condition: "Like New",
    description: "Classic DSA prep book. All pages intact, minimal highlighting.",
    images: [img("photo-1544947950-fa07a98d237f", 21), img("photo-1512820790803-83ca734da794", 22)],
    seller: { name: "Aditya Joshi", hostel: "Ramanujan Hostel", year: "3rd Year" },
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const STATS = [
  { label: "Products Listed", value: "1,240+" },
  { label: "Active Students", value: "3,500+" },
  { label: "Categories", value: "8" },
  { label: "Successful Deals", value: "980+" },
];

export const CURRENT_USER = {
  name: "Aarav Sharma",
  email: "aarav.sharma@college.edu",
  mobile: "+91 98XXX 43210",
  year: "2nd Year",
  hostel: "Aryabhatta Hostel",
};