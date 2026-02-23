import { TodoList } from '../pages/TodoList/TodoList';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.container}>
      <TodoList />
    </div>
  );
};

export default App;
