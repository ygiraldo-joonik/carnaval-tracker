import { AppState, AppStateStatus } from "react-native";

import { SWRConfig } from "swr";

const SWRProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <SWRConfig
    value={{
      provider: () => new Map(),
      isVisible: () => {
        return true;
      },
      // This function is called when the app is resumed from background or inactive mode
      initFocus(callback) {
        let appState = AppState.currentState;

        // Function to handle app state change, and call the callback function
        const onAppStateChange = (nextAppState: AppStateStatus) => {
          /* If it's resuming from background or inactive mode to active one */
          if (
            appState.match(/inactive|background/) &&
            nextAppState === "active"
          ) {
            callback();
          }
          appState = nextAppState;
        };

        // Subscribe to the app state change events
        const subscription = AppState.addEventListener(
          "change",
          onAppStateChange
        );

        return () => {
          subscription.remove();
        };
      },
    }}
  >
    {children}
  </SWRConfig>
);

export default SWRProvider;
