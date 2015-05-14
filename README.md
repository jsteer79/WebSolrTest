WebSolr Test
===================

Used to test deleting in node on websolr

All requests to websolr are output to the console

Routes
-----------------------------

* / - shows the first 10 records in the core
* /add - adds a record into the core
* /clear - trys to remove all the data from the solr code

Config Environment Variables/Heroku Keys
-----------------------------

* WEBSOLR_CORE - The core to use
* WEBSOLR_SECRET - The Shared Secret
