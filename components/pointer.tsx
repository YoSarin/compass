import React from "react"
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';

export interface PointerProps {
  scale?:number
  direction?:number
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
  private style:PointerStyle

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
    this.direction = props.direction ? props.direction : Pointer.defaultProps.direction
    this.style = { ...Pointer.defaultProps.style, ...props.style }
  }

  public rescaleBy(multiplier:number) {
    this.scale *= multiplier
    this.setState({render:true})
  }

  public pointTo(direction:number) {
    this.direction = 0-(direction % 360)
    this.setState({render:true})
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

  render() {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { alignItems: 'center', justifyContent: 'center' },
        ]}>
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
