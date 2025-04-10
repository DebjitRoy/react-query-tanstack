import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const res = await axios.get('http://localhost:8080/todos');
      setData(res.data);
    })();
  }, []);
  return <>{data.length}</>;
}

export default App;
