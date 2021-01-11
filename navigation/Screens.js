import React from 'react';

import {Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// screens
import Subjects from '../screens/Home/Subjects/Subjects';
import Chapters from '../screens/Home/Chapters/Chapters';
import Profile from '../screens/Home/Profile/Profile';
import FriendsProfile from '../screens/Home/Profile/FriendsProfile';
import SinglePlayer from '../screens/Home/SinglePlayer/SinglePlayer';
import Mode from '../screens/Home/Mode/Mode';
import Notificaton from '../screens/Home/Notification/Notification';
import GameJoin from '../screens/Home/Game/GameJoin';
import Leaderboard from '../screens/Home/Leaderboard/Leaderboard';
import Challenge from '../screens/Home/Challenge/Challenge';
import ResultDetails from '../screens/Home/ResultDetails/ResultDetails';
import ResultDetailsDuo from '../screens/Home/ResultDetails/ResultDetailsDuo';
import SettingsScreen from '../screens/Home/Settings/Settings';
import Privacy from '../screens/Home/Settings/Privacy';
import UserAgreements from '../screens/Home/Settings/UserAgreements';
import About from '../screens/Home/Settings/About';
import Pro from '../screens/Pro';

import Register from '../screens/Profile';
import Components from '../screens/Profile';
import Login from '../screens/Profile';
import Articles from '../screens/Articles';

// drawer
import CustomDrawerContent from './Menu';
// header for screens
import {Header} from '../components';
import {nowTheme} from '../constants';

const {width} = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const GameStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Subjects"
        component={Subjects}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Subjects"
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: {backgroundColor: '#FFFFFF'},
        }}
      />
      <Stack.Screen
        name="Chapters"
        component={Chapters}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Chapters"
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: {backgroundColor: '#FFFFFF'},
        }}
      />
      <Stack.Screen
        name="Notificaton"
        component={Notificaton}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Notificaton"
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: {backgroundColor: '#FFFFFF'},
        }}
      />
      <Stack.Screen
        name="Mode"
        component={Mode}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="SinglePlayer"
        component={SinglePlayer}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="GameJoin"
        component={GameJoin}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="FriendsProfile"
        component={FriendsProfile}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ResultDetails"
        component={ResultDetails}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title=""
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ResultDetailsDuo"
        component={ResultDetailsDuo}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title=""
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Challenge"
        component={Challenge}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Challenge"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: {backgroundColor: '#FFFFFF'},
        }}
      />
    </Stack.Navigator>
  );
};

const ChaptersStack = (props) => {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Chapters"
        component={Chapters}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Chapters"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: {backgroundColor: '#FFFFFF'},
        }}
      />
    </Stack.Navigator>
  );
};

function ArticlesStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Articles"
      mode="card"
      headerMode="screen">
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({navigation, scene}) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

// function HomeStack(props) {
//   return (
//     <Stack.Navigator mode="card" headerMode="screen">
//       <Stack.Screen
//         name="Home"
//         component={Home}
//         options={{
//           header: ({navigation, scene}) => (
//             <Header
//               title="Home"
//               search
//               options
//               navigation={navigation}
//               scene={scene}
//             />
//           ),
//           cardStyle: {backgroundColor: '#FFFFFF'},
//         }}
//       />
//       <Stack.Screen
//         name="Pro"
//         component={Pro}
//         options={{
//           header: ({navigation, scene}) => (
//             <Header
//               title=""
//               back
//               white
//               transparent
//               navigation={navigation}
//               scene={scene}
//             />
//           ),
//           headerTransparent: true,
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{flex: 1}}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY2,
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
      initialRouteName="Home">
      <Drawer.Screen name="Home" component={GameStack} />
      {/* <Drawer.Screen name="Chapters" component={ChaptersStack} /> */}
      <Drawer.Screen name="Components" component={Register} />
      <Drawer.Screen name="Articles" component={ArticlesStack} />

      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="UserAgreements" component={UserAgreements} />
      <Drawer.Screen name="Privacy" component={Privacy} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
