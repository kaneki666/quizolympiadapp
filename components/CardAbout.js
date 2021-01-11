import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Block, Text, theme} from 'galio-framework';

const CardAbout = ({
  title,
  sub,
  horizontal,
  full,
  style,
  image,
  imageStyle,
  key,
}) => {
  const imageStyles = [
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle,
  ];

  const CardAboutContainer = [styles.CardAbout, styles.shadow, style];
  const imgContainer = [
    styles.imageContainer,
    horizontal ? styles.horizontalStyles : styles.verticalStyles,
    styles.shadow,
  ];

  return (
    <Block row={horizontal} CardAbout flex style={CardAboutContainer} key={key}>
      <Block flex style={imgContainer}>
        <Image resizeMode="center" source={{uri: image}} style={imageStyles} />
      </Block>

      <Block flex space="between" style={styles.CardAboutDescription}>
        <Block flex>
          <Text
            style={{fontFamily: 'montserrat-regular', textAlign: 'center'}}
            size={14}>
            {title}
          </Text>

          <Block flex center>
            <Text
              style={{
                fontFamily: 'montserrat-regular',
                textAlign: 'center',
                padding: 15,
              }}
              size={14}
              color={'#9A9A9A'}>
              {sub}
            </Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  CardAbout: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
  },
  CardAboutTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15,
  },
  CardAboutDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 215,
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default CardAbout;
