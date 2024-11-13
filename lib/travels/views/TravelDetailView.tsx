import MapView, { Marker } from "react-native-maps";
import { View, Text } from "react-native-ui-lib";
import { useGlobalSearchParams } from "expo-router";
import useGetTravelLocations from "../hooks/useGetTravelLocations";
import calculateGeographicalCenter from "@/utils/locations/getCenterPoint";
import calculateZoomLevel from "@/utils/locations/getZoomLevel";
import { Dimensions } from "react-native";
import LoggedInHeader from "@/components/LoggedInHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";

const TravelDetailView = () => {
  const { id, name, locations_count } = useGlobalSearchParams<{
    id: string;
    name: string;
    created_at: string;
    finished_at?: string;
    locations_count?: string;
  }>();

  const { data, isLoading, error } = useGetTravelLocations(+id);

  if (isLoading)
    return (
      <View flex center>
        <Text>Loading...</Text>
      </View>
    );

  if (error)
    return (
      <View flex center>
        <Text>Something went wrong</Text>
      </View>
    );

  if (!data) return null;

  const { width, height } = Dimensions.get("window");

  const center = calculateGeographicalCenter(data);
  const zoomLevel = calculateZoomLevel(data, width, height);
  console.log({ center });
  return (
    <View flex>
      <LoggedInHeader
        title={
          <View flex center>
            <Text $textDefault text50>
              {name}
            </Text>
            <Text $textDefault text80 marginT-8>
              <Octicons name="location" size={16} /> {locations_count}
            </Text>
          </View>
        }
        showBackButton
        showLogout={false}
      />

      <MapView
        {...(center.latitude &&
          center.longitude && {
            initialCamera: {
              center,
              pitch: 0,
              heading: 0,
              zoom: zoomLevel,
            },
          })}
        style={{ flex: 1 }}
      >
        {data?.map((location) => (
          <Marker coordinate={location} key={location.id} />
        ))}
      </MapView>
    </View>
  );
};

export default TravelDetailView;
