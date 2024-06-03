import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";

const SplashScreen = ({ onSplashFinished }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      onSplashFinished();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return showSplash ? (
    <View style={styles.container}>
      <Image
        source={require("../assets/trigger.jpg")}
        resizeMode="cover"
        style={styles.image}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
});

export default SplashScreen;
