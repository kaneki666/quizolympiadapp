import React from 'react';
import {Block} from 'galio-framework';
import {Text, Dimensions, Image} from 'react-native';
import {URL} from '../constants/Api';
import {Neomorph} from 'react-native-neomorph-shadows';
const {width, height} = Dimensions.get('window');
const ListLeader = ({title, sub, i, subtitle, total, totalsub}) => {
  return (
    <Neomorph
      key={i}
      style={{
        shadowRadius: 8,
        backgroundColor: '#ECF0F3',
        height: height * 0.2,
        width: width * 0.8,
        margin: 20,
        borderRadius: 20,
      }}>
      <Block
        flex={1}
        row
        center
        key={i}
        style={{
          height: height * 0.1,
          width: width * 0.8,
          margin: 20,
          borderRadius: 20,
        }}>
        <Block flex={0.2}>
          <Text
            style={{
              fontFamily: 'montserrat-bold',
              marginLeft: 10,
              fontSize: 70,
              textTransform: 'capitalize',
              color: 'white',
            }}>
            {i + 1}
          </Text>
        </Block>
        <Block flex={0.3} style={{marginLeft: 15}}>
          <Image
            source={{uri: `${URL}/${title}.jpg`}}
            style={{height: 100, width: 100, borderRadius: 50}}
          />
        </Block>
        <Block flex={0.5} style={{marginLeft: 20}}>
          <Text
            style={{
              fontFamily: 'montserrat-bold',
              fontSize: 20,
              textTransform: 'capitalize',
            }}>
            {title}
          </Text>
          <Text
            style={{
              fontFamily: 'montserrat-regular',
              fontSize: 18,
            }}>
            {subtitle} {sub}
          </Text>
          <Text
            style={{
              fontFamily: 'montserrat-regular',
              fontSize: 16,
            }}>
            {total} {totalsub}
          </Text>
        </Block>
      </Block>
    </Neomorph>
  );
};

export default ListLeader;
