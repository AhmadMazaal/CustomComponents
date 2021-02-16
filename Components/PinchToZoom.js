import { StyleSheet, Dimensions } from "react-native";
import React from "react";
import Animated, {
	Value,
	block,
	cond,
	eq,
	set,
	useCode,
} from "react-native-reanimated";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import {
	onGestureEvent,
	pinchActive,
	pinchBegan,
	timing,
	transformOrigin,
	translate,
	vec,
} from "react-native-redash/lib/module/v1";

const { width } = Dimensions.get("window");
const SIZE = width;

export default function PinchToZoom(props) {
	const origin = vec.createValue(0, 0);
	const pinch = vec.createValue(0, 0);
	const focal = vec.createValue(0, 0);
	const scale = new Value(1);
	const numberOfPointers = new Value(0);
	const state = new Value(State.UNDETERMINED);
	const pinchGestureHandler = onGestureEvent({
		numberOfPointers,
		scale,
		state,
		focalX: focal.x,
		focalY: focal.y,
	});
	const zIndex = cond(eq(state, State.ACTIVE), 3, 0);
	const adjustedFocal = vec.add(
		{
			x: -SIZE / 2,
			y: -SIZE / 2,
		},
		focal
	);
	useCode(
		() =>
			block([
				cond(pinchBegan(state), vec.set(origin, adjustedFocal)),
				cond(
					pinchActive(state, numberOfPointers),
					vec.set(pinch, vec.minus(vec.sub(origin, adjustedFocal)))
				),
				cond(eq(state, State.END), [
					set(pinch.x, timing({ from: pinch.x, to: 0 })),
					set(pinch.y, timing({ from: pinch.y, to: 0 })),
					set(scale, timing({ from: scale, to: 1 })),
				]),
			]),
		[adjustedFocal, numberOfPointers, origin, pinch, scale, state]
	);
	return (
		<Animated.View style={{ width: SIZE, height: SIZE, zIndex }}>
			<PinchGestureHandler {...pinchGestureHandler}>
				<Animated.View style={StyleSheet.absoluteFill}>
					<Animated.Image
						style={[
							props.style,
							{
								transform: [
									...translate(pinch),
									...transformOrigin(origin, { scale }),
								],
							},
						]}
						source={{ uri: props.uri }}
					/>
				</Animated.View>
			</PinchGestureHandler>
		</Animated.View>
	);
}

const styles = StyleSheet.create({});
