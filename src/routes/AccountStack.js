import React, { useContext } from "react";
import { UserContext } from "../context";

import { createStackNavigator } from "@react-navigation/stack";

import UserAccountDetails from "../screens/accountDetails/UserAccountDetails";
import EditUserDetails from "../screens/accountDetails/EditUserDetails";
import AddPost from "../screens/accountDetails/AddPost";
import AddFriends from "../screens/accountDetails/AddFriends";
import FriendsList from "../screens/accountDetails/FriendsList";
import AppButton from "../components/AppButton";

const Stack = createStackNavigator();
const AccounStack = () => {
  const { setUid } = useContext(UserContext);

  return (
    <Stack.Navigator
    // screenOptions={{
    //   headerRight: () => (
    //     <Button
    //       onPress={() => alert("This is a button!")}
    //       title="Info"
    //       color="#fff"
    //     />
    //   ),
    // }}
    >
      <Stack.Screen
        name="UserAccountDetails"
        component={UserAccountDetails}
        options={{
          headerRight: () => (
            <AppButton title="Sign Out" onPress={() => setUid(null)} />
          ),
        }}
      />
      <Stack.Screen name="EditUserDetails" component={EditUserDetails} />
      <Stack.Screen name="AddPost" component={AddPost} />
      <Stack.Screen name="AddFriends" component={AddFriends} />
      <Stack.Screen name="FriendsList" component={FriendsList} />
    </Stack.Navigator>
  );
};

export default AccounStack;
