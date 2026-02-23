import { Button } from '../../shared/ui/Button/Button';
import { Modal } from '../../shared/ui/Modal/Modal';
import { Task } from '../../shared/api/serverData/taskList';
import styles from './DeleteModal.module.scss';

interface DeleteModalProps {
  task: Task | null;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteModal = ({task, onClose, onDelete}: DeleteModalProps) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles['delete-modal']}>
        <p>Точно удалить задачу "{task?.title}"?</p>
        <div className={styles['delete-modal__actions']}>
          <Button title="Удалить" onClick={handleDelete} />
          <Button title="Выйти" outline onClick={onClose} />
        </div>
      </div>
    </Modal>
  );
};
