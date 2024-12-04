/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {borderColor, redApp} from '../utils/colorVariables';
import {
  calculateElapsedTime,
  formatDate,
  formatDateShort,
  formattedCurrency,
} from '../utils/map';

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
  transactionContainer: {
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 8,
    marginVertical: 5,
    padding: 10,
  },
  detailTransactionContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailTransactionWrapper: {
    flex: 5,
  },
  priceTransactionWrapper: {
    flex: 3,
  },
  priceTransactionText: {
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '700',
    color: redApp,
  },
});

const renderServiceTransaction = ({item}) => {
  return (
    <Text style={{marginVertical: 1}} numberOfLines={1}>
      - {item.name}
    </Text>
  );
};

const renderTransactionHistory = ({item}) => {
  return (
    <TouchableOpacity style={styles.transactionContainer} id={item.id}>
      <Text style={[styles.detailText, {fontWeight: '700'}]} numberOfLines={1}>
        {item.id} {'-'} {formatDateShort(item.createdAt)}
      </Text>
      <View style={[styles.detailTransactionContainer, {marginTop: 5}]}>
        <View style={styles.detailTransactionWrapper}>
          <FlatList
            data={item.services}
            renderItem={renderServiceTransaction}
            // eslint-disable-next-line no-shadow
            keyExtractor={item => item._id}
          />
        </View>

        <View style={styles.priceTransactionWrapper}>
          <Text style={styles.priceTransactionText} numberOfLines={1}>
            {formattedCurrency(item.price)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CustomerDetail = ({route}) => {
  const customerID = route.params.item.id;
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

    setName(userData.name);
    setPhone(userData.phone);
    setTotalSpent(userData.totalSpent);
    setTime(calculateElapsedTime(userData.createdAt));
    setLastUpdate(formatDate(userData.updatedAt));
    setTransactions(userData.transactions);
    console.log(userData.transactions);
  }, [userData]);
  return (
    <View style={styles.container}>
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
        <FlatList
          data={transactions}
          renderItem={renderTransactionHistory}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default CustomerDetail;
