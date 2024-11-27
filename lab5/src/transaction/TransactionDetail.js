import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {formatDate, formattedCurrency} from '../utils/map';
import {borderColor, redApp} from '../utils/colorVariables';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flex: 1,
  },
  sectionWrapper: {
    padding: 10,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    marginVertical: 5,
  },
  subWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  heading: {
    fontSize: 17,
    fontWeight: '700',
    color: redApp,
    marginBottom: 7,
  },
  title: {
    flex: 1,
    fontSize: 15,
  },
  information: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlign: 'right',
    fontWeight: '700',
    fontSize: 16,
  },
  serviceDetailWrapper: {
    flexDirection: 'row',
    flex: 7,
    justifyContent: 'space-between',
    fontSize: 16,
  },
  servicePrice: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlign: 'right',
    fontWeight: '700',
    fontSize: 16,
  },
});

const TransactionDetail = ({route}) => {
  const item = route.params.item;
  const {id, customer, services, price, priceBeforePromotion} = item;
  const formattedDiscount = formattedCurrency(priceBeforePromotion - price);
  const formattedPriceBeforePromotion = formattedCurrency(priceBeforePromotion);
  const formattedAmountPayment = formattedCurrency(price);
  const formattedCreationTime = formatDate(customer.createdAt);

  console.log(item);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionWrapper}>
        <Text style={styles.heading}>General information</Text>
        <View style={styles.subWrapper}>
          <Text style={styles.title}>Transaction code</Text>
          <Text style={styles.information}>{id}</Text>
        </View>
        <View style={styles.subWrapper}>
          <Text style={styles.title}>Customer</Text>
          <Text style={styles.information}>{customer.name}</Text>
        </View>
        <View style={styles.subWrapper}>
          <Text style={styles.title}>Creation time</Text>
          <Text style={styles.information}>{formattedCreationTime}</Text>
        </View>
      </View>

      <View style={styles.sectionWrapper}>
        <Text style={styles.heading}>Services list</Text>
        <View>
          {services.map((service, index) => {
            return (
              <View style={styles.subWrapper} key={index}>
                <View style={styles.serviceDetailWrapper}>
                  <Text>{service.name}</Text>
                  <Text>x{service.quantity}</Text>
                </View>
                <Text style={styles.servicePrice}>
                  {formattedCurrency(service.price)}
                </Text>
              </View>
            );
          })}
        </View>
        <View
          style={[
            styles.subWrapper,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              borderTopWidth: 1,
              borderColor: borderColor,
              marginTop: 10,
              paddingTop: 20,
            },
          ]}>
          <Text style={[styles.title, {fontWeight: '700', color: '#5D5D5D'}]}>
            Total
          </Text>
          <Text style={styles.information}>
            {formattedPriceBeforePromotion}
          </Text>
        </View>
      </View>

      <View style={styles.sectionWrapper}>
        <Text style={styles.heading}>Cost</Text>
        <View style={styles.subWrapper}>
          <Text style={styles.title}>Amount of money</Text>
          <Text style={styles.information}>
            {formattedPriceBeforePromotion}
          </Text>
        </View>
        <View style={styles.subWrapper}>
          <Text style={styles.title}>Discount</Text>
          <Text style={styles.information}>{formattedDiscount}</Text>
        </View>
        <View
          style={[
            styles.subWrapper,
            {
              borderTopWidth: 1,
              borderColor: borderColor,
              marginTop: 15,
              paddingTop: 15,
            },
          ]}>
          <Text style={styles.title}>Total Payment</Text>
          <Text style={[styles.information, {fontSize: 20, color: redApp}]}>
            {formattedAmountPayment}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default TransactionDetail;
