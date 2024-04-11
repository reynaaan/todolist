//my first ToDo app
import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { TodoList } from './src/TodoList';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.drawerHeader}>
      <Image source={require('./assets/amben.jpg')} style={styles.drawerImage} />
      <Text style={styles.mahName}>Anven Moses L. Agbulos</Text>
      <Text style={styles.sectionCode}>AppDEV-IT35B</Text>
      <Text style={styles.courseName}>Batchelor Science of Information Technology</Text>
      <Text style={styles.courseDesc}>I dunno</Text>
      <Text style={styles.studId}>20211515</Text>
    </View>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="TodoList" drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="TodoList" component={TodoList} options={{ title: "Amben's Today's Tasks" }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#2b09b2',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  mahName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  sectionCode: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  courseName: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  courseDesc: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  studId: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  drawerImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
});

export default App;