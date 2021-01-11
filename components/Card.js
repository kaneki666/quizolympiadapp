import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';
import {Block, Text, theme} from 'galio-framework';

import {nowTheme} from '../constants';
import {useTranslation} from 'react-i18next';

const Card = ({
  horizontal,
  full,
  style,
  ctaColor,
  imageStyle,
  onPress,
  titleStyle,
  subject,
  countdata,
  img,
}) => {
  const {t} = useTranslation();
  const imageStyles = [
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle,
  ];
  const titleStyles = [styles.cardTitle, titleStyle];
  const cardContainer = [styles.card, styles.shadow, style];
  const imgContainer = [
    styles.imageContainer,
    horizontal ? styles.horizontalStyles : styles.verticalStyles,
    styles.shadow,
  ];

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Block
        row={horizontal}
        card
        flex
        style={cardContainer}
        key={Math.random()}>
        <Block flex style={imgContainer}>
          <Image resizeMode="cover" source={img} style={imageStyles} />
        </Block>

        <Block flex space="between" style={styles.cardDescription}>
          <Block flex>
            <Text
              style={{fontFamily: 'montserrat-regular'}}
              size={14}
              style={titleStyles}
              color={nowTheme.COLORS.SECONDARY}>
              {subject}
            </Text>

            {countdata &&
              countdata.map((i, index) => {
                if (i.item === subject) {
                  return (
                    <Block flex center key={index}>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                        }}
                        size={14}
                        style={titleStyles}
                        color={'#9A9A9A'}>
                        {t('totalchap')} {i.value}
                      </Text>
                    </Block>
                  );
                }
                return true;
              })}
          </Block>

          <Block>
            <Text
              style={styles.articleButton}
              size={12}
              muted={!ctaColor}
              color={ctaColor || nowTheme.COLORS.ACTIVE}
              bold>
              {t('viewchapters')}
            </Text>
          </Block>
        </Block>
      </Block>
    </TouchableWithoutFeedback>
  );
};

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15,
  },
  cardDescription: {
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
    height: 160,
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
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
});

export default Card;
