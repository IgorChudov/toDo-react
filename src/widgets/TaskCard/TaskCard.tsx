import classNames from 'classnames';
import DeleteIcon from '../../shared/assets/icons/delete.svg?react';
import EditIcon from '../../shared/assets/icons/edit.svg?react';
import { CircularProgressBar } from '../../shared/ui/CircularProgressBar/CircularProgressBar';
import styles from './TaskCard.module.scss';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskCard = ({ task, onEdit, onDelete }:TaskCardProps) => {
  return (
    <div className={styles.taskCard}>
      <div className="flex w-100">
        <span className={styles['task-title']}>Задача</span>
        <span className={styles.task}>{task.title}</span>
      </div>
      <div className="flex">
        <span className={styles['priority-title']}>Приоритет</span>
        <span className={classNames(styles[`priority--${task.priority.toLowerCase()}`], styles.priority)}>
          {task.priority.toLowerCase()}
        </span>
      </div>
      <div className={styles['task-status-wrapper']}>
        <button className={classNames(styles[`status--${task.status.toLowerCase()}`], styles.status)}>
          {task.status.toLowerCase()}
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
