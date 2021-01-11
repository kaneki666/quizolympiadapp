import React from 'react';
import {StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {useTranslation} from 'react-i18next';
import CardAbout from '../../../components/CardAbout';
import CardAboutInverse from '../../../components/CardAboutInverse';

const {width} = Dimensions.get('screen');

const About = () => {
  const {t} = useTranslation();
  const features = [
    {
      title: t('fe1ti'),
      sub: t('fe1sub'),
      image:
        'https://raw.githubusercontent.com/kaneki666/quizserver/main/uploads/feat6.png?token=AJ4GLONGILR7UICINBTCBR27XYQ74',
    },
    {
      title: t('fe2ti'),
      sub: t('fe2sub'),
      image:
        'https://raw.githubusercontent.com/kaneki666/quizserver/main/uploads/feat1.png?token=AJ4GLON5A2ZGHDPJNX35TC27XYQZM',
    },
    {
      title: t('fe3ti'),
      sub: t('fe3sub'),
      image:
        'https://raw.githubusercontent.com/kaneki666/quizserver/main/uploads/feat2.png?token=AJ4GLOJFZANZR3SBGU5ZAD27XYQ4Q',
    },
    {
      title: t('fe4ti'),
      sub: t('fe3sub'),
      image:
        'https://raw.githubusercontent.com/kaneki666/quizserver/main/uploads/feat4.png?token=AJ4GLOIJSCYOH7QAIXHQKW27XYQ6S',
    },
    {
      title: t('fe5ti'),
      sub: t('fe5sub'),
      image:
        'https://raw.githubusercontent.com/kaneki666/quizserver/main/uploads/feat5.png?token=AJ4GLOIVRW6EPQSNCA6RIU27XYQ7G',
    },
    {
      title: t('fe6ti'),
      sub: t('fe6sub'),
      image:
        'https://raw.githubusercontent.com/kaneki666/quizserver/main/uploads/feat3.png?token=AJ4GLOLZYG5EWZV2FU7AW627XYQ52',
    },
  ];
  return (
    <Block flex center style={styles.Subjects}>
      <Text style={{fontFamily: 'montserrat-bold', fontSize: 20}}>
        {t('about')}
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          {features.map((item, i) =>
            i % 2 == 1 ? (
              <CardAbout
                title={item.title}
                sub={item.sub}
                horizontal
                key={i}
                image={item.image}
              />
            ) : (
              <CardAboutInverse
                title={item.title}
                sub={item.sub}
                key={i}
                image={item.image}
              />
            ),
          )}
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  Subjects: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
});

export default About;
