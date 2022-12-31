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

To install dependencies, run:

```bash
$ npm install
```

### Tests

To run tests, run:

```bash
$ npm test
```

### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

### License

GPLv3

### Author

[**@onurravli**](https://github.com/onurravli)
