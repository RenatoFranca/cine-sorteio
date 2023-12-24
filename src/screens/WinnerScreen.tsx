import React from "react";
import WinnerTemplate from "@/templates/WinnerTemplate";

const WinnerScreen = ({ route, navigation }) => {
  const { winner } = route.params;

  const handleNewDraw = () => {
    navigation.navigate("Home");
  };

  return <WinnerTemplate winner={winner} onNewDraw={handleNewDraw} />;
};

export default WinnerScreen;
