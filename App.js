import React, { useCallback } from "react";
import {
	StyleSheet,
	View,
	Dimensions,
	Text,
	SafeAreaView,
	Image,
} from "react-native";
import ProgressiveImage from "./ProgressiveImage";
import CardSwiper from "./Components/CardSwiper";
import PinchableBox from "./Components/PinchableBox";
import ZoomableView from "./Components/ZoomableView";
import PinchToZoom from "./Components/PinchToZoom";
import TopTab from "./routes/TopTab";
import PureComponent from "./Components/PureComponent";
import Swiper from "react-native-deck-swiper";
import SkeletonLoader from "./Components/SkeletonLoader";
const { width, height } = Dimensions.get("screen");
export default function App() {
	const randomPosts = [
		{
			id: "0",
			image:
				"https://staging.hellotree.dev/r/alam-nour/public/storage/posts/VW2wQA8r4AnAvMkvP1i4KsE7kqcxkFu8ZSFD6Lzr.jpeg",
		},
		{
			id: "1",
			image:
				"https://staging.hellotree.dev/r/alam-nour/public/storage/posts/VW2wQA8r4AnAvMkvP1i4KsE7kqcxkFu8ZSFD6Lzr.jpeg",
		},
		{
			id: "2",
			image:
				"https://staging.hellotree.dev/r/alam-nour/public/storage/posts/xMGTBEWxqpOAMwmkKbofXly5OybT1H9jrclVxZpB.jpeg",
		},
		{
			id: "3",
			image:
				"https://staging.hellotree.dev/r/alam-nour/public/storage/posts/xMGTBEWxqpOAMwmkKbofXly5OybT1H9jrclVxZpB.jpeg",
		},
		{
			id: "4",
			image:
				"https://staging.hellotree.dev/r/alam-nour/public/storage/posts/VW2wQA8r4AnAvMkvP1i4KsE7kqcxkFu8ZSFD6Lzr.jpeg",
		},
		{
			id: "5",
			image:
				"https://staging.hellotree.dev/r/alam-nour/public/storage/posts/xMGTBEWxqpOAMwmkKbofXly5OybT1H9jrclVxZpB.jpeg",
		},
	];

	const renderItem = useCallback((post) => {
		return (
			<View style={{ backgroundColor: "red", width: 599, height: 600 }}>
				{/* <Image
					style={{
						width: Dimensions.get("screen").width,
						height: 300,
						marginTop: 100,
					}}
					source={{ uri: post.image }}
				/> */}
				{/* <View style={{ height: 100, backgroundColor: "red" }}></View> */}
			</View>
		);
	}, []);

	const keyExtractor = useCallback((item) => item.id.toString(), []);
	return (
		<View style={styles.container}>
			{/* <ProgressiveImage
				thumbnailSource={{
					uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=50&buster=${Math.random()}`,
				}}
				source={{
					uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=${
						width * 2
					}&buster=${Math.random()}`,
				}}
				style={{ width: width, height: width }}
				resizeMode="cover"
			/> */}
			{/* <PinchableBox
				style={{ width: width, height: 300 }}
				autoRatio={true}
				width={width}
				source={{
					uri:
						"https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png",
				}}
			/> */}

			{/* <ZoomableView
				uri={`https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png`}
				style={{ width: width, height: 300 }}
			/> */}
			{/* <PinchToZoom
				style={{ width: width, height: 300 }}
				uri={`https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png`}
			/> */}
			{/* <TopTab /> */}

			{/* <CardSwiper /> */}

			<SkeletonLoader />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
