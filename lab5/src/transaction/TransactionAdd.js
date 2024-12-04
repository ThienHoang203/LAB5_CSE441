/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {formattedCurrency, mapCustomers, mapServices} from '../utils/map';
import axios from 'axios';
import DropdownComponent from '../utils/render/DropdownComponent';
import {useSelector} from 'react-redux';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import ServiceCheckboxItem from '../utils/render/ServiceCheckboxItem';
import {redApp} from '../utils/colorVariables';
import {StackActions, useNavigation} from '@react-navigation/native';
const TransactionAdd = () => {
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const customerInfo = useSelector(state => state.customerInfo.customer);
  const servicesInfo = useSelector(state => state.services.services);
  const userData = useSelector(state => state.userInfo.info);
  const navigation = useNavigation();
  const [totalPrice, setTotalPrice] = useState(0);
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
      const mappedCustomers = arr.map(item => mapCustomers(item));
      // console.log(mappedCustomers);

      setCustomers(mappedCustomers);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const fetchServices = async () => {
    const data = {};

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://kami-backend-5rs0.onrender.com/services',
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
      setServices(response.data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const renderServices = ({item}) => {
    return <ServiceCheckboxItem item={item} />;
  };

  const handleAddTransaction = async () => {
    if (Object.keys(userData).length === 0 || userData.token == null) {
      Alert.alert('There is no user!');
      return;
    }
    if (Object.keys(customerInfo).length === 0) {
      Alert.alert('There is no customer selected!');
      return;
    }
    const servicesCollected = [];

    for (const key in servicesInfo) {
      if (
        servicesInfo[key].quantity <= 0 ||
        servicesInfo[key].userID === 'unknown'
      ) {
        continue;
      }
      servicesCollected.push({
        _id: servicesInfo[key]._id,
        quantity: servicesInfo[key].quantity,
        userID: servicesInfo[key].userID,
      });
    }

    if (servicesCollected.length === 0) {
      Alert.alert('There is no service selected!');
    }
    const data = {
      customerId: customerInfo.id,
      services: servicesCollected,
    };
    console.log(data);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://kami-backend-5rs0.onrender.com/transactions',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
      data: data,
    };

    try {
      const response = await axios(config);
      console.log(response);
      Alert.alert('Successful!');
      navigation.dispatch(StackActions.pop(1));
    } catch (err) {
      Alert.alert('Unsuccessful!');
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchServices();
  }, []);

  useEffect(() => {
    if (services.length === 0) {
      return;
    }
    console.log(services);
  }, [services]);

  useEffect(() => {
    let totalCost = 0;
    for (const key in servicesInfo) {
      if (servicesInfo[key].quantity <= 0) {
        continue;
      }
      console.log(servicesInfo[key].basePrice);

      totalCost += servicesInfo[key].basePrice * servicesInfo[key].quantity;
    }

    setTotalPrice(totalCost);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicesInfo]);

  return (
    <View style={styles.container}>
      <Text style={styles.headingCustomer}>Customer*</Text>
      <DropdownComponent dataParam={customers} />
      <FlatList
        data={services}
        keyExtractor={item => item._id}
        renderItem={renderServices}
        style={styles.listService}
      />
      <TouchableOpacity
        style={[
          styles.seeSumaryContainer,
          {display: totalPrice > 0 ? 'flex' : 'none'},
        ]}
        onPress={() => {
          Alert.alert(
            'Confirm Add',
            `This transaction is created by ${customerInfo.name}(id: ${
              customerInfo.id
            }). Total cost: ${formattedCurrency(totalPrice)}`,
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Add transaction',
                onPress: () => {
                  handleAddTransaction();
                },
                style: 'destructive',
              },
            ],
          );
        }}>
        <Text
          style={[
            {
              textAlign: 'center',
              fontSize: 17,
              color: '#fff',
              fontWeight: '700',
            },
          ]}>
          See summary: ({formattedCurrency(totalPrice)})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  headingCustomer: {
    fontSize: 18,
    fontWeight: '700',
    paddingLeft: 5,
  },
  listService: {
    flex: 1,
  },
  seeSumaryContainer: {
    backgroundColor: redApp,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 50,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default TransactionAdd;
