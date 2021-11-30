/*
- Write a React-Native component that fetches the data from 
the link below and renders a list of flights (static
data, - source, destination, departure time, arrival time, carrier and carrier icon)
- Each row should look like this: https://i.imgur.com/Lmtkee5.png
*/
import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView, FlatList } from "react-native";

function getCarrierIcon(code) {
  return `https://wf-deploy-assets.whereto.com/airlines/${code}.png`;
}
const link =
  "https://gist.githubusercontent.com/bgdavidx/132a9e3b9c70897bc07cfa5ca25747be/raw/8dbbe1db38087fad4a8c8ade48e741d6fad8c872/gistfile1.txt";
class FlightList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: []
    };
  }

  componentDidMount() {
    fetch(link)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        });
      });
  }
  _renderItem = ({ index, item }) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.smallSqaure}>Carrier Icon</View>
          <Text style={styles.text}>{item.carrier}</Text>
        </View>
        <View style={styles.container}>
          <h1>{item.origin}</h1>
          <Text style={styles.textDeparture}>{item.departureTime}</Text>
        </View>
        <View style={styles.container}>
          <h1>{item.destination}</h1>
          <Text style={styles.textArrival}>{item.arrivalTime}</Text>
        </View>
      </View>
    );
  };

  render() {
    let { dataSource, isLoading } = this.state;
    return (
      <FlatList
        data={dataSource}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}
export default FlightList;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    widht: 30,
    height: 170,
    borderWidth: 1,
    margin: 15,
    padding: 3,
    backgroundColor: "#E0F2FC"
  },

  container: {
    widht: 70,
    height: 70,
    margin: 10,
    padding: 5
  },

  smallSqaure: {
    width: 80,
    height: 80,
    margin: 8,
    borderWidth: 1,
    padding: 3,
    justifyContent: "center"
  },
  text: {
    height: 15,
    widht: 15,
    fontSize: 15,
    padding: 5,
    margin: 5
  },
  textDeparture: {
    height: 20,
    widht: 20,
    fontSize: 10,
    padding: 3,
    marginTop: 25
  },
  textArrival: {
    height: 20,
    widht: 20,
    fontSize: 10,
    padding: 3,
    marginTop: 25
  }
});
