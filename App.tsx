import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Delete } from "@tamagui/lucide-icons";
import { BlurView } from "expo-blur";
import { TamaguiProvider, Theme, Text, XStack } from "tamagui";
import { useDebounce } from "use-debounce";
import axios from "axios";

import config from "./tamagui.config";
import { useEffect, useState } from "react";

import { useFonts } from "expo-font";
import Button from "@/core/Button";
import Heading from "@/core/Heading";
import Input from "@/core/Input";
import Spinner from "@/core/Spinner";
import YStack from "@/core/YStack";
import Image from "@/core/Image";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 600);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [winner, setWinner] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded]);

  useEffect(() => {
    if (debouncedSearchText) {
      setIsLoading(true);

      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${debouncedSearchText}&language=pt-BR&api_key=${API_KEY}`
        )
        .then((response) => {
          setSearchResults(response.data.results);
          openSearchResults();
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchText]);

  const handleSelectMovie = (movie) => {
    const isMovieAlreadySelected = selectedMovies.some(
      (selectedMovie) => selectedMovie.id === movie.id
    );
    if (!isMovieAlreadySelected) {
      setSelectedMovies([...selectedMovies, movie]);
      setSearchText("");
      closeSearchResults();
    }
  };

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
    setSearchResults([]);
    setIsSearchActive(false);
  };

  const openSearchResults = () => {
    setIsSearchActive(true);
  };

  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        <TouchableOpacity
          style={styles.fillSpace}
          activeOpacity={1}
          onPress={closeSearchResults}
          // disabled={!isSearchActive}
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
                <Input
                  placeholder="Pesquisar filme..."
                  onChangeText={setSearchText}
                  value={searchText}
                  backgroundColor="$background"
                  borderColor="$borderColor"
                  borderWidth={1}
                  h={40}
                  paddingHorizontal="$2"
                  marginTop="$2"
                  zIndex={10}
                />
                {(searchResults.length > 0 || isLoading) && (
                  <YStack
                    position="absolute"
                    top={126}
                    width="100%"
                    left={18}
                    zIndex={10}
                    borderRadius="$4"
                    borderColor="$borderColor"
                    backgroundColor="$background"
                    maxHeight={320}
                    borderWidth={1}
                  >
                    {isLoading && (
                      <YStack padding="$4" space="$4" alignItems="center">
                        <Spinner size="small" color="$color" />
                      </YStack>
                    )}
                    {searchResults.length > 0 && !isLoading && (
                      <FlatList
                        data={searchResults}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.item}
                            onPress={() => handleSelectMovie(item)}
                          >
                            <Image
                              source={{
                                uri: `https://image.tmdb.org/t/p/w92${item.poster_path}`,
                              }}
                              style={styles.posterThumbnail}
                            />
                            <Text flex={1} flexWrap="wrap">
                              {item.title}
                            </Text>
                          </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                      />
                    )}
                  </YStack>
                )}
                <FlatList
                  data={selectedMovies}
                  renderItem={({ item }) => (
                    <XStack
                      borderColor="$borderColor"
                      borderWidth={1}
                      padding="$2"
                      alignItems="center"
                      marginTop="$2"
                      borderRadius="$4"
                    >
                      <Image
                        source={{
                          uri: `https://image.tmdb.org/t/p/w92${item.poster_path}`,
                        }}
                        height={75}
                        width={50}
                        borderRadius="$1"
                      />
                      <Text
                        flex={1}
                        color="$color"
                        paddingHorizontal="$2"
                        flexWrap="wrap"
                      >
                        {item.title}
                      </Text>
                      <Button
                        iconAfter={Delete}
                        onPress={() => handleRemoveMovie(item.id)}
                      />
                    </XStack>
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
