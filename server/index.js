const express = require('express');
const Docker = require('dockerode');
const app = express();
const docker = new Docker();

app.use(express.json());

app.post('/api/run', async (req, res) => {
  const { code, language } = req.body;
  const imageMap = {
    javascript: 'node:alpine',
    java: 'openjdk:11',
    python: 'python:3-alpine',
    cpp: 'gcc:latest',
  };
  const cmdMap = {
    javascript: ['node', '-e', code],
    java: ['sh', '-c', `echo "${code}" > Main.java && javac Main.java && java Main`],
    python: ['python', '-c', code],
    cpp: ['sh', '-c', `echo "${code}" > main.cpp && g++ main.cpp -o main && ./main`],
  };

  try {
    const container = await docker.createContainer({
      Image: imageMap[language],
      Cmd: cmdMap[language],
      Tty: true,
      HostConfig: {
        Memory: 256 * 1024 * 1024, // 256MB
        CpuPeriod: 100000, // 100ms
        CpuQuota: 50000, // 50% CPU
      },
    });

    await container.start();
    const timeout = setTimeout(async () => {
      await container.stop();
      await container.remove();
      res.json({ error: 'Execution timed out after 2s' });
    }, 2000);

    const logs = await container.logs({
      stdout: true,
      stderr: true,
      follow: true,
    });
    let output = '';
    logs.on('data', (chunk) => (output += chunk.toString('utf8')));
    logs.on('end', async () => {
      clearTimeout(timeout);
      await container.remove();
      res.json({ result: output });
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));