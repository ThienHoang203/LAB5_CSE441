import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from './home/Home';
import HomeHeader from './headerCustom/HomeHeader';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {redApp} from './utils/colorVariables';
const Tab = createBottomTabNavigator();
const custom = {
  headerHome: title => {
    return HomeHeader(title);
  },
  iconHome: () => <Icon name="home" size={25} color={redApp} />,
};

const MenuScreen = () => {
  const homeTitle = useSelector(state => state.userInfo.info.name);
  console.log(homeTitle);

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          header: () =>
            custom.headerHome(
              typeof homeTitle === 'undefined' ? 'Home' : homeTitle,
            ),
          tabBarIcon: custom.iconHome,
        }}
      />
    </Tab.Navigator>
  );
};

export default MenuScreen;
