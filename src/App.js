import './App.css';
import configureAppStore from './store/configureStore';
import { Provider } from 'react-redux';
import BugsList from './components/BugsList';
import Bugs from './components/bugs';

const store = configureAppStore()

function App() {
  return (
    <Provider store={store}>
      <BugsList />
    </Provider>
  );
}

export default App;
