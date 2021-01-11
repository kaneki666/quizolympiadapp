import React from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Yup from 'yup';
import {useFormik, ErrorMessage} from 'formik';

import {Button, Input} from '../../../components';
import {nowTheme} from '../../../constants';
import {ScrollView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Register = (props) => {
  const {t} = useTranslation();

  const SignUpSchema = Yup.object().shape({
    username: Yup.string()
      .required(`${t('username')} ${t('required')}`)
      .min(6, `${t('username')} ${t('short')} 6 ${t('chars')}`),
    fullname: Yup.string()
      .required(`${t('fullname')} ${t('required')}`)
      .min(6, `${t('username')} ${t('short')} 6 ${t('chars')}`),
    schoolname: Yup.string().required(`${t('schoolname')} ${t('required')}`),
    class: Yup.string().required(`${t('class')} ${t('required')}`),
    dob: Yup.date().required(`${t('dob')} ${t('required')}`),
    phone: Yup.string()
      .required(`${t('phone')} ${t('required')}`)
      .matches(phoneRegExp, `${t('phoneinvalid')}`),
    password: Yup.string()
      .required(`${t('password')} ${t('required')}`)
      .min(6, `${t('password')} ${t('short')} 6 ${t('chars')}`)
      .matches(/[a-zA-Z]/, 'Password can only contain letters and numbers.'),
    passwordConfirmation: Yup.string()
      .equals([Yup.ref('password')], `${t('confirminvalid')}`)
      .required(`${t('confirm')} ${t('required')}`),
  });

  return (
    <DismissKeyboard>
      <Block flex middle style={styles.imageBackgroundContainer}>
        <Block flex middle>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={styles.registerContainer}>
              <Block flex space="evenly">
                <Block flex={0.4} middle style={styles.socialConnect}>
                  <Block flex={0.5} middle>
                    <Image
                      source={require('../../../assets/register.webp')}
                      style={styles.horizontalImage}
                    />
                    <Text style={styles.signup} color="#333" size={24}>
                      {t('register')}
                    </Text>
                  </Block>
                </Block>
                <Block flex={1} middle space="between">
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <Block>
                        <Block width={width * 0.8} style={styles.margin10}>
                          <Input
                            placeholder={t('username')}
                            style={styles.inputs}
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
                            placeholder={t('fullname')}
                            style={styles.inputs}
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
                        <Block width={width * 0.8} style={styles.margin10}>
                          <Input
                            placeholder={t('schoolname')}
                            style={styles.inputs}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="book"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8} style={styles.margin10}>
                          <Input
                            placeholder={t('class')}
                            style={styles.inputs}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="check"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8} style={styles.margin10}>
                          <Input
                            placeholder={t('dob')}
                            style={styles.inputs}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="calendar"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8} style={styles.margin10}>
                          <Input
                            placeholder={t('phone')}
                            style={styles.inputs}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="phone"
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
                            iconContent={
                              <MaterialCommunityIcons
                                size={16}
                                color="#ADB5BD"
                                name="form-textbox-password"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8} style={styles.margin10}>
                          <Input
                            password={true}
                            placeholder={t('confirm')}
                            style={styles.inputs}
                            iconContent={
                              <MaterialCommunityIcons
                                size={16}
                                color="#ADB5BD"
                                name="form-textbox-password"
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
                            label="I agree to the terms and conditions."
                          />
                        </Block>
                      </Block>
                      <Block center>
                        <Button
                          color="primary"
                          round
                          style={styles.createButton}>
                          <Text
                            style={{fontFamily: 'montserrat-bold'}}
                            size={14}
                            color={nowTheme.COLORS.WHITE}>
                            {t('register')}
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
    marginTop: 55,
    width: width * 0.9,
    flex: 1,
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
    height: 120,
    width: 170,
  },
});

export default Register;

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
