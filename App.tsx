import CompassWindow from "./screens/compassWindow"
import { Main } from "./screens/main"
import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation"
import * as ScreenOrientation from 'expo-screen-orientation'
import { Quest } from "./screens/quest"


ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)

const AppNavigator = createStackNavigator({
  Main: { screen: Main },
  CompassWindow: { screen: CompassWindow },
  Quest: { screen: Quest },
}, {
  initialRouteName: "Main"
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
