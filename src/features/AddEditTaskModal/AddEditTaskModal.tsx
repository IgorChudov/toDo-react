import classNames from 'classnames';
import Close from '../../shared/assets/icons/close.svg?react';
import { Button } from '../../shared/ui/Button/Button';
import { Input } from '../../shared/ui/Input/Input';
import { Modal } from '../../shared/ui/Modal/Modal';
import styles from './AddEditTaskModal.module.scss';
import "../../shared/styles/index.scss"
import { Task } from '../../shared/api/serverData/taskList';
import { useState } from 'react';
import { Priority, Status } from '../../shared/types/types';

interface AddEditTaskModalProps {
  task: Task | null;
  onClose: () => void;
  onSave: (taskData: Task) => void;
}

export const AddEditTaskModal = ({task, onClose, onSave}: AddEditTaskModalProps) => {
  //состояние формы
  const [formData, setFormData] = useState(() => {
    if (task) {
      //шаблон редактирование, значит берем текущую задачу
      return task;
    } else {
      //шаблон новой задачи
      return {
        id: '',
        title: '',
        priority: Priority.MEDIUM,
        status: Status.TODO,
        progress: 0
      };
    }
  });

  const isEditing = !!task;

  const handleSubmit = () => {
    if (formData.title.trim()) {
      onSave(formData);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(perv => ({
      ...perv,
      [name]: value
    }));
  };

  const handlePrioritySelect = (priority: Priority) => {
    setFormData(perv => ({
      ...perv,
      priority
    }));
  };

  return (
    <Modal onClose={onClose}>
      <div>
        <div className={styles['add-edit-modal']}>
          <div className="flx-between">
            <span className={styles['modal-title']}>
              {isEditing ? "Редактировать задачу" : "Добавить задачу"}
            </span>
            <Close className="cp" onClick={onClose} />
          </div>
          <Input
            label="Задача"
            placeholder="Введите текст.."
            onChange={(value) => handleInputChange('title', value)}
            name="title"
            value={formData.title}
          />
          <div className={styles['modal-priority']}>
            <span>Приоритет</span>
            <ul className={styles['priority-buttons']}>
              {[Priority.HIGH, Priority.MEDIUM, Priority.LOW].map((priority) => (
                <li
                  key={priority}
                  className={classNames(
                    styles[priority.toLowerCase()],
                    formData.priority === priority && styles[`${priority.toLowerCase()}-selected`]
                  )}
                  onClick={() => handlePrioritySelect(priority)}
                >
                  {priority.toLowerCase()}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button 
              title={isEditing ? "Сохранить" : "Добавить"} 
              onClick={handleSubmit}
              disabled={!formData.title.trim()}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
