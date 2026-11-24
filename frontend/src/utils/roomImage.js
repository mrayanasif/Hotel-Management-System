const images = import.meta.glob("../assets/room-uploads/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const fallbackByType = {
  Single: images["../assets/room-uploads/single-rooom.jpg"],
  Double: images["../assets/room-uploads/Double-room.jpg"],
  Deluxe: images["../assets/room-uploads/Deluxe-room.jpg"],
  Suite: images["../assets/room-uploads/Suite-room.jpg"],
};

export default function getRoomImageUrl(image, roomType) {
  return (
    images[`../assets/room-uploads/${image}`] ||
    fallbackByType[roomType] ||
    fallbackByType.Single
  );
}
