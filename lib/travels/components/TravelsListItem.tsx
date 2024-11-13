import Octicons from "@expo/vector-icons/Octicons";
import { Colors, ListItem, Text, View } from "react-native-ui-lib";
import { Travel } from "@/types/travels";
import { router } from "expo-router";

interface TravelItemProps {
  travel: Travel;
}

const TravelsListItem = ({ travel }: TravelItemProps) => {
  return (
    <ListItem
      activeBackgroundColor={Colors.grey60}
      activeOpacity={0.3}
      height={77.5}
      padding-5
      onPress={() =>
        router.push({
          pathname: "/travel-detail",
          params: {
            id: travel.id.toString(),
            name: travel.name,
            created_at: travel.created_at,
            finished_at: travel.finished_at,
            locations_count: travel.locations_count,
          },
        })
      }
    >
      <ListItem.Part column>
        <View marginB-5>
          <Text text70L>{travel.name}</Text>
        </View>
        <Text>
          <Octicons name="location" size={16} />
          {"  "}
          {travel.locations_count}
        </Text>
      </ListItem.Part>
    </ListItem>
  );
};

export default TravelsListItem;
