import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProblemList from './components/ProblemList';
import ProblemDetail from './components/ProblemDetail';

function App() {
  const [problems] = useState([
    { id: 1, title: 'Two Sum', description: 'Given an array...', difficulty: 'Easy' },
    { id: 2, title: 'Reverse String', description: 'Write a function...', difficulty: 'Easy' },
  ]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ProblemList problems={problems} />} />
          <Route path="/problem/:id" element={<ProblemDetail problems={problems} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;