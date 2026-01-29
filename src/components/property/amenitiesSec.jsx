import { FaWifi } from "react-icons/fa";
import { TbAirConditioningDisabled } from "react-icons/tb";
import { GiWashingMachine } from "react-icons/gi";
import { BiSolidCarGarage } from "react-icons/bi";
import { MdPool } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { MdSecurity } from "react-icons/md";
import { MdPets } from "react-icons/md";
import { LuMicrowave } from "react-icons/lu";

export default function AmenitiesSection({ amenities }) {
  // ✅ Icon mapping using only your specified icons
  const iconMap = {
    // WiFi & Internet
    'WiFi': <FaWifi className="text-blue-500" />,
    'Wi-Fi': <FaWifi className="text-blue-500" />,
    'High-speed WiFi': <FaWifi className="text-blue-500" />,
    'Internet': <FaWifi className="text-blue-500" />,
    'Wireless Internet': <FaWifi className="text-blue-500" />,
    'Free WiFi': <FaWifi className="text-blue-500" />,
    
    // Climate Control
    'Air condition': <TbAirConditioningDisabled className="text-blue-400" />,
    'Air conditioning': <TbAirConditioningDisabled className="text-blue-400" />,
    'AC': <TbAirConditioningDisabled className="text-blue-400" />,
    
    // Laundry (using washing machine for all laundry-related items)
    'Washing machine': <GiWashingMachine className="text-blue-500" />,
    'Dryer': <GiWashingMachine className="text-blue-500" />,
    'Laundry': <GiWashingMachine className="text-blue-500" />,
    'Iron': <GiWashingMachine className="text-gray-600" />,
    'Ironing board': <GiWashingMachine className="text-gray-600" />,
    'Clothes': <GiWashingMachine className="text-blue-500" />,
    'Dishwasher': <GiWashingMachine className="text-blue-500" />,
    'Dishes': <GiWashingMachine className="text-blue-500" />,
    
    // Parking & Garage
    'Free parking': <BiSolidCarGarage className="text-gray-700" />,
    'Parking': <BiSolidCarGarage className="text-gray-700" />,
    'Free parking on premises': <BiSolidCarGarage className="text-gray-700" />,
    'Paid parking': <BiSolidCarGarage className="text-gray-700" />,
    'Street parking': <BiSolidCarGarage className="text-gray-700" />,
    'Garage': <BiSolidCarGarage className="text-gray-700" />,
    'Car garage': <BiSolidCarGarage className="text-gray-700" />,
    
    // Pool & Recreation
    'Pool': <MdPool className="text-blue-400" />,
    'Swimming pool': <MdPool className="text-blue-400" />,
    'Hot tub': <MdPool className="text-blue-400" />,
    
    // Gym & Fitness
    'Gym access': <CgGym className="text-purple-600" />,
    'Fitness center': <CgGym className="text-purple-600" />,
    'Gym': <CgGym className="text-purple-600" />,
    
    // Security & Safety
    '24/7 security': <MdSecurity className="text-gray-800" />,
    'Security': <MdSecurity className="text-gray-800" />,
    'Safe': <MdSecurity className="text-gray-700" />,
    'Lock': <MdSecurity className="text-gray-700" />,
    
    // Pets
    'Pets allowed': <MdPets className="text-yellow-600" />,
    'Pet friendly': <MdPets className="text-yellow-600" />,
    'Pets': <MdPets className="text-yellow-600" />,
    'No pets': <MdPets className="text-gray-400 opacity-50" />,
    
    // Kitchen & Cooking (using microwave for all kitchen appliances)
    'Kitchen Cabinet': <LuMicrowave className="text-orange-500" />,
    'Kitchen': <LuMicrowave className="text-orange-500" />,
    'Full kitchen': <LuMicrowave className="text-orange-500" />,
    'Kitchenette': <LuMicrowave className="text-orange-500" />,
    'Microwave': <LuMicrowave className="text-orange-500" />,
    'Oven': <LuMicrowave className="text-orange-500" />,
    'Refrigerator': <LuMicrowave className="text-gray-600" />,
    'Stove': <LuMicrowave className="text-orange-500" />,
    'Cooking basics': <LuMicrowave className="text-orange-500" />,
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">What this place offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {amenities.map((amenity, idx) => {
          // ✅ Trim whitespace and normalize case for better matching
          const normalizedAmenity = amenity.trim();
          const icon = iconMap[normalizedAmenity] || <div className="w-5 h-5"></div>;
          
          return (
            <div key={idx} className="flex items-center gap-2 text-gray-700">
              {icon}
              <span>{amenity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}