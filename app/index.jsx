import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
	default: "native",
});

export default function App() {
	return (
		<View className="flex-1 items-center justify-center bg-blue-300">
			<Text className="text-3xl font-pblack">Aurora</Text>
			<StatusBar style="auto" />
			<Link href="/profile" style={{ color: "blue" }}>
				Go t Profile
			</Link>
		</View>
	);
}
