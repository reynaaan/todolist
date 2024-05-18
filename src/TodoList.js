import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useTodoStore } from '../store';
import { firebase } from '../config';

const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);
  const setTodos = useTodoStore((state) => state.setTodos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);

  const [newTodo, setNewTodo] = useState('');
  const [updatedText, setUpdatedText] = useState('');
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const todosSnapshot = await firebase.firestore().collection('todos').get();
      const todosList = todosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(todosList);
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo) {
      const newTodoItem = { text: newTodo };
      const addedTodoRef = await firebase.firestore().collection('todos').add(newTodoItem);
      addTodo({ id: addedTodoRef.id, ...newTodoItem });
      setNewTodo('');
    }
  };

  const handleUpdate = async (id) => {
    await firebase.firestore().collection('todos').doc(id).update({ text: updatedText });
    updateTodo(id, updatedText);
    setEditItemId(null);
    setUpdatedText('');
  };

  const handleDelete = async (id) => {
    await firebase.firestore().collection('todos').doc(id).delete();
    deleteTodo(id);
  };

  const handleStartEdit = (id, text) => {
    setEditItemId(id);
    setUpdatedText(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Tasks</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new task"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <Button title="+" onPress={handleAddTodo} color="#004927" />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Animatable.View
            style={styles.itemContainer}
            animation="fadeIn"
            duration={1000}
          >
            {editItemId === item.id ? (
              <View style={styles.editContainer}>
                <TextInput
                  value={updatedText}
                  onChangeText={setUpdatedText}
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => handleUpdate(item.id)}>
                  <FontAwesome5 name="check" size={24} color="#00bfa5" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.contentContainer}>
                <Text style={styles.text}>{item.text}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => handleStartEdit(item.id, item.text)}>
                    <FontAwesome5 name="pencil-alt" size={24} color="#004927" />
                  </TouchableOpacity>
                  <View style={styles.buttonSpacer} />
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <FontAwesome5 name="trash-alt" size={24} color="#d32f2f" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Animatable.View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#071D0E',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 16,
    padding: 8,
    backgroundColor: '#004927',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BDBDBD',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFFFFF',
  },
  itemContainer: {
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
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonSpacer: {
    width: 20,
  },
});

export default TodoList;

