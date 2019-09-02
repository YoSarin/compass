import React from "react"
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';

export interface CompassProps {
  scale?:number
  direction?:number
  style?:CompassStyle
}

export interface CompassStyle {
  arrowColor?:string
  circleColor?:string
}

export class Compass extends React.Component<CompassProps> {
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
  private style:CompassStyle

  private static shape = [
      [1 / 2, 2 / 3],
      [2 / 7, 5 / 6],
      [1 / 2, 1 / 8],
      [5 / 7, 5 / 6]
  ]

  private static defaultSize = 20

  constructor(props:CompassProps) {
    super(props)
    this.scale = props.scale ? props.scale : Compass.defaultProps.scale
    this.direction = props.direction ? props.direction : Compass.defaultProps.direction
    this.style = { ...Compass.defaultProps.style, ...props.style }
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
    Compass.shape.forEach((coords, index) => {
        if (index == 0) {
            path += "M";
        } else {
            path += " L";
        }
        path += (Math.round(coords[0] * Compass.defaultSize)).toString();
        path += " ";
        path += (Math.round(coords[1] * Compass.defaultSize)).toString();
    });
    path += " Z";
    return path
  }

  private needleRotation():string {
    var center = (Compass.defaultSize / 2)
    return "rotate(" + this.direction + ", " + center + ", " + center + ")"
  }

  render() {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { alignItems: 'center', justifyContent: 'center' },
        ]}>
        <Svg height={Compass.defaultSize*this.scale} width={Compass.defaultSize*this.scale} >
          <G scale={this.scale}>
            <Circle r={Compass.defaultSize/4} cx={Compass.defaultSize/2} cy={Compass.defaultSize/2} fill="transparent" stroke={this.style.circleColor} strokeWidth={0.01*Compass.defaultSize} />
            <Path d={ this.needlePath() } transform={this.needleRotation()} fill="white" stroke={this.style.arrowColor} strokeWidth={0.01*Compass.defaultSize} />
          </G>
        </Svg>
      </View>
    )
  }
}
