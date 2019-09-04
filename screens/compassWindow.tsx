import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Pointer } from '../components';

export default class CompassWindow extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Pointer scale={30} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
