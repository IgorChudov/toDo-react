import styles from './TodoList.module.scss';
import Add from '../../shared/assets/icons/add.svg?react';
import { AddEditTaskModal } from '../../features/AddEditTaskModal/AddEditTaskModal';
import { Button } from '../../shared/ui/Button/Button';
import { DeleteModal } from '../../features/DeleteModal/DeleteModal';
import { TaskCard } from '../../widgets/TaskCard/TaskCard';
import { taskList } from '../../shared/api/serverData/taskList';
import { useState } from 'react';


interface Task {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  status: string;
  progress: number;
}

export const TodoList = () => {
  //состояния модалок
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //состояние удаление/редактирование
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>(taskList);

  //ф-ции для открытия модалок
  const handlerOpenAddModal = () => {  //создание новой
    setSelectedTask(null);
    setShowAddEditModal(true);
  };

  const handlerOpenEditModal = (task: Task) => { // задача для редактирования
    setSelectedTask(task);  
    setShowAddEditModal(true);
  };

  const handlerOpenDeleteModal = (task: Task) => { // удаление задачи
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  //ф-ции для закрытия модалок
  const handlerCloseAddEditModal = () => {
    setShowAddEditModal(false);
    setSelectedTask(null);
  };

  const handlerCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedTask(null);
  };

  //сохраняем задачу
  const handleSaveTask = (taskData: Task) => {
    if (taskData.id) {
      //изменяем текущую задачу
      setTasks(tasks.map(task => 
        task.id === taskData.id ? taskData : task
      ));
    } else {
      // добавление новой задачи
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
      };
      setTasks([...tasks, newTask]);
    }
    handlerCloseAddEditModal();
  };

  //удаляем задачу
  const handleDeleteTask = () => {
    if (selectedTask) {
      setTasks(tasks.filter(task => task.id !== selectedTask.id));
      handlerCloseDeleteModal();
    }
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
