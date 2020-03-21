import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import TrackScreen from '../screens/TrackScreen';
import CheckScreen from '../screens/CheckScreen';
import ReportScreen from '../screens/ReportScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
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
        component={CheckScreen}
        options={{
          title: 'Bewegungsabgleich',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-sync" />,
        }}
      />
      <BottomTab.Screen
        name="Report"
        component={ReportScreen}
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
    case 'Tracking':
      return 'Geo-Tracking';
    case 'Check':
      return 'Abgleich';
  }
}
