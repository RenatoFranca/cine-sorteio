import Spinner from "@/core/Spinner";
import YStack from "@/core/YStack";
import { StyleSheet } from "react-native";

const SearchLoader = () => {
  return (
    <YStack style={styles.loader} padding="$4" space="$4">
      <Spinner size="small" color="$color" />
    </YStack>
  );
};

const styles = StyleSheet.create({
  loader: {
    alignItems: "center",
  },
});

export default SearchLoader;
