import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Search, Paw } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const CatBreed = ({ name, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="mb-4 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-purple-100 to-pink-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-purple-800">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-lg text-gray-700">{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const catBreeds = [
  { name: "Siamese", description: "Known for their distinctive color points and blue eyes." },
  { name: "Maine Coon", description: "One of the largest domestic cat breeds, known for their intelligence and playful personality." },
  { name: "Persian", description: "Recognized for their long fur and flat faces." },
  { name: "Bengal", description: "Wild-looking cats with leopard-like spots or marbling." },
  { name: "Sphynx", description: "Hairless cats known for their wrinkled skin and extroverted behavior." },
];

const catImages = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
];

const catStats = [
  { name: "Indoor", value: 60 },
  { name: "Outdoor", value: 40 },
];

const COLORS = ["#0088FE", "#00C49F"];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pawPosition, setPawPosition] = useState({ x: 0, y: 0 });
  const { toast } = useToast();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPawPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const filteredBreeds = catBreeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCatFact = () => {
    toast({
      title: "Cat Fact!",
      description: "Cats have over 20 muscles that control their ears.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8 relative overflow-hidden">
      <motion.div
        className="absolute pointer-events-none"
        animate={{ x: pawPosition.x - 25, y: pawPosition.y - 25 }}
        transition={{ type: "spring", damping: 10 }}
      >
        <Paw size={50} color="#8B5CF6" opacity={0.5} />
      </motion.div>
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold mb-6 text-center text-purple-800"
        >
          All About Cats
        </motion.h1>
        
        <Carousel className="mb-8 shadow-xl rounded-lg overflow-hidden">
          <CarouselContent>
            {catImages.map((src, index) => (
              <CarouselItem key={index}>
                <img
                  src={src}
                  alt={`Cat ${index + 1}`}
                  className="mx-auto object-cover w-full h-[400px] rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl text-gray-700 mb-8 text-center bg-white bg-opacity-50 p-6 rounded-lg shadow-md"
        >
          Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
          independence, agility, and affectionate nature. Cats come in various breeds, each with its unique
          characteristics and personalities.
        </motion.p>

        <div className="flex flex-col md:flex-row mb-8 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 bg-white bg-opacity-50 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-3xl font-semibold mb-4 text-purple-800">Cat Living Environments</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={catStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {catStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 bg-white bg-opacity-50 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-3xl font-semibold mb-4 text-purple-800">Did You Know?</h2>
            <ul className="list-disc pl-5 text-lg space-y-2">
              <li>Cats sleep for about 70% of their lives</li>
              <li>A group of cats is called a "clowder"</li>
              <li>Cats have over 20 different vocalizations</li>
              <li>The first cat in space was French, named Felicette</li>
            </ul>
            <Button onClick={handleCatFact} className="mt-4 bg-purple-600 hover:bg-purple-700">
              Get a Cat Fact!
            </Button>
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-semibold mb-4 text-purple-800"
        >
          Popular Cat Breeds
        </motion.h2>
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search cat breeds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white bg-opacity-50"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {filteredBreeds.map((breed, index) => (
            <CatBreed key={index} name={breed.name} description={breed.description} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
