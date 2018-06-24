import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Modal extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Modal window</Text>
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
