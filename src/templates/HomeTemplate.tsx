import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

import Button from "@/core/Button";
import Heading from "@/core/Heading";
import YStack from "@/core/YStack";
import TouchableOpacity from "@/core/TouchableOpacity";
import SelectedMovieCard from "@/components/SelectedMovieCard/SelectedMovieCard";
import FlatList from "@/core/FlatList";
import Search from "@/structures/Search";
import { Movie } from "@/types/Movie";

type HomeTemplateProps = {
  selectedMovies: Movie[];
  setSelectedMovies: (movies: Array<Movie>) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  onDraw: () => void;
  onRemoveMovie: (movieId: number) => void;
  isSearchActive: boolean;
  onCloseSearchResults: () => void;
};

const HomeTemplate = ({
  selectedMovies,
  setSelectedMovies,
  searchText,
  setSearchText,
  onDraw,
  onRemoveMovie,
  isSearchActive,
  onCloseSearchResults,
}: HomeTemplateProps) => {
  return (
    <SafeAreaView style={styles.fillSpace}>
      <TouchableOpacity
        style={styles.fillSpace}
        activeOpacity={1}
        onPress={onCloseSearchResults}
      >
        <YStack
          f={1}
          p="$4"
          space="$4"
          backgroundColor="$background"
          onPress={onCloseSearchResults}
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
                onPress={() => onRemoveMovie(item.id)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            style={styles.selectedMoviesList}
          />

          <Button
            onPress={onDraw}
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

export default HomeTemplate;
