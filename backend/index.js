const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/overtime', (req, res) => {
  const { hours } = req.body;
  res.json({ message: '残業時間を受け取りました', hours });
});

app.listen(3000, () => console.log('サーバー起動 at port 3000'));