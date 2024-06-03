import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8cec1",
  },
  tabBar: {
    backgroundColor: "rgba(232, 206, 193, 0.6)",
    height: 70,
  },
  tabBarLabel: {
    paddingBottom: 10,
    fontSize: 11,
    color: "rgba(50, 50, 50, 0.9)",
    fontWeight: "500",

    text: {
      fontFamily:
        'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      fontSize: 16,
    },
  },
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 15,
    zIndex: 1,
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    textTransform: "uppercase",
    left: 0,
    right: 0,
    transform: [{ translateY: -1 }], // Flytta upp eller ner beroende på behov
    paddingTop: 15,
  },
});
