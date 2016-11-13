'use strict';

require('dotenv').load();

let Wit = null;
let interactive = null;
try {
  // if running from repo
  Wit = require('../').Wit;
  interactive = require('../').interactive;
} catch (e) {
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;
}

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const accessToken = process.env.ACCESS_TOKEN;

const actions = {
  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    return new Promise(function(resolve, reject) {
      console.log('user said...', request.text);
      console.log('sending...', JSON.stringify(response));
      return resolve();
    });
  },
  getKnowledge({context, entities}) {
    return new Promise(function(resolve, reject) {

      console.log(entities);

      let technology = firstEntityValue(entities, 'intent');

      console.log(technology);

      context.result = "Yes I know this";

      return resolve(context);
    });
  }
};

const client = new Wit({accessToken, actions});
interactive(client);
