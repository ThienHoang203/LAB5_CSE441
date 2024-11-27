import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from './home/Home';
import HomeHeader from './headerCustom/HomeHeader';
import {useSelector} from 'react-redux';
import Customer from './customer/Customer';
import CustomHeader from './headerCustom/CustomHeader';
import Transaction from './transaction/Transaction';
import Setting from './setting/Setting';
import HomeIcon from './icons/HomeIcon';
import {redApp} from './utils/colorVariables';
import CustomerIcon from './icons/CustomerIcon';
import TransactionIcon from './icons/TransactionIcon';
import SettingIcon from './icons/SettingIcon';

const Tab = createBottomTabNavigator();
const custom = {
  headerHome: title => <HomeHeader headingTitle={title} />,
  headerCustomer: () => <CustomHeader title="Customer" />,
  headerTransaction: () => <CustomHeader title="Transaction" />,
  headerSetting: () => <CustomHeader title="Setting" />,
  HomeIcon: ({focused, color, size}) => (
    <HomeIcon focused={focused} color={color} size={size} />
  ),
  CustomerIcon: ({focused, color, size}) => (
    <CustomerIcon focused={focused} color={color} size={size} />
  ),
  TransactionIcon: ({focused, color, size}) => (
    <TransactionIcon focused={focused} color={color} size={size} />
  ),
  SettingIcon: ({focused, color, size}) => (
    <SettingIcon focused={focused} color={color} size={size} />
  ),
};

// const customTabBar = props => <CustomerTabBar {...props} />;
const MenuScreen = () => {
  const homeTitle = useSelector(state => state.userInfo.info.name);
  console.log(homeTitle);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: redApp,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          header: () =>
            custom.headerHome(
              typeof homeTitle === 'undefined' ? 'Home' : homeTitle,
            ),
          tabBarIcon: ({focused, color, size}) =>
            custom.HomeIcon({focused: focused, color: color, size: size}),
        }}
      />
      <Tab.Screen
        name="Customer"
        component={Customer}
        options={{
          header: () => custom.headerCustomer(),
          tabBarIcon: ({focused, color, size}) =>
            custom.CustomerIcon({focused: focused, color: color, size: size}),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          header: () => custom.headerTransaction(),
          tabBarIcon: ({focused, color, size}) =>
            custom.TransactionIcon({
              focused: focused,
              color: color,
              size: size,
            }),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          header: () => custom.headerSetting(),
          tabBarIcon: ({focused, color, size}) =>
            custom.SettingIcon({focused: focused, color: color, size: size}),
        }}
      />
    </Tab.Navigator>
  );
};

export default MenuScreen;
