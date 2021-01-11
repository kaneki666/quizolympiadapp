import {Block} from 'galio-framework';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const List = ({
  img,
  title,
  secondary,
  parasub,
  paragraph,
  buttontext,
  onButtonPress,
}) => {
  return (
    <View style={styles.container}>
      {img && (
        <View style={styles.avatarcontainer}>
          <Image source={{uri: img}} style={styles.avatar} />
        </View>
      )}
      <View style={styles.classmates}>
        <Text style={styles.username}>{title}</Text>
        <Text style={styles.paragraph}>{secondary}</Text>
        <Text style={styles.paragraph}>
          {parasub}
          {paragraph}
        </Text>
      </View>

      <View style={styles.classmates}>
        <TouchableWithoutFeedback onPress={onButtonPress}>
          <Block middle style={styles.challenge}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '700',
                color: 'white',
                textAlign: 'center',
              }}>
              {buttontext}
            </Text>
          </Block>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default List;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  classmates: {
    justifyContent: 'center',
    flex: 1,
  },
  avatarcontainer: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontFamily: 'montserrat-bold',
    fontSize: 24,
  },
  paragraph: {
    fontFamily: 'montserrat-regular',
    color: '#9A9A9A',
  },
  challenge: {
    maxWidth: 120,
    backgroundColor: 'black',
    minHeight: 40,
    borderRadius: 10,
  },
});
