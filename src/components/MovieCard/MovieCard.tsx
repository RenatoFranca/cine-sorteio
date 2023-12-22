import Image from "@/core/Image";
import Text from "@/core/Text";
import TouchableOpacity from "@/core/TouchableOpacity";
import { StyleSheet } from "react-native";

type MovieCardProps = {
  posterUri: string;
  title: string;
  onPress: () => void;
};

const MovieCard = ({ posterUri, title, onPress }: MovieCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w92${posterUri}`,
        }}
        style={styles.poster}
      />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  poster: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
  },
});

export default MovieCard;
