# Music-room
* server => nodeJs
* client => React Native

# Installation

* ```brew install mongodb```
* ```brew install cocoapod```
* ```brew install nodejs```
* ```npm install -g yarn```
* ```npm install -g expo```

# Start Server

* Start mongo ```mongod --dbpath mongo```
* Start server```cd server && yarn && yarn start-dev```

# Start Client

* ```yarn fix```
* ```cd ios && pod install```
* ```expo start```
* ```open ios/music-room-client.xcworkspace/```
* Run simulateur in Xcode
* Be patient.
* GO!

# Documentation

* ```yarn doc && open doc/index.html```

# Lint

* ```yarn lint```

# Test
* make some test for the server


# CI 
* runner git-lab to run test on the serveur

# Deploy
* shipit to deploy to AWS EC2

# Monnitoring
* Pm2 && keymetrics

## Todo
* Music Track Vote
* Share on facebook
* Test the project
* Make correction
