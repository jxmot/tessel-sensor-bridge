# tessel-sensor-bridge

* [Overview](https://bitbucket.org/jxmot/tessel-mongoose-demo/overview#markdown-header-overview) 
    * [History](https://bitbucket.org/jxmot/tessel-mongoose-demo/overview#markdown-header-history) 
* [Requirements](https://bitbucket.org/jxmot/tessel-mongoose-demo/overview#markdown-header-requirements) 
* [Running the Application](https://bitbucket.org/jxmot/tessel-mongoose-demo/overview#markdown-header-running-the-application) 
    * [Sanity Check](https://bitbucket.org/jxmot/tessel-mongoose-demo/overview#markdown-header-sanity-check) 
    * [Running on the Tessel](https://bitbucket.org/jxmot/tessel-mongoose-demo/overview#markdown-header-running-on-the-tessel) 

# Overview

This application is one half of a *system*. The other half is a group of ESP8266-12E devices paired with DHT22 temperature & humidity sensors. The devices report the sensor data by using the API provided in this application. That data is then saved to a MongoDB database hosted on mLab.

The target platform for this application is a Tessel 2. However this application will also run in most any other NodeJS environment.

## History

This is part of my ongoing self education of all things "IoT". The place where this application began wasn't the first step. Initially I had to determine the capabilities of the Tessel in regards to how I would implement this application.

I knew that this application required :

* the ability to read and write to a database
* the ability to provide API endpoints to sensor devices
* to fit into the available memory on the Tessel 2
* to run without errors in third party NodeJS packages

