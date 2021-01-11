import React, {useState} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  Pressable,
} from 'react-native';
import i18n from '../../../i18n';
const {width, height} = Dimensions.get('window');

export const SLIDE_HEIGHT = 0.61 * height;

const styles = StyleSheet.create({
  container: {
    width,
  },
  titleContainer: {
    height: 100,
    justifyContent: 'center',
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderBottomRightRadius: 75,
    marginLeft: 70,
    marginRight: 70,
    alignSelf: 'center',
  },
  hero: {
    fontSize: 70,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'montserrat-bold',
  },
  lng: {
    textAlign: 'right',
    margin: 10,
    fontFamily: 'montserrat-bold',
    fontSize: 20,
    color: 'white',
  },
});

const Slide = ({title, right, picture}) => {
  const [language, setLanguage] = useState('বাংলা');
  const transform = [
    {translateY: (SLIDE_HEIGHT - 100) / 2},
    {translateX: right ? width / 2 - 50 : -width / 2 + 50},
    {rotate: right ? '-90deg' : '90deg'},
  ];
  const changeLanguage = () => {
    if (language === 'বাংলা') {
      i18n.changeLanguage('bd');
      setLanguage('English');
    } else {
      i18n.changeLanguage('en');
      setLanguage('বাংলা');
    }
  };
  return (
    <View style={{width}}>
      <Pressable onPress={changeLanguage}>
        <Text style={styles.lng}>{language}</Text>
      </Pressable>
      <View style={styles.underlay}>
        <Image source={picture} style={styles.picture} resizeMode="cover" />
      </View>
      <View style={[styles.titleContainer, {transform}]}>
        <Text style={styles.hero}>{title}</Text>
      </View>
    </View>
  );
};

export default Slide;
