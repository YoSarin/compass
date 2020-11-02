export interface ICoords {
  latitude: number;
  longitude: number;
  accuracy?: number | null;
}

export function DistanceBetween(first: ICoords, second: ICoords): number {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(first.latitude - second.latitude);  // deg2rad below
  var dLon = deg2rad(first.longitude - second.longitude);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(second.latitude)) * Math.cos(deg2rad(first.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d * 1000;
}
    
function deg2rad(deg: number) {
  return deg * (Math.PI / 180)
}