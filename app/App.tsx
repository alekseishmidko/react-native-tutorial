
import useTodo from "@/hooks/useTodo";

import { StatusBar, StyleSheet, View } from "react-native";
import Header from "@/layout/header";
import {COLORS} from "@/constants/ui";
import TodoCreator from "@/layout/todo-creator";
import TodoList from "@/layout/todo-list";

export default function Index() {
  const {
    todos,
    completedTodos,
    onAddTodo,
    onDeleteTodo,
    onCheckTodo,
    onUpdateTodoTitle,
    isLoading,
  } = useTodo();


  if (isLoading) {
    return null;
  }

  return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header
            totalTodos={todos.length}
            completedTodos={completedTodos.length}
        />
        <TodoCreator onAddTodo={onAddTodo} />
        <TodoList
            todos={todos}
            onCheckTodo={onCheckTodo}
            onDeleteTodo={onDeleteTodo}
            onUpdateTodoTitle={onUpdateTodoTitle}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_BACKGROUND,
  },
});