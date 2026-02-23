import Add from '../../shared/assets/icons/add.svg?react';
import { AddEditTaskModal } from '../../features/AddEditTaskModal/AddEditTaskModal';
import { Button } from '../../shared/ui/Button/Button';
import { DeleteModal } from '../../features/DeleteModal/DeleteModal';
import { TaskCard } from '../../widgets/TaskCard/TaskCard';
import { Task } from '../../shared/api/serverData/taskList';
import { useTypedSelector, useTypedDispatch } from "../../hooks/redux";
import { addTask, editTask, deleteTask, toggleStatus, setSelectedTask, setShowAddEditModal, setShowDeleteModal } from "../../reducers/tasksSlice";
import styles from './TodoList.module.scss';

export const TodoList = () => {
  //состояния
  const tasks = useTypedSelector(state => state.tasks.items);
  const selectedTask = useTypedSelector(state => state.tasks.selectedTask);
  const showAddEditModal = useTypedSelector(state => state.tasks.showAddEditModal);
  const showDeleteModal = useTypedSelector(state => state.tasks.showDeleteModal);
  const dispatch = useTypedDispatch();

  //ф-ции для открытия модалок
  const handlerOpenAddModal = () => {  //создание новой
    dispatch(setSelectedTask(null));
    dispatch(setShowAddEditModal(true));
  };

  const handlerOpenEditModal = (task: Task) => { // задача для редактирования
    dispatch(setSelectedTask(task));  
    dispatch(setShowAddEditModal(true));
  };

  const handlerOpenDeleteModal = (task: Task) => { // удаление задачи
    dispatch(setSelectedTask(task));
    dispatch(setShowDeleteModal(true));
  };

  //ф-ции для закрытия модалок
  const handlerCloseAddEditModal = () => {
    dispatch(setShowAddEditModal(false));
    dispatch(setSelectedTask(null));
  };

  const handlerCloseDeleteModal = () => {
    dispatch(setShowDeleteModal(false));
    dispatch(setSelectedTask(null));
  };

  //сохраняем задачу
  const handleSaveTask = (taskData: Task) => {
    if (taskData.id) {
      //изменяем текущую задачу
      dispatch(editTask(taskData));
    } else {
      // добавление новой задачи
      dispatch(addTask(taskData));
    }
    handlerCloseAddEditModal();
  };

  //удаляем задачу
  const handleDeleteTask = () => {
    if (selectedTask) {
      dispatch(deleteTask(selectedTask.id));
      handlerCloseDeleteModal();
    }
  };

  // изменение статуса задачи
  const handleStatusChange = (taskId: string) => {
    dispatch(toggleStatus(taskId));
  };
  
  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.topTitle}>
          <h2>Список задач</h2>
          <Button 
            title="Добавить задачу" 
            icon={<Add />} 
            onClick={handlerOpenAddModal} />
        </div>
        <div className={styles.taskContainer}>
          {tasks.map((task) => (
            <TaskCard 
              key={task.id}
              task={task} 
              onEdit={() => handlerOpenEditModal(task)}
              onDelete={() => handlerOpenDeleteModal(task)}
              onStatusChange={() => handleStatusChange(task.id)}
            />
          ))}
        </div>
      </div>
      {showAddEditModal && 
        <AddEditTaskModal 
          task={selectedTask}  
          onClose={handlerCloseAddEditModal} 
          onSave={handleSaveTask}/>}
      {showDeleteModal && 
        <DeleteModal 
          task={selectedTask} 
          onClose={handlerCloseDeleteModal}
          onDelete={handleDeleteTask}/>}
    </>
  );
};
