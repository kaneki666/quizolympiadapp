import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Block} from 'galio-framework';
import {Dimensions, ImageBackground, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import io from 'socket.io-client';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import ButtonAns from '../../../components/ButtonAns';
import {URL} from '../../../constants/Api';
import QuestionFooter from '../../../components/QuestionFooter';

const {width, height} = Dimensions.get('window');
let socket;

const GameJoin = ({navigation, route}) => {
  const {t} = useTranslation();
  const {gameID} = route.params;
  const name = useSelector((state) => state.authState.userinfo.username);
  console.log(socket);
  const [randomChoice, setrandomChoice] = useState([]);
  let [myscore, setMyScore] = useState(0);
  let [opponetscore, setOpponentscore] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [question, setQuestion] = useState('');
  const [quenno, setQuen] = useState(0);
  const [opponetName, setOpponent_name] = useState('');
  const [result, setResult] = useState('');
  let [my_stats, setMyStats] = useState([]);
  let [oppnonet_stats, setOpponentStats] = useState([]);
  const [gameover, setGameover] = useState(false);

  useEffect(() => {
    socket = io(URL);
    socket.emit('join_room', gameID, name);
  }, []);

  useEffect(() => {
    setDisabled(false);
    socket.emit('comparedata', name, gameID, my_stats);
  }, [question]);

  useEffect(() => {
    socket.on('question', async (question, index) => {
      setQuestion(question);
      const choices = await [question.opt_1, question.opt_2, question.opt_3];
      const randomIndex = await parseInt((Math.random() * 100) % 4);
      await choices.splice(randomIndex, 0, question.correct_ans);
      setrandomChoice(choices);
      setQuen(() => {
        const val = (parseInt(index) + 1) * 10;

        return val;
      });

      if (index === 9) {
        socket.emit('finishmesg', true, gameID);
      }
    });

    socket.on('info', (player1_name, player2_name) => {
      setOpponent_name(player1_name);
    });

    socket.on('viewresult', (usr) => {
      if (usr === name) {
        setMyScore((myscore += 10));
      } else {
        setOpponentscore((opponetscore += 10));
      }

      if (myscore > opponetscore) {
        setResult(props.t('wongame'));
      } else if (myscore < opponetscore) {
        setResult(props.t('lostgame'));
      } else if (myscore === opponetscore) {
        setResult(props.t('drawgame'));
      }
    });
    socket.on('compareresult', (username, data) => {
      if (username === name) {
        setMyStats(data);
      } else {
        setOpponentStats(data);
      }
    });
    socket.on('finishConfirm', (finished) => {
      if (finished === true) {
        setGameover(true);
      }
    });
  }, []);

  useEffect(() => {
    if (gameover === true) {
      const dataa = {
        result,
        my_stats,
        oppnonet_stats,
        name,
        opponetName,
        opponetscore,
        myscore,
        gameID,
      };
      Save_stats_api(dataa);
      navigation.navigate('ResultDetails', {item: dataa});
    }
  }, [gameover]);

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
      socket.emit('result', name, gameID);
    }
    return e === question.correct_ans;
  };

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
        <Block flex>
          <Block
            flex={0.3}
            center
            style={{backgroundColor: '#151719', width: width}}>
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
          <Block flex={0.7} center style={{marginTop: 20}}>
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
            <QuestionFooter myscore={myscore} />

            {/* <Block>
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
            </Block> */}
          </Block>
        </Block>
      )}
    </>
  );
};

export default GameJoin;
const styles = StyleSheet.create({
  question: {
    fontFamily: 'montserrat-bold',
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
  },

  progressquen: {
    width: width - 40,
    color: 'white',
    height: 40,
  },
  api_data: {
    textAlign: 'center',
    fontFamily: 'montserrat-regular',
    margin: 4,
  },
  waiting: {
    textAlign: 'center',
    fontFamily: 'montserrat-regular',
    fontSize: 20,
  },
});
