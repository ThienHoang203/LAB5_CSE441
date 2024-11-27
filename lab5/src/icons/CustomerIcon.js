import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomerIcon = ({focused, size, color}) => {
  const iconName = focused ? 'people-sharp' : 'people-outline';
  return <Icon name={iconName} size={size} color={color} />;
};

export default CustomerIcon;
