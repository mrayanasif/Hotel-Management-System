// Images

import singleImg from "../assets/images/single-rooom.jpg";
import doubleImg from "../assets/images/Double-room.jpg";
import DeluxeImg from "../assets/images/Deluxe-room.jpg";
import SuiteImg from "../assets/images/Suite-room.jpg";

// Fake Database

const roomData = [
  {
    id: 1,
    roomNumber: "101",
    roomType: "Single",
    price: 12000,
    availability: "Available",
    image: singleImg,
    rating: 4.8,
    description:
      "A cozy room designed for solo travelers with all essential modern facilities."
  },

  {
    id: 2,
    roomNumber: "201",
    roomType: "Double",
    price: 18000,
    availability: "Available",
    image: doubleImg,
    rating: 4.9,
    description:
      "Perfect for couples and business guests looking for comfort and elegance."
  },

  {
    id: 3,
    roomNumber: "301",
    roomType: "Deluxe",
    price: 30000,
    availability: "Available",
    image: DeluxeImg,
    rating: 5,
    description:
      "Luxury interiors with premium facilities for a relaxing stay."
  },

  {
    id: 4,
    roomNumber: "401",
    roomType: "Suite",
    price: 65000,
    availability: "Available",
    image: SuiteImg,
    rating: 5,
    description:
      "Our finest suite offering exceptional comfort, luxury and breathtaking views."
  }
];

export default roomData;