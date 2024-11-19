import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {redApp} from '../utils/colorVariables';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: redApp,
    paddingHorizontal: '4%',
    paddingVertical: 15,
  },
  arrow: {
    fontWeight: '800',
    color: '#fff',
    fontSize: 30,
  },
  arrowWrapper: {},
  title: {
    flex: 1,
    fontSize: 25,
    fontWeight: '700',
    color: '#fff',
    paddingLeft: 35,
  },
  optionsWrapper: {},
});

const ServiceUpdateHeader = () => {
  const navigation = useNavigation();

  const handlePressArrow = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePressArrow} style={styles.arrowWrapper}>
        <Icon name="arrow-back" style={styles.arrow} />
      </TouchableOpacity>

      <Text style={styles.title}>Service update</Text>
    </View>
  );
};

export default ServiceUpdateHeader;
