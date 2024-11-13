import { type LatLng } from "react-native-maps";

function getBoundingBox(points: LatLng[]): {
  minLat: number;
  maxLat: number;
  minLon: number;
  maxLon: number;
} {
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLon = Infinity;
  let maxLon = -Infinity;

  points.forEach((point) => {
    minLat = Math.min(minLat, point.latitude);
    maxLat = Math.max(maxLat, point.latitude);
    minLon = Math.min(minLon, point.longitude);
    maxLon = Math.max(maxLon, point.longitude);
  });

  return { minLat, maxLat, minLon, maxLon };
}

export default function calculateZoomLevel(
  points: LatLng[],
  mapWidth: number,
  mapHeight: number
): number {
  const { minLat, maxLat, minLon, maxLon } = getBoundingBox(points);

  // Calculate the differences in latitude and longitude
  const latDiff = maxLat - minLat;
  const lonDiff = maxLon - minLon;

  // Approximate conversion factors from latitude/longitude degrees to pixels
  const latToPixels = mapHeight / 180; // Rough conversion (since latitudes go from -90 to 90 degrees)
  const lonToPixels = mapWidth / 360; // Rough conversion (since longitudes go from -180 to 180 degrees)

  // Convert the bounding box dimensions to pixel dimensions
  const latPixels = latDiff * latToPixels;
  const lonPixels = lonDiff * lonToPixels;

  // Get the larger dimension of the bounding box in pixels
  const maxDimensionPixels = Math.max(latPixels, lonPixels);

  // Based on this dimension, estimate the zoom level
  // Zoom level adjustment logic (this is simplified)
  // Typically, zoom level for Google Maps ranges from 0 (whole world) to 21 (street level)
  const zoomLevel = Math.max(
    0,
    Math.min(21, Math.log2(Math.min(mapWidth, mapHeight) / maxDimensionPixels))
  );

  return zoomLevel;
}
