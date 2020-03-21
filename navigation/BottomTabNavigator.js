import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TabBarIcon from '../components/TabBarIcon';
import TrackScreen from '../screens/TrackScreen';
import CheckScreen from '../screens/CheckScreen';
import ReportScreen from '../screens/ReportScreen';
import ResponseScreen from '../screens/ResponseScreen';


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Tracking';

const CheckStackNavigator = createStackNavigator();

const CheckNavigator = () => {
  return (
    <CheckStackNavigator.Navigator screenOptions={{
      headerShown: false
    }}>
      <CheckStackNavigator.Screen name="CheckMain" component={CheckScreen} />
      <CheckStackNavigator.Screen name="Response" component={ResponseScreen} />
    </CheckStackNavigator.Navigator>
  )
}

const ReportStackNavigator = createStackNavigator();

const ReportNavigator = () => {
  return (
    <ReportStackNavigator.Navigator screenOptions={{
      headerShown: false
    }}>
      <ReportStackNavigator.Screen name="ReportMain" component={ReportScreen} />
      <ReportStackNavigator.Screen name="Response" component={ResponseScreen} />
    </ReportStackNavigator.Navigator>
  )
}

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} >
      <BottomTab.Screen
        name="Tracking"
        component={TrackScreen}
        options={{
          title: 'Geo-Tracking',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-locate" />,
        }}
      />
      <BottomTab.Screen
        name="Check"
        component={CheckNavigator}
        options={{
          title: 'Bewegungsabgleich',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-sync" />,
        }}
      />
      <BottomTab.Screen
        name="Report"
        component={ReportNavigator}
        options={{
          title: 'Infektion melden',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-warning" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Report':
      return 'Infektion Melden';
    case 'Tracking':
      return 'Geo-Tracking';
    case 'Check':
      return 'Abgleich';
  }
}
