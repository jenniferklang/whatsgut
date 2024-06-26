import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import RefreshableScreen from "./screens/RefreshableScreen";
import HomeScreen from "./screens/HomeScreen";
import CalendarScreen from "./screens/CalendarScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ExerciseScreen from "./screens/ExerciseScreen";
import MyProfileScreen from "./screens/MyProfileScreen";
import styles from "./AppStyles";
import SplashScreen from "./screens/SplashScreen";
import { View, Text } from "react-native";
const Tab = createBottomTabNavigator();

const App = () => {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  const onSplashFinished = () => {
    setIsSplashFinished(true);
  };

  const onRefresh = async () => {
    // Hämta ny data här
    // Exempel: await fetchData();
  };

  return (
    <>
      {!isSplashFinished && (
        <SplashScreen onSplashFinished={onSplashFinished} />
      )}
      {isSplashFinished && (
        <NavigationContainer>
          <View style={styles.overlayContainer}>
            <Text style={styles.overlayTitle}>Whatsgut</Text>
          </View>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                const routeName = route.name;

                if (routeName === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (routeName === "Calendar") {
                  iconName = focused ? "calendar" : "calendar-outline";
                } else if (routeName === "Settings") {
                  iconName = focused ? "settings" : "settings-outline";
                } else if (routeName === "Exercise") {
                  iconName = focused ? "barbell" : "barbell-outline";
                } else if (routeName === "MyProfile") {
                  iconName = focused
                    ? "person-circle"
                    : "person-circle-outline";
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarStyle: styles.tabBar,
              tabBarLabelStyle: styles.tabBarLabel,
              tabBarActiveTintColor: "rgba(50, 50, 50, 50)",
              tabBarInactiveTintColor: "rgba(50, 50, 50, 0.8)",
              headerShown: false,
            })}
          >
            <Tab.Screen name="Home">
              {() => (
                <RefreshableScreen onRefresh={onRefresh}>
                  <HomeScreen />
                </RefreshableScreen>
              )}
            </Tab.Screen>
            <Tab.Screen name="Exercise">
              {() => (
                <RefreshableScreen onRefresh={onRefresh}>
                  <ExerciseScreen />
                </RefreshableScreen>
              )}
            </Tab.Screen>
            <Tab.Screen name="Calendar">
              {() => (
                <RefreshableScreen onRefresh={onRefresh}>
                  <CalendarScreen />
                </RefreshableScreen>
              )}
            </Tab.Screen>
            <Tab.Screen name="Settings">
              {() => (
                <RefreshableScreen onRefresh={onRefresh}>
                  <SettingsScreen />
                </RefreshableScreen>
              )}
            </Tab.Screen>
            <Tab.Screen name="MyProfile">
              {() => (
                <RefreshableScreen onRefresh={onRefresh}>
                  <MyProfileScreen />
                </RefreshableScreen>
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
