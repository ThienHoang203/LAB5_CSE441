import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
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
    textAlign: 'center',
    lineHeight: 25,
  },
});

const ServiceDetailHeader = () => {
  const navigation = useNavigation();
  const popupMenuRef = useRef(null);
  const route = useRoute();
  const item = route.params.item;
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

    const config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://kami-backend-5rs0.onrender.com/services/${item.id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    try {
      const response = await axios(config);
      console.log(response);
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

      <Text style={styles.title}>Service detail</Text>

      <TouchableOpacity style={styles.optionsWrapper} onPress={triggerMenu}>
        <Icon name="ellipsis-vertical-outline" style={styles.arrow} />

        <View>
          <Menu ref={popupMenuRef}>
            <MenuTrigger />

            <MenuOptions style={styles.popupWrapper}>
              <MenuOption
                onSelect={() => {
                  navigation.navigate('ServiceUpdate', {item: item});
                }}>
                <Text style={[{color: 'blue'}, styles.popupTitle]}>Update</Text>
              </MenuOption>
              <MenuOption
                onSelect={() =>
                  Alert.alert('Confirm Delete', 'Are you sure?', [
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
                  ])
                }>
                <Text style={[{color: 'red'}, styles.popupTitle]}>Delete</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ServiceDetailHeader;
