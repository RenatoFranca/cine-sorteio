import { useCallback, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";
import HomeTemplate from "@/templates/HomeTemplate";

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
    <HomeTemplate
      selectedMovies={selectedMovies}
      setSelectedMovies={setSelectedMovies}
      searchText={searchText}
      setSearchText={setSearchText}
      onDraw={handleDraw}
      onRemoveMovie={handleRemoveMovie}
      isSearchActive={isSearchActive}
      onCloseSearchResults={closeSearchResults}
    />
  );
};

export default HomeScreen;
