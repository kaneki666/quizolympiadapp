import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Block, Text, theme, Icon} from 'galio-framework';
import {useTranslation} from 'react-i18next';
import {nowTheme} from '../../../constants';

const UserAgreements = () => {
  const {t} = useTranslation();
  const eulasub = [
    t('eula1'),
    t('eula2'),
    t('eula3'),
    t('eula4'),
    t('eula5'),
    t('eula6'),
  ];
  return (
    <ScrollView showsHorizontalScrollIndicator={false} style={styles.settings}>
      <Block center style={styles.title}>
        <Text
          style={{fontFamily: 'montserrat-bold', paddingBottom: 5}}
          size={theme.SIZES.BASE}
          color={nowTheme.COLORS.TEXT}>
          {t('eulatitle')}
        </Text>
        {eulasub.map((item, i) => (
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

export default UserAgreements;
