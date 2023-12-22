import { YStack as TamaguiYStack, YStackProps } from "tamagui";

const YStack = ({ ...props }: YStackProps) => {
  return <TamaguiYStack {...props}>{props.children}</TamaguiYStack>;
};

export default YStack;
