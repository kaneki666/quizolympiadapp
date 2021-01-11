import React, {useState} from 'react';
import {StyleSheet, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import {Block, Text, theme, Icon} from 'galio-framework';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Switch} from '../../../components';
import nowTheme from '../../../constants/Theme';
import i18n from '../../../i18n';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {changeDarkMOde} from '../../../actions/changeDarkMode';

const Settings = (props) => {
  const {t} = useTranslation();
  const states = useSelector((state) => state.authState.darkmode);
  const dispatch = useDispatch();
  const [state, setState] = useState('');
  const [darkmode, setDarkMode] = useState(states);
  const [language, setLanguage] = useState('English');

  const changeLanguage = (item) => {
    toggleSwitch(item.id);
    if (language === 'English') {
      i18n.changeLanguage('bd');
      setLanguage('বাংলা');
    } else {
      i18n.changeLanguage('en');
      setLanguage('English');
    }
  };
  const toggleSwitch = (switchNumber) =>
    setState({[switchNumber]: !state[switchNumber]});

  const changeDarkMode = () => {
    setDarkMode(!darkmode);
    dispatch(changeDarkMOde(!darkmode));
  };
  const renderItem = ({item}) => {
    const {navigate} = props.navigation;

    switch (item.type) {
      case 'switch':
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text
              style={{fontFamily: 'montserrat-regular'}}
              size={14}
              color="#525F7F">
              {item.title}
            </Text>
            <Switch
              onValueChange={() => changeLanguage(item)}
              value={state[item.id]}
            />
          </Block>
        );
      case 'button':
        return (
          <Block style={styles.rows}>
            <TouchableOpacity onPress={() => navigate(item.id)}>
              <Block row middle space="between" style={{paddingTop: 7}}>
                <Text
                  style={{fontFamily: 'montserrat-regular'}}
                  size={14}
                  color="#525F7F">
                  {item.title}
                </Text>
                <Icon
                  name="angle-right"
                  family="font-awesome"
                  style={{paddingRight: 5}}
                />
              </Block>
            </TouchableOpacity>
          </Block>
        );
      default:
        break;
    }
  };

  const recommended = [{title: language, id: 'face', type: 'switch'}];

  const privacy = [
    {title: t('useragreement'), id: 'UserAgreements', type: 'button'},
    {title: t('privacy'), id: 'Privacy', type: 'button'},
    {title: t('about'), id: 'About', type: 'button'},
  ];

  return (
    <SafeAreaView style={styles.settings}>
      <FlatList
        data={recommended}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <Block center style={styles.title}>
            <Text
              style={{fontFamily: 'montserrat-bold', paddingBottom: 5}}
              size={theme.SIZES.BASE}
              color={nowTheme.COLORS.TEXT}>
              {t('appsettings')}
            </Text>
            <Text
              style={{fontFamily: 'montserrat-regular'}}
              size={12}
              color={nowTheme.COLORS.CAPTION}
              color={nowTheme.COLORS.TEXT}>
              {t('changelng')}
            </Text>
          </Block>
        }
      />
      <Block row middle space="between" style={styles.rows}>
        <Text
          style={{fontFamily: 'montserrat-regular'}}
          size={14}
          color="#525F7F">
          {t('darkmode')}
        </Text>
        <Switch value={darkmode} onValueChange={changeDarkMode} />
      </Block>
      {/* <Block center style={styles.title}>
        <Text
          style={{fontFamily: 'montserrat-bold', paddingBottom: 5}}
          size={theme.SIZES.BASE}
          color={nowTheme.COLORS.TEXT}>
          Payment Settings
        </Text>
        <Text
          style={{fontFamily: 'montserrat-regular'}}
          size={12}
          color={nowTheme.COLORS.CAPTION}
          color={nowTheme.COLORS.TEXT}>
          These are also important settings
        </Text>
      </Block>

      <FlatList
        data={payment}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
      /> */}

      <Block center style={styles.title}>
        <Text
          style={{fontFamily: 'montserrat-bold', paddingBottom: 5}}
          size={theme.SIZES.BASE}
          color={nowTheme.COLORS.TEXT}>
          {t('privacysettings')}
        </Text>
        <Text
          style={{fontFamily: 'montserrat-regular'}}
          size={12}
          color={nowTheme.COLORS.CAPTION}
          color={nowTheme.COLORS.TEXT}>
          {t('privacysub')}
        </Text>
      </Block>

      <FlatList
        data={privacy}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  settings: {
    paddingVertical: theme.SIZES.BASE / 3,
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2,
  },
});

export default Settings;
