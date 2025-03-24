const express = require('express');
const app = express();
const PORT = 5000;

app.get('/api/problems', (req, res) => {
  res.json({ message: 'List of problems will go here' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));