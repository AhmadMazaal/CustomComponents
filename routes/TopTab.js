import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import React from "react";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SupportScreen from "../screens/SupportScreen";

import { AntDesign } from "@expo/vector-icons";

const AppNavigator = createMaterialTopTabNavigator(
	{
		Home: {
			screen: HomeScreen,

			navigationOptions: {
				tabBarLabel: "home",
				tabBarIcon: () => (
					<AntDesign name="home" size={20} color="red" />
				),
			},
		},
		Profile: ProfileScreen,
		Settings: SettingsScreen,
		Support: SupportScreen,
	},
	{
		tabBarPosition: "bottom",

		// tabBarComponent: () => <AntDesign name="home" size={50} color="red" />,
		tabBarOptions: {
			iconStyle: {
				borderWidth: 1,
			},
			activeTintColor: "red",
			showIcon: true,
			showLabel: false,

			style: {
				backgroundColor: "black",
			},
		},
	}
);

const App = createAppContainer(AppNavigator);

export default App;
