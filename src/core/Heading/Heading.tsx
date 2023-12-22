import { HeadingProps, Heading as TamaguiHeading } from "tamagui";

const Heading = ({ ...props }: HeadingProps) => {
  return <TamaguiHeading {...props}>{props.children}</TamaguiHeading>;
};

export default Heading;
