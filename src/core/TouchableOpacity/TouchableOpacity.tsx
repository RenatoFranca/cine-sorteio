import {
  TouchableOpacity as NativeTouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

const TouchableOpacity = ({ ...props }: TouchableOpacityProps) => {
  return (
    <NativeTouchableOpacity {...props}>{props.children}</NativeTouchableOpacity>
  );
};

export default TouchableOpacity;
