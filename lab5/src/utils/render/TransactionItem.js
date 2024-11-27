import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {borderColor, redApp} from '../colorVariables';
import {formatDateShort, formattedCurrency} from '../map';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  detailWrapper: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  detailTimeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: 11,
  },
  customerNameText: {
    color: '#8F8F8F',
    marginTop: 5,
  },
  priceWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  priceText: {
    fontSize: 15,
    color: redApp,
    fontWeight: '700',
    textAlign: 'right',
  },
});

const TransactionItem = ({item, onPress}) => {
  const {id, customer, price, services, status} = item;
  const customerName = customer.name;
  const formattedDate = formatDateShort(customer.createdAt);
  const formattedPrice = formattedCurrency(price);

  const renderItem = ({item}) => {
    return (
      <View>
        <Text style={{marginTop: 5}} numberOfLines={1}>
          - {item.name}
        </Text>
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.detailWrapper}>
        <View style={styles.detailTimeWrapper}>
          <Text
            style={[styles.detailText, {fontWeight: '700'}]}
            numberOfLines={1}>
            {id} {'-'} {formattedDate}
          </Text>
          <Text style={{fontWeight: '700', color: redApp}}> - {status}</Text>
        </View>

        <View>
          <FlatList
            data={services}
            initialNumToRender={2}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        </View>
        <Text
          style={[styles.detailText, styles.customerNameText]}
          numberOfLines={1}>
          Customer: {customerName}
        </Text>
      </View>
      <View style={styles.priceWrapper}>
        <Text numberOfLines={1} style={styles.priceText}>
          {formattedPrice}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;
