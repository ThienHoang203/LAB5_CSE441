import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {borderColor} from '../utils/colorVariables';
import {formattedCurrency} from '../utils/map';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: borderColor,
    padding: 10,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  title: {
    fontWeight: '700',
  },
});

const ServicesDetail = ({route}) => {
  const {name, price, createdBy, createdAt, updatedAt} = route.params.item;
  const formattedPrice = formattedCurrency(price);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.title}>Service name:</Text> {name}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.title}>Price:</Text> {formattedPrice}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.title}>Creator:</Text> {createdBy}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.title}>Time:</Text> {createdAt}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.title}>Final update:</Text> {updatedAt}
      </Text>
    </View>
  );
};

export default ServicesDetail;
