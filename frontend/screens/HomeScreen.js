import React, { useState } from "react";
import { ScrollView, Image, StyleSheet, View, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const images = [
  require("../assets/image5.jpeg"),
  require("../assets/image5.jpeg"),
  require("../assets/image5.jpeg"),
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.floor(contentOffsetX / width);
    setCurrentIndex(currentIndex);
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
            <Image source={image} style={styles.image} />
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
});

export default App;
