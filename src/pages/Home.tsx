import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitke = tasks.find(task => task.title.toUpperCase() === newTaskTitle.toUpperCase());
    if(taskWithSameTitke){
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o nome: ' + newTaskTitle);
    }
    
    //TODO - add new task
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    //console.log('new todo' , data);
    setTasks(oldTask => [...oldTask, data]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    // criando um novo array, copiando o conteudo real e não a referencia, serve para casos que o tipo de dados
    //  desse array são primitivos
    const updTasks = tasks.map(task => ({ ...task }));
    const foundItem = updTasks.find(item => item.id === id);
    
    if(!foundItem) return;

    foundItem.done = !foundItem.done; // troca o valor de done
    setTasks(updTasks);
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs){
    const updTasks = tasks.map(task => ({ ...task }));
    const taskItem = updTasks.find(item => item.id === taskId);

    if(!taskItem) return;

    taskItem.title = taskNewTitle; // troca o nome to title
    setTasks(updTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item','Tem certeza que você deseja remover esse item?',[
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          //TODO - remove task from state
          const updTasks = tasks.filter(task => task.id !== id);
          setTasks(updTasks);
        }
      }
    ])
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