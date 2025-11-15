import classNames from 'classnames';
import DeleteIcon from '../../shared/assets/icons/delete.svg?react';
import EditIcon from '../../shared/assets/icons/edit.svg?react';
import { CircularProgressBar } from '../../shared/ui/CircularProgressBar/CircularProgressBar';
import styles from './TaskCard.module.scss';
import { getStatusDisplayName, getPriorityDisplayName  } from '../../shared/types/types';
import { Task } from '../../shared/api/serverData/taskList';
interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: () => void;
}

export const TaskCard = ({ task, onEdit, onDelete, onStatusChange }:TaskCardProps) => {
  return (
    <div className={styles.taskCard}>
      <div className="flex w-100">
        <span className={styles['task-title']}>Задача</span>
        <span className={styles.task}>{task.title}</span>
      </div>
      <div className="flex">
        <span className={styles['priority-title']}>Приоритет</span>
        <span className={classNames(styles[`priority--${task.priority}`], styles.priority)}>
          {getPriorityDisplayName(task.priority)} 
        </span>
      </div>
      <div className={styles['task-status-wrapper']}>
        <button className={classNames(styles[`status--${task.status}`], styles.status)} onClick={onStatusChange}>
          {getStatusDisplayName(task.status)}
        </button>
      </div>
      <div className={styles.progress}>
        <CircularProgressBar
          strokeWidth={2}
          sqSize={24}
          percentage={task.progress}
        />
      </div>
      <div className={styles.actions}>
        <EditIcon className="mr-20 cp" onClick={onEdit} />
        <DeleteIcon className="cp" onClick={onDelete} />
      </div>
    </div>
  );
};
