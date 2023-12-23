import { FlatListProps, FlatList as NativeFlatList } from "react-native";

const FlatList = <ItemT,>({ ...props }: FlatListProps<ItemT>) => {
  return <NativeFlatList<ItemT> {...props} />;
};

export default FlatList;
