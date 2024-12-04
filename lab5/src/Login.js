import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-paper';
import {borderColor, redApp} from './utils/colorVariables';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {getUser} from './store/userInfoSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    paddingHorizontal: '10%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 50,
    fontWeight: '700',
    color: redApp,
    marginBottom: 40,
  },
  textInputContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: borderColor,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  passwordTextInput: {
    width: '90%',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: borderColor,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  btn: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 2,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
  },
});

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [iconPressed, setIconPressed] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);
  const handlePressIcon = () => {
    setIconPressed(!iconPressed);
  };
  const handlePressLogin = async (phoneParam, passwordParam) => {
    console.log('hello');

    const data = {
      phone: phoneParam,
      password: passwordParam,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://kami-backend-5rs0.onrender.com/auth',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      const response = await axios(config);
      if (response.data.token === null) {
        return;
      }
      setResponseData(response.data);
      setToken(response.data.token);
      dispatch(getUser(response.data));
      storeLoginInfo(phoneParam, passwordParam);
      console.log(response.data);
    } catch (err) {
      setError(err);
      console.error('Error:', err);
    }
  };
  const setDefaultLogin = async () => {
    try {
      const response = await AsyncStorage.multiGet(['phone', 'password']);
      setPhone(response[0][1]);
      setPassword(response[1][1]);
    } catch (err) {
      console.log(err);
    }
  };
  const storeLoginInfo = async (phoneParam, passwordParam) => {
    try {
      const response = await AsyncStorage.multiSet([
        ['phone', phoneParam],
        ['password', passwordParam],
      ]);
      console.log('stored login successfully');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setDefaultLogin();
  }, []);

  useEffect(() => {
    if (token === null) {
      return;
    }
    navigation.navigate('App');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
          placeholder="Phone"
          numberOfLines={1}
          value={phone}
          onChangeText={value => {
            setPhone(value);
          }}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordTextInput}
            placeholder="Password"
            secureTextEntry={iconPressed ? false : true}
            numberOfLines={1}
            value={password}
            onChangeText={value => {
              setPassword(value);
            }}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={handlePressIcon}>
            <Icon name={iconPressed ? 'eye-slash' : 'eye'} size={18} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => {
          handlePressLogin(phone, password);
        }}>
        <Button
          style={styles.btn}
          textColor="#fff"
          mode="contained"
          buttonColor={redApp}>
          <Text style={styles.btnText}>Login</Text>
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
