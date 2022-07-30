import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
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
    // 1 - procura o id passado no array de tasks
    // 2 - se encontrar atualiza o debounce
    // 3 - atualiza o array de tasks com o novo valor desse id alterado
    /* obs:
      1 - Shalow Cpy - copia a referência de memoria do objeto, ou seja, se altera no array copiado então altera 
        tbm no original, isso quebra o principio de imutabilidade 
     */
    // criando um novo array, copiando o conteudo real e não a referencia, serve para casos que o tipo de dados
    //  desse array são primitivos
    const updTasks = tasks.map(task => ({ ...task }))
    const foundItem = updTasks.find(item => item.id === id);
    
    if(!foundItem) return;

    foundItem.done = !foundItem.done; // troca o valor de done
    setTasks(updTasks);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    const updTasks = tasks.filter(task => task.id !== id);
    setTasks(updTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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