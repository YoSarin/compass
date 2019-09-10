import { Pointer, PointerProps } from "./pointer"
import * as Location from 'expo-location';

export enum HeadingType {
  Magnetic,
  True
}

export interface CompassProps extends PointerProps {
  headingType?:HeadingType
}

export class Compass extends Pointer<CompassProps> {

  private static lastId:number = 0

  private id:number = (++Compass.lastId)

  private headingWatch:{remove():void} = {remove : () => {}};
  private headingType:HeadingType = HeadingType.True

  constructor(props:CompassProps) {
    super(props)
    this.headingType = props.headingType ? props.headingType : HeadingType.True
    this.startHeadingWatch()
  }

  private async startHeadingWatch() {
    await Location.requestPermissionsAsync()
    await this.stopHeadingWatch()
    await (new Promise(resolve => setTimeout(resolve, 5000*(this.id-1))))
    console.log(this.id, "starting")
    this.headingWatch = await Location.watchHeadingAsync((heading) => {
      console.log(this.id, heading)
      if (this.headingType == HeadingType.True) {
        this.pointTo(heading.trueHeading)
      } else {
        this.pointTo(heading.magHeading)
      }
    })
  }

  private async stopHeadingWatch() {
    if (this.headingWatch != null && typeof(this.headingWatch) === 'object') {
      this.headingWatch.remove()
      console.log(this.id, "stopped")
    }
  }
}
