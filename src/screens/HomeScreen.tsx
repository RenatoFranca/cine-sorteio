import { SafeAreaView, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

import { useCallback, useState } from "react";

import Button from "@/core/Button";
import Heading from "@/core/Heading";
import YStack from "@/core/YStack";
import TouchableOpacity from "@/core/TouchableOpacity";
import SelectedMovieCard from "@/components/SelectedMovieCard/SelectedMovieCard";
import FlatList from "@/core/FlatList";
import Search from "@/structures/Search";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [searchText, setSearchText] = useState("");

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSelectedMovies([]);
      };
    }, [])
  );

  const handleDraw = () => {
    if (selectedMovies.length > 1) {
      const randomIndex = Math.floor(Math.random() * selectedMovies.length);
      const winner = selectedMovies[randomIndex];

      navigation.navigate("Winner", { winner });
    }
  };

  const handleRemoveMovie = (movieId) => {
    setSelectedMovies(selectedMovies.filter((movie) => movie.id !== movieId));
  };

  const closeSearchResults = () => {
    setSearchText("");
  };

  const isSearchActive = searchText !== "";

  return (
    <SafeAreaView style={styles.fillSpace}>
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
        </YStack>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

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
  selectedMoviesList: {
    marginBottom: 20,
  },
});

export default HomeScreen;
