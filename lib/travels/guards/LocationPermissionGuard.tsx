import React, { useEffect, useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";
import * as Location from "expo-location";

const LocationPermissionGuard: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
      } else {
        const backgroundStatus =
          await Location.requestBackgroundPermissionsAsync();
        setHasPermission(backgroundStatus.status === "granted");
      }
    })();
  }, []);

  const handleRequestPermission = async () => {
    const backgroundStatus = await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus.status === "granted") {
      setHasPermission(true);
    } else {
      Alert.alert(
        "Permission Required",
        "Please enable background location permissions."
      );
    }
  };

  if (hasPermission === null) {
    return <Text>Checking permissions...</Text>;
  }

  return (
    <>
      {hasPermission ? (
        children
      ) : (
        <View style={styles.container}>
          <Text style={styles.message}>
            Background location permission is required to use this feature.
          </Text>
          <Button label="Enable Location" onPress={handleRequestPermission} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  message: {
    marginBottom: 20,
    textAlign: "center",
  },
});

export default LocationPermissionGuard;
