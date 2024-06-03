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
    overlaySubtitle: "What's up\nwith your gut?",
  },
  {
    source: require("../assets/food2.jpg"),
    text: "Track your triggers and identify\nthe foods that cause symptoms",
    title: "Food and Triggers",
  },
  {
    source: require("../assets/training.jpg"),
    text: "Find the exercise that suits you\nto strengthen your body",
    title: "Training",
  },
  {
    source: require("../assets/happyagain.jpg"),
    text: "Do you want to stop thinking\nabout your stomach all the time?",
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
              {index === 0 && (
                <Text style={styles.overlaySubtitle}>
                  {image.overlaySubtitle}
                </Text>
              )}
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
    paddingTop: 40,
  },
  slide: {
    width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8cec1",
  },
  image: {
    width: 300,
    height: 390,
    borderRadius: 20,
    margin: 10,
  },
  // overlayContainer: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   width: "100%",
  //   backgroundColor: "rgba(255, 255, 255, 0.6)",
  //   padding: 15,
  //   zIndex: 1,
  // },
  // overlayTitle: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   color: "black",
  //   textAlign: "center",
  //   textTransform: "uppercase",
  //   left: 0,
  //   right: 0,
  //   transform: [{ translateY: -1 }], // Flytta upp eller ner beroende på behov
  //   paddingTop: 15,
  // },
  overlaySubtitle: {
    position: "absolute",
    bottom: 200, // Flytta till botten av bilden
    left: 80,
    fontSize: 20,
    color: "black",
    padding: 10,
    borderRadius: 10,
    fontWeight: "700",
  },
  textContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 20,
    marginTop: 5,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  imageText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
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
