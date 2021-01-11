import React, {useEffect, useState} from 'react';
import {Dimensions, Image, ImageBackground, StyleSheet} from 'react-native';
import {Block, Text, theme, Button as GaButton} from 'galio-framework';
import Share from 'react-native-share';
import {useTranslation} from 'react-i18next';
import {List} from '../../../components';
import {nowTheme} from '../../../constants';
import {HeaderHeight} from '../../../constants/utils';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Get_Profile_Api, URL} from '../../../constants/Api';
import Timer from '../../../components/Timer';

import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const Profile = ({navigation}) => {
  const {t} = useTranslation();

  const userState = useSelector((state) => {
    return state;
  });

  const id = userState.authState.userinfo._id;

  const [userData, setUserData] = useState('');
  const [show, setShow] = useState(false);
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

  const SharefacebookOptions = {
    title: 'Bangabandhu Olympiad',
    message: 'Challenge your friends',
    url: 'https://bangabandhuolympiad.com/',
    social: Share.Social.FACEBOOK,
  };

  const Sharefacebook = async () => {
    await Share.shareSingle(SharefacebookOptions);
  };
  const ShareWHATSAPPOptions = {
    title: 'Bangabandhu Olympiad',
    message: 'Challenge your friends',
    url: 'https://bangabandhuolympiad.com/',
    social: Share.Social.WHATSAPP,
  };

  const ShareWHATSAPP = async () => {
    await Share.shareSingle(ShareWHATSAPPOptions);
  };

  const ShareEMAILOptions = {
    title: 'Bangabandhu Olympiad',
    message: 'Challenge your friends',
    url: 'https://bangabandhuolympiad.com/',
    social: Share.Social.EMAIL,
  };

  const ShareEMAIL = async () => {
    await Share.shareSingle(ShareEMAILOptions);
  };

  const shareAllOptions = {
    title: 'Bangabandhu Olympiad',
    failOnCancel: false,
    url: 'https://bangabandhuolympiad.com/',
  };

  const ShareALL = async () => {
    const shareResponse = await Share.open(shareAllOptions);
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

                <Block
                  middle
                  row
                  style={{
                    position: 'absolute',
                    width: width,
                    top: height * 0.6 - 26,
                    zIndex: 99,
                  }}>
                  <GaButton
                    round
                    onlyIcon
                    shadowless
                    icon="facebook"
                    iconFamily="Font-Awesome"
                    iconColor="#4267B2"
                    color="white"
                    iconSize={nowTheme.SIZES.BASE * 1.6}
                    style={[styles.social, styles.shadow]}
                    onPress={Sharefacebook}
                  />

                  <GaButton
                    round
                    onlyIcon
                    shadowless
                    icon="whatsapp"
                    iconFamily="Font-Awesome"
                    iconColor={'#4FCE5D'}
                    color="white"
                    iconSize={nowTheme.SIZES.BASE * 1.6}
                    style={[styles.social, styles.shadow]}
                    onPress={ShareWHATSAPP}
                  />
                  <GaButton
                    round
                    onlyIcon
                    shadowless
                    icon="email"
                    iconFamily="Materia-lIcons"
                    iconColor="red"
                    color="white"
                    iconSize={nowTheme.SIZES.BASE * 1.6}
                    style={[styles.social, styles.shadow]}
                    onPress={ShareEMAIL}
                  />
                  <GaButton
                    round
                    onlyIcon
                    shadowless
                    icon="share"
                    iconFamily="Font-Awesome"
                    iconColor="black"
                    color="white"
                    iconSize={nowTheme.SIZES.BASE * 1.6}
                    style={[styles.social, styles.shadow]}
                    onPress={ShareALL}
                  />
                </Block>
              </Block>
            </ImageBackground>
          </Block>
          <Block />
          <Block flex={0.4} style={{marginTop: 90}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Block flex style={{marginTop: 20}}>
                <Block middle>
                  <Text
                    style={{
                      color: '#2c2c2c',
                      fontWeight: 'bold',
                      fontSize: 19,
                      fontFamily: 'montserrat-bold',
                      marginTop: 15,
                      marginBottom: 30,
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
                  <TouchableOpacity onPress={() => setShow(false)}>
                    <Block row middle>
                      <Icon
                        name="user-friends"
                        size={18}
                        style={{paddingRight: 8}}
                      />
                      <Text style={{fontFamily: 'montserrat-bold'}} size={16}>
                        {t('classmates')}
                      </Text>
                    </Block>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShow(true)}>
                    <Block row middle>
                      <Icon size={18} name="gamepad" />
                      <Text style={{fontFamily: 'montserrat-bold'}} size={16}>
                        {t('gamestats')}
                      </Text>
                    </Block>
                  </TouchableOpacity>
                </Block>

                <Block
                  style={{
                    marginTop: 20,
                    paddingBottom: -HeaderHeight * 2,
                    paddingHorizontal: 15,
                  }}>
                  {show === false ? (
                    userState &&
                    userState.userState.classmates.map((item) => (
                      <List
                        key={item._id}
                        img={`${URL}/${item.imgname}`}
                        title={item.username}
                        secondary={item.schoolname}
                        parasub={`${t('gamesplayed')}: `}
                        paragraph={item.gamedata.length}
                        buttontext={t('seeprofile')}
                        onButtonPress={() => {
                          navigation.navigate('FriendsProfile', {
                            id: item._id,
                          });
                        }}
                      />
                    ))
                  ) : (
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
                                navigation.navigate('ResultDetailsDuo', {
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
                  )}
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

export default Profile;
