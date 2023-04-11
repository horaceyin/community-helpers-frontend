// import { StyleSheet, Text, View } from "react-native";
// import React from "react";

// const AddressScreen = () => {
//   return (
//     <View>
//       <Text>AddressScreen</Text>
//     </View>
//   );
// };

// export default AddressScreen;

// const styles = StyleSheet.create({});

import React, { useState, useEffect } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Button, Menu, Divider, Provider, TextInput } from "react-native-paper";

const API_URL = "https://countriesnow.space/api/v0.1/countries";

const AddressDropDown = () => {
  const { height, width } = useWindowDimensions();

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cities, setCities] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCountryText, setSelectedCountryText] = useState(null);

  const [countryMenuVisible, setCountryMenuVisible] = useState(false);
  const [cityMenuVisible, setCityMenuVisible] = useState(false);

  const [cityFilter, setCityFilter] = useState("");

  const [filterCountriesText, setFilterCountriesText] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.data);
        setFilteredCountries(data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleCountrySelection = (country) => {
    setCountryMenuVisible(false);
    setFilterCountriesText("");
    setSelectedCountry(country);
    setSelectedCountryText(country.country);
    setFilteredCountries(countries);
    setSelectedCity(null);
    setCityMenuVisible(false);
    setCities(country.cities);
    setCityFilter("");
    setCityMenuVisible(true);
  };

  const handleCitySelection = (city) => {
    setSelectedCity(city);
    setCityFilter("");
    setCities(selectedCountry.cities);
    setCityMenuVisible(false);
  };

  const handleFilteringCountries = (text) => {
    setFilterCountriesText(text);

    if (text === "") {
      setFilteredCountries(countries);
    } else {
      const filteredCountries = countries.filter((country) =>
        country.country.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCountries(filteredCountries);
    }
  };

  const handleFilteringCities = (text) => {
    setCityFilter(text);

    if (text === "") {
      setCities(selectedCountry.cities);
    } else {
      const filteredCities = selectedCountry.cities.filter((city) =>
        city.toLowerCase().includes(text.toLowerCase())
      );
      setCities(filteredCities);
    }
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={countryMenuVisible}
        onDismiss={() => setCountryMenuVisible(false)}
        anchorPosition="bottom"
        contentStyle={{
          // minWidth: 280,
          width: 250,
          // marginLeft: width / 2 - 140,
          marginHorizontal: width / 6,
        }}
        anchor={
          <View style={styles.anchor}>
            <Button onPress={() => setCountryMenuVisible(true)}>
              {selectedCountryText ? selectedCountryText : "Select Country"}
            </Button>
          </View>
        }
      >
        <TextInput
          label={"filter the countries"}
          value={filterCountriesText}
          onChangeText={handleFilteringCountries}
        />
        {filteredCountries.map((country, index) => (
          <Menu.Item
            key={country.country + index}
            onPress={() => handleCountrySelection(country)}
            title={country.country}
          />
        ))}
      </Menu>
      {selectedCountry && (
        <>
          <Divider style={styles.divider} />
          <Menu
            visible={cityMenuVisible}
            onDismiss={() => setCityMenuVisible(false)}
            anchorPosition="bottom"
            contentStyle={{ width: 250, marginHorizontal: width / 6 }}
            anchor={
              <Button onPress={() => setCityMenuVisible(true)}>
                {selectedCity ? selectedCity : "Select City"}
              </Button>
            }
          >
            <TextInput
              placeholder="Search City"
              value={cityFilter}
              onChangeText={handleFilteringCities}
            />
            {cities.map((city, index) => (
              <Menu.Item
                key={city + index}
                onPress={() => handleCitySelection(city)}
                title={city}
              />
            ))}
          </Menu>
        </>
      )}
      <Divider style={styles.divider} />
      <Button
        disabled={!selectedCity}
        onPress={() => {
          console.log(selectedCity, selectedCountryText);
        }}
      >
        Confirm
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: "100%",
  //   padding: 20,
  // },
  divider: {
    height: 1,
    marginVertical: 10,
    width: "100%",
  },
  anchor: {
    // backgroundColor: "red",
  },
});

export default AddressDropDown;
