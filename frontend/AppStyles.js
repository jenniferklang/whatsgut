import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8EAED",
  },
  tabBar: {
    backgroundColor: "rgba(232, 206, 193, 0.6)",
    height: 70,
  },
  tabBarLabel: {
    paddingBottom: 10,
    fontSize: 10,
    color: "rgba(50, 50, 50, 0.9)", // Mjuk svart färg med 60% opacitet
  },
});
