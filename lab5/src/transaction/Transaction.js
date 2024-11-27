import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {redApp} from '../utils/colorVariables';
import Icon from 'react-native-vector-icons/AntDesign';
import TransactionItem from '../utils/render/TransactionItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    position: 'relative',
  },
  iconWrapper: {
    position: 'absolute',
    bottom: 30,
    left: '90%',
  },
});

const Transaction = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState(null);
  const [error, setError] = useState('');
  const [pressed, setPressed] = useState(false);
  const fetchTransactions = async () => {
    const data = {};

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://kami-backend-5rs0.onrender.com/transactions',
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
      setTransactions(response.data);
    } catch (err) {
      setError(err);
      console.error('Error:', err);
    }
  };
  const handlePressAddIcon = () => {
    navigation.navigate('CustomerAdd');
  };

  const handlePressTransaction = item => {
    navigation.navigate('TransactionDetail', {item: item});
  };

  const renderItem = ({item}) => {
    return (
      <TransactionItem
        item={item}
        onPress={() => {
          handlePressTransaction(item);
        }}
      />
    );
  };

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
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
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        maxToRenderPerBatch={2}
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

export default Transaction;
