import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import YStack from "@/core/YStack";
import Image from "@/core/Image";
import Text from "@/core/Text";
import Heading from "@/core/Heading";
import Button from "@/core/Button";

const WinnerScreen = ({ route, navigation }) => {
  const { winner } = route.params;

  const newDraw = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.fillSpace}>
      <YStack backgroundColor="$background" style={styles.container}>
        <Heading>Vencedor:</Heading>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${winner.poster_path}`,
          }}
          style={styles.poster}
        />
        <Text color="$color" style={styles.title}>
          {winner.title}
        </Text>
        <Button onPress={newDraw}>Novo Sorteio</Button>
      </YStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fillSpace: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    paddingTop: 20,
    flex: 1,
  },
  poster: {
    width: 300,
    height: 450,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
});

export default WinnerScreen;
