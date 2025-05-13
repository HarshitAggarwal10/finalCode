import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductSection from '../components/ProductSection';
import Banner from '../components/Banner';
import SmBanner from '../components/SmBanner';
import Banner3 from '../components/Banner3';
import Newsletter from '../components/Newsletter';

export default function Home() {
  // Generate a 24-character ObjectId for each product
  const generateObjectId = () => {
    return Math.random().toString(16).substring(2, 26); // 24-character hex string
  };
  const featuredProducts = [
    {
      _id: generateObjectId(),
      name: "Minimalist Space Tee",
      price: 45,
      image: "src/img/products/f1.jpg",
      description: "Comfortable cotton t-shirt with space design",
      category: "T-Shirts",
      stock: 100
    },
    {
      _id: generateObjectId(),
      name: "Urban Explorer Shirt",
      price: 52,
      image: ["src/img/products/f2.jpg"],
      description: "Durable shirt for everyday urban adventures",
      category: "Shirts",
      stock: 100
    },
    {
      _id: generateObjectId(),
      name: "Retro Vibe T-Shirt",
      price: 39,
      image: ["src/img/products/f3.jpg"],
      description: "Vintage style tee for a classic retro look",
      category: "T-Shirts",
      stock: 100
    },
    {
      _id: generateObjectId(),
      name: "Monochrome Streetwear",
      price: 60,
      image: ["src/img/products/f4.jpg"],
      description: "Stylish streetwear with a monochrome palette",
      category: "Streetwear",
      stock: 100
    },
    {
      _id: generateObjectId(),
      name: "Bold Text Graphic Tee",
      price: 48,
      image: ["src/img/products/f5.jpg"],
      description: "Graphic tee with bold textual prints",
      category: "T-Shirts",
      stock: 100
    },
    {
      _id: generateObjectId(),
      name: "Pastel Sunset Top",
      price: 54,
      image: ["src/img/products/f6.jpg"],
      description: "Soft pastel top inspired by sunset hues",
      category: "Tops",
      stock: 100
    },
    {
      _id: generateObjectId(),
      name: "Classic Cotton Crew",
      price: 42,
      image: ["src/img/products/f7.jpg"],
      description: "Timeless crew neck made from pure cotton",
      category: "T-Shirts",
      stock: 100
    },
    {
      _id: generateObjectId(),
      name: "Galaxy Print Tee",
      price: 65,
      image: ["src/img/products/f8.jpg"],
      description: "Eye-catching t-shirt with galaxy print",
      category: "T-Shirts",
      stock: 100
    }
  ];

  const newArrivals = [
    {
      _id: generateObjectId(),
      name: "Abstract Art Tee",
      price: 58,
      image: ["src/img/products/n1.jpg"],
      description: "Tee featuring abstract art design",
      category: "T-Shirts",
      stock: 100
    },
    {
      _id: generateObjectId(),
      name: "Grunge Layered Shirt",
      price: 64,
      image: ["src/img/products/n2.jpg"],
      description: "Layered shirt with a grunge aesthetic",
      category: "Shirts",
      stock: 100
    },
    {
      _id: generateObjectId(),
      name: "Wave Pattern Tee",
      price: 50,
      image: ["src/img/products/n3.jpg"],
      description: "Comfortable tee with wave pattern print",
      category: "T-Shirts",
      stock: 100
    },
    {
      _id: generateObjectId(),
      name: "Dreamcore Aesthetic Top",
      price: 62,
      image: ["src/img/products/n4.jpg"],
      description: "Top with dreamy visuals and soft colors",
      category: "Tops",
      stock: 100
    },
    {
      _id: generateObjectId(),
      name: "Skyline Silhouette Tee",
      price: 55,
      image: ["src/img/products/n5.jpg"],
      description: "Tee featuring urban skyline silhouette",
      category: "T-Shirts",
      stock: 100
    },
    {
      _id: generateObjectId(),
      name: "Neo Tokyo Street Shirt",
      price: 70,
      image: ["src/img/products/n6.jpg"],
      description: "Streetwear inspired by Neo Tokyo style",
      category: "Shirts",
      stock: 100
    },
    {
      _id: generateObjectId(),
      name: "Vintage Camera Tee",
      price: 49,
      image: ["src/img/products/n7.jpg"],
      description: "T-shirt with vintage camera graphic",
      category: "T-Shirts",
      stock: 100
    },
    {
      _id: generateObjectId(),
      name: "Cyberwave Mesh Tee",
      price: 68,
      image: ["src/img/products/n8.jpg"],
      description: "Mesh tee with cyberpunk-inspired design",
      category: "T-Shirts",
      stock: 100
    }
  ];

  return (
    <div>
      <Hero />
      <div className="mt-12"> {/* Add space between Hero and Features */}
        <Features />
      </div>
      <div className="mt-12"> {/* Add space between Features and ProductSection */}
        <ProductSection
          title="Featured Products"
          subtitle="Summer Collection new Modern Design"
          products={featuredProducts}
        />
      </div>
      <div className="mt-12"> {/* Add space between ProductSection and Banner */}
        <Banner
          title="Up to 70% Off All T-shirts & Accessories"
          buttonText="Explore More"
        />
      </div>
      <div className="mt-12"> {/* Add space between Banner and next ProductSection */}
        <ProductSection
          title="New Arrivals"
          subtitle="Summer Collection new Modern Design"
          products={newArrivals}
        />
      </div>
      <SmBanner />
      <Banner3 />
      <Newsletter />
    </div>
  );
}
