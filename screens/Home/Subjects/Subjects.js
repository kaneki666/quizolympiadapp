import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Block, theme} from 'galio-framework';

import {Card} from '../../../components';
import articles from '../../../constants/articles';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {Subject_Api} from '../../../constants/Api';
import CardInverese from '../../../components/CardInverese';
import {
  class6_subject,
  class7_subject,
  class8_subject,
  class9_10_subject,
} from '../../../constants/questionInfo';

import Timer from '../../../components/Timer';

const {width} = Dimensions.get('screen');

const Subjects = ({navigation}) => {
  const userData = useSelector((state) => state.authState);
  const myclass = userData.userinfo.myclass;
  const [subjects, setSubjects] = useState('');
  const [countdata, setcountdata] = useState();

  useEffect(() => {
    setTimeout(() => {
      Subject_Api(myclass).then((res) => setSubjects(res));
    }, 1800);

    if (myclass == '6') {
      setcountdata(class6_subject);
    } else if (myclass === '7') {
      setcountdata(class7_subject);
    } else if (myclass === '8') {
      setcountdata(class8_subject);
    } else {
      setcountdata(class9_10_subject);
    }
  }, [myclass]);

  const handlePress = (item) => {
    navigation.navigate('Chapters', {
      subject: item,
      myclass,
    });
  };

  const Article = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          {subjects &&
            subjects.map((item, i) =>
              i % 2 == 1 ? (
                <Card
                  subject={item}
                  item={articles[1]}
                  horizontal
                  key={Math.random()}
                  countdata={countdata}
                  onPress={() => handlePress(item)}
                  img={require('../../../assets/subjects.webp')}
                />
              ) : (
                <CardInverese
                  subject={item}
                  item={articles[0]}
                  horizontal
                  key={Math.random()}
                  countdata={countdata}
                  myclass={myclass}
                  onPress={() => handlePress(item)}
                  img={require('../../../assets/subjects.webp')}
                />
              ),
            )}
        </Block>
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

export default Subjects;
