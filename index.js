import { process } from "./env.js";

import { Configuration, OpenAIApi } from "openai";

const setupTextarea = document.getElementById("setup-textarea");
const setupInputContainer = document.getElementById("setup-input-container");
const movieBossText = document.getElementById("movie-boss-text");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

document.getElementById("send-btn").addEventListener("click", () => {
  setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`;
  movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`;

  fetchBotReply();
});

function fetchBotReply() {
  // ... set up a fetch rqst & pass in the url, then open up the object & the method is 'POST'...
  fetch(url, {
    method: "POST",
    // ... then the headers, an obj. w/ 2 key-value pairs: 1st is the "Content-Type" w/c is the  "application/json"... & the 2nd is the Authorization & that would be a string w/ the word 'Bearer' & our API key...
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    // ... then we need the body & it's going to need a model & a prompt... so firstly, we say 'JSON.stringify' & then we pass in an object w/ model "text-davinci-003" & the prompt...
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: "Sound enthusiastic in five words or less.",
    }),
  })
    // ... let's chain some 'thens' so we can deal w/ the 'response'... so we call 'json' on the 'response'... & then we'll take the 'data' fr the 'response'...  & say 'movieBossText.innerText'... & now we need to access our completion & we've got it here: 'Eagerly excited!'... & to get it, we've got to say 'data.choices'... & 'choices' holds an array & we actually want what is in the 1st element of the array at position '0'... & then we want to access the 'text' property ...
    .then((response) => response.json())
    .then((data) => (movieBossText.innerText = data.choices[0].text));
}
