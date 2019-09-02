import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Compass } from '../components/compass';

export default class CompassWindow extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Compass scale={30} />
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
