import { Task, taskList } from "../shared/api/serverData/taskList";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../shared/types/types";


interface TasksState {
  items: Task[];
  selectedTask: Task | null;
  showAddEditModal: boolean;
  showDeleteModal: boolean;
}

const initialState: TasksState = {
  items: taskList,
  selectedTask: null,
  showAddEditModal: false,
  showDeleteModal: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const newTask: Task = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.items.push(newTask);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.items.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(task => task.id !== action.payload);
    },
    toggleStatus: (state, action: PayloadAction<string>) => {
      const task = state.items.find(task => task.id === action.payload);
      if (task) {
        let newStatus: Status;
        let newProgress: number;
              
        switch (task.status) {
          case Status.TODO:
            newStatus = Status.PROGRESS;
            newProgress = 50;
            break;
          case Status.PROGRESS:
            newStatus = Status.DONE;
            newProgress = 100;
            break;
            case Status.DONE:
            newStatus = Status.TODO;
            newProgress = 0;
            break;
          default:
            newStatus = Status.TODO;
            newProgress = 0;
        }

        task.status = newStatus;
        task.progress = newProgress;
      }
    },
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload;
    },
    setShowAddEditModal: (state, action: PayloadAction<boolean>) => {
      state.showAddEditModal = action.payload;
    },
    setShowDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.showDeleteModal = action.payload;
    },
  },
});

export const {addTask, editTask, deleteTask, toggleStatus, setSelectedTask, setShowAddEditModal, setShowDeleteModal} = tasksSlice.actions;
export default tasksSlice.reducer;