import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Button from "@/core/Button";
import Heading from "@/core/Heading";
import Image from "@/core/Image";
import { Movie } from "@/types/Movie";
import Text from "@/core/Text";
import YStack from "@/core/YStack";

type WinnerTemplateProps = {
  winner: Movie;
  onNewDraw: () => void;
};

const WinnerTemplate: React.FC<WinnerTemplateProps> = ({
  winner,
  onNewDraw,
}) => {
  return (
    <SafeAreaView style={styles.fillSpace}>
      <YStack backgroundColor="$background" style={styles.container}>
        <Heading style={styles.title}>Vencedor:</Heading>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${winner.poster_path}`,
          }}
          style={styles.poster}
        />
        <Text color="$color" style={styles.movieTitle}>
          {winner.title}
        </Text>
        <Button onPress={onNewDraw}>Novo Sorteio</Button>
      </YStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fillSpace: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    marginBottom: 10,
  },
  poster: {
    width: 300,
    height: 450,
    resizeMode: "contain",
    marginBottom: 20,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default WinnerTemplate;
