import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {updateCustomer} from '../../store/customerSlice';

const DropdownComponent = ({dataParam}) => {
  const dispatch = useDispatch();
  const [customerInfo, setCustomerInfo] = useState({});

  const data = dataParam;

  const handleSelectCustomer = item => {
    dispatch(updateCustomer(item));
    setCustomerInfo(item);
  };

  const renderItem = item => {
    return (
      <View style={styleDropdown.item}>
        <Text style={styleDropdown.textItem}>{item.name}</Text>
        {item.id === customerInfo.id && (
          <Icon
            style={styleDropdown.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
        <Text>{item.id}</Text>
      </View>
    );
  };

  return (
    <Dropdown
      style={styleDropdown.dropdown}
      placeholderStyle={styleDropdown.placeholderStyle}
      selectedTextStyle={styleDropdown.selectedTextStyle}
      inputSearchStyle={styleDropdown.inputSearchStyle}
      iconStyle={styleDropdown.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={
        Object.keys(customerInfo).length === 0
          ? 'Select customer'
          : customerInfo.name
      }
      searchPlaceholder="Search..."
      value={Object.keys(customerInfo).length === 0 ? '' : customerInfo.id}
      onChange={handleSelectCustomer}
      renderItem={renderItem}
      searchField={'name'}
    />
  );
};

export default DropdownComponent;

const styleDropdown = StyleSheet.create({
  dropdown: {
    margin: 16,
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

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
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
