# GoGitit
#### Data driven data about JavaScript front-end frameworks

GoGitit is a node project that leverages the Google BigQuery API and Github's API to gather data about the usage statistics of different front-end frameworks

##Problem

There is currently no available hard data on front-end framework usage. When you want to see what framework is gaining steam in the open source community, you really only have speculation to go off of.

##Solutions

GoGitit gathers hard data from from identifiers in public GitHub files. Our current MVP parses through index.htmls and package.jsons. We're gathering information on Angular, React, Ember, Mithril, Flight, Polymer, and Spine. Support for more frameworks will be added over time.

##Quote from the Project Owner

"I mean what do you want me to say?"

##How to get started

1. Clone the repository
2. run npm install
3. Provide the needed information in the `/api.js` file to interact with the necessary APIs.
4. Configure the connection to a local Mongo instance in `/Schemas/config.js`
5. run `$node server.js` in `/Servers`
6. Open http://localhost:1111/ in the browser to see the results!

The parsing scripts take some time to run due to the dataset size, The order is bigQuery.js > fetchFiles.js > parseRepos.js > tally.js. We recommend hosting on heroku and using the PubNub plugin to handle script triggering. 

##Customer Quote

"This is pretty cool."


The information we display isn't a 100% accurate sample, as we are still gathering the huge amounts of data necessary to accurately track trends.

