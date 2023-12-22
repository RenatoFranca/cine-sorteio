import { Button as TamaguiButton, ButtonProps } from "tamagui";

const Button = ({ ...props }: ButtonProps) => {
  return <TamaguiButton {...props}>{props.children}</TamaguiButton>;
};

export default Button;
