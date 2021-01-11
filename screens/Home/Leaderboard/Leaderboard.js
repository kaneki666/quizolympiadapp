import React, {useState} from 'react';
import {Block} from 'galio-framework';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  Text,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import ListLeader from '../../../components/ListLeader';

const {height, width} = Dimensions.get('window');

const Leaderboard = () => {
  const {t} = useTranslation();
  const [active, setActive] = useState(1);
  const leaderboards = useSelector((state) => {
    return state.userState.leaderboard;
  });
  const textDecorationLine = 'underline';

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#ECF0F3'}}>
      <Block flex={1}>
        <Block flex={0.4}>
          <ImageBackground
            source={require('../../../assets/leader.webp')}
            style={{
              height: height * 0.4,
              width: width,
            }}
          />
        </Block>

        <Block flex={0.6} row style={{marginTop: 10}}>
          <Block
            flex={1 / 4}
            center
            style={{
              borderRadius: 20,
              minHeight: 25,
            }}>
            <Pressable onPress={() => setActive(1)}>
              <Text
                style={{
                  fontFamily: 'montserrat-bold',
                  fontSize: 16,
                  textDecorationLine:
                    active === 1 ? textDecorationLine : 'none',
                  textDecorationStyle: 'solid',
                  textDecorationColor: '#000',
                }}>
                {t('bypoint')}
              </Text>
            </Pressable>
          </Block>

          <Block
            flex={1 / 4}
            center
            style={{
              borderRadius: 20,
              minHeight: 25,
            }}>
            <Pressable onPress={() => setActive(2)}>
              <Text
                style={{
                  fontFamily: 'montserrat-bold',
                  fontSize: 16,
                  textDecorationLine:
                    active === 2 ? textDecorationLine : 'none',
                  textDecorationStyle: 'solid',
                  textDecorationColor: '#000',
                }}>
                {t('bywins')}
              </Text>
            </Pressable>
          </Block>
          <Block
            flex={1 / 4}
            center
            style={{
              borderRadius: 20,
              minHeight: 25,
            }}>
            <Pressable onPress={() => setActive(3)}>
              <Text
                style={{
                  fontFamily: 'montserrat-bold',
                  fontSize: 16,
                  textDecorationLine:
                    active === 3 ? textDecorationLine : 'none',
                  textDecorationStyle: 'solid',
                  textDecorationColor: '#000',
                }}>
                {t('bylose')}
              </Text>
            </Pressable>
          </Block>
          <Block
            flex={1 / 4}
            center
            style={{
              borderRadius: 20,
              minHeight: 25,
            }}>
            <Pressable onPress={() => setActive(4)}>
              <Text
                style={{
                  fontFamily: 'montserrat-bold',
                  fontSize: 16,
                  textDecorationLine:
                    active === 4 ? textDecorationLine : 'none',
                  textDecorationStyle: 'solid',
                  textDecorationColor: '#000',
                }}>
                {t('bydraw')}
              </Text>
            </Pressable>
          </Block>
        </Block>
      </Block>
      <Block center>
        {active === 1
          ? leaderboards.points.map((item, i) => (
              <ListLeader
                title={item.name}
                sub={item.played}
                subtitle={t('gamesplayed')}
                total={item.score}
                totalsub={t('points')}
                i={i}
              />
            ))
          : active === 2
          ? leaderboards.totalwin.map((item, i) => (
              <ListLeader
                title={item.name}
                sub={item.played}
                subtitle={t('gamesplayed')}
                total={item.total}
                totalsub={t('wins')}
                i={i}
              />
            ))
          : active === 3
          ? leaderboards.totaldraw.map((item, i) => (
              <ListLeader
                title={item.name}
                sub={item.played}
                subtitle={t('gamesplayed')}
                total={item.total}
                totalsub={t('loses')}
                i={i}
              />
            ))
          : leaderboards.totallost.map((item, i) => (
              <ListLeader
                title={item.name}
                sub={item.played}
                subtitle={t('gamesplayed')}
                total={item.total}
                totalsub={t('draws')}
                i={i}
              />
            ))}
      </Block>
    </ScrollView>
  );
};

export default Leaderboard;
const d = {
  points: [
    {name: 'student1', played: 81, score: 2360},
    {name: 'student2', played: 73, score: 2000},
    {name: 'student3', played: 0, score: 0},
    {name: 'student4', played: 0, score: 0},
    {name: 'msadman', played: 0, score: 0},
  ],
  totaldraw: [
    {name: 'student1', played: 81, total: 54},
    {name: 'student2', played: 73, total: 45},
    {name: 'student3', played: 0, total: 0},
    {name: 'student4', played: 0, total: 0},
    {name: 'msadman', played: 0, total: 0},
  ],
  totallost: [
    {name: 'student2', played: 73, total: 22},
    {name: 'student1', played: 81, total: 4},
    {name: 'student3', played: 0, total: 0},
    {name: 'student4', played: 0, total: 0},
    {name: 'msadman', played: 0, total: 0},
  ],
  totalwin: [
    {name: 'student1', played: 81, total: 22},
    {name: 'student2', played: 73, total: 4},
    {name: 'student3', played: 0, total: 0},
    {name: 'student4', played: 0, total: 0},
    {name: 'msadman', played: 0, total: 0},
  ],
};
