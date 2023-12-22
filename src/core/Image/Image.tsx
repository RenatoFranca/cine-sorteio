import { ImageProps, Image as TamaguiImage } from "tamagui";

const Image = ({ ...props }: ImageProps) => {
  return <TamaguiImage {...props} />;
};

export default Image;
