import * as ReactLocation from 'expo-location';
import { ICoords } from './icoords';
import { IDisposable } from './iDisposable';

export interface ILocationObject { coords:ICoords }
export interface IHeadingObject { trueHeading:number, magHeading:number }

export type PositionWatcher = (location:ILocationObject) => void
export type HeadingWatcher = (heading: IHeadingObject) => void

export type PositionWatch = (watcher: PositionWatcher) => Promise<IDisposable>
export type HeadingWatch = (watcher: HeadingWatcher) => Promise<IDisposable>

export class Location {
  private static unknownCount: number = 0;
  private static LocationWatchReference:IDisposable|null = null
  private static HeadingWatchReference:IDisposable|null = null

  private static LocationWatchers: { name: string, callback: PositionWatcher }[] = []
  private static HeadingWatchers: { name: string, callback: HeadingWatcher }[] = []

  public static async WatchLocation(callback: PositionWatcher, name: string | null = null): Promise<IDisposable> {
    name = name ?? "<unknownLocationWatch #" + (++Location.unknownCount) + ">";
    let callbackMetadata = { name: name, callback: callback };
    Location.LocationWatchers.push(callbackMetadata);
    console.log("Watcher for location added for: ", name);

    if (Location.LocationWatchReference == null) {
      console.log("No location watch reference - creating");
      await ReactLocation.requestPermissionsAsync();
      let watcher = await ReactLocation.watchPositionAsync({
        accuracy: ReactLocation.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 0,
      }, Location.watchReactLocation);
      Location.LocationWatchReference = {
        Dispose: () => {
          Location.LocationWatchReference = null;
          watcher.remove();
        }
      };
      console.log("No location watch reference - created");
    }
    return {Dispose : async ():Promise<void> => {
      var index = Location.LocationWatchers.indexOf(callbackMetadata)
      if (index > -1) {
        Location.LocationWatchers.splice(index, 1)
      }
      if (Location.LocationWatchers.length == 0 && Location.LocationWatchReference !== null) {
        (await Location.LocationWatchReference).Dispose();
      }
    }}
  }

  public static async WatchHeading(callback: HeadingWatcher, name: string | null = null): Promise<IDisposable> {
    name = name ?? "<unknownHeadingWatch #" + (++Location.unknownCount) + ">";
    let callbackMetadata = { name: name, callback: callback };
    Location.HeadingWatchers.push(callbackMetadata);
    console.log("Watcher for heading added");
    if (Location.HeadingWatchReference == null) {
      console.log("No heading watch reference - creating");
      await ReactLocation.requestPermissionsAsync();
      let watcher = await ReactLocation.watchHeadingAsync(Location.watchReactHeading);
      Location.HeadingWatchReference = {
        Dispose: () => {
          watcher.remove();
        }
      };
      console.log("No heading watch reference - created");
    }
    return {Dispose : async ():Promise<void> => {
      var index = Location.HeadingWatchers.indexOf(callbackMetadata)
      if (index > -1) {
        Location.HeadingWatchers.splice(index, 1)
      }
      if (Location.HeadingWatchers.length == 0 && Location.HeadingWatchReference !== null) {
        (await Location.HeadingWatchReference).Dispose();
      }
    }}
  }

  private static watchReactLocation(location: ReactLocation.LocationObject): void {
    Location.LocationWatchers.forEach(
      async (watcher) => {
        console.log("Calling: ", watcher.name);
        watcher.callback(location);
      }
    )
  }

  private static watchReactHeading(heading:ReactLocation.LocationHeadingObject):void {
    Location.HeadingWatchers.forEach(
      (watcher) => { watcher.callback(heading) }
    )
  }
}
