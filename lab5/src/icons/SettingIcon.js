import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingIcon = ({focused, size, color}) => {
  const iconName = focused ? 'settings' : 'settings-outline';
  return <Icon name={iconName} size={size} color={color} />;
};

export default SettingIcon;
