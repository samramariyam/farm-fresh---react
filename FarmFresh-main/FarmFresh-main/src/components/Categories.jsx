import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Carrot, Apple, Beef, Milk, Egg, Wheat, 
  Cookie, Flower, Cherry, Sandwich, FlaskConical, Leaf
} from 'lucide-react';

export const categories = [
  {
    name: "Vegetables",
    icon: Carrot,
    color: "text-green-500",
    description: "Fresh, seasonal vegetables",
    items: ["Leafy Greens", "Root Vegetables", "Tomatoes", "Peppers"]
  },
  {
    name: "Fruits",
    icon: Apple,
    color: "text-red-500",
    description: "Sweet and juicy fruits",
    items: ["Berries", "Citrus", "Stone Fruits", "Tropical"]
  },
  {
    name: "Herbs & Spices",
    icon: Leaf,
    color: "text-emerald-500",
    description: "Fresh and dried herbs",
    items: ["Fresh Herbs", "Dried Spices", "Seasoning Blends", "Medicinal Herbs"]
  },
  {
    name: "Dairy Products",
    icon: Milk,
    color: "text-blue-400",
    description: "Fresh dairy and alternatives",
    items: ["Milk", "Cheese", "Yogurt", "Butter"]
  },
  {
    name: "Eggs",
    icon: Egg,
    color: "text-amber-500",
    description: "Farm fresh eggs",
    items: ["Chicken Eggs", "Duck Eggs", "Quail Eggs", "Free Range"]
  },
  {
    name: "Meat & Poultry",
    icon: Beef,
    color: "text-rose-500",
    description: "Quality meats and poultry",
    items: ["Beef", "Chicken", "Pork", "Turkey"]
  },
  {
    name: "Grains & Legumes",
    icon: Wheat,
    color: "text-yellow-600",
    description: "Organic grains and beans",
    items: ["Rice", "Quinoa", "Lentils", "Beans"]
  },
  {
    name: "Honey & Jams",
    icon: Cherry,
    color: "text-amber-600",
    description: "Sweet natural preserves",
    items: ["Raw Honey", "Fruit Jams", "Preserves", "Maple Syrup"]
  },
  {
    name: "Nuts & Seeds",
    icon: FlaskConical,
    color: "text-brown-500",
    description: "Raw and roasted varieties",
    items: ["Almonds", "Walnuts", "Chia Seeds", "Pumpkin Seeds"]
  },
  {
    name: "Baked Goods",
    icon: Cookie,
    color: "text-yellow-700",
    description: "Fresh baked breads and pastries",
    items: ["Breads", "Pastries", "Cookies", "Muffins"]
  },
  {
    name: "Specialty Items",
    icon: Flower,
    color: "text-purple-500",
    description: "Unique and seasonal items",
    items: ["Mushrooms", "Truffles", "Edible Flowers", "Microgreens"]
  },
  {
    name: "Prepared Foods",
    icon: Sandwich,
    color: "text-orange-500",
    description: "Ready-to-eat meals",
    items: ["Salads", "Soups", "Sandwiches", "Meal Kits"]
  }
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                onClick={() => navigate(`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`)}
                className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-green-500 cursor-pointer"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-full bg-gray-50 group-hover:${category.color} transition-colors`}>
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  {category.items.map((item) => (
                    <li key={item} className="hover:text-green-600">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
