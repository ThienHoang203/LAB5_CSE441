import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View, TextInput} from 'react-native';
import {borderColor, redApp} from '../utils/colorVariables';
import {useSelector} from 'react-redux';
import axios from 'axios';

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

const ServiceAdd = () => {
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState(0);
  const [error, setError] = useState('');
  const token = useSelector(state => {
    return state.userInfo.info.token;
  });
  const handleAdd = async () => {
    if (typeof token === 'undefined') {
      return;
    }
    const data = {
      name: serviceName,
      price: price,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://kami-backend-5rs0.onrender.com/services',
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
    } catch (err) {
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
          placeholder="Input service name"
          onChangeText={value => {
            setServiceName(value);
          }}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.title}>Price *</Text>
        <TextInput
          numberOfLines={1}
          style={styles.inputText}
          keyboardType="numeric"
          onChangeText={value => {
            setPrice(parseFloat(value));
            console.log(price);
          }}
        />
      </View>
      <TouchableOpacity style={styles.btnContainer} onPress={handleAdd}>
        <Text style={styles.btn}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ServiceAdd;
