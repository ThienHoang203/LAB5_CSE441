import axios from 'axios';
import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {borderColor, redApp} from '../utils/colorVariables';
import {StackActions, useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  wrapper: {
    marginBottom: 15,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    borderRadius: 7,
    height: 55,
    paddingHorizontal: 15,
    backgroundColor: borderColor,
  },
  addBtnWrapper: {
    marginTop: 30,
    borderRadius: 8,
    backgroundColor: redApp,
  },
  addText: {
    borderColor: 'pink',
    textAlign: 'center',
    paddingVertical: 13,
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },
});

const CustomerAdd = ({route}) => {
  const params = route.params;
  const [error, setError] = useState('');
  const [phone, setPhone] = useState(params == null ? '' : params.item.phone);
  const [name, setName] = useState(params == null ? '' : params.item.name);
  const navigation = useNavigation();
  const token = useSelector(state => state.userInfo.info.token);
  const validatePhoneNumber = number => {
    const phoneRegex = /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/;
    return phoneRegex.test(number);
  };
  const handlePressAdd = async ({phoneParam, nameParam, tokenParam}) => {
    if (nameParam === '') {
      Alert.alert('Error', "missing customer's name!");
      return;
    }
    if (phoneParam === '') {
      Alert.alert('Error', "missing customer's phone number!");
      return;
    }
    if (!validatePhoneNumber(phoneParam)) {
      Alert.alert('Error', 'Invalid phone number!');
      return;
    }
    if (typeof tokenParam === 'undefined') {
      return;
    }
    const data = {
      phone: phoneParam,
      name: nameParam,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://kami-backend-5rs0.onrender.com/customers',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenParam}`,
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
  const handlePressEdit = async ({
    phoneParam,
    nameParam,
    customerIDParam,
    tokenParam,
  }) => {
    if (nameParam === '') {
      Alert.alert('Error', "missing customer's name!");
      return;
    }
    if (phoneParam === '') {
      Alert.alert('Error', "missing customer's phone number!");
      return;
    }
    if (!validatePhoneNumber(phoneParam)) {
      Alert.alert('Error', 'Invalid phone number!');
      return;
    }
    if (typeof tokenParam === 'undefined') {
      return;
    }
    if (typeof customerIDParam === 'undefined') {
      return;
    }
    const data = {
      phone: phoneParam,
      name: nameParam,
    };

    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `https://kami-backend-5rs0.onrender.com/customers/${customerIDParam}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenParam}`,
      },
      data: data,
    };

    try {
      const response = await axios(config);
      console.log(response);
      Alert.alert('Successful!');
      navigation.dispatch(StackActions.pop(2));
    } catch (err) {
      setError(err);
      console.error('Error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Customer name*</Text>
        <TextInput
          placeholder="Input your customer's name"
          value={name}
          onChangeText={value => {
            setName(value);
            console.log(value);
          }}
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.title}>Phone*</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Input phone number"
          value={phone}
          onChangeText={value => {
            setPhone(value);
            console.log(value);
          }}
          maxLength={10}
          style={styles.input}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          if (params == null) {
            handlePressAdd({
              phoneParam: phone,
              nameParam: name,
              tokenParam: token,
            });
          } else {
            handlePressEdit({
              phoneParam: phone,
              nameParam: name,
              tokenParam: token,
              customerIDParam: params.item.id,
            });
          }
        }}
        style={styles.addBtnWrapper}>
        <Text style={styles.addText}>{params == null ? 'Add' : 'Update'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomerAdd;
