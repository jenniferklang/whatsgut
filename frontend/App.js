import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import CalendarScreen from "./screens/CalendarScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ExerciseScreen from "./screens/ExerciseScreen";
import styles from "./AppStyles";

const homeName = "Home";
const detailsName = "Details";
const calendarName = "Calendar";
const settingsName = "Settings";
const exerciseName = "Exercise";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === detailsName) {
              iconName = focused ? "list" : "list-outline";
            } else if (rn === calendarName) {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (rn === settingsName) {
              iconName = focused ? "settings" : "settings-outline";
            } else if (rn === exerciseName) {
              iconName = focused ? "barbell" : "barbell-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarActiveTintColor: "#467685",
          tabBarInactiveTintColor: "grey",
          headerShown: false,
        })}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={exerciseName} component={ExerciseScreen} />
        <Tab.Screen name={calendarName} component={CalendarScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />
        <Tab.Screen name={detailsName} component={DetailsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

// import { StatusBar } from "expo-status-bar";
// import { Text, View } from "react-native";
// import styles from "./AppStyles";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Hejjj Ponneee</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
