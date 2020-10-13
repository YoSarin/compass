export class Coords {
  private latitude: number;
  private longitude: number;

  public constructor(latitude: number = 49.195060, longitude: number = 16.606837) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  public DistanceTo(other: Coords): number {
    
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(this.latitude - other.latitude);  // deg2rad below
    var dLon = this.deg2rad(this.longitude - other.longitude); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(other.latitude)) * Math.cos(this.deg2rad(this.latitude)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d*1000;
  }
  
  private deg2rad(deg:number) {
    return deg * (Math.PI/180)
  }
}