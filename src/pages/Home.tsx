import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const findTask = tasks.find((task) => task.title === newTaskTitle);
    const data: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    if (!findTask) {
      setTasks(oldState => [...oldState, data]);
      return;
    }
    Alert.alert(
      "Task já cadastrada",
      "Você não pode cadastrar uma task com o mesmo nome"
    );
    return; 
  }

  function handleToggleTaskDone(id: number) {
    setTasks(prevState => prevState.map(task => {
      if(task.id === id){
        task.done = !task.done;
      }
      return task;
    }))
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover", 
        "Remover a tarefa", 
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'sim',
          onPress: () => setTasks(prevState => prevState.filter(task => task.id !== id)),
        },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string ){
    const newTasks = tasks.map(task => {
      if(task.id === taskId){
        task = {
          ...task,
          title: taskNewTitle,
        };
      }
      return task;
    });
    setTasks(newTasks);
    /*setTasks(prevState => prevState.map(task => {
      if(task.id === taskId){
        task = {
          ...task,
          title: taskNewTitle,
        };
      }
      return task
    }));
    */
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})