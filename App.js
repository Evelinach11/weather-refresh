import axios from "axios";
import * as Location from "expo-location";
import Weather from "./components/Weather";
import React, { useState, useEffect } from "react";
import { Alert, ActivityIndicator, View, Text, StyleSheet } from "react-native";

const API_KEY = "cb6ba15615b99e4f26a30b869289a147";

const WeatherApp = () => {
  const [temp, setTemp] = useState(null);
  const [name, setName] = useState(null);
  const [error, setError] = useState(null);
  const [tempMax, setTempMax] = useState(null);
  const [tempMin, setTempMin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [condition, setCondition] = useState(null);

  const getWeather = async (lat, lon) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const {
        main: { temp, temp_max, temp_min },
        weather,
        name,
      } = data;
      setTemp(temp);
      setTempMax(temp_max);
      setTempMin(temp_min);
      setName(name);
      setCondition(weather[0].main);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setError("Error fetching weather data");
    } finally {
      setLoading(false);
    }
  };

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        setLoading(false);
        return;
      }
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setLatitude(latitude);
      setLongitude(longitude);
      getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find your location", "Very sad");
      console.error("Error fetching location: ", error);
      setError("Error fetching location");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      refreshWeather();
    } else getLocation();
  }, [latitude, longitude]);

  const refreshWeather = async () => {
    setLoading(true);
    await getWeather(latitude, longitude);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Weather
        tempMin={Math.round(tempMin)}
        tempMax={Math.round(tempMax)}
        temp={Math.round(temp)}
        name={name}
        condition={condition}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});

export default WeatherApp;
