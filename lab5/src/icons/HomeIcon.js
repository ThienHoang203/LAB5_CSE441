import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {redApp} from '../utils/colorVariables';

const HomeIcon = ({focused, size, color}) => {
  const iconName = focused ? 'home' : 'home-outline';
  return <Icon name={iconName} size={size} color={color} />;
};

export default HomeIcon;
