import React, {useEffect, useState} from 'react';
import {withNavigation} from '@react-navigation/compat';
import {TouchableOpacity, StyleSheet, Platform, Dimensions} from 'react-native';
import {useQuery} from '@apollo/client';
import {Button, Block, NavBar, Text, theme} from 'galio-framework';
import stringSimilarity from 'string-similarity';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from './Input';
import Tabs from './Tabs';
import nowTheme from '../constants/Theme';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {classMatesState} from '../actions/GetClassmates';
import {getClassMate_Api, Get_Leaderboard_Api} from '../constants/Api';
import {leaderboardStates} from '../actions/Getleaderboard';
import {GET_GAMEID} from '../constants/APi_GQL';
import {getChallenger} from '../actions/GetChallenger';

const {height, width} = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const BellButton = ({isWhite, style, navigation, challenger}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Notificaton')}
      style={[styles.button, style]}>
      <Icon
        size={16}
        name="bell-outline"
        color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
      />

      <Block
        middle
        style={[
          styles.notify,
          {backgroundColor: challenger !== '' ? 'red' : 'white'},
        ]}></Block>
    </TouchableOpacity>
  );
};

const SettingsButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate('Settings')}>
    <Ionicons
      size={16}
      name="ios-settings-outline"
      color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

const Header = ({
  back,
  navigation,
  white,
  title,
  optionLeft,
  optionRight,
  tabs,
  tabIndex,
  search,
  options,
  transparent,
  bgColor,
  iconColor,
  titleColor,

  ...props
}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const userdata = useSelector((state) => {
    return state;
  });

  const name = userdata.authState.userinfo.username;
  const [searchresult, setSearchResult] = useState('');
  const [searchname, setSearchname] = useState('');

  const {data} = useQuery(GET_GAMEID, {
    variables: {username: `${name}`},
  });
  useEffect(() => {
    if (data) {
      if (data.getGameId.gameID !== 'null' && data.getGameId.gameID !== null) {
        dispatch(getChallenger(data.getGameId));
      }
    }
  }, [data]);

  const handleLeftPress = () => {
    return back ? navigation.goBack() : navigation.openDrawer();
  };
  const renderRight = () => {
    if (title === 'Title') {
      return [
        <BellButton key="chat-title" navigation={navigation} isWhite={white} />,
        <SettingsButton
          key="basket-title"
          navigation={navigation}
          isWhite={white}
        />,
      ];
    }

    useEffect(() => {
      setSearchResult('');

      if (userdata.userState.classmates !== '') {
        userdata.userState.classmates.map((f) => {
          const simi_pers = stringSimilarity.compareTwoStrings(
            `${f.username}`,
            `${searchname}`,
          );

          if (simi_pers >= 0.4) {
            setSearchResult((old) => [...old, f]);
          }
          return f;
        });
      }
    }, [searchname]);

    useEffect(() => {
      Get_Leaderboard_Api(userdata.authState.userinfo.myclass).then((res) =>
        dispatch(leaderboardStates(res)),
      );
      if (searchresult !== '') {
        dispatch(classMatesState(searchresult));
      }
      if (searchname === '') {
        getClassMate_Api(userdata.authState.userinfo.myclass).then((res) => {
          let newData;
          if (res) {
            newData = res.filter((item, i) => {
              if (item.username !== userdata.authState.userinfo.username) {
                return item;
              }
              return false;
            });

            dispatch(classMatesState(newData));
          }
        });
      }
    }, [searchresult, searchname]);

    switch (title) {
      case 'Subjects':
        return [
          <BellButton
            key="chat-home"
            navigation={navigation}
            isWhite={white}
            challenger={userdata ? userdata.userState.challenger : ''}
          />,
          <SettingsButton
            key="basket-home"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case 'Chapters':
        return [
          <BellButton
            key="chat-home"
            navigation={navigation}
            isWhite={white}
            challenger={userdata ? userdata.userState.challenger : ''}
          />,
          <SettingsButton
            key="basket-home"
            navigation={navigation}
            isWhite={white}
          />,
        ];

      default:
        break;
    }
  };
  const renderSearch = () => {
    const {t} = useTranslation();
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder={`${t('searchfr')}`}
        placeholderTextColor={'#8898AA'}
        onChangeText={(text) => setSearchname(text)}
        value={searchname}
        iconContent={
          <Icon size={16} color={theme.COLORS.MUTED} name="card-search" />
        }
      />
    );
  };
  const renderOptions = () => {
    return (
      <Block row style={styles.options}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() =>
            navigation.navigate('Profile', {
              id: userdata.authState.userinfo._id,
            })
          }>
          <Block row middle>
            <Icon
              name="face-profile"
              size={18}
              style={{paddingRight: 8}}
              color={nowTheme.COLORS.HEADER}
            />
            <Text
              style={{fontFamily: 'montserrat-regular'}}
              size={16}
              style={styles.tabTitle}>
              {optionLeft || t('profile')}
            </Text>
          </Block>
        </Button>
        <Button
          shadowless
          style={styles.tab}
          onPress={() => {
            navigation.navigate('Leaderboard');
          }}>
          <Block row middle>
            <Icon
              size={18}
              name="trophy-award"
              style={{paddingRight: 8}}
              color={nowTheme.COLORS.HEADER}
            />

            <Text
              style={{fontFamily: 'montserrat-regular'}}
              size={16}
              style={styles.tabTitle}>
              {optionRight || t('leaderboard')}
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };

  const renderTabs = () => {
    const defaultTab = tabs && tabs[0] && tabs[0].id;

    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={(id) => navigation.setParams({tabId: id})}
      />
    );
  };
  const renderHeader = () => {
    if (search || tabs || options) {
      return (
        <Block center>
          {search ? renderSearch() : null}
          {options ? renderOptions() : null}
          {tabs ? renderTabs() : null}
        </Block>
      );
    }
  };

  const noShadow = ['Search', 'Categories', 'Deals', 'Pro', 'Profile'].includes(
    title,
  );
  const headerStyles = [
    !noShadow ? styles.shadow : null,
    transparent ? {backgroundColor: 'rgba(0,0,0,0)'} : null,
  ];

  const navbarStyles = [styles.navbar, bgColor && {backgroundColor: bgColor}];

  return (
    <Block style={headerStyles}>
      <NavBar
        back={false}
        title={title}
        style={navbarStyles}
        transparent={transparent}
        right={renderRight()}
        rightStyle={{alignItems: 'center'}}
        left={
          <Icon
            name={back ? 'menu-left' : 'menu'}
            size={16}
            onPress={handleLeftPress}
            color={nowTheme.COLORS.ICON}
          />
        }
        leftStyle={{paddingVertical: 12, flex: 0.2}}
        titleStyle={[
          styles.title,
          {color: nowTheme.COLORS[white ? 'WHITE' : 'HEADER']},
          titleColor && {color: titleColor},
        ]}
        {...props}
      />
      {renderHeader()}
    </Block>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'montserrat-regular',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 2 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: nowTheme.COLORS.HEADER,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
});

export default withNavigation(Header);
