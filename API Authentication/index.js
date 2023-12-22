import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourUsername = "Wooster109";
const yourPassword = "Password123";
const yourAPIKey = "82fee338-96f1-4638-be6f-a10ec196db12";
const yourBearerToken = "7dee32ce-c51d-4d34-a9d7-92bfe8979ff4";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/random");
    res.render("index.ejs", { content: JSON.stringify(response.data)});
  } catch(error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  try {
    const response = await axios.get(API_URL + "/all?page2",
      {
      auth: {
          username: yourUsername,
          password: yourPassword
        },
      }
    );
    res.render("index.ejs", { content: JSON.stringify(response.data)});
  } catch(error) {
    res.status(404).send(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/filter",
    {
      params: {
          emScore: 5,
          apiKey: yourAPIKey
        },
      }
    );
    res.render("index.ejs", { content: JSON.stringify(response.data)});
  } catch(error) {
    res.status(404).send(error.message);
  }
  //HINT: You need to provide a query parameter of apiKey in the request.
});


app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/secrets/42", { headers: {Authorization : `Bearer ${yourBearerToken}`} })
    res.render("index.ejs", { content: JSON.stringify(response.data)});
  } catch(error) {
    res.status(404).send(error.message);
  }
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
