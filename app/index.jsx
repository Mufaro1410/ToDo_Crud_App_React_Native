import { Text, View, StyleSheet, TextInput, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { data } from "@/data/todos";

export default function Index() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id))
  const [text, setText] = useState('')
  // const [newTodo, setNewTodo] = useState({
  //   id: '',
  //   title: '',
  //   completed: false
  // })

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1
      const newTodo = {id: newId, title: text, completed: false}
      setTodos(prevTodos => [newTodo, ...prevTodos])
      setText('')
    }
  }

  const toggleTodo = (id) => {
    const updatedTodo = todos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo)
    setTodos(updatedTodo)
  }

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text
        style={[styles.todoText, item.completed && styles.completedText]}
        onPress={() => toggleTodo(item.id)}
      >
        {item.title}
      </Text>
      <Pressable onPress={() => removeTodo(item.id)}>
        <MaterialCommunityIcons name="delete-circle" size={36} color="red" selectable={undefined} />
      </Pressable>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo"
          placeholderTextColor='gray'
          value={text}
          onChangeText={setText}
        >
        </TextInput>
        <Pressable style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <View>
        <FlatList
          data={todos}
          keyExtractor={todo => todo.id}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={item => renderItem(item)}
          />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    backgroundColor: 'black'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
    pointerEvents: 'auto'
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 18,
    minWidth: 0,
    color: 'white'
  },
  addButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: 'black'
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
    pointerEvents: 'auto'
  },
  todoText: {
    flex: 1,
    fontSize: 18,
    color: 'white',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray'
  }
})
