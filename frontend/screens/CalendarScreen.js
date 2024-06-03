import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, TextInput } from "react-native-paper";

const MyCalendar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [logData, setLogData] = useState({
    id: 0,
    entry_id: 0,
    date: "",
    content: "",
    symptoms: "",
    meal: "",
  });
  const [markedDates, setMarkedDates] = useState({});
  const [logsForSelectedDate, setLogsForSelectedDate] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
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
            const formattedDate = dateObject.toISOString().slice(0, 10); // YYYY-MM-DD
            acc[formattedDate] = { marked: true, dotColor: "black" };
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

  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    setLogModalVisible(true);
    setLogData((prevData) => ({ ...prevData, date: date }));
    try {
      const response = await fetch(
        `http://192.168.1.82:3000/api/logs?date=${date}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Network response was not ok: ${response.status} ${errorText}`
        );
      }
      const data = await response.json();
      setLogsForSelectedDate(data);
    } catch (error) {
      console.error("Error fetching logs for selected date:", error);
    }
  };

  const handleBackToCalendar = () => {
    setLogModalVisible(false);
  };

  const handleNewNote = () => {
    setLogData((prevData) => ({
      ...prevData,
      date: selectedDate,
    }));
    setLogModalVisible(false);
    setModalVisible(true);
  };

  const handleFormSubmit = async () => {
    if (!logData.date) {
      console.error("Date is required");
      return;
    }

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

  const toggleSymptom = (symptom) => {
    const updatedSymptoms = logData.symptoms === symptom ? "" : symptom;
    setLogData((prevData) => ({ ...prevData, symptoms: updatedSymptoms }));
  };

  const handleDeleteLog = async (entryId) => {
    try {
      const response = await fetch(
        `http://192.168.1.82:3000/api/delete-entry/${entryId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Network response was not ok: ${response.status} ${errorText}`
        );
      }

      setLogsForSelectedDate((prevLogs) =>
        prevLogs.filter((log) => log.entry_id !== entryId)
      );

      if (logsForSelectedDate.length === 1) {
        const { [selectedDate]: _, ...remainingMarkedDates } = markedDates;
        setMarkedDates(remainingMarkedDates);
      }

      setSelectedLog(null);
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={{
          width: 325,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          paddingBottom: 20,
        }}
        onDayPress={(day) => handleDateSelect(day.dateString)}
        markedDates={markedDates}
        theme={{
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "black",
          selectedDotColor: "#ffffff",
          arrowColor: "black",
          disabledArrowColor: "#d9e1e8",
          monthTextColor: "black",
          indicatorColor: "black",
          textDayFontSize: 18,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 16,
          textDayFontWeight: "400",
          textMonthFontWeight: "400",
        }}
      />

      <Modal visible={logModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.dateText}>{selectedDate}</Text>
            <ScrollView>
              {logsForSelectedDate.map((log, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.logItemContainer,
                    selectedLog === log.entry_id && styles.logItemSelected,
                  ]}
                  onPress={() => setSelectedLog(log.entry_id)}
                >
                  <Text style={styles.logText}>Content: {log.content}</Text>
                  <Text style={styles.logText}>
                    Symptoms:
                    {log.symptoms ? log.symptoms : "No symptoms recorded"}
                  </Text>
                  <Text style={styles.logText}>Meal: {log.meal}</Text>
                  {selectedLog === log.entry_id && (
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteLog(log.entry_id)}
                    >
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBackToCalendar}
              >
                <Icon name="arrow-back" size={30} color="black" />
              </TouchableOpacity>
              <Text style={{ marginLeft: 150, marginTop: 7, fontSize: 16 }}>
                New Note
              </Text>
              <TouchableOpacity
                style={styles.forwardButton}
                onPress={handleNewNote}
              >
                <Icon name="arrow-forward" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.dateText}>{selectedDate}</Text>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setModalVisible(false)}
            ></TouchableOpacity>
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
                    logData.symptoms === symptom &&
                      styles.symptomButtonSelected,
                  ]}
                  onPress={() => toggleSymptom(symptom)}
                >
                  <Text
                    style={[
                      styles.symptomButtonText,
                      logData.symptoms === symptom &&
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
                labelStyle={{ color: "black" }}
              >
                Save log
              </Button>
              <Button
                mode="outlined"
                onPress={() => setModalVisible(false)}
                style={styles.button}
                labelStyle={{ color: "black" }}
              >
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8cec1",
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "lightgray",
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
    marginBottom: 12,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logItemContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
  },
  logItemSelected: {
    backgroundColor: "lightgray",
  },
  logText: {
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 10,
    padding: 5,
    backgroundColor: "red",
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    marginBottom: 12,
  },
});

export default MyCalendar;
