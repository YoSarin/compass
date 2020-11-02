import { Pointer, PointerProps } from "./pointer"
import { Location } from '../lib/location';
import * as ExpoLocation from 'expo-location';
import { ICoords } from "../lib/icoords";
import { IDisposable } from "../lib/iDisposable";

export enum HeadingType {
  MagneticHeading,
  TrueHeading
}

export interface CompassProps extends PointerProps {
  headingType?:HeadingType
  targetPoint?:ICoords
}

export class Compass<T extends CompassProps> extends Pointer<CompassProps> {
  static readonly NORTH_POLE:ExpoLocation.LocationGeocodedLocation = { latitude: 90.0, longitude: 0.0 }
  static readonly SOUTH_POLE:ExpoLocation.LocationGeocodedLocation = { latitude: -90.0, longitude: 0.0 }

  private headingWatch: IDisposable = { Dispose: () => { } };
  private locationWatch: IDisposable = { Dispose: () => { } };

  private currentLocation?: ICoords;

  constructor(props:T) {
    super(props)
  }
  async componentDidMount() {
    super.componentDidMount();
    if (this.props.targetPoint !== undefined) {
      this.startLocationWatch();
    }
    await this.startHeadingWatch();
  }

  async componentWillUnmount() {
    super.componentWillUnmount();
    await this.stopHeadingWatch();
    await this.stopLocationWatch();
  }

  private async startLocationWatch() {
    await this.stopLocationWatch();
    this.locationWatch = await Location.WatchLocation(location => {
      this.currentLocation = location.coords;
    }, "Compass");
  }

  private async stopLocationWatch() {
    if (this.locationWatch != null && typeof(this.locationWatch) === 'object') {
      this.locationWatch.Dispose()
    }
  }

  private async startHeadingWatch() {
    await this.stopHeadingWatch()
    this.headingWatch = await Location.WatchHeading((heading) => {
      var headingAngle = (this.props.headingType == HeadingType.TrueHeading ? heading.trueHeading : heading.magHeading)
      if (this.props.targetPoint !== undefined && this.currentLocation !== undefined) {
        headingAngle = this.calculateDirection(this.currentLocation, this.props.targetPoint) - headingAngle
      }
      this.pointToDirection(0 - headingAngle)
    })
  }

  private async stopHeadingWatch() {
    if (this.headingWatch != null && typeof(this.headingWatch) === 'object') {
      this.headingWatch.Dispose()
    }
  }
}
