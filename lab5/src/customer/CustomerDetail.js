import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {redApp} from '../utils/colorVariables';
import {calculateElapsedTime, formatDate} from '../utils/map';
import {ScrollView} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  InfoContainer: {
    borderRadius: 6,
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
  },
  heading: {
    color: redApp,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  infoWrapper: {
    // minHeight: 50,
  },
  titleInfo: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  detailInfo: {
    flex: 1,
    borderWidth: 1,
  },
});

const CustomerDetail = ({route}) => {
  const customerID = route.params.item.id;
  console.log(customerID);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [name, setName] = useState('null');
  const [phone, setPhone] = useState('');
  const [totalSpent, setTotalSpent] = useState(0);
  const [time, setTime] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');
  const [transactions, setTransactions] = useState([]);

  const fetchCustomer = async () => {
    const data = {};

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://kami-backend-5rs0.onrender.com/Customers/${customerID}`,
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
      console.log(response.data);

      setUserData(response.data);
    } catch (err) {
      setError(err);
      console.error('Error:', err);
    }
  };
  useEffect(() => {
    fetchCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (userData === null) {
      return;
    }
    console.log('User name', userData.name);

    setName(userData.name);
    setPhone(userData.phone);
    setTotalSpent(userData.totalSpent);
    setTime(calculateElapsedTime(userData.createdAt));
    setLastUpdate(formatDate(userData.updatedAt));
    setTransactions(userData.transactions);
  }, [userData]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.InfoContainer}>
        <Text style={styles.heading}>General information</Text>
        <View>
          <Text style={styles.titleInfo}>
            Name:{' '}
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontSize: 16,
                fontWeight: 'normal',
              }}>
              {name}
            </Text>
          </Text>

          <Text style={styles.titleInfo}>
            Phone:{' '}
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontSize: 16,
                fontWeight: 'normal',
              }}>
              {phone}
            </Text>
          </Text>

          <Text style={styles.titleInfo}>
            Total spent:{' '}
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontSize: 16,
                fontWeight: 'normal',
              }}>
              {totalSpent}
            </Text>
          </Text>

          <Text style={styles.titleInfo}>
            Time:{' '}
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontSize: 16,
                fontWeight: 'normal',
              }}>
              {time}
            </Text>
          </Text>

          <Text style={styles.titleInfo}>
            Last update:{' '}
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontSize: 16,
                fontWeight: 'normal',
              }}>
              {lastUpdate}
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.InfoContainer}>
        <Text style={styles.heading}>Transaction history</Text>
        <View>{transactions.map((item, index) => {})}</View>
      </View>
    </ScrollView>
  );
};

export default CustomerDetail;
