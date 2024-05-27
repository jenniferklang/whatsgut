import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

// Fejkad profilkomponent
const ProfileHeader = () => {
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.profileText}>Namn: John Doe</Text>
      <Text style={styles.profileText}>Ålder: 30</Text>
      <Text style={styles.profileText}>Kön: Man</Text>
      <Text style={styles.profileText}>Stad: Stockholm</Text>
    </View>
  );
};

const SymptomTracker = () => {
  const [logData, setLogData] = useState({
    id: 0,
    entry_id: 0,
    date: "",
    content: "",
    symptoms: [],
    meal: "",
  });

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }],
  };

  const updateSymptomData = () => {
    const newData = [...data.datasets[0].data];
    const symptomCounts = Object.values(logData.symptoms);
    symptomCounts.forEach((count, index) => {
      newData[index] = count || 0;
    });
    return newData;
  };

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
  };

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LineChart
        data={{
          labels: data.labels,
          datasets: [{ data: updateSymptomData() }],
        }}
        width={screenWidth * 0.9}
        height={220}
        chartConfig={chartConfig}
        style={{ borderRadius: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  profileContainer: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  profileText: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default SymptomTracker;
