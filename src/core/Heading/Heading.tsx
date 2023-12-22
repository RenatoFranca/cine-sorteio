import {
  HeadingProps as TamaguiHeadingProps,
  Heading as TamaguiHeading,
} from "tamagui";

type HeadingProps = TamaguiHeadingProps;

const Heading = ({ ...props }: HeadingProps) => {
  return <TamaguiHeading {...props}>{props.children}</TamaguiHeading>;
};

export default Heading;
