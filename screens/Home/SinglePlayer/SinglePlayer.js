import React, {useEffect, useState} from 'react';
import {Block} from 'galio-framework';
import {getQuestionsSingle, Save_SingleStats_api} from '../../../constants/Api';
import {Dimensions, ImageBackground, StyleSheet, Text} from 'react-native';
import ButtonAns from '../../../components/ButtonAns';
import {useTranslation} from 'react-i18next';

import {ProgressBar} from '@react-native-community/progress-bar-android';
import Question from '../../../components/QuestionFooter';
import {useSelector} from 'react-redux';
import Theme from '../../../constants/Theme';

const {width, height} = Dimensions.get('window');

const SinglePlayer = ({route, navigation}) => {
  const {api_data} = route.params;
  const name = useSelector((state) => state.authState.userinfo.username);
  const [data, setData] = useState('');
  const [question, setQuestion] = useState('');
  const [randomChoice, setRandomchoice] = useState([]);
  const [quenno, setQuen] = useState(0);
  let [myscore, setMyScore] = useState(0);
  const [disabled, setDisabled] = useState(false);
  let [my_stats, setMyStats] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      getQuestionsSingle(api_data).then((res) => setData(res));
    }, 2000);
  }, []);

  useEffect(() => {
    if (data !== '') {
      data.forEach(function (item, index) {
        setTimeout(function () {
          setQuestion(item);

          setQuen(() => {
            const val = (parseInt(index) + 1) / 10;

            return val;
          });
          const choices = [item.opt_1, item.opt_2, item.opt_3];
          const randomIndex = parseInt((Math.random() * 100) % 4);
          choices.splice(randomIndex, 0, item.correct_ans);
          setRandomchoice(choices);
        }, 10000 * index + 1);
      });
    }
  }, [data]);

  useEffect(() => {
    setDisabled(false);
  }, [question]);

  useEffect(() => {
    if (quenno * 10 === 10) {
      setTimeout(() => {
        let save_data = {
          name,
          my_stats,
          myscore,
        };
        Save_SingleStats_api(save_data);
        navigation.navigate('ResultDetails', {item: save_data});
      }, 10000);
    }
  }, [my_stats, myscore]);

  const handleAnswer = (e, i) => {
    setTimeout(() => {
      setDisabled(true);
    }, 200);

    setMyStats((oldArray) => [
      ...oldArray,
      {
        question: question.question,
        correctanswer: question.correct_ans,
        myanswer: e,
      },
    ]);

    if (e === question.correct_ans) {
      setMyScore((myscore += 10));
    }
    return e === question.correct_ans;
  };

  const {t} = useTranslation();

  return (
    <>
      {question === '' ? (
        <Block flex>
          <Block flex={0.8}>
            <ImageBackground
              source={require('../../../assets/waiting.webp')}
              style={{height: height * 0.8, width: width}}
            />
          </Block>
          <Block flex flex={0.2}>
            <Text style={styles.waiting}>{t('singlewait')}</Text>
            <Text style={styles.waiting}>{t('gamesub')}</Text>
          </Block>
        </Block>
      ) : (
        <Block
          flex
          style={{
            backgroundColor: '#5b4dbe',
          }}>
          <Block
            flex={0.3}
            center
            style={{
              backgroundColor: '#5b4dbe',
              width: width,
            }}>
            <Text style={{color: 'white', marginTop: 10}}>
              {t('question')} {quenno * 10}/10
            </Text>
            <ProgressBar
              style={styles.progressquen}
              styleAttr="Horizontal"
              indeterminate={false}
              progress={quenno}
              color="white"
            />

            <Text style={styles.question}>{question.question}</Text>
          </Block>
          <Block
            flex={0.7}
            center
            style={{
              marginTop: 20,
              backgroundColor: 'white',
              borderRadius: 60,
            }}>
            <Block style>
              {randomChoice.map((item, i) => (
                <ButtonAns
                  key={i}
                  item={item}
                  disabled={disabled}
                  onPress={(e) => handleAnswer(e, i)}
                  width={width}
                />
              ))}
            </Block>
            <Question myscore={myscore} question={question} />

            <Block>
              <Text style={styles.api_data}>
                {t('subjectp')}
                {':'}
                {api_data.subject}
              </Text>
              <Text style={styles.api_data}>
                {t('chapterp')}
                {':'}
                {api_data.chapter}
              </Text>
            </Block>
          </Block>
        </Block>
      )}
    </>
  );
};

export default SinglePlayer;

const styles = StyleSheet.create({
  question: {
    fontFamily: 'montserrat-bold',
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
  },

  progressquen: {
    width: width - 40,
    color: 'black',
    height: 40,
  },
  api_data: {
    textAlign: 'center',
    fontFamily: 'montserrat-regular',
    margin: 4,
    color: 'black',
  },
  waiting: {
    textAlign: 'center',
    fontFamily: 'montserrat-regular',
    fontSize: 20,
  },
});
