import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

// User Context
import { UserContext } from "./src/context";

// App bottom-tabs nav
import AppNav from "./src/routes/AppNav";

// Firebase
import * as firebase from "firebase";
import "firebase/database";
import { firebaseConfig } from "./src/Config";
import AuthStack from "./src/routes/AuthStack";

// Firebase IinitializeApp
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [uid, setUid] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <UserContext.Provider
        value={{
          uid,
          setUid,
          user,
          setUser,
        }}
      >
        {uid ? <AppNav /> : <AuthStack />}
      </UserContext.Provider>
    </NavigationContainer>
  );
}
