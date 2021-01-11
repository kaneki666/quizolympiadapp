import React from 'react';
import {ImageBackground, StyleSheet, Dimensions} from 'react-native';
import {Block, Button, Text, theme} from 'galio-framework';
import {nowTheme} from '../../../constants';
import {useTranslation} from 'react-i18next';
import Theme from '../../../constants/Theme';

const {height, width} = Dimensions.get('screen');

const Mode = ({navigation, route}) => {
  const {t} = useTranslation();
  const {subject, myclass, chapter} = route.params;
  return (
    <Block flex>
      <Block flex center>
        <ImageBackground
          resizeMode="stretch"
          source={require('../../../assets/challenge.webp')}
          style={{height: height * 0.4, width, zIndex: 1}}
        />
      </Block>

      <Block flex space="between" style={styles.padded}>
        <Block middle flex space="around" style={{marginTop: 50}}>
          <Block center style={styles.title}>
            <Block row>
              <Text color="black" size={34} style={styles.font}>
                {t('choosemode')}
              </Text>
            </Block>
          </Block>

          <Block center>
            <Button
              style={styles.button}
              color={nowTheme.COLORS.PRIMARY}
              onPress={() =>
                navigation.navigate('SinglePlayer', {
                  api_data: {
                    subject,
                    myclass,
                    chapter,
                  },
                })
              }>
              {t('single')}
            </Button>
            <Button
              style={styles.button}
              color={nowTheme.COLORS.PRIMARY}
              onPress={() =>
                navigation.navigate('Challenge', {
                  api_data: {
                    subject,
                    myclass,
                    chapter,
                  },
                })
              }>
              {t('multiplay')}
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  padded: {
    top: 270,
    position: 'absolute',
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  title: {
    marginTop: '-5%',
  },
  subTitle: {
    marginTop: 20,
  },
  Mode: {
    backgroundColor: nowTheme.COLORS.BLACK,
    paddingHorizontal: 8,
    marginLeft: 3,
    borderRadius: 4,
    height: 22,
    marginTop: 0,
  },
  font: {
    fontFamily: 'montserrat-bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Mode;
