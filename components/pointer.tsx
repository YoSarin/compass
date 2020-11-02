import React from "react"
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';
import * as ExpoLocation from 'expo-location';
import { ICoords } from "../lib/icoords";

export interface PointerProps {
  scale?:number
  direction?:number|{from:ICoords, to:ICoords}
  style?:PointerStyle
}

export interface PointerStyle {
  arrowColor?:string
  circleColor?:string
}

export class Pointer<T extends PointerProps> extends React.Component<T> {
  static defaultProps = {
    scale: 1,
    direction: 0,
    style: {
      arrowColor: "red",
      circleColor: "black"
    }
  }

  private scale:number
  private direction:number
  private style: PointerStyle
  private _mounted: boolean = false;

  private static shape = [
      [1 / 2, 2 / 3],
      [2 / 7, 5 / 6],
      [1 / 2, 1 / 8],
      [5 / 7, 5 / 6]
  ]

  private static defaultSize = 20

  constructor(props:T) {
    super(props)
    this.scale = props.scale ? props.scale : Pointer.defaultProps.scale
    this.direction = props.direction ? (typeof props.direction === 'number' ? props.direction : this.calculateDirection(props.direction.from, props.direction.to) ) : Pointer.defaultProps.direction
    this.style = { ...Pointer.defaultProps.style, ...props.style }
  }

  public rescaleBy(multiplier:number) {
    this.scale *= multiplier
    if (this._mounted) {
      this.setState({ render: true })
    }
  }

  public pointToDirection(direction:number) {
    this.direction = (direction % 360)
    if (this._mounted) {
      this.setState({ render: true })
    }
  }
  
  async componentDidMount() {
    this._mounted = true;
  }

  async componentWillUnmount() {
    this._mounted = false;
  }

  public needlePath():string {
    var path = "";
    Pointer.shape.forEach((coords, index) => {
        if (index == 0) {
            path += "M";
        } else {
            path += " L";
        }
        path += (Math.round(coords[0] * Pointer.defaultSize)).toString();
        path += " ";
        path += (Math.round(coords[1] * Pointer.defaultSize)).toString();
    });
    path += " Z";
    return path
  }

  private needleRotation():string {
    var center = (Pointer.defaultSize / 2)
    return "rotate(" + this.direction + ", " + center + ", " + center + ")"
  }

  protected calculateDirection(from:ICoords, to:ICoords):number {
      var λ1 = from.longitude.toRad();
      var φ1 = from.latitude.toRad();
      var λ2 = to.longitude.toRad();
      var φ2 = to.latitude.toRad();

      var y = Math.sin(λ2 - λ1) * Math.cos(φ2);
      var x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);

      var direction = (Math.atan2(y, x)).toDegrees();
      if (direction < 0) {
          direction = 360 + direction;
      }
      return direction;
  }

  render() {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { alignItems: 'center', justifyContent: 'center' },
        ]}>
        <Text>{Math.round(this.direction)}</Text>
        <Svg height={Pointer.defaultSize*this.scale} width={Pointer.defaultSize*this.scale} >
          <G scale={this.scale}>
            <Circle r={Pointer.defaultSize/4} cx={Pointer.defaultSize/2} cy={Pointer.defaultSize/2} fill="transparent" stroke={this.style.circleColor} strokeWidth={0.01*Pointer.defaultSize} />
            <Path d={ this.needlePath() } transform={this.needleRotation()} fill="white" stroke={this.style.arrowColor} strokeWidth={0.01*Pointer.defaultSize} />
          </G>
        </Svg>
      </View>
    )
  }
}

declare global {
  /** Converts numeric degrees to radians */
  interface Number {
      toRad():number;
      toDegrees():number;
  }
}

Number.prototype.toRad = function () {
    return this.valueOf() * Math.PI / 180;
}

Number.prototype.toDegrees = function () {
    return this.valueOf() * 180 / Math.PI;
}
