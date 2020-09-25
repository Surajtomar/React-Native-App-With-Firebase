import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import AccounStack from "./AccountStack";
import MessagesStack from "./MessagesStack";

const Tab = createBottomTabNavigator();

const AppNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="MessagesStack" component={MessagesStack} />
      <Tab.Screen name="AccounStack" component={AccounStack} />
    </Tab.Navigator>
  );
};

export default AppNav;
