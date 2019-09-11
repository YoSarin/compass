import * as ReactLocation from 'expo-location';

export type PositionWatcher = (location:ReactLocation.LocationData) => void
export type HeadingWatcher = (heading:ReactLocation.HeadingData) => void

export class Location {
  private static LocationWatchReference:Promise<{remove() : void}>
  private static HeadingWatchReference:Promise<{remove() : void}>

  private static LocationWatchers:PositionWatcher[] = []
  private static HeadingWatchers:HeadingWatcher[] = []

  public static async WatchLocation(watcher:PositionWatcher):Promise<{remove() : void}> {
    if (Location.LocationWatchReference == null) {
      await ReactLocation.requestPermissionsAsync()
      Location.LocationWatchReference = ReactLocation.watchPositionAsync({
        accuracy: ReactLocation.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 0,
      }, Location.watchReactLocation)
    }
    Location.LocationWatchers.push(watcher);
    return {remove : async ():Promise<void> => {
      var index = Location.LocationWatchers.indexOf(watcher)
      if (index > -1) {
        Location.LocationWatchers.splice(index, 1)
      }
      if (Location.LocationWatchers.length == 0) {
        (await Location.LocationWatchReference).remove();
      }
    }}
  }

  public static async WatchHeading(watcher:HeadingWatcher):Promise<{remove() : void}> {
    if (Location.HeadingWatchReference == null) {
      await ReactLocation.requestPermissionsAsync()
      Location.HeadingWatchReference = ReactLocation.watchHeadingAsync(Location.watchReactHeading)
    }
    Location.HeadingWatchers.push(watcher);
    return {remove : async ():Promise<void> => {
      var index = Location.HeadingWatchers.indexOf(watcher)
      if (index > -1) {
        Location.HeadingWatchers.splice(index, 1)
      }
      if (Location.HeadingWatchers.length == 0) {
        (await Location.HeadingWatchReference).remove();
      }
    }}
  }

  private static watchReactLocation(location:ReactLocation.LocationData):void {
    Location.LocationWatchers.forEach(
      (watcher) => { watcher(location) }
    )
  }

  private static watchReactHeading(heading:ReactLocation.HeadingData):void {
    Location.HeadingWatchers.forEach(
      (watcher) => { watcher(heading) }
    )
  }
}
