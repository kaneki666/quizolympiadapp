import React from 'react';
import {Block} from 'galio-framework';
import {Easing, Animated, Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

// screens

import Register from '../screens/Authentication/Register/Register';
import Login from '../screens/Authentication/Login/Login';
import Onboarding from '../screens/Authentication/Onboarding/onBoarding';

// drawer

const Stack = createStackNavigator();

export default function AuthStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        option={{
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
