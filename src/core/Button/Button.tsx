import {
  Button as TamaguiButton,
  ButtonProps as TamaguiButtonProps,
} from "tamagui";

type ButtonProps = TamaguiButtonProps;

const Button = ({ ...props }: ButtonProps) => {
  return <TamaguiButton {...props}>{props.children}</TamaguiButton>;
};

export default Button;
