import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'
import Modal from "./screens/modal"
import { Main } from "./screens/main"
import { createStackNavigator } from "react-navigation"


export default createStackNavigator({
  Main: { screen: Main },
  Modal: { screen: Modal },
}, {
  initialRouteName: "Main",
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0
    }
  })
})
