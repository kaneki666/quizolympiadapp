import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, Image, ImageBackground} from 'react-native';
import {Block, Text, theme} from 'galio-framework';

import {List} from '../../../components';
import {nowTheme} from '../../../constants';
import {HeaderHeight} from '../../../constants/utils';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Get_Profile_Api, URL} from '../../../constants/Api';
import {useTranslation} from 'react-i18next';
import Timer from '../../../components/Timer';

import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const FriendProfile = ({route, navigation}) => {
  const {t} = useTranslation();

  const userState = useSelector((state) => {
    return state;
  });

  const {id} = route.params;

  const [userData, setUserData] = useState('');

  const [multi, setMulti] = useState(false);

  useEffect(() => {
    if (userData === '') {
      Get_Profile_Api(id).then((res) => setUserData(res));
    }
  }, [userData]);

  const getRank = () => {
    let rank;
    userState.userState.leaderboard.points.map((item, i) => {
      if (item.name === userData.username) {
        rank = i + 1;
      }
    });
    return rank;
  };

  return (
    <Block
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      {userData !== '' ? (
        <>
          <Block flex={0.6}>
            <ImageBackground
              source={require('../../../assets/gamer.webp')}
              style={styles.profileContainer}
              imageStyle={styles.profileBackground}>
              <Block flex style={styles.profileCard}>
                <Block
                  style={{
                    position: 'absolute',
                    width: width,
                    zIndex: 5,
                    paddingHorizontal: 20,
                  }}>
                  <Block middle style={{top: height * 0.15}}>
                    <Image
                      source={{uri: `${URL}/${userData.imgname}`}}
                      style={styles.avatar}
                    />
                  </Block>
                  <Block style={{top: height * 0.2}}>
                    <Block middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-bold',
                          marginBottom: theme.SIZES.BASE / 2,
                          fontWeight: '900',
                          fontSize: 26,
                        }}
                        color="#ffffff">
                        {userData.fullname}
                      </Text>

                      <Text
                        size={16}
                        color="white"
                        style={{
                          marginTop: 5,
                          fontFamily: 'montserrat-bold',
                          lineHeight: 20,
                          fontWeight: 'bold',
                          fontSize: 18,
                          opacity: 0.8,
                        }}>
                        {t('student')}
                      </Text>
                    </Block>
                    <Block style={styles.info}>
                      <Block row space="around">
                        <Block middle>
                          <Text
                            size={18}
                            color="white"
                            style={{
                              marginBottom: 4,
                              fontFamily: 'montserrat-bold',
                            }}>
                            {userState.userState.classmates.length}
                          </Text>
                          <Text
                            style={{fontFamily: 'montserrat-regular'}}
                            size={14}
                            color="white">
                            {t('classmates')}
                          </Text>
                        </Block>

                        <Block middle>
                          <Text
                            color="white"
                            size={18}
                            style={{
                              marginBottom: 4,
                              fontFamily: 'montserrat-bold',
                            }}>
                            {userData.gamedata.length +
                              userData.singlegamedata.length}
                          </Text>
                          <Text
                            style={{fontFamily: 'montserrat-regular'}}
                            size={14}
                            color="white">
                            {t('gamesplayed')}
                          </Text>
                        </Block>

                        <Block middle>
                          <Text
                            color="white"
                            size={18}
                            style={{
                              marginBottom: 4,
                              fontFamily: 'montserrat-bold',
                            }}>
                            {getRank()}
                          </Text>
                          <Text
                            style={{fontFamily: 'montserrat-regular'}}
                            size={14}
                            color="white">
                            {t('rank')}
                          </Text>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </ImageBackground>
          </Block>
          <Block />
          <Block flex={0.4} style={{paddingTop: 100}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Block flex>
                <Block middle>
                  <Text
                    style={{
                      color: '#2c2c2c',
                      fontWeight: 'bold',
                      fontSize: 19,
                      fontFamily: 'montserrat-bold',
                      marginBottom: 20,
                      zIndex: 2,
                    }}>
                    {t('aboutme')}
                  </Text>
                  <Text
                    size={16}
                    muted
                    style={{
                      textAlign: 'center',
                      fontFamily: 'montserrat-regular',
                      zIndex: 2,
                      lineHeight: 25,
                      color: '#9A9A9A',
                      paddingHorizontal: 15,
                    }}>
                    {t('iam')}
                    {userData.myclass}
                    {t('dot')}
                    {t('istudy')}
                    {userData.schoolname}
                    {t('dot')}
                  </Text>
                </Block>

                <Block row space="around" style={{marginTop: 20}}>
                  <Block row middle>
                    <Icon size={18} name="gamepad" />
                    <Text style={{fontFamily: 'montserrat-bold'}} size={16}>
                      {t('gamestats')}
                    </Text>
                  </Block>
                </Block>

                <Block
                  style={{
                    marginTop: 20,
                    paddingBottom: -HeaderHeight * 2,
                    paddingHorizontal: 15,
                  }}>
                  <Block>
                    <Block row space="around" style={{margin: 15}}>
                      <TouchableOpacity onPress={() => setMulti(false)}>
                        <Block row middle>
                          <Text
                            style={{fontFamily: 'montserrat-bold'}}
                            size={16}>
                            {t('single')}
                          </Text>
                        </Block>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setMulti(true)}>
                        <Block row middle>
                          <Text
                            style={{fontFamily: 'montserrat-bold'}}
                            size={16}>
                            {t('multiplay')}
                          </Text>
                        </Block>
                      </TouchableOpacity>
                    </Block>
                    {multi === true
                      ? userData.gamedata.map((item) => (
                          <List
                            key={item._id}
                            img={
                              item.result === 'You have lost the game!'
                                ? 'https://i.ibb.co/6nQpxkY/second.png'
                                : item.result === 'You have won the game!'
                                ? 'https://i.ibb.co/Hx2BQ3t/first.png'
                                : 'https://i.ibb.co/ZhsMcxR/draw.png'
                            }
                            title={`${item.myscore} ${t('points')}`}
                            secondary={
                              item.result === 'You have lost the game!'
                                ? t('lostgame')
                                : item.result === 'You have won the game!'
                                ? t('wongame')
                                : t('drawgame')
                            }
                            paragraph={item.time.substring(0, 10)}
                            buttontext={t('seemore')}
                            onButtonPress={() =>
                              navigation.navigate('ResultDetails', {
                                item: item,
                                name: userData.username,
                              })
                            }
                          />
                        ))
                      : userData.singlegamedata.map((item) => (
                          <List
                            key={item._id}
                            img={
                              item.result === 'You have lost the game!'
                                ? 'https://i.ibb.co/6nQpxkY/second.png'
                                : item.result === 'You have won the game!'
                                ? 'https://i.ibb.co/Hx2BQ3t/first.png'
                                : 'https://i.ibb.co/ZhsMcxR/draw.png'
                            }
                            title={`${item.myscore} ${t('points')}`}
                            secondary={
                              item.result === 'You have lost the game!'
                                ? t('lostgame')
                                : item.result === 'You have won the game!'
                                ? t('wongame')
                                : t('drawgame')
                            }
                            paragraph={item.time.substring(0, 10)}
                            buttontext={t('seemore')}
                            onButtonPress={() =>
                              navigation.navigate('ResultDetails', {
                                item: item,
                              })
                            }
                          />
                        ))}
                  </Block>
                </Block>
              </Block>
            </ScrollView>
          </Block>
        </>
      ) : (
        <Block>
          <Timer />
        </Block>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width,
    height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width,
    height: height * 0.6,
  },

  info: {
    marginTop: 30,
    paddingHorizontal: 10,
    height: height * 0.8,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80,
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  social: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5,
  },
});

export default FriendProfile;
