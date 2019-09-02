import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Compass, CompassProps } from '../components/compass';

export default class Modal extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Compass scale={1} direction={46} />
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
