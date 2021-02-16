import React, { useState, useEffect } from "react";
import { Image, View } from "react-native";
import * as FileSystem from "expo-file-system";
import shorthash from "shorthash";
export default function ({
	source,
	style,
	width,
	height,
	aspectRatio,
	resizeMode,
	autoRatio,
}) {
	const [sourceState, setSourceState] = useState();
	const [aspectRatioState, setAspectRatio] = useState(aspectRatio);
	const getImageFromCache = async () => {
		const name = shorthash.unique(source.uri);
		const path = `${FileSystem.cacheDirectory}${name}`;
		const image = await FileSystem.getInfoAsync(path);
		if (image.exists) return setSourceState(image.uri); // Save new image to cache
		const newImage = await FileSystem.downloadAsync(source.uri, path);
		setSourceState(newImage.uri);
	};
	useEffect(() => {
		// Cache image on if online uri
		if (source.uri) getImageFromCache();
		else setSourceState(source); // Auto ratio
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
		<Image
			source={source}
			style={{
				width: width ? width : undefined,
				height: height ? height : undefined,
				aspectRatio: aspectRatioState ? aspectRatioState : undefined,
				resizeMode: resizeMode ? resizeMode : "cover",
				...style,
			}}
		/>
	) : (
		<View style={{ backgroundColor: "#ddd", ...style }} />
	);
}
