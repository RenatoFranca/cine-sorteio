import MovieCard from "@/components/MovieCard";
import SearchLoader from "@/components/SearchLoader";
import FlatList from "@/core/FlatList";
import Input from "@/core/Input";
import YStack from "@/core/YStack";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDebounce } from "use-debounce";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

type SearchProps = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  setSelectedMovies: (movies: Array<Movie>) => void;
  selectedMovies: Array<Movie>;
};

const Search: React.FC<SearchProps> = ({
  searchText,
  setSearchText,
  setSelectedMovies,
  selectedMovies,
}) => {
  const [debouncedSearchText] = useDebounce(searchText, 600);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSelectMovie = (movie) => {
    const isMovieAlreadySelected = selectedMovies.some(
      (selectedMovie) => selectedMovie.id === movie.id
    );
    if (!isMovieAlreadySelected) {
      setSelectedMovies([...selectedMovies, movie]);
      setSearchText("");
    }
  };

  useEffect(() => {
    if (debouncedSearchText) {
      setIsLoading(true);

      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${debouncedSearchText}&language=pt-BR&api_key=${API_KEY}`
        )
        .then((response) => {
          setSearchResults(response.data.results);
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

  return (
    <>
      <Input
        placeholder="Pesquisar filme..."
        onChangeText={setSearchText}
        value={searchText}
        style={styles.input}
        backgroundColor="$background"
        borderColor="$borderColor"
        paddingHorizontal="$2"
        marginTop="$2"
      />
      {(searchResults.length > 0 || isLoading) && (
        <YStack
          style={styles.stack}
          borderRadius="$4"
          borderColor="$borderColor"
          backgroundColor="$background"
        >
          {isLoading && <SearchLoader />}
          {searchResults.length > 0 && !isLoading && (
            <FlatList
              data={searchResults}
              renderItem={({ item }) => (
                <MovieCard
                  onPress={() => handleSelectMovie(item)}
                  title={item.title}
                  posterUri={item.poster_path}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </YStack>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 40,
    zIndex: 10,
  },
  stack: {
    position: "absolute",
    top: 126,
    width: "100%",
    left: 18,
    zIndex: 10,
    maxHeight: 320,
    borderWidth: 1,
  },
});

export default Search;
