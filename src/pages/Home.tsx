import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { Header } from '../components/Header'
import { ModalAlert } from '../components/ModalAlert'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

export interface EditTaskArgs {
  taskId: number
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [saveId, setSaveId] = useState(0)
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [modalTypes, setModalTypes] = useState({
    title: '',
    alert: ''
  })

  function handleAlert(type: string) {
    if (type === 'Sim')
      setTasks(oldState => oldState.filter(item => item.id !== saveId))

    setModalIsVisible(false)
  }

  function handleAddTask(newTaskTitle: string) {
    const isSameTitle = tasks.find(task => task.title === newTaskTitle)

    if (isSameTitle) {
      setModalTypes({
        title: 'Task já cadastrada',
        alert: 'Você não pode cadastrar uma task com o mesmo nome'
      })
      setModalIsVisible(true)
      return
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldState => [...oldState, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const foundItem = updatedTasks.find(item => item.id === id)

    if (!foundItem)
      return

    foundItem.done = !foundItem.done

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    setSaveId(id)

    setModalTypes({
      title: 'Remover item',
      alert: 'Tem certeza que você deseja remover esse item?'
    })

    setModalIsVisible(true)
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const toUpdate = updatedTasks.find(task => task.title === taskNewTitle)

    if (!toUpdate)
      return

    toUpdate.title = taskNewTitle

    setTasks(updatedTasks)
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

      {modalIsVisible &&
        <>
          <ModalAlert
            modalIsVisible={modalIsVisible}
            modalTypes={modalTypes}
            handleAlert={handleAlert}
          />

          <View style={styles.overlay} />
        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#000',
    opacity: .3
  }
})