import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, Text} from 'react-native';

import {RectButton} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 44,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 10,
    fontSize: 24,
    lineHeight: 30,
    fontFamily: 'montserrat-bold',
  },
  des: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 15,
    lineHeight: 24,
    fontFamily: 'montserrat-regular',
  },
  containers: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export const Button = ({variant, label, onPress, children}) => {
  const backgroundColor =
    variant === 'primary' ? '#6163ff' : 'rgba(12, 12, 52, 0.05)';
  const color = variant === 'primary' ? 'white' : '#0C0D34';
  return (
    <RectButton style={[styles.containers, {backgroundColor}]} {...{onPress}}>
      {children ? (
        children
      ) : (
        <Text variant="button" style={{color}}>
          {label}
        </Text>
      )}
    </RectButton>
  );
};
const Subslide = ({subtitle, des, last, onPress}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.des}>{des}</Text>
      <Button
        children=""
        {...{onPress}}
        label={last ? t('login') : t('next')}
        variant={last ? 'primary' : 'default'}
      />
    </View>
  );
};

export default Subslide;
