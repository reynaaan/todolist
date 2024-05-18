import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from './config';
import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen';
import RecoverScreen from './src/RecoverScreen';
import TodoList from './src/TodoList';
import DrawerContent from './src/DrawerContent';
import { useAuthStore } from './store'; // Import the authentication store

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe; // Unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        // If user is authenticated, show the drawer navigator with the TodoList
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
          <Drawer.Screen name="TodoList" component={TodoList} />
        </Drawer.Navigator>
      ) : (
        // Otherwise, show authentication screens
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Recover" component={RecoverScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
