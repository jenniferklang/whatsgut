import React, { useState } from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from "react-native";

const { width } = Dimensions.get("window");

const images = [
  {
    source: require("../assets/notes.jpg"),
    text: "Take notes of your symptoms \ndirectly into the calendar",
    title: "Notes",
    overlayTitle: "Whatsgut",
  },
  {
    source: require("../assets/food2.jpg"),
    text: "Track your triggers",
    title: "Food and Triggers",
  },
  {
    source: require("../assets/training.jpg"),
    text: "Find the exercise that suits you\nto strengthen your body",
    title: "Training",
  },
  {
    source: require("../assets/happyagain.jpg"),
    text: "Do you want to stop thinking\nabout your stomach all the time?\n\nGet started to see\nwhats up with your gut!",
    title: "Feel Happy Again",
  },
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(contentOffsetX / width);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlayContainer}>
        <Text style={styles.overlayTitle}>{images[0].overlayTitle}</Text>
      </View>
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
          <View key={index} style={styles.slide}>
            <Image source={image.source} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>{image.title}</Text>
              <Text style={styles.imageText}>{image.text}</Text>
            </View>
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
    backgroundColor: "#e8cec1",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 400,
    borderRadius: 20,
    margin: 10,
  },
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 20,
    zIndex: 1,
  },
  overlayTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  textContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  imageText: {
    fontSize: 16,
    color: "#333",
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
});

export default App;
