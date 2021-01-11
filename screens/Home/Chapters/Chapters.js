import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Block, theme} from 'galio-framework';

import {Card} from '../../../components';
import articles from '../../../constants/articles';
import {ScrollView} from 'react-native-gesture-handler';
import {Chapters_Api} from '../../../constants/Api';
import CardInverese from '../../../components/CardInverese';
import Timer from '../../../components/Timer';

const {width} = Dimensions.get('screen');

const Chapters = ({route, navigation}) => {
  const {subject, myclass} = route.params;
  const [subjects, setSubjects] = useState('');
  const api_data = {subject, myclass};

  useEffect(() => {
    setTimeout(() => {
      Chapters_Api(api_data).then((res) => setSubjects(res));
    }, 1800);
  }, [api_data]);
  const handlePress = (item) => {
    navigation.navigate('Mode', {
      subject: subject,
      chapter: item,
      myclass,
    });
  };
  const Article = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        {subjects !== '' ? (
          <Block flex>
            {subjects &&
              subjects.map((item, i) =>
                i % 2 == 1 ? (
                  <Card
                    subject={item}
                    item={articles[1]}
                    horizontal
                    key={i}
                    onPress={() => handlePress(item)}
                    img={require('../../../assets/chapters.webp')}
                  />
                ) : (
                  <CardInverese
                    subject={item}
                    item={articles[0]}
                    horizontal
                    key={i}
                    onPress={() => handlePress(item)}
                    img={require('../../../assets/chapters.webp')}
                  />
                ),
              )}
          </Block>
        ) : (
          <Timer />
        )}
      </ScrollView>
    );
  };

  return (
    <Block flex>
      {subjects !== '' && subjects.length > 2 ? (
        <Block flex center style={styles.Subjects}>
          <Article />
        </Block>
      ) : (
        <Timer />
      )}
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

export default Chapters;
