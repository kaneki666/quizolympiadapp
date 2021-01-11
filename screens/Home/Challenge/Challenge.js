import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Easing} from 'react-native-reanimated';
import {useTimingTransition} from 'react-native-redash';
import {useSelector} from 'react-redux';
import {useLazyQuery} from '@apollo/client';

import {List} from '../../../components';
import CircularProgress from '../../../components/CircularProgress';
import {URL} from '../../../constants/Api';
import {DECLINE_CHALLENGE, SEND_GAMEID} from '../../../constants/APi_GQL';

const Challenge = ({route, navigation}) => {
  const {t} = useTranslation();
  const {api_data} = route.params;

  const userdata = useSelector((state) => {
    return state;
  });

  const [sendGameid] = useLazyQuery(SEND_GAMEID);
  const [declineChallenge] = useLazyQuery(DECLINE_CHALLENGE);
  const gameID = Math.floor(Math.random() * 10000000);
  const name = userdata.authState.userinfo.username;

  const transition = useTimingTransition(true, {
    duration: 2000,
    easing: Easing.linear,
  });

  const handleInvite = async (item) => {
    await declineChallenge({
      variables: {
        username: `${name}`,
        declined: false,
      },
    });
    await sendGameid({
      variables: {
        username: `${item.username}`,
        gameID: `${gameID}`,
        challenger: `${name}`,
      },
    });
    // await history.push({
    //   pathname: "/game",
    //   state: {
    //     req_api_data: api_data,
    //     gameID: gameID,
    //   },
    // });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.view}>
      {userdata.userState.classmates !== '' ? (
        userdata.userState.classmates.map((item) => (
          <List
            key={item._id}
            img={`${URL}/${item.imgname}`}
            title={item.username}
            secondary={item.schoolname}
            parasub={`${t('gamesplayed')}: `}
            paragraph={item.gamedata.length}
            buttontext={t('challenge')}
            onButtonPress={() => handleInvite(item)}
          />
        ))
      ) : (
        <CircularProgress progress={transition} />
      )}
    </ScrollView>
  );
};

export default Challenge;
const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginTop: 15,
  },
});
