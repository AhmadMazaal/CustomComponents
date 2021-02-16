import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function LoadingView() {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="small" color="#FFD700" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		opacity: 0.7,
		backgroundColor: "black",
		justifyContent: "center",
		alignItems: "center",
	},
});
