import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Compass } from '../components';

export default class CompassWindow extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Compass scale={25} />
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
