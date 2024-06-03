import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const chartConfig = {
  backgroundGradientFrom: "#FFF",
  backgroundGradientTo: "#FFF",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 3,
  barPercentage: 0.7,
  decimalPlaces: 0,
};

const MyProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("May");

  const symptomData = [
    { symptom: "Heartburn", value: 7 },
    { symptom: "Chest Pain", value: 1 },
    { symptom: "Bloating", value: 9 },
  ];

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setShowModal(true);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#e8cec1",
        justifyContent: "center",
        paddingLeft: 30,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#e8cec1",
          alignItems: "center",
          marginTop: 90,
        }}
      >
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Image
            source={require("../assets/food.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginRight: 20,
            }}
          />
        </TouchableOpacity>
        <View>
          <Text style={{ fontSize: 20 }}>Name: Jane Doe</Text>
          <Text style={{ fontSize: 16 }}>Occupation: Developer</Text>
          <Text style={{ fontSize: 16 }}>City: Gothenburg</Text>
        </View>
      </View>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 80,
          }}
        >
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Text style={{ fontSize: 20, marginLeft: 200 }}>Close</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 20,
              marginLeft: 200,
            }}
          >
            {selectedMonth}
          </Text>
          <LineChart
            data={{
              labels: symptomData.map((data) => data.symptom),
              datasets: [
                {
                  data: symptomData.map((data) => data.value),
                },
              ],
            }}
            width={300}
            height={300}
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 16 }}
          />
        </View>
      </Modal>
      <ScrollView horizontal style={{ marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => handleMonthSelect("May")}
          style={{ paddingHorizontal: 10 }}
        >
          <Text style={{ fontSize: 16 }}>May</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleMonthSelect("June")}
          style={{ paddingHorizontal: 10 }}
        >
          <Text style={{ fontSize: 16 }}>June</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleMonthSelect("July")}
          style={{ paddingHorizontal: 10 }}
        >
          <Text style={{ fontSize: 16 }}>July</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MyProfile;
