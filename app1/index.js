const express = require('express');
const moment = require('moment-timezone');



const app = express();
const port = 4000;

app.get('/tz', (req, res) => {
  const timezone = req.query.zone;
  console.log(`Timezone for: ${timezone}`);
  
  const time = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');

  res.json({ timezone, time });
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});