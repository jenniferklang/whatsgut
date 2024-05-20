import React, { useState } from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from "react-native";
// import { Vibration } from "react-native";

const { width } = Dimensions.get("window");

const images = [
  { source: require("../assets/symptoms.jpg"), text: "Track your symptoms" },
  {
    source: require("../assets/food.jpg"),
    text: "Take notes of your triggers \ndirectly into the calendar",
  },
  {
    source: require("../assets/happyagain.jpg"),
    text: "Do you want to stop thinking\n about your stomach all the time? \n\nGet started to se\n whats up with your gut!",
  },
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(contentOffsetX / width);
    if (newIndex !== currentIndex) {
      // Vibration.vibrate(); // Trigger vibration
      setCurrentIndex(newIndex);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={image.source} style={styles.image} />
            <Text style={styles.imageText}>{image.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, { opacity: currentIndex === index ? 1 : 0.5 }]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5fcff",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
    margin: 10,
  },

  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  dot: {
    height: 5,
    width: 5,
    backgroundColor: "#595959",
    borderRadius: 5,
    margin: 8,
  },
  imageText: {
    fontSize: 18,
    marginTop: 10,
    color: "#333", // Mörkgrå färg
    textAlign: "center",
    fontFamily: "Arial", // Exempel på anpassat typsnitt
  },
});

export default App;
