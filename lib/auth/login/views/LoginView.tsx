import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import useLogin from "../hooks/useLogin";
import { Colors, TextField, Button, View, Text } from "react-native-ui-lib";

const LoginView: React.FC = () => {
  const { login, email, setEmail, password, setPassword, loading, error } =
    useLogin();

  return (
    // <ScrollView>
    <View flex centerV padding-40>
      <Text text40 center marginB-20>
        Login
      </Text>
      <View marginV-20>
        <Text text60 marginB-8 $textDefault>
          Email:
        </Text>
        <TextField
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Type your Email"
          textContentType="emailAddress"
          underlineColorAndroid={Colors.blue20}
        />
      </View>
      <View marginV-20>
        <Text text60 marginB-8 $textDefault>
          Password:
        </Text>
        <TextField
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Type your Password"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid={Colors.blue20}
        />
      </View>

      <Button
        marginT-20
        marginB-40
        disabled={loading}
        label="Login"
        onPress={login}
      />

      {<Text>{error}</Text>}
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
  },
});

export default LoginView;
