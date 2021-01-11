import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import {Block, Checkbox, Text, theme} from 'galio-framework';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Feather';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Decoder from 'jwt-decode';

import {Button, Input} from '../../../components';
import {nowTheme} from '../../../constants';
import {ScrollView} from 'react-native-gesture-handler';
import {Login_api} from '../../../constants/Api';
import {changeAuthState} from '../../../actions/changeAuthState';
import {useDispatch} from 'react-redux';
import {saveUserInfo} from '../../../actions/saveUserInfo';

const {width, height} = Dimensions.get('screen');

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Login = (props) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [errorlogin, setError] = useState('');
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required(`${t('username')} ${t('required')}`),
    password: Yup.string().required(`${t('password')} ${t('required')}`),
  });
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: {username: '', password: ''},
    onSubmit: (values) => {
      Login_api(values).then((res) => {
        if (res === "password doesn't match") {
          setError(t('errorpass'));
          errors.username = 'error';
        } else if (res === 'User does not exist') {
          setError(t('errorusername'));
        } else if (res === 'Network Error') {
          setError(t('interneterror'));
        } else {
          dispatch(changeAuthState(true));
          const userdata = Decoder(res);
          dispatch(saveUserInfo(userdata));
        }
      });
    },
  });

  return (
    <DismissKeyboard>
      <Block flex middle>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.registerContainer}>
            <Block flex space="evenly">
              <Block flex={1} middle style={styles.socialConnect}>
                <Block flex={1} middle>
                  <Image
                    source={require('../../../assets/login.webp')}
                    style={styles.horizontalImage}
                  />
                  <Text style={styles.signup} color="#333" size={24}>
                    {t('login')}
                  </Text>
                  {errorlogin !== '' ? (
                    <Text style={styles.errorlogin} color="#333" size={24}>
                      {errorlogin}
                    </Text>
                  ) : (
                    <></>
                  )}
                </Block>
              </Block>
              <Block flex={1} middle space="between">
                <Block center flex={0.9}>
                  <Block flex space="between">
                    <Block>
                      <Block width={width * 0.8} style={styles.margin10}>
                        <Input
                          name="username"
                          placeholder={t('username')}
                          style={styles.inputs}
                          value={values.username}
                          onChangeText={handleChange('username')}
                          onBlur={handleBlur('username')}
                          iconContent={
                            <Icon
                              size={16}
                              color="#ADB5BD"
                              name="user"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>
                      <Block width={width * 0.8} style={styles.margin10}>
                        <Input
                          password={true}
                          placeholder={t('password')}
                          style={styles.inputs}
                          value={values.password}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          iconContent={
                            <Icon
                              size={16}
                              color="#ADB5BD"
                              name="user-check"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>

                      <Block
                        style={{
                          marginVertical: theme.SIZES.BASE,
                          marginLeft: 15,
                        }}
                        row
                        width={width * 0.75}>
                        <Checkbox
                          checkboxStyle={{
                            borderWidth: 1,
                            borderRadius: 2,
                            borderColor: '#E3E3E3',
                          }}
                          color={nowTheme.COLORS.PRIMARY}
                          labelStyle={{
                            color: nowTheme.COLORS.HEADER,
                            fontFamily: 'montserrat-regular',
                          }}
                          label={t('agree')}
                        />
                      </Block>
                    </Block>
                    <Block center>
                      <Button
                        onPress={handleSubmit}
                        color="primary"
                        round
                        style={styles.createButton}>
                        <Text
                          style={{fontFamily: 'montserrat-bold'}}
                          size={14}
                          color={nowTheme.COLORS.WHITE}>
                          {t('login')}
                        </Text>
                      </Button>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
    backgroundColor: nowTheme.COLORS.PRIMARY2,
  },
  imageBackground: {
    width: width,
    height: height,
  },
  registerContainer: {
    marginTop: 50,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  signup: {
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  margin10: {marginBottom: 5},
  horizontalImage: {
    height: 250,
    width: width * 0.7,
  },
  errorlogin: {
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    color: 'red',
  },
});

export default Login;
