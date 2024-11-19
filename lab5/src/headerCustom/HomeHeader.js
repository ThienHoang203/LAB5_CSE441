import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {redApp} from '../utils/colorVariables';
import {StackActions, useNavigation} from '@react-navigation/native';
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
  headingText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#fff',
  },
  iconWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    padding: 1,
  },
  icon: {
    color: redApp,
    fontSize: 22,
  },
});

const HomeHeader = headingTitle => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>{headingTitle}</Text>
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => {
          navigation.dispatch(StackActions.popToTop());
        }}>
        <Icon name="account" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
