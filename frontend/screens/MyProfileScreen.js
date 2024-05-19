// import React from "react";
// import { View, Text } from "react-native";

// const MyProfileScreen = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>My Profile</Text>
//     </View>
//   );
// };

// export default MyProfileScreen;

import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { G, Line } from "react-native-svg";

const DonutChart = () => {
  const data = [
    {
      key: 1,
      value: 12,
      svg: { fill: "#56cfe1" },
      arc: { outerRadius: "100%", innerRadius: "60%" },
    },
    {
      key: 2,
      value: 19,
      svg: { fill: "#00a896" },
      arc: { outerRadius: "100%", innerRadius: "60%" },
    },
    {
      key: 3,
      value: 3,
      svg: { fill: "#80ffdb" },
      arc: { outerRadius: "100%", innerRadius: "60%" },
    },
  ];

  const Labels = ({ slices }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, data } = slice;
      return (
        <G key={index}>
          <Line
            x1={labelCentroid[0]}
            y1={labelCentroid[1]}
            x2={labelCentroid[0]}
            y2={labelCentroid[1] - 10}
            stroke={"black"}
          />
          <Text
            x={labelCentroid[0]}
            y={labelCentroid[1] - 10}
            fill={"black"}
            textAnchor={"middle"}
            alignmentBaseline={"middle"}
            fontSize={14}
            stroke={"black"}
            strokeWidth={0.2}
          >
            {data.value}
          </Text>
        </G>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Symptoms chart</Text>
      <PieChart
        style={{ height: 220, width: Dimensions.get("window").width - 40 }}
        valueAccessor={({ item }) => item.value}
        data={data}
        spacing={0}
        outerRadius={"100%"}
        animationduration={500}
      >
        <Labels />
      </PieChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
});

export default DonutChart;
