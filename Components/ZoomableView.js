import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

export default function ZoomableView(props) {
	return (
		<ReactNativeZoomableView
			maxZoom={1.5}
			minZoom={0.5}
			zoomStep={0.5}
			initialZoom={1}
			bindToBorders={true}
			// onZoomAfter={logOutZoomState}
			style={{
				padding: 10,
				backgroundColor: "black",
			}}
		>
			<Image
				style={props.style}
				source={{ uri: props.uri }}
				resizeMode="contain"
			/>
		</ReactNativeZoomableView>
	);
}

const styles = StyleSheet.create({});
