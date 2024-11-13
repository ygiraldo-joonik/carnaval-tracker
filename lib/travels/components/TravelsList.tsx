import { FlatList } from "react-native";
import { Travel } from "@/types/travels";
import TravelsListItem from "./TravelsListItem";

interface TravelItemProps {
  travels: Travel[];
}

const TravelsList = ({ travels }: TravelItemProps) => {
  const renderItem = ({ item }: { item: Travel }) => {
    return <TravelsListItem travel={item} />;
  };

  return (
    <FlatList
      style={{ flex: 1 }}
      data={travels ?? ([] as Travel[])}
      renderItem={renderItem}
      keyExtractor={(_, i) => i.toString()}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default TravelsList;
