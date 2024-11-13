import { type LatLng } from "react-native-maps";

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

export default function calculateGeographicalCenter(points: LatLng[]): LatLng {
  let x = 0;
  let y = 0;
  let z = 0;

  for (const point of points) {
    // Convert latitude and longitude from degrees to radians
    const latitude = toRadians(point.latitude);
    const longitude = toRadians(point.longitude);

    // Convert to Cartesian coordinates (3D)
    x += Math.cos(latitude) * Math.cos(longitude);
    y += Math.cos(latitude) * Math.sin(longitude);
    z += Math.sin(latitude);
  }

  // Average the coordinates
  const totalPoints = points.length;
  x /= totalPoints;
  y /= totalPoints;
  z /= totalPoints;

  // Convert back to laitude and longitude
  const longitude = Math.atan2(y, x);
  const hyp = Math.sqrt(x * x + y * y);
  const latitude = Math.atan2(z, hyp);

  return {
    latitude: toDegrees(latitude),
    longitude: toDegrees(longitude),
  };
}
