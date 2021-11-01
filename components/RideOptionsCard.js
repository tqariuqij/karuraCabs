import React, { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";
import "intl";
import "intl/locale-data/jsonp/en";

const data = [
  {
    id: "uber-x-123",
    title: "uberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "uber-XL-456",
    title: "uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "uber-LUX-789",
    title: "uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

// SURGE PRICING

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView style={tw`h-1/2 bg-white flex-grow`}>
      <View style={tw`flex-row`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`px-3 pt-2 rounded-full`}
        >
          <Icon name='chevron-left' type='fontawesome' />
        </TouchableOpacity>
        <Text style={tw`pl-11 text-lg`}>
          Select a Ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row items-center justify-between px-5 ${
              id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{ width: 100, height: 100, resizeMode: "contain" }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-base font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text}</Text>
            </View>
            <Text style={tw`text-lg`}>
              {new Intl.NumberFormat("en-gb", {
                style: "currency",
                currency: "KSH",
              }).format(
                (travelTimeInformation?.duration?.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  10
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
