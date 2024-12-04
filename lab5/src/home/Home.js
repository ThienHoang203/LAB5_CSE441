import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {redApp} from '../utils/colorVariables';
import axios from 'axios';
import {mapServices} from '../utils/map';
import ServiceItem from '../utils/render/ServiceItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 100,
  },
  body: {
    marginTop: 30,
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '3%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    height: 35,
    marginBottom: 15,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
    height: '100%',
  },
  icon: {
    color: redApp,
    fontSize: 35,
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

const Home = () => {
  const navigation = useNavigation();
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const handlePressService = item => {
    navigation.navigate('ServicesDetail', {item: item});
  };
  const handlePressAddButton = () => {
    navigation.navigate('ServiceAdd');
  };
  const fetchServices = async () => {
    const data = {};

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://kami-backend-5rs0.onrender.com/services',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      const response = await axios(config);
      if (typeof response.data === 'undefined') {
        return;
      }
      const arr = [...response.data];
      const mappedServices = arr.map(item => mapServices(item));
      setServices(mappedServices);
      // console.log(mappedServices);
    } catch (err) {
      setError(err);
      console.error('Error:', err);
    }
  };

  const renderItem = ({item}) => {
    return (
      <ServiceItem
        item={item}
        onPress={() => {
          handlePressService(item);
        }}
      />
    );
  };

  useFocusEffect(
    useCallback(() => {
      fetchServices();
      return () => {
        console.log('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/kami-spa.jpg')}
        style={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.body}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Danh sách dịch vụ</Text>
          <TouchableOpacity onPress={handlePressAddButton}>
            <Icon name="plus-circle" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.list}
          data={services}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default Home;
