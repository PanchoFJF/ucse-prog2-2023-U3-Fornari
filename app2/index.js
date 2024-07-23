const express = require("express");
const moment = require("moment-timezone");
const axios = require("axios");

const app = express();
const port = 4001;

// Algunas urls para testear:
// - http://localhost:4001/checker
// - http://localhost:4001/checker?zone=America/Argentina/Buenos_Aires
// - http://localhost:4001/checker?zone=America/New_York
// - http://localhost:4001/checker?zone=Europe/London
// Mas acerca de timezones https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

//Luego de probar funcionan estos:
// curl http://localhost:4000/tz?zone=America/New_York (Test para App1)
// curl "http://localhost:4001/checker?zone=America/New_York&url=app1"  (Test para App2)

app.get("/checker", async (req, res) => {
  try {
    const timezone = req?.query?.zone;
    const url = req?.query?.url || 'app1'; // Aquí se establece 'app1' como valor predeterminado
    console.log(`Timezone for: ${timezone}`);

    if (!timezone)
      return res.json({ resp: "No timezone specified in the request" });

    const response = await axios.get(
      `http://${url}:4000/tz?zone=${timezone}`
    );

    console.log(`API call ${JSON.stringify(response.data)}`);
    const data = response.data;

    if (!data?.time)
      return res.json({ resp: "Error getting the time from the /tz endpoint" });

    let resp = null;
    const dataTimeParsed = moment(data.time);

    const fromHs = 9;
    const toHs = 18;
    // Seteando el tiempo a 9hs y 18hs
    argentinaDateMorning = moment.tz(timezone);
    argentinaDateMorning.hours(fromHs).minutes(0).seconds(0);
    argentinaDateEvening = moment.tz(timezone);
    argentinaDateEvening.hours(toHs).minutes(0).seconds(0);

    // Pasamos response.data.time a moment() y validar que la hora sea >= 9 y <= 18
    if (
      dataTimeParsed.isAfter(argentinaDateMorning) &&
      dataTimeParsed.isBefore(argentinaDateEvening)
    ) {
      resp = `WORKING TIME: The Time received is between ${fromHs}hs and ${toHs}hs ${timezone}: ${dataTimeParsed}`;
    } else {
      resp = `FREE TIME: The Time received is NOT between ${fromHs}hs and ${toHs}hs ${timezone}: ${dataTimeParsed}`;
    }

    return res.json({ resp });
  } catch (error) {
    return res.json({ error: `Error processing the data: ${error}` });
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
