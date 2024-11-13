import useAuth from "@/lib/auth/login/hooks/useAuth";
import { Button, Colors, Text, View } from "react-native-ui-lib";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

interface LoggedInHeaderProps {
  activeLogout?: boolean;
  showBackButton?: boolean;
  showLogout?: boolean;
  title: React.ReactNode;
}

const LoggedInHeader = ({
  activeLogout = true,
  showLogout = true,
  showBackButton = false,
  title,
}: LoggedInHeaderProps) => {
  const { logOut } = useAuth();

  return (
    <View padding-40 centerV centerH row spread>
      <View flex left>
        {showBackButton && (
          <Button
            onPress={() => router.back()}
            link
            iconSource={(iconStyle) => (
              <Ionicons
                name="arrow-back"
                size={24}
                style={iconStyle}
                color={Colors.$iconPrimary}
              />
            )}
          />
        )}
      </View>
      <View flex center>
        {title}
      </View>

      <View flex right>
        {showLogout && (
          <Button
            disabled={!activeLogout}
            label={"Logout"}
            onPress={() => logOut()}
            iconOnRight
            link
            iconSource={(iconStyle) => (
              <MaterialIcons
                name="logout"
                size={24}
                style={iconStyle}
                color={
                  activeLogout ? Colors.$iconPrimary : Colors.$iconDisabled
                }
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default LoggedInHeader;
