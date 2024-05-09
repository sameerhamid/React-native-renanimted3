import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default function TabOneScreen() {
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapeToIndex = (index: number) =>
    bottomSheetRef.current?.snapToIndex(index);
  return (
    <View style={styles.container}>
      <Button title="Snap To 2" onPress={() => snapeToIndex(1)} />
      <BottomSheet
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
        backgroundStyle={{ backgroundColor: "#1d0f4e" }}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.containerHeadline}>Awesome Bottom Sheet 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
  },
});
