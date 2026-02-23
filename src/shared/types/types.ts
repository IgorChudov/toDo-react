export enum Priority {
  LOW = 'low', // Низкий
  MEDIUM = 'medium', // Средний
  HIGH = 'high', // Высокий
}

export enum Status {
  TODO = 'todo', // Сделать
  PROGRESS = 'progress', // В работе
  DONE = 'done', // Сделано
}

export const getStatusDisplayName = (status: Status): string => {
  switch (status) {
    case Status.TODO:
      return 'Сделать';
    case Status.PROGRESS:
      return 'В работе';
    case Status.DONE:
      return 'Сделано';
    default:
      return status;
  }
};

export const getPriorityDisplayName = (priority: Priority): string => {
  switch (priority) {
    case Priority.LOW:
      return 'Низкий';
    case Priority.MEDIUM:
      return 'Средний';
    case Priority.HIGH:
      return 'Высокий';
    default:
      return priority;
  }
};