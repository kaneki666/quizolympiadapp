import {Block} from 'galio-framework';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, Image, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Neomorph} from 'react-native-neomorph-shadows';
import {useSelector} from 'react-redux';

const {height, width} = Dimensions.get('window');
const ResultDetails = ({navigation, route}) => {
  const {item} = route.params;
  const {t} = useTranslation();

  return (
    <Block flex={1} style={{backgroundColor: '#ECF0F3'}}>
      <Image
        source={require('../../../assets/join.png')}
        style={{
          height: height * 0.4,
          width: width,
        }}
      />

      <Block flex={1} style={{marginTop: 20}}>
        <Block>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={item.my_stats}
            renderItem={({item, i}) => (
              <Neomorph
                style={{
                  borderRadius: 20,
                  shadowRadius: 5,
                  backgroundColor: '#ECF0F3',
                  width: width - 150,
                  height: 240,
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
                  {item.question}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'montserrat-regular',
                    color: '#4caf50',
                    fontSize: 16,
                  }}>
                  {t('correctans')}: {item.correctanswer}
                </Text>
                <Text
                  key={i}
                  style={{
                    textAlign: 'center',
                    marginTop: 5,
                    fontFamily: 'montserrat-regular',
                    fontSize: 14,
                    color:
                      item.correctanswer === item.myanswer
                        ? '#4caf50'
                        : '#f44336',
                  }}>
                  {t('myans')}: {item.myanswer}
                </Text>
              </Neomorph>
            )}
            keyExtractor={(item) => item.id}
          />
        </Block>
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
    </Block>
  );
};

export default ResultDetails;
