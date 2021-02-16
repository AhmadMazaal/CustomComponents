import React, { PureComponent } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class CustomPureComponent extends PureComponent {
	constructor() {
		super();
		this.test = "ahmad";
	}

	render() {
		console.log("Test: ", this.test);
		return (
			<View>
				<Text>{this.props.name}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({});
