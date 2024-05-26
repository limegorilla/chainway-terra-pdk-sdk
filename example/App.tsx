import * as ChainwayTerraPdkSdk from "chainway-terra-pdk-sdk";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const [text, setText] = useState("Hello World");

  useEffect(() => {
    ChainwayTerraPdkSdk.addBarcodeScannedListener((event) => {
      setText(event.barcodeData);
      console.log(event);
    });
  }, []);
  useEffect(() => {
    ChainwayTerraPdkSdk.addBarcodeScanFailListener((event) => {
      setText(event.barcodeData);
      console.log(event);
    });
  }, []);

  const useBarcodeScanner = () => {
    ChainwayTerraPdkSdk.scanBarcode();
  };



  const handleStartScanner = () => {
    ChainwayTerraPdkSdk.prepareScanner();
  };



  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Button title="Run Scan" onPress={useBarcodeScanner} />
      <Button title="Prepare Scanner" onPress={handleStartScanner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
