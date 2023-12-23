import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { TamaguiProvider, Text, Theme } from "tamagui";

import config from "./tamagui.config";
import { useEffect, useState } from "react";

import { useFonts } from "expo-font";
import Button from "@/core/Button";
import Heading from "@/core/Heading";
import YStack from "@/core/YStack";
import Image from "@/core/Image";
import TouchableOpacity from "@/core/TouchableOpacity";
import SelectedMovieCard from "@/components/SelectedMovieCard/SelectedMovieCard";
import FlatList from "@/core/FlatList";
import Search from "@/structures/Search";

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [winner, setWinner] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const handleDraw = () => {
    if (selectedMovies.length > 1) {
      const randomIndex = Math.floor(Math.random() * selectedMovies.length);
      setWinner(selectedMovies[randomIndex]);
    }
  };

  const handleNewDraw = () => {
    setWinner(null);
    setSelectedMovies([]);
  };

  const handleRemoveMovie = (movieId) => {
    setSelectedMovies(selectedMovies.filter((movie) => movie.id !== movieId));
  };

  const closeSearchResults = () => {
    setSearchText("");
  };

  const isSearchActive = searchText !== "";

  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        <TouchableOpacity
          style={styles.fillSpace}
          activeOpacity={1}
          onPress={closeSearchResults}
        >
          {isSearchActive && (
            <>
              <TouchableOpacity
                style={StyleSheet.absoluteFill}
                onPress={closeSearchResults}
              />
            </>
          )}
          <YStack
            f={1}
            p="$4"
            space="$4"
            backgroundColor="$background"
            onPress={() => closeSearchResults()}
          >
            <StatusBar style="inverted" />

            {!winner && (
              <>
                <Heading color="$color" textAlign="center">
                  Cine Sorteio
                </Heading>
                <Search
                  setSelectedMovies={setSelectedMovies}
                  selectedMovies={selectedMovies}
                  searchText={searchText}
                  setSearchText={setSearchText}
                />
                <FlatList
                  data={selectedMovies}
                  renderItem={({ item }) => (
                    <SelectedMovieCard
                      title={item.title}
                      posterUri={item.poster_path}
                      onPress={() => handleRemoveMovie(item.id)}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  showsHorizontalScrollIndicator={false}
                  style={styles.selectedMoviesList}
                />

                <Button
                  onPress={handleDraw}
                  opacity={selectedMovies.length < 2 ? 0.5 : 1}
                  disabled={selectedMovies.length < 2}
                >
                  {selectedMovies.length < 2
                    ? "Selecione 2 ou mais filmes..."
                    : "Sortear Filme"}
                </Button>

                {isSearchActive && (
                  <BlurView style={styles.blur} intensity={50} tint="dark" />
                )}
              </>
            )}

            {winner && (
              <View style={styles.winnerContainer}>
                <Heading>Vencedor:</Heading>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${winner.poster_path}`,
                  }}
                  width={300}
                  height={450}
                />
                <Text style={styles.winnerTitle}>{winner.title}</Text>
                <Button onPress={handleNewDraw}>Novo Sorteio</Button>
              </View>
            )}
          </YStack>
        </TouchableOpacity>
      </Theme>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  fillSpace: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingTop: 80,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
  item: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedMovies: {
    marginBottom: 20,
  },
  posterThumbnail: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 5,
  },
  selectedMoviesList: {
    marginBottom: 20,
  },
  poster: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  movieTitle: {
    flex: 1,
  },
  winnerContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  winnerPoster: {
    width: 300,
    height: 450,
  },
  winnerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  dropdownTitle: {
    marginLeft: 10,
  },
});
