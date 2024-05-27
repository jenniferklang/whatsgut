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
    color: "rgba(50, 50, 50, 0.9)",

    text: {
      fontFamily:
        'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      fontSize: 16,
    },
  },
});
