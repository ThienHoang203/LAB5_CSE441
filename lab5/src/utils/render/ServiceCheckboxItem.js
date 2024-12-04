/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {
  addServiceDetail,
  updateServiceQuantity,
} from '../../store/servicesSlice';
import {formattedCurrency} from '../map';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';
import {borderColor} from '../colorVariables';

const ServiceCheckboxItem = ({item}) => {
  const userData = useSelector(state => state.userInfo.info);

  const {price, _id} = item;
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [executor, setExecutor] = useState({});
  const [executorName, setExecuterName] = useState('Executor');
  const renderItem = item => {
    return (
      <View style={styleDropdown.item}>
        <Text style={styleDropdown.textItem}>{item.name}</Text>
        {item._id === executor._id && (
          <Icon
            style={styleDropdown.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
        <Text>id: {item._id}</Text>
      </View>
    );
  };

  const handleMinus = () => {
    setQuantity(quantity > 0 ? quantity - 1 : quantity);
    setTotalPrice(quantity > 0 ? price * (quantity - 1) : totalPrice);
  };

  const handlePlus = () => {
    setQuantity(quantity < 10 ? quantity + 1 : quantity);
    setTotalPrice(quantity < 10 ? price * (quantity + 1) : totalPrice);
  };

  useEffect(() => {
    dispatch(
      addServiceDetail({
        _id: _id,
        quantity: 0,
        basePrice: price,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(
      updateServiceQuantity({
        _id: _id,
        quantity: quantity,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  useEffect(() => {
    if (!check) {
      dispatch(
        addServiceDetail({
          _id: _id,
          quantity: 0,
          basePrice: price,
        }),
      );
    } else {
      dispatch(
        addServiceDetail({
          _id: _id,
          quantity: quantity,
          userID:
            typeof executor._id === 'undefined' ? 'unknown' : executor._id,
          basePrice: price,
        }),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check, executor]);

  // const service = useSelector(state => state.services.services[item._id]);
  // useEffect(() => {
  //   console.log(service);
  // }, [service]);

  return (
    <View key={item._id} style={{padding: 10}}>
      <BouncyCheckbox
        size={25}
        fillColor="#FFC484"
        unFillColor="#FFFFFF"
        text={item.name}
        iconStyle={{borderColor: 'red'}}
        innerIconStyle={{borderWidth: 2}}
        textStyle={{
          fontFamily: 'JosefinSans-Regular',
          textDecorationLine: 'none',
        }}
        onPress={isChecked => {
          setCheck(isChecked);
        }}
      />
      <View
        style={[
          {
            display: check ? 'flex' : 'none',
          },
        ]}>
        <View style={styles.quantityWrapper}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={handleMinus} style={styles.btn}>
              <Text style={styles.text}>-</Text>
            </TouchableOpacity>
            <View style={styles.btn}>
              <Text style={styles.text}>{quantity}</Text>
            </View>
            <TouchableOpacity onPress={handlePlus} style={styles.btn}>
              <Text style={styles.text}>+</Text>
            </TouchableOpacity>
          </View>

          <Dropdown
            style={styleDropdown.dropdown}
            placeholderStyle={styleDropdown.placeholderStyle}
            selectedTextStyle={styleDropdown.selectedTextStyle}
            inputSearchStyle={styleDropdown.inputSearchStyle}
            iconStyle={styleDropdown.iconStyle}
            data={[{_id: userData._id, name: userData.name}]}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={executorName}
            searchPlaceholder="Search..."
            value={executor._id}
            onChange={item => {
              setExecutor(item);
              setExecuterName(item.name);
            }}
            renderItem={renderItem}
            searchField={'name'}
          />
        </View>

        <View>
          <Text>Price: {formattedCurrency(totalPrice)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    flex: 2,
  },
  quantityWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'green',
  },
  btn: {
    width: 40,
    height: 40,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: borderColor,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
  },
});

const styleDropdown = StyleSheet.create({
  dropdown: {
    flex: 3,
    margin: 10,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderWidth: 1,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default ServiceCheckboxItem;
