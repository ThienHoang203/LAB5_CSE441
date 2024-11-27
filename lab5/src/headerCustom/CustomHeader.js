import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {redApp} from '../utils/colorVariables';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: redApp,
    paddingHorizontal: '2%',
    paddingVertical: 15,
  },

  title: {
    flex: 1,
    fontSize: 25,
    fontWeight: '700',
    color: '#fff',
    paddingLeft: 15,
  },
});

const CustomerHeader = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CustomerHeader;
