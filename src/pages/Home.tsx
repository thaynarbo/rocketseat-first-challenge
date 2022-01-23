import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    const isDouble = !!tasks.find((task) => task.title === newTaskTitle);
    if (isDouble) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [{ text: "Voltar", onPress: () => console.log("Cancel Pressed") }]
      );
    }
    setTasks([...tasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTask = tasks.map((task) => ({ ...task }));
    const selectedTask = updatedTask.find((task) => task.id === id);

    if (selectedTask) {
      selectedTask.done = !selectedTask.done;
      setTasks(updatedTask);
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: (): void => {
            return;
          },
        },
        {
          text: "Sim",
          onPress: () => setTasks(tasks.filter((task) => task.id !== id)),
        },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTask = tasks.map((task) => ({ ...task }));
    const selectedTask = updatedTask.find((task) => task.id === taskId);

    if (selectedTask) {
      selectedTask.title = taskNewTitle;
      setTasks(updatedTask);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
