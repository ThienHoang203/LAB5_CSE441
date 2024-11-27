import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {redApp} from '../utils/colorVariables';
import {FlatList} from 'react-native-gesture-handler';
import {mapCustomers} from '../utils/map';
import axios from 'axios';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import CustomerItem from '../utils/render/CustomerItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    position: 'relative',
  },
  iconWrapper: {
    position: 'absolute',
    bottom: 30,
    left: '90%',
  },
});

const Customer = () => {
  const navigation = useNavigation();
  const [customers, setCustomers] = useState(null);
  const [error, setError] = useState('');
  const [pressed, setPressed] = useState(false);
  const fetchCustomers = async () => {
    const data = {};

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://kami-backend-5rs0.onrender.com/customers',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      const response = await axios(config);
      if (typeof response.data === 'undefined') {
        return;
      }
      const arr = [...response.data];
      const mappedServices = arr.map(item => mapCustomers(item));
      setCustomers(mappedServices);
    } catch (err) {
      setError(err);
      console.error('Error:', err);
    }
  };
  const handlePressAddIcon = () => {
    navigation.navigate('CustomerAdd');
  };
  const handlePressCustomer = item => {
    navigation.navigate('CustomerDetail', {item: item});
  };

  const renderItem = ({item}) => (
    <CustomerItem
      item={item}
      onPress={() => {
        handlePressCustomer(item);
      }}
    />
  );

  useFocusEffect(
    useCallback(() => {
      fetchCustomers();
      return () => {
        console.log('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={customers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        style={[styles.iconWrapper, {opacity: pressed ? 1 : 0.4}]}
        onPressIn={() => {
          setPressed(true);
        }}
        onPressOut={() => {
          const temp = () => {
            setTimeout(setPressed(false), 1);
          };
          temp();
        }}
        onPress={handlePressAddIcon}>
        <Icon name="pluscircle" size={50} color={redApp} />
      </TouchableOpacity>
    </View>
  );
};

export default Customer;
