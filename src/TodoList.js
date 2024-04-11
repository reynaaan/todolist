//my first ToDo app
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList } from 'react-native';
import { useStore } from './store';
import TodoItem from './TodoItem';

export const TodoList = () => {
  const todos = useStore((state) => state.todos);
  const addTodo = useStore((state) => state.addTodo);

  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo) {
      addTodo({
        id: Date.now(),
        text: newTodo
      });
      setNewTodo('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Tasks</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new task"
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
        />
        <Button title="+" onPress={handleAddTodo} color="#004927" /> 
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem text={item.text} id={item.id} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black', 
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
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    color: 'Black',
    borderWidth: 1,
    borderColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'red',
  },
});

export default TodoList;