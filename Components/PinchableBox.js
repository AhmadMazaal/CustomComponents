// import React from "react";
// import { StyleSheet, Text, Animated, View, Dimensions } from "react-native";
// import { PinchGestureHandler, State } from "react-native-gesture-handler";

// const { width, height } = Dimensions.get("screen");
// export default function PinchableBox(props) {
// 	const scale = new Animated.Value(1);
// 	const onPinchEvent = Animated.event(
// 		[
// 			{
// 				nativeEvent: { scale: scale },
// 			},
// 		],
// 		{
// 			useNativeDriver: true,
// 		}
// 	);

// 	const onPinchStateChange = (event) => {
// 		if (event.nativeEvent.oldState === State.ACTIVE) {
// 			Animated.spring(scale, {
// 				toValue: 1,
// 				useNativeDriver: true,
// 			}).start();
// 		}
// 	};

// 	return (
// 		<PinchGestureHandler
// 			onGestureEvent={onPinchEvent}
// 			onHandlerStateChange={onPinchStateChange}
// 		>
// 			<Animated.Image
// 				source={{ uri: props.uri }}
// 				style={{
// 					...props.style,
// 					transform: [{ scale: scale }],
// 				}}
// 				resizeMode="contain"
// 			/>
// 		</PinchGestureHandler>
// 	);
// }

// const styles = StyleSheet.create({});
import React, { useState, useEffect } from "react";
import {
	Image,
	View,
	StyleSheet,
	Animated,
	ActivityIndicator,
	ScrollView,
} from "react-native";
import * as FileSystem from "expo-file-system";
import shorthash from "shorthash";
import { PinchGestureHandler, State } from "react-native-gesture-handler";

export default function ({
	source,
	style,
	width,
	height,
	aspectRatio,
	resizeMode,
	autoRatio,
	noDownload,
	thumbnailSource,
}) {
	const scale = new Animated.Value(1);

	let imageAnimated = new Animated.Value(0);
	let thumbnailAnimated = new Animated.Value(0);
	const [sourceState, setSourceState] = useState();
	const [aspectRatioState, setAspectRatio] = useState(aspectRatio);
	const [isLoading, setIsLoading] = useState(true);
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

	// zooming functions
	const onPinchEvent = Animated.event(
		[
			{
				nativeEvent: { scale: scale },
			},
		],
		{
			useNativeDriver: true,
		}
	);

	const onPinchStateChange = (event) => {
		console.log("S");
		if (event.nativeEvent.oldState === State.ACTIVE) {
			Animated.spring(scale, {
				toValue: 1,
				useNativeDriver: true,
			}).start();
		}
	};

	const _onLoadEnd = () => setIsLoading(false);

	const getImageFromCache = async () => {
		const name = shorthash.unique(source.uri);
		const path = `${FileSystem.cacheDirectory}${name}`;
		const image = await FileSystem.getInfoAsync(path);
		if (image.exists) return setSourceState(image.uri);
		const newImage = await FileSystem.downloadAsync(source.uri, path);
		setSourceState(newImage.uri);
	};
	useEffect(() => {
		if (noDownload) setSourceState(source.uri);
		else if (source.uri) getImageFromCache();
		else setSourceState(source);
		if (autoRatio) {
			if (source.uri) {
				Image.getSize(source.uri, (w, h) => {
					setAspectRatio(w / h);
				});
			} else {
				let image = Image.resolveAssetSource(source);
				setAspectRatio(image.width / image.height);
			}
		}
	}, [source]);
	return sourceState ? (
		<ScrollView>
			<PinchGestureHandler
				onGestureEvent={onPinchEvent}
				onHandlerStateChange={onPinchStateChange}
			>
				<Animated.Image
					source={source}
					style={{
						width: width ? width : undefined,
						aspectRatio: aspectRatioState
							? aspectRatioState
							: undefined,
						...style,
						transform: [{ scale: scale }],
					}}
				/>
			</PinchGestureHandler>
		</ScrollView>
	) : (
		<View
			style={{
				backgroundColor: "#ddd",
				height: height,
				width: width,
				borderWidth: 10,
				...style,
			}}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		// backgroundColor: "#e1e4e8",
		justifyContent: "center",
		alignItems: "center",
	},
	imageOverlay: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		top: 0,
	},
	activityIndicator: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
});
