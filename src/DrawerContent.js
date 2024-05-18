import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useAuthStore } from '../store'; // Import the authentication store
import { firebase } from '../config';

const DrawerContent = (props) => {
  const setUser = useAuthStore((state) => state.setUser);

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null); // Reset user state on sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
          <Image source={require('../assets/nanaaan.jpg')} style={styles.drawerImage} />
          <Text style={styles.mahName}>Reynan Jhay A. Busano</Text>
          <Text style={styles.sectionCode}>IT73-IT35B</Text>
          <Text style={styles.courseName}>Bachelor of Science in Information Technology</Text>
          <Text style={styles.courseDesc}>Application Development</Text>
          <Text style={styles.studId}>20201086</Text>
        </View>
        <DrawerItemList {...props} />
        <Button
            title="Sign Out"
            onPress={handleSignOut}
            color="#004927" // Button text color
            style={styles.signOutButton} // Apply custom styles
         />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#004927',
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
  signOutButton: {
    backgroundColor: '#004927', // Background color
    borderRadius: 20, // Make button round (adjust size as needed)
    overflow: 'hidden',
    width: 50,
  },
});

export default DrawerContent;
