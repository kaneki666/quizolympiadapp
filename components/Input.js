import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import {Input} from 'galio-framework';

import Icon from './Icon';
import {nowTheme} from '../constants';

const ArInput = (props) => {
  const {shadowless, success, error, primary, password} = props;

  const inputStyles = [
    styles.input,
    !shadowless,
    success && styles.success,
    error && styles.error,
    primary && styles.primary,
    {...props.style},
  ];

  return (
    <Input
      placeholder="write something here"
      placeholderTextColor={nowTheme.COLORS.MUTED}
      style={inputStyles}
      color={nowTheme.COLORS.HEADER}
      password={password}
      iconContent={
        <Icon
          size={14}
          color={nowTheme.COLORS.ICON}
          name="link"
          family="AntDesign"
        />
      }
      {...props}
    />
  );
};

ArInput.defaultProps = {
  shadowless: false,
  success: false,
  error: false,
  primary: false,
};

ArInput.propTypes = {
  shadowless: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  primary: PropTypes.bool,
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF',
  },
  success: {
    borderColor: nowTheme.COLORS.INPUT_SUCCESS,
  },
  error: {
    borderColor: nowTheme.COLORS.INPUT_ERROR,
  },
  primary: {
    borderColor: nowTheme.COLORS.PRIMARY,
  },
  shadow: {
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 0.5},
    shadowRadius: 1,
    shadowOpacity: 0.13,
    elevation: 2,
  },
});

export default ArInput;