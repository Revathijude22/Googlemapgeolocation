// Integration of Google map in React Native using react-native-maps
// https://aboutreact.com/react-native-map-example/
// Import React
import React, { useState,useEffect } from 'react';
// Import required components
import {SafeAreaView,Text, StyleSheet, View,  PermissionsAndroid} from 'react-native';
// Import Map and Marker
import MapView, {Callout, Marker,circle, Circle} from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";

const App = ()=>{
  // const [pin,setpin] = useState({latitude: 37.78825,
  //   longitude: -122.4324})
    const [userCurrLocation, setUserCurrLocation] = useState();


    useEffect(() => {
      getLocationDetail();
    }, []);
  
    

  const getLocationDetail = async () => {
    try {
      if (Platform.OS == "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This App needs to Access your location",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("getting location");
          Geolocation.getCurrentPosition(
            (position) => {
              console.log("current location",position.coords);
              console.log("current location",position);

              setpin({latitude:position.coords.latitude,longitude:position.coords.longitude})
              setUserCurrLocation(position)


            },
            (error) => {
              //setLocationStatus(error.message);
             console.log("Error ", error);
            },
            {
              enableHighAccuracy: false,
              timeout: 30000,
              maximumAge: 1000,
            }
          );
        } else {
          console.log("Please enable Location Permission");
        }
      } else if (Platform.OS == "ios") {
        const status = await Geolocation.requestAuthorization("whenInUse");
        if (status == "granted") {
          Geolocation.getCurrentPosition(
            (position) => {
              callBack(position);
            },
            (error) => {
              console.log("Error ", error);
            },
            {
              enableHighAccuracy: false,
              timeout: 30000,
              maximumAge: 1000,
            }
          );
        } else {
          console.log("Please enable Location Permission");
        }
      } else {
      }
    } catch (err) {
      console.log("Error ", err);
     
    }
  };


    return (
      <View style={{ flex: 1 }}>
        {userCurrLocation ? (
       

        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: userCurrLocation.coords.latitude,
            longitude: userCurrLocation.coords.longitude,
             
            latitudeDelta: 0.005,
            longitudeDelta: 0.0005
          }}>
            <Marker coordinate={{latitude: userCurrLocation.coords.latitude,
            longitude: userCurrLocation.coords.longitude}
            }
            pinColor = "red"
            draggable = {true}
            onDragStart={(e)=>{
              console.log("Drag start",e.nativeEvent.coordinate)
            }}
            onDragEnd={(e)=>{
              console.log("Drag end",e.nativeEvent.coordinate)
              setpin({latitude:e.nativeEvent.coordinate.latitude,longitude:e.nativeEvent.coordinate.longitude})
            }}
            >
              <Callout><Text>HELLO WELCOME!!!!</Text></Callout>
            </Marker>
            <Circle 
            center= {{latitude:userCurrLocation.coords.latitude,longitude:userCurrLocation.coords.longitude}
            } 
            radius ={100}/>
          </MapView>
):null}
      </View>
    );
  
  }
  

export default App;
