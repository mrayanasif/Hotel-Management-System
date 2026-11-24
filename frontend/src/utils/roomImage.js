const bundledImages = import.meta.glob("../assets/room-uploads/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const fallbackImages = {
  Single: bundledImages["../assets/room-uploads/single-rooom.jpg"],
  Double: bundledImages["../assets/room-uploads/Double-room.jpg"],
  Deluxe: bundledImages["../assets/room-uploads/Deluxe-room.jpg"],
  Suite: bundledImages["../assets/room-uploads/Suite-room.jpg"],
};

export default function getRoomImageUrl(image, roomType) {
  const roomImage = image
    ? bundledImages[`../assets/room-uploads/${image}`]
    : undefined;

  return roomImage || fallbackImages[roomType] || fallbackImages.Single;
}
