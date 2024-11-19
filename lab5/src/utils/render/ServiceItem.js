import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {borderColor} from '../colorVariables';
import {formattedCurrency} from '../map';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: borderColor,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    marginHorizontal: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'left',
  },
});

const ServiceItem = ({item, onPress}) => {
  const formattedPrice = formattedCurrency(item.price);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title} numberOfLines={1}>
        {item.name}
      </Text>
      <Text numberOfLines={1}>{formattedPrice}</Text>
    </TouchableOpacity>
  );
};

export default ServiceItem;
