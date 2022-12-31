## Spyify

Track your friends' Spotify listening activity

### Installation

```bash
$ npm install spyify
```

### Usage in CoffeeScript

```coffee
spyify = require "spyify"
```

### Usage in JavaScript

```js
var spyify = require("spyify");
```

### Usage in Bash

<!-- 
    console.log("usage: spyify [-c <cookie> | --cookie <cookie>] [-p <person> | --person <person>] [-s <song> | --song <song>] [-a <artist> | --artist <artist>] [-h | --help]");
 -->

```bash
$ spyify [-c <cookie> | --cookie <cookie>]
         [-p <person> | --person <person>] 
         [-s <song> | --song <song>] 
         [-a <artist> | --artist <artist>] 
         [-h | --help]
```

### Dependencies

1. [spotify-buddylist]()
2. [timestamp-to-date]()
