import './App.css';
import ProgressBar from './components/ProgressBar/ProgressBar';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ProgressBar goal={{
        "_id": "61cfc52dae28c1268698f336",
        "dateStarted": Date.now(),
        "deadline": Date.now()+86400,
        "active": true,
        "completed": false,
        "name": "test goal",
        "details": "test",
        "important": false,
        "urgent": false,
        "createdBy": null,
        "currentProgress": 3,
        "maxProgress": 10
    }}/>
    </div>
  );
}

export default App;
