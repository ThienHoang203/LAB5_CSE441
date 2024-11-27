import {StackActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {clearUser} from '../store/userInfoSlice';
import {redApp} from '../utils/colorVariables';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  wrapper: {
    width: '100%',
    backgroundColor: redApp,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    paddingVertical: 10,
    color: '#fff',
  },
});

const Setting = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => {
          Alert.alert('Confirm Logout', 'Are you sure?', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => {
                dispatch(clearUser());
                navigation.dispatch(StackActions.popToTop());
              },
              style: 'destructive',
            },
          ]);
        }}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;
