import {Block} from 'galio-framework';
import React, {useState, useEffect} from 'react';

import {AnimatedCircularProgress} from 'react-native-circular-progress';

import {useTranslation} from 'react-i18next';
import {StyleSheet, Text} from 'react-native';

const QuestionFooter = ({myscore, question}) => {
  const {t} = useTranslation();

  const [progress, setProgress] = useState(10);

  let timer;

  useEffect(() => {
    setProgress(10);
    timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10,
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [question]);

  return (
    <Block>
      <AnimatedCircularProgress
        size={80}
        width={12}
        tintColor="#8898AA"
        backgroundColor="black"
        fill={progress}
        children={() => (
          <Text style={styles.timer}>{progress / 10}</Text>
        )}></AnimatedCircularProgress>
      <Text style={styles.score}>
        {myscore} {t('points')}
      </Text>
    </Block>
  );
};

export default QuestionFooter;

const styles = StyleSheet.create({
  score: {
    fontFamily: 'montserrat-bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
  timer: {
    fontFamily: 'montserrat-bold',
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
  },
});
