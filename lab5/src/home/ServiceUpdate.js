import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View, TextInput} from 'react-native';
import {borderColor, redApp} from '../utils/colorVariables';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {StackActions, useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
  },
  inputText: {
    paddingVertical: 17,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 7,
    backgroundColor: borderColor,
  },
  btnContainer: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: redApp,
    borderRadius: 10,
  },
  btn: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    paddingVertical: 13,
    marginHorizontal: 'auto',
  },
});

const ServiceUpdate = ({route}) => {
  const navigation = useNavigation();
  const [serviceName, setServiceName] = useState(route.params.item.name);
  const [priceService, setPriceService] = useState(route.params.item.price);
  const idService = route.params.item.id;

  const [error, setError] = useState('');

  const token = useSelector(state => {
    console.log(state.userInfo.info.token);
    return state.userInfo.info.token;
  });

  const handleUpdate = async () => {
    if (typeof token === 'undefined') {
      Alert.alert('Unsuccessful.');
      return;
    }
    const data = {
      name: serviceName,
      price: priceService,
    };

    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `https://kami-backend-5rs0.onrender.com/services/${idService}`,
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
      <View style={styles.inputWrapper}>
        <Text style={styles.title}>Service name *</Text>
        <TextInput
          numberOfLines={1}
          style={styles.inputText}
          value={serviceName}
          onChangeText={value => {
            setServiceName(value);
            console.log(value);
          }}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.title}>Price *</Text>
        <TextInput
          numberOfLines={1}
          style={styles.inputText}
          keyboardType="numeric"
          value={String(priceService)}
          onChangeText={value => {
            setPriceService(parseFloat(value));
            console.log(value);
          }}
        />
      </View>
      <TouchableOpacity style={styles.btnContainer} onPress={handleUpdate}>
        <Text style={styles.btn}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ServiceUpdate;
