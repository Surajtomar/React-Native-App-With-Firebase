import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MessagesList from "../screens/messages/MessagesList";
import NewMessages from "../screens/messages/NewMessages";
import Messages from "../screens/messages/Messages";

const Stack = createStackNavigator();
const MessagesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MessagesList" component={MessagesList} />
      <Stack.Screen name="NewMessages" component={NewMessages} />
      <Stack.Screen name="Messages" component={Messages} />
    </Stack.Navigator>
  );
};

export default MessagesStack;
