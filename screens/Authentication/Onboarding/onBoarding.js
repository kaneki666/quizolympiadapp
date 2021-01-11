import React, {useRef} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {multiply, divide} from 'react-native-reanimated';
import {useValue, onScrollEvent, interpolateColor} from 'react-native-redash';

import Slide, {SLIDE_HEIGHT} from './Slide';

import Subslide from './Subslide';
import Dot from './Dot';
import {useTranslation} from 'react-i18next';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: 40,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width,
  },
});

const OnBoarding = ({navigation}) => {
  const scroll = useRef(null);
  let x = useValue(0);
  const {t} = useTranslation();
  const slides = [
    {
      title: t('feat4title'),
      color: '#BFEAF5',
      picture: require('../../../assets/3.png'),
      subtitle: t('feat4ti'),
      des: t('feat4sub'),
    },
    {
      title: t('feat1title'),
      color: '#BEECC4',
      picture: require('../../../assets/1.png'),
      subtitle: t('feat1ti'),
      des: t('feat1sub'),
    },
    {
      title: t('feat2title'),
      color: '#FFE4D9',
      picture: require('../../../assets/4.png'),
      subtitle: t('feat2ti'),
      des: t('feat2sub'),
    },
    {
      title: t('feat3title'),
      color: '#F1E0FF',
      picture: require('../../../assets/12.png'),
      subtitle: t('feat3ti'),
      des: t('feat3sub'),
    },
  ];

  const onScroll = onScrollEvent({x});
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, {backgroundColor}]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          {...{onScroll}}>
          {slides.map(({title, picture}, index) => (
            <Slide key={index} right={!!(index % 2)} {...{title, picture}} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{...StyleSheet.absoluteFillObject, backgroundColor}}
        />
        <View style={styles.footerContent}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} currentIndex={divide(x, width)} {...{index}} />
            ))}
          </View>
          <Animated.View
            style={{
              flexDirection: 'row',
              width: width * slides.length,
              flex: 1,
              transform: [{translateX: multiply(x, -1)}],
            }}>
            {slides.map(({subtitle, des}, index) => {
              const last = index === slides.length - 1;
              return (
                <Subslide
                  key={index}
                  {...{last}}
                  {...{subtitle, des}}
                  onPress={() => {
                    if (last) {
                      navigation.navigate('Login');
                    } else {
                      scroll.current?.getNode().scrollTo({
                        x: width * (index + 1),
                        animated: true,
                      });
                    }
                  }}
                />
              );
            })}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default OnBoarding;
