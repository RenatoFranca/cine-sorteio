import Button from "@/core/Button";
import Image from "@/core/Image";
import Text from "@/core/Text";
import XStack from "@/core/XStack";
import { Delete } from "@tamagui/lucide-icons";
import { StyleSheet } from "react-native";

type SelectedMovieCardProps = {
  posterUri: string;
  title: string;
  onPress: () => void;
};

const SelectedMovieCard = ({
  posterUri,
  title,
  onPress,
}: SelectedMovieCardProps) => {
  return (
    <XStack
      style={styles.card}
      borderColor="$borderColor"
      padding="$2"
      marginTop="$2"
      borderRadius="$4"
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w92${posterUri}`,
        }}
        style={styles.poster}
        borderRadius="$1"
      />
      <Text style={styles.title} color="$color" paddingHorizontal="$2">
        {title}
      </Text>
      <Button iconAfter={Delete} onPress={onPress} />
    </XStack>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    alignItems: "center",
  },
  poster: {
    width: 50,
    height: 75,
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
  },
});

export default SelectedMovieCard;
