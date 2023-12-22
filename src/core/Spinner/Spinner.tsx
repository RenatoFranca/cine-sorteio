import { SpinnerProps, Spinner as TamaguiSpinner } from "tamagui";

const Spinner = ({ ...props }: SpinnerProps) => {
  return <TamaguiSpinner {...props} />;
};

export default Spinner;
