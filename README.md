WebSolr Test
===================

Used to test websolr

All requests to websolr are output to the console

Routes
-----------------------------

* / - shows the first 10 records in the core
* /add - adds a record into the core
* /clear - deletes by query all the data from the solr core
* /del/:key - deletes by id the document with that key
* /query/:size - generates a query of :size bytes eg /size/8000

Config Environment Variables/Heroku Keys
-----------------------------

* WEBSOLR_CORE - The core to use
* WEBSOLR_SECRET - The Shared Secret
* PORT - The port the webserver listens on (automatically set by heroku)
