import React from 'react';
import { FlatList } from 'react-native';
import { EditTaskArgs } from '../pages/Home';

import { ItemWrapper } from './ItemWrapper';
import { TasksItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export function TasksList({ tasks, editTask, toggleTaskDone, removeTask }: TasksListProps) {
  return (
    <FlatList
      // data={tasks}
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TasksItem
              task={item}
              editTask={editTask}
              toggleTaskDone={toggleTaskDone}
              removeTask={removeTask}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}