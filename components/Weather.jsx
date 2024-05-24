import React from "react";
import propTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, StatusBar } from "react-native";

const weatherOptions = {
  Thunderstorm: {
    iconName: "thunderstorm-outline",
    title: "Thunderstorm",
    subtitle: "Dangerous weather with a thunderstorm",
    backgroundGradient: ["#212A3E", "#394867", "#97DEFF"],
  },
  Rain: {
    iconName: "rainy-outline",
    title: "Rain",
    subtitle: "Precipitation in the form of water droplets",
    backgroundGradient: ["#6C9BCF", "#A5C0DD", "#EBD8B2"],
  },
  Snow: {
    iconName: "snow-outline",
    title: "Snow",
    subtitle: "Precipitation in the form of ice crystals",
    backgroundGradient: ["#C0DBEA", "#B9E9FC", "#97DEFF"],
  },
  Clear: {
    iconName: "ios-nuclear-outline",
    title: "Clear",
    subtitle: "Cloudless sky",
    backgroundGradient: ["#19A7CE", "#D4FAFC", "#97DEFF"],
  },
  Clouds: {
    iconName: "cloud-outline",
    title: "Clouds",
    subtitle: "Gloomy weather",
    backgroundGradient: ["#4c669f", "#3b5998", "#192f6a"],
  },
};

export default function Weather({ temp, tempMax, tempMin, name, condition }) {
  if (!weatherOptions[condition]) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Unknown weather condition</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={weatherOptions[condition].backgroundGradient}
      style={styles.container}
    >
      <StatusBar barStyle="light-content"></StatusBar>
      <View style={styles.detail}>
        <Ionicons
          name={weatherOptions[condition].iconName}
          size={100}
          color="white"
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.temp}>{temp}°</Text>
        <View style={styles.tempWave}>
          <Text style={styles.temperature}>min-{tempMin}°</Text>
          <Text style={styles.temperature}>max-{tempMax}°</Text>
        </View>
      </View>
      <View style={{ ...styles.detail, ...styles.textContainer }}>
        <Text style={styles.title}>{weatherOptions[condition].title}</Text>
        <Text style={styles.subtitle}>
          {weatherOptions[condition].subtitle}
        </Text>
      </View>
    </LinearGradient>
  );
}

Weather.propTypes = {
  temp: propTypes.number.isRequired,
  condition: propTypes.oneOf([
    "Thunderstorm",
    "Rain",
    "Snow",
    "Mist",
    "Smoke",
    "Dust",
    "Sand",
    "Haze",
    "Clear",
    "Clouds",
  ]).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  detail: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    width: "90%",
  },
  name: {
    fontSize: 30,
    color: "white",
  },
  temp: {
    fontSize: 30,
    color: "white",
  },
  temperature: {
    fontSize: 20,
    color: "white",
    marginHorizontal: 20,
  },
  tempWave: {
    flexDirection: "row",
    margin: 10,
  },
  title: {
    fontSize: 44,
    color: "white",
    fontWeight: 300,
    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    fontWeight: 600,
    fontSize: 24,
  },
  textContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
});
