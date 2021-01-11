import React from 'react';
import {StyleSheet, ScrollView, Linking, Pressable} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Entypo';
import {nowTheme} from '../../../constants';

const Privacy = () => {
  const {t} = useTranslation();
  const policysub = [t('policy1'), t('policy2')];
  const infosub = [t('infouse1'), t('infouse1')];
  const servicesub = [
    t('sevicepont1'),
    t('sevicepont2'),
    t('sevicepont3'),
    t('sevicepont4'),
  ];
  return (
    <ScrollView showsHorizontalScrollIndicator={false} style={styles.settings}>
      <Block center style={styles.title}>
        <Text
          style={{fontFamily: 'montserrat-bold', paddingBottom: 5}}
          size={theme.SIZES.BASE}
          color={nowTheme.COLORS.TEXT}>
          {t('privacypolicy')}
        </Text>
        {policysub.map((item, i) => (
          <Text
            key={i}
            style={{fontFamily: 'montserrat-regular', margin: 5}}
            size={12}
            color={nowTheme.COLORS.CAPTION}
            color={nowTheme.COLORS.TEXT}>
            {item}
          </Text>
        ))}
      </Block>
      <Block center style={styles.title}>
        <Text
          style={{fontFamily: 'montserrat-bold', paddingBottom: 5}}
          size={theme.SIZES.BASE}
          color={nowTheme.COLORS.TEXT}>
          {t('infouse')}
        </Text>
        {infosub.map((item, i) => (
          <Text
            key={i}
            style={{fontFamily: 'montserrat-regular', margin: 5}}
            size={12}
            color={nowTheme.COLORS.CAPTION}
            color={nowTheme.COLORS.TEXT}>
            {item}
          </Text>
        ))}
        <Pressable
          onPress={() =>
            Linking.openURL('https://policies.google.com/privacy')
          }>
          <Text
            style={{
              fontFamily: 'montserrat-bold',
              textAlign: 'center',
              color: '#3273dc',
            }}
            size={12}
            color={nowTheme.COLORS.CAPTION}
            color={nowTheme.COLORS.TEXT}>
            Google Play Services
          </Text>
        </Pressable>
      </Block>
      <Block center style={styles.title}>
        <Text
          style={{fontFamily: 'montserrat-bold', paddingBottom: 5}}
          size={theme.SIZES.BASE}
          color={nowTheme.COLORS.TEXT}>
          {t('logdata')}
        </Text>

        <Text
          style={{fontFamily: 'montserrat-regular', margin: 5}}
          size={12}
          color={nowTheme.COLORS.CAPTION}
          color={nowTheme.COLORS.TEXT}>
          {t('logsub')}
        </Text>
      </Block>
      <Block center style={styles.title}>
        <Text
          style={{fontFamily: 'montserrat-bold', paddingBottom: 5}}
          size={theme.SIZES.BASE}
          color={nowTheme.COLORS.TEXT}>
          {t('cookies')}
        </Text>

        <Text
          style={{fontFamily: 'montserrat-regular', margin: 5}}
          size={12}
          color={nowTheme.COLORS.CAPTION}
          color={nowTheme.COLORS.TEXT}>
          {t('cookiesusb')}
        </Text>
      </Block>
      <Block center style={styles.title}>
        <Text
          style={{fontFamily: 'montserrat-bold', paddingBottom: 5}}
          size={theme.SIZES.BASE}
          color={nowTheme.COLORS.TEXT}>
          {t('serviceprovider')}
        </Text>
        <Text
          style={{fontFamily: 'montserrat-regular', margin: 5}}
          size={12}
          color={nowTheme.COLORS.CAPTION}
          color={nowTheme.COLORS.TEXT}>
          {t('serviceprovidersub')}
        </Text>
      </Block>
      {servicesub.map((item, i) => (
        <Block key={i}>
          <Text
            style={{
              fontFamily: 'montserrat-regular',
              margin: 5,
            }}
            size={12}
            color={nowTheme.COLORS.CAPTION}
            color={nowTheme.COLORS.TEXT}>
            <Icon name="dot-single" size={16} /> {item}
          </Text>
        </Block>
      ))}
      <Block center style={styles.title}>
        <Text
          style={{fontFamily: 'montserrat-bold', paddingBottom: 5}}
          size={theme.SIZES.BASE}
          color={nowTheme.COLORS.TEXT}>
          {t('security')}
        </Text>
        <Text
          style={{fontFamily: 'montserrat-regular', margin: 5}}
          size={12}
          color={nowTheme.COLORS.CAPTION}
          color={nowTheme.COLORS.TEXT}>
          {t('securitysub')}
        </Text>
      </Block>
      <Block center style={styles.title}>
        <Text
          style={{fontFamily: 'montserrat-bold', paddingBottom: 5}}
          size={theme.SIZES.BASE}
          color={nowTheme.COLORS.TEXT}>
          {t('childrenpolicy')}
        </Text>
        <Text
          style={{fontFamily: 'montserrat-regular', margin: 5}}
          size={12}
          color={nowTheme.COLORS.CAPTION}
          color={nowTheme.COLORS.TEXT}>
          {t('childrenpolicysub')}
        </Text>
      </Block>
      <Block center style={styles.title}>
        <Text
          style={{fontFamily: 'montserrat-bold', paddingBottom: 5}}
          size={theme.SIZES.BASE}
          color={nowTheme.COLORS.TEXT}>
          {t('contactus')}
        </Text>
        <Text
          style={{fontFamily: 'montserrat-regular', margin: 5}}
          size={12}
          color={nowTheme.COLORS.CAPTION}
          color={nowTheme.COLORS.TEXT}>
          {t('contactussub')}
        </Text>
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  settings: {
    paddingVertical: theme.SIZES.BASE / 3,
    margin: 10,
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2,
  },
});

export default Privacy;
