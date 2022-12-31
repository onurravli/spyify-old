## Spyify

Track your friends' Spotify listening activity

### Installation

```bash
$ npm install spyify
```

<!-- 

    console.log("usage: spyify [-c <cookie> | --cookie <cookie>] [-p <person> | --person <person>] [-s <song> | --song <song>] [-a <artist> | --artist <artist>] [-h | --help]");


 -->

```bash
$ spyify [-c <cookie> | --cookie <cookie>] [-p <person> | --person <person>] [-s <song> | --song <song>] [-a <artist> | --artist <artist>] [-h | --help]
```

### Options

#### -c, --cookie: Spotify cookie value
#### -p, --person: Person to spy on
#### -s, --song: Song to spy on
#### -a, --artist: Artist to spy on
#### -h, --help: Show help

### Usage in CoffeeScript

```coffee
spyify = require "spyify"
```

### Usage in JavaScript

```js
var spyify = require("spyify");
```

### Usage in Bash

```bash
$ spyify
```

### Dependencies

1. [spotify-buddylist]()
2. [timestamp-to-date]()
