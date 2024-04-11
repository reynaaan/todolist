//my first ToDo app
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useStore } from './store';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const TodoItem = ({ text, id }) => {
  const deleteTodo = useStore((state) => state.deleteTodo);
  const updateTodo = useStore((state) => state.updateTodo);

  const [isEditing, setEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(text);

  const handleUpdate = () => {
    updateTodo(id, updatedText);
    setEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(id);
  };

  return (
    <Animatable.View style={styles.container} animation="fadeIn" duration={500}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            value={updatedText}
            onChangeText={setUpdatedText}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleUpdate}>
            <FontAwesome5 name="check" size={24} color="#00bfa5" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.text}>{text}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => setEditing(true)}>
              <FontAwesome5 name="pencil-alt" size={24} color="#004927" />
            </TouchableOpacity>
            <View style={styles.buttonSpacer} />
            <TouchableOpacity onPress={handleDelete}>
              <FontAwesome5 name="trash-alt" size={24} color="#d32f2f" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    borderRadius: 8,
    marginVertical: 5,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonSpacer: {
    width: 20,
  },
});

export default TodoItem;