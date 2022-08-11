import React, { useRef, useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { EditTaskArgs } from '../pages/Home';
import { Task } from './TasksList';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/trash/edit.png'

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export function TasksItem({ task, editTask, toggleTaskDone, removeTask }: TaskItemProps){
  const [isEditing, setIsEditing] = useState(false);
  const [newTitleTaskValue, setNewTitleTaskValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing(){
    // qdo clica no lápis para editar o valor da task
    setIsEditing(true);
  }

  function handleCancelEditing(){
    // se cancelar a edição, volta o valor original
    setNewTitleTaskValue(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing(){
    // qdo a alteração é de fato confirmada
    editTask({ taskId: task.id, taskNewTitle: newTitleTaskValue });
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return(
    <View style={ styles.container }>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          /*usado nos testes*/ // testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            /*usado nos testes*/ // testID={`marker-${index}`}
            //TODO - use style prop 
            style={task.done ? styles.taskMarkerDone : styles.taskMarker }
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          {/* <Text 
            //TODO - use style prop
            style={task.done ? styles.taskTextDone: styles.taskText }
          >
            {task.title}
          </Text> */}
          <TextInput
            value={newTitleTaskValue}
            onChangeText={setNewTitleTaskValue}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone: styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity
      //usado nos testes // testID={`trash-${index}`}
        style={{ paddingHorizontal: 24 }}
        //TODO - use onPress (remove task) prop
        onPress={() => removeTask(task.id)} //tem que ser passada como argumento para não dar problema e tentar apagar qdo a task esta sendo renderizada
      >
        <Image source={trashIcon} />
      </TouchableOpacity> */}
      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity
            //style={{ paddingHorizontal: 24 }}
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={handleStartEditing}
          >
            {/* Aqui o Image deveria ser a do lápis, procurar no Father Icons depois*/}
            {/* <Image source={trashIcon} /> */}
            <Icon name="camera" size={20} color="#b2b2b2" />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />

        <TouchableOpacity
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
          >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  infoContainer:{
    flex: 1,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    // paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer:{
    flexDirection: 'row', alignItems: 'center', paddingLeft: 12, paddingRight: 24
  },
  iconsDivider:{
    width: 1, height: 24, backgroundColor: 'rgba(196,196,196,8.24)', marginHorizontal: 12
  }
})