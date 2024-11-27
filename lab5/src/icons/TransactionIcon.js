import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const TransactionIcon = ({focused, size, color}) => {
  const iconName = focused ? 'cash' : 'cash-outline';
  return <Icon name={iconName} size={size} color={color} />;
};

export default TransactionIcon;
