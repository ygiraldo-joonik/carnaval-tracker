import registerActiveTravelLocationCallback from "../callbacks/registerTravelLocation";
import useCreateTravel from "../hooks/useCreateTravel";
import useFinishTravel from "../hooks/useFinishTravel";
import useGetActiveTravel from "../hooks/useGetActiveTravel";
import useGetTravels from "../hooks/useGetTravels";
import { Button, Colors, Text, View } from "react-native-ui-lib";
import { registerBackgroundLocationTask } from "../tasks/backgroundLocationTask";
import { SafeAreaView } from "react-native-safe-area-context";
import { Travel } from "@/types/travels";
import TravelsList from "../components/TravelsList";
import LoggedInHeader from "@/components/LoggedInHeader";

registerBackgroundLocationTask(registerActiveTravelLocationCallback);

const ManageTravelsView = () => {
  const { data: activeTravel } = useGetActiveTravel();
  const { data: travels, error: travelsError } = useGetTravels();

  const { createTravel, loading: creatingTravel } = useCreateTravel();
  const { finishTravel, loading: finishingTravel } = useFinishTravel();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoggedInHeader
        title={
          <Text $textDefault text40>
            Travels
          </Text>
        }
        activeLogout={!activeTravel}
      />

      {/* Finish travel button */}
      {activeTravel && (
        <View padding-20 centerV>
          <Text text60L center>
            You have an active travel
          </Text>
          <Text text50 center>
            {activeTravel.name}
          </Text>
          <View padding-20 centerV>
            <Button
              backgroundColor={Colors.red10}
              label={"Finish Travel"}
              onPress={() => finishTravel(activeTravel.id)}
              disabled={finishingTravel}
            />
          </View>
        </View>
      )}

      {/* Start travel button */}
      {!activeTravel && (
        <View padding-20 centerV>
          <View padding-20 centerV>
            <Button
              label={"Start Travel"}
              onPress={createTravel}
              disabled={creatingTravel}
            />
          </View>
        </View>
      )}

      {/* Show error */}
      {travelsError && (
        <View padding-20 centerV>
          <Text text60L center>
            Error to load travels
          </Text>
        </View>
      )}

      <TravelsList travels={travels ?? ([] as Travel[])} />
    </SafeAreaView>
  );
};

export default ManageTravelsView;
