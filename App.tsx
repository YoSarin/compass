import CompassWindow from "./screens/compassWindow"
import { Main } from "./screens/main"
import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation"


const AppNavigator = createStackNavigator({
  Main: { screen: Main },
  CompassWindow: { screen: CompassWindow },
}, {
  initialRouteName: "Main"
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
