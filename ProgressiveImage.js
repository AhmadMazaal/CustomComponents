import React from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function ProgressiveImage(props) {
	let imageAnimated = new Animated.Value(0);
	let thumbnailAnimated = new Animated.Value(0);

	const handleThumbnailLoad = () => {
		Animated.timing(thumbnailAnimated, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		}).start();
	};
	const onImageLoad = () => {
		Animated.timing(imageAnimated, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		}).start();
	};
	return (
		<View style={styles.container}>
			<Animated.Image
				{...props}
				source={{
					uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=50&buster=${Math.random()}`,
				}}
				style={[props.style, { opacity: thumbnailAnimated }]}
				onLoad={handleThumbnailLoad}
				blurRadius={1}
			/>
			<Animated.Image
				{...props}
				source={props.source}
				style={[
					styles.imageOverlay,
					{ opacity: imageAnimated },
					props.style,
				]}
				onLoad={onImageLoad}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	imageOverlay: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		top: 0,
	},
	container: {
		backgroundColor: "#e1e4e8",
	},
});
