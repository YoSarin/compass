import { Pointer, PointerProps } from "./pointer"
import { Location } from '../lib/location';
import * as ExpoLocation from 'expo-location';
import { ICoords } from "../lib/icoords";

export enum HeadingType {
  MagneticHeading,
  TrueHeading
}

export interface CompassProps extends PointerProps {
  headingType?:HeadingType
  targetPoint?:ICoords
  startingPoint?:ICoords
}

export class Compass<T extends CompassProps> extends Pointer<CompassProps> {
  static readonly NORTH_POLE:ExpoLocation.LocationGeocodedLocation = { latitude: 90.0, longitude: 0.0 }
  static readonly SOUTH_POLE:ExpoLocation.LocationGeocodedLocation = { latitude: -90.0, longitude: 0.0 }

  private headingWatch:{remove():void} = {remove : () => {}};
  private headingType:HeadingType = HeadingType.TrueHeading
  private targetPoint?:ICoords
  private startingPoint?:ICoords

  constructor(props:T) {
    super(props)
    this.headingType = props.headingType ? props.headingType : HeadingType.TrueHeading
    this.targetPoint = props.targetPoint
    this.startingPoint = props.startingPoint
    this.startHeadingWatch()
  }
  async componentDidMount() {
    await this.startHeadingWatch()
  }

  async componentWillUnmount() {
    await this.stopHeadingWatch()
  }

  private async startHeadingWatch() {
    await this.stopHeadingWatch()
    this.headingWatch = await Location.WatchHeading((heading) => {
      var headingAngle = (this.headingType == HeadingType.TrueHeading ? heading.trueHeading : heading.magHeading)
      if (this.startingPoint !== undefined && this.targetPoint !== undefined) {
        headingAngle = this.calculateDirection(this.startingPoint, this.targetPoint) - headingAngle
      }
      this.pointToDirection(0 - headingAngle)
    })
  }

  private async stopHeadingWatch() {
    if (this.headingWatch != null && typeof(this.headingWatch) === 'object') {
      this.headingWatch.remove()
    }
  }
}
