import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import {borderColor, redApp} from '../colorVariables';
import {formattedCurrency} from '../map';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: borderColor,
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loyaltyWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 30,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

const CustomerItem = ({item, onPress}) => {
  const {name, phone, loyalty, totalSpent} = item;
  const spentAmount = formattedCurrency(totalSpent);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Text style={[styles.text, {fontWeight: '700'}]}>
          <Text>Customer:</Text> {name}
        </Text>
        <Text style={[styles.text, {fontWeight: '700'}]}>
          <Text>Phone:</Text> {phone}
        </Text>
        <Text style={[styles.text, {fontWeight: '700'}]}>
          Total money: <Text style={{color: redApp}}>{spentAmount}</Text>
        </Text>
      </View>
      <View style={styles.loyaltyWrapper}>
        <Icon name="crown" size={30} color={redApp} />
        <Text style={[styles.text, {color: redApp, fontWeight: '700'}]}>
          {loyalty}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomerItem;
