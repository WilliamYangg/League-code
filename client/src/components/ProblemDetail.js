import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AceEditor from 'react-ace';
import axios from 'axios';
import ace from 'ace-builds'; // Import ace to configure it
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';

// Disable workers globally
ace.config.set('useWorker', false);

function ProblemDetail({ problems }) {
  const { id } = useParams();
  const problem = problems.find((p) => p.id === parseInt(id)) || {};
  const [code, setCode] = useState('// Write your code here');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');

  const runCode = async () => {
    try {
      const response = await axios.post('/api/run', { code, language });
      setOutput(response.data.result || response.data.error);
    } catch (e) {
      setOutput('Error: ' + e.message);
    }
  };

  const modes = {
    javascript: 'javascript',
    java: 'java',
    python: 'python',
    cpp: 'c_cpp',
  };

  return (
    <div>
      <h1>{problem.title}</h1>
      <p>{problem.description}</p>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="java">Java</option>
        <option value="python">Python 3</option>
        <option value="cpp">C++</option>
      </select>
      <AceEditor
        mode={modes[language]}
        theme="monokai"
        value={code}
        onChange={setCode}
        width="100%"
        height="300px"
      />
      <button onClick={runCode}>Run Code</button>
      <div>{output}</div>
      <Link to="/">Back to List</Link>
    </div>
  );
}

export default ProblemDetail;