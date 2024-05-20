import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const CalendarComponent = () => {
  const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate("MyProfile");
  };

  const [logData, setLogData] = useState({
    id: 0,
    entry_id: 0,
    date: "",
    content: "",
    symptoms: "",
    meal: "",
  });
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await fetchMarkedDates();
    };

    fetchData();
  }, []);

  const fetchMarkedDates = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.82:3000/api/dates-with-entries"
      );
      const data = await response.json();
      console.log("Fetched dates:", data);

      const markedDatesObj = {};
      data.forEach((date) => {
        const formattedDate = formatDate(date);
        markedDatesObj[formattedDate] = { marked: true };
      });

      setMarkedDates(markedDatesObj);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (field, value) => {
    setLogData({ ...logData, [field]: value });
  };

  const saveData = async () => {
    try {
      const formattedDate = formatDate(logData.date);
      console.log("Formatted Date: ", formattedDate);

      const response = await fetch("http://192.168.1.82:3000/api/add-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...logData,
          date: formattedDate,
        }),
      });
      const data = await response.json();
      console.log("Data saved:", data);

      setMarkedDates((prevDates) => ({
        ...prevDates,
        [formattedDate]: { marked: true },
      }));

      setLogData({
        id: 0,
        entry_id: 0,
        date: "",
        content: "",
        symptoms: "",
        meal: "",
      });

      await fetchMarkedDates();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const formatDate = (date) => {
    return date;
  };

  useEffect(() => {
    console.log("Marked dates updated:", markedDates);
  }, [markedDates]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          handleChange("date", day.dateString);
        }}
        markedDates={markedDates}
        dotStyle={{ backgroundColor: "red" }}
      />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={logData.content}
          onChangeText={(text) => handleChange("content", text)}
          placeholder="Content"
        />
        <TextInput
          style={styles.input}
          value={logData.symptoms}
          onChangeText={(text) => handleChange("symptoms", text)}
          placeholder="Symptoms"
        />
        <TextInput
          style={styles.input}
          value={logData.meal}
          onChangeText={(text) => handleChange("meal", text)}
          placeholder="Meal"
        />
        <Button title="Save" onPress={saveData} />
        <Button title="My Profile" onPress={navigateToProfile} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CalendarComponent;
