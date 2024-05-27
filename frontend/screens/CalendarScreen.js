import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/Ionicons";

const MyCalendar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [logData, setLogData] = useState({
    id: 0,
    entry_id: 0,
    date: "",
    content: "",
    symptoms: [],
    meal: "",
  });
  const [markedDates, setMarkedDates] = useState({});
  const [logsForSelectedDate, setLogsForSelectedDate] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const symptomsList = ["Heartburn", "Chest Pain", "Bloating"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.1.82:3000/api");
        const data = await response.json();

        const markedDatesObj = data.reduce((acc, log) => {
          const dateObject = new Date(log.entry_date);
          if (!isNaN(dateObject.getTime())) {
            const formattedDate = dateObject.toISOString().slice(0, 10);
            // YYYY - MM - DD;
            acc[formattedDate] = { marked: true, dotColor: "blue" };
          }
          return acc;
        }, {});

        setMarkedDates(markedDatesObj);
      } catch (error) {
        console.error("Error fetching log data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDateSelect = (date) => {
    setLogData((prevData) => ({
      ...prevData,
      date: date,
    }));
    setSelectedDate(date);
    setModalVisible(true);
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch("http://192.168.1.82:3000/api/add-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const date = logData.date.split("T")[0];
      setMarkedDates((prevDates) => ({
        ...prevDates,
        [date]: { marked: true, dotColor: "blue" },
      }));

      setLogData({
        id: 0,
        entry_id: 0,
        date: "",
        content: "",
        symptoms: [],
        meal: "",
      });
      setModalVisible(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleShowLogs = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.82:3000/api/logs?date=${selectedDate}`
      );
      const data = await response.json();
      setLogsForSelectedDate(data);
      setLogModalVisible(true);
    } catch (error) {
      console.error("Error fetching logs for selected date:", error);
    }
  };

  const toggleSymptom = (symptom) => {
    setLogData((prevData) => {
      const symptoms = prevData.symptoms.includes(symptom)
        ? prevData.symptoms.filter((s) => s !== symptom)
        : [...prevData.symptoms, symptom];
      return { ...prevData, symptoms };
    });
  };

  const handleBackToCalendar = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => handleDateSelect(day.dateString)}
        markedDates={markedDates}
      />
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackToCalendar}
            >
              <Icon name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.dateText}>{selectedDate}</Text>
            <TextInput
              label="How are you today?"
              value={logData.content}
              onChangeText={(text) => setLogData({ ...logData, content: text })}
              style={styles.input}
            />
            <TextInput
              label="What have you been eating?"
              value={logData.meal}
              onChangeText={(text) => setLogData({ ...logData, meal: text })}
              style={styles.input}
            />
            <View style={styles.symptomsContainer}>
              {symptomsList.map((symptom, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.symptomButton,
                    logData.symptoms.includes(symptom) &&
                      styles.symptomButtonSelected,
                  ]}
                  onPress={() => toggleSymptom(symptom)}
                >
                  <Text
                    style={[
                      styles.symptomButtonText,
                      logData.symptoms.includes(symptom) &&
                        styles.symptomButtonTextSelected,
                    ]}
                  >
                    {symptom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={handleFormSubmit}
                style={styles.button}
                labelStyle={{ color: "svart" }}
              >
                Save log
              </Button>
              <Button
                mode="outlined"
                onPress={handleShowLogs}
                style={styles.button}
                labelStyle={{ color: "svart" }}
              >
                Show Logs
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={logModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView>
              {logsForSelectedDate.map((log, index) => (
                <View key={index} style={styles.logItemContainer}>
                  <Text style={styles.logText}>Content: {log.content}</Text>
                  <Text style={styles.logText}>Symptoms: {log.symptoms}</Text>
                  <Text style={styles.logText}>Meal: {log.meal}</Text>
                </View>
              ))}
            </ScrollView>
            <Button
              mode="outlined"
              onPress={() => setLogModalVisible(false)}
              style={styles.button}
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#e8cec1",
    padding: 20,
    borderRadius: 10,
  },
  dateText: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "white",
  },
  symptomsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  symptomButton: {
    padding: 10,
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
  },
  symptomButtonSelected: {
    backgroundColor: "lightblue",
  },
  symptomButtonText: {
    color: "black",
  },
  symptomButtonTextSelected: {
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logItemContainer: {
    marginBottom: 10,
  },
  logText: {
    fontSize: 16,
  },
});

export default MyCalendar;
