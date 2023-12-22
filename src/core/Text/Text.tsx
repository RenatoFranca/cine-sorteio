import { Text as TamaguiText, TextProps } from "tamagui";

const Text = ({ ...props }: TextProps) => {
  return <TamaguiText {...props} />;
};

export default Text;
