import {Block, Button} from 'galio-framework';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useLazyQuery} from '@apollo/client';

import {URL} from '../../../constants/Api';
import {DECLINE_CHALLENGE, SEND_GAMEID} from '../../../constants/APi_GQL';
import {getChallenger} from '../../../actions/GetChallenger';

const Notification = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state);
  const [sendGameid] = useLazyQuery(SEND_GAMEID);
  const [declineChallenge] = useLazyQuery(DECLINE_CHALLENGE);

  const handleJoin = async () => {
    await sendGameid({
      variables: {
        username: `${userdata.authState.userinfo.username}`,
        gameID: 'null',
        challenger: 'null',
      },
    });
    await navigation.navigate('GameJoin', {
      gameID: userdata.userState.challenger.gameID,
    });
  };

  const handleDecline = async () => {
    await sendGameid({
      variables: {
        username: `${userdata.authState.userinfo.username}`,
        gameID: 'null',
        challenger: 'null',
      },
    });

    await declineChallenge({
      variables: {
        username: `${userdata.userState.challenger.challenger}`,
        declined: true,
      },
    });
    await dispatch(getChallenger(''));
  };
  return (
    <Block column style={styles.main}>
      {userdata.userState.challenger !== '' ? (
        <>
          <Block row>
            <Block flex={0.4}>
              <Image
                source={{
                  uri: `${URL}/${userdata.userState.challenger.challenger}.jpg`,
                }}
                style={styles.img}
              />
            </Block>
            <Block
              flex={0.6}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.text}>
                {userdata.userState.challenger.challenger} {t('inviteinfo')}
              </Text>
            </Block>
          </Block>
          <Block flex={1} row>
            <Button onPress={handleJoin} color="success">
              {t('join')}
            </Button>
            <Button onPress={handleDecline} color="red">
              {t('decline')}
            </Button>
          </Block>
        </>
      ) : (
        <Block />
      )}
    </Block>
  );
};
export default Notification;

const styles = StyleSheet.create({
  main: {
    margin: 10,
  },
  img: {
    height: 100,
    width: 100,
  },
  text: {
    fontFamily: 'montserrat-regular',
    color: 'black',
    fontSize: 18,
  },
});
