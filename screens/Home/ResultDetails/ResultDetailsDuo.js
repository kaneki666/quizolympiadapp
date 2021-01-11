import {Block} from 'galio-framework';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, Image, Text} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Neomorph} from 'react-native-neomorph-shadows';
import {block} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {URL} from '../../../constants/Api';

const {height, width} = Dimensions.get('window');
const ResultDetailsDuo = ({navigation, route}) => {
  const {name, item} = route.params;
  const {t} = useTranslation();

  const size = width / 3 - 10;

  return (
    <Block flex={1} style={{backgroundColor: '#ECF0F3'}}>
      <Block center row style={{marginTop: 30}}>
        <Block flex={1 / 3} center>
          <Image
            source={{uri: `${URL}/${name}.jpg`}}
            style={{width: size, height: size, borderRadius: size / 2}}
          />
          <Text style={{fontSize: 26, textTransform: 'capitalize'}}>
            {name}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
              fontFamily: 'montserrat-bold',
              fontSize: 26,
            }}>
            {t('totalscore')} {item.myscore}
          </Text>
        </Block>
        <Block flex={1 / 3} center>
          <Text style={{fontSize: size / 2, fontWeight: 'bold'}}>VS</Text>
          <Text style={{fontSize: 20, textAlign: 'center'}}>
            {item.result === 'You have lost the game!'
              ? t('lostgame')
              : item.result === 'You have won the game!'
              ? t('wongame')
              : t('drawgame')}
          </Text>
        </Block>
        <Block flex={1 / 3} center>
          <Image
            source={{uri: `${URL}/${item.opponetName}.jpg`}}
            style={{width: size, height: size, borderRadius: size / 2}}
          />
          <Text style={{fontSize: 26, textTransform: 'capitalize'}}>
            {item.opponetName}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
              fontFamily: 'montserrat-bold',
              fontSize: 26,
            }}>
            {t('totalscore')} {item.opponetscore}
          </Text>
        </Block>
      </Block>

      <Block flex={1} style={{marginTop: 20}}>
        <Block>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {item.my_stats.map((stat, i) => (
              <Neomorph
                key={i}
                style={{
                  borderRadius: 20,
                  shadowRadius: 5,
                  backgroundColor: '#ECF0F3',
                  width: width - 150,
                  height: 260,
                  margin: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'montserrat-bold',
                    fontSize: 20,
                  }}>
                  {stat.question}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'montserrat-regular',
                    color: 'black',
                    fontSize: 16,
                  }}>
                  {t('correctans')}: {stat.correctanswer}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 5,
                    fontFamily: 'montserrat-regular',
                    fontSize: 14,
                    color:
                      stat.correctanswer === stat.myanswer
                        ? '#4caf50'
                        : '#f44336',
                  }}>
                  {t('myans')}: {stat.myanswer}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 5,
                    fontFamily: 'montserrat-regular',
                    fontSize: 14,
                    color: 'black',
                  }}>
                  {t('oppoans')}:{' '}
                  {item.oppnonet_stats[i]
                    ? item.oppnonet_stats[i].myanswer
                    : t('didntans')}
                </Text>
              </Neomorph>
            ))}
          </ScrollView>
        </Block>
      </Block>
    </Block>
  );
};

export default ResultDetailsDuo;
