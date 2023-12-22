import { XStack as TamaguiXStack, XStackProps } from "tamagui";

const XStack = ({ ...props }: XStackProps) => {
  return <TamaguiXStack {...props}>{props.children}</TamaguiXStack>;
};

export default XStack;
