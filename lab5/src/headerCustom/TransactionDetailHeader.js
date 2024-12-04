/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {redApp} from '../utils/colorVariables';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useSelector} from 'react-redux';
import axios from 'axios';

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
  popupWrapper: {
    width: '100%',
    height: 100,
    flexDirection: 'column',
  },
  popupTitle: {
    width: '100%',
    height: '50%',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25,
    paddingLeft: 10,
  },
  active: {
    display: 'flex',
  },
  inactive: {
    display: 'none',
  },
});

const TransactionDetailHeader = props => {
  const navigation = useNavigation();
  const popupMenuRef = useRef(null);
  const route = useRoute();
  const item = route.params.item;
  console.log(item);

  const [error, setError] = useState('');
  const token = useSelector(state => state.userInfo.info.token);
  const triggerMenu = () => {
    if (popupMenuRef.current) {
      popupMenuRef.current.open();
    }
  };

  const handlePressArrow = () => {
    navigation.goBack();
  };

  const handleDelete = async () => {
    if (typeof token === 'undefined') {
      Alert.alert('Unsuccessful.');
      return;
    }
    const data = {};
    console.log(props.deleteURL);
    console.log();

    const config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${props.deleteURL}${item._id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    try {
      const response = await axios(config);

      Alert.alert('Successful!');
      navigation.dispatch(StackActions.popTo('Menu'));
    } catch (err) {
      Alert.alert('Unsuccessful.');
      setError(err);
      console.error('Error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePressArrow} style={styles.arrowWrapper}>
        <Icon name="arrow-back" style={styles.arrow} />
      </TouchableOpacity>

      <Text style={styles.title}>{props.title}</Text>

      <TouchableOpacity style={styles.optionsWrapper} onPress={triggerMenu}>
        <Icon name="ellipsis-vertical-outline" style={styles.arrow} />

        <View>
          <Menu ref={popupMenuRef}>
            <MenuTrigger />

            <MenuOptions style={styles.popupWrapper}>
              <MenuOption
                onSelect={() => {
                  navigation.navigate(props.updateScreenName, {item: item});
                }}>
                <Text
                  style={[
                    {
                      color: 'blue',
                      textAlign: 'left',
                    },
                    styles.popupTitle,
                  ]}>
                  {props.popUpTitle1}
                </Text>
              </MenuOption>
              <MenuOption
                onSelect={() =>
                  Alert.alert(
                    'Confirm Delete',
                    props.deleteTitle == null
                      ? 'Are you sure'
                      : props.deleteTitle,
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'Yes',
                        onPress: () => {
                          handleDelete();
                        },
                        style: 'destructive',
                      },
                    ],
                  )
                }>
                <Text style={[{color: 'red'}, styles.popupTitle]}>
                  <Icon
                    name="trash-outline"
                    style={{
                      display:
                        String(props.popUpTitle2).toLowerCase() === 'delete'
                          ? ''
                          : 'none',
                    }}
                    size={16}
                  />{' '}
                  {props.popUpTitle2}
                </Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionDetailHeader;
