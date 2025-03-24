import { Link } from 'react-router-dom';

function ProblemList({ problems }) {
  return (
    <div>
      <h1>League Code</h1>
      {problems.map((problem) => (
        <div key={problem.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <Link to={`/problem/${problem.id}`}>
            <h2>{problem.title}</h2>
          </Link>
          <p>Difficulty: {problem.difficulty}</p>
        </div>
      ))}
    </div>
  );
}

export default ProblemList;