import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SettingsScreen = () => {
  const handleLogout = () => {
    // Lägg till logik för att logga ut här
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <TouchableOpacity style={styles.settingItem}>
        <Icon name="notifications-outline" size={24} color="black" />
        <Text style={styles.settingText}>Push Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <Icon name="moon-outline" size={24} color="black" />
        <Text style={styles.settingText}>Dark Mode</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <Icon name="mail-outline" size={24} color="black" />
        <Text style={styles.settingText}>Email Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
        <Icon name="log-out-outline" size={24} color="black" />
        <Text style={styles.settingText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8cec1",
    paddingTop: 90,
    paddingLeft: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingTop: 10,
  },
  settingText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default SettingsScreen;
