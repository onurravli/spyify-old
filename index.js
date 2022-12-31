const { exit } = require('process');
const buddyList = require('spotify-buddylist');
const timestampToDate = require('timestamp-to-date');
const args = process.argv.slice(2);

let SP_DC = "";

if (process.env.SP_DC) {
    SP_DC = process.env.SP_DC;
}

function usage() {
    console.log("usage: spyify [-c <cookie> | --cookie <cookie>] [-p <person> | --person <person>] [-s <song> | --song <song>] [-a <artist> | --artist <artist>] [-h | --help]");
    console.log("  -c, --cookie <cookie>  Spotify cookie");
    console.log("  -p, --person <person>  Check for one person");
    console.log("  -s, --song <song>      Check for one song");
    console.log("  -a, --artist <artist>  Check for one artist");
    console.log("  -h, --help             Show this help");
}

// Git changes are: 
// - added -p, --person
// - added -s, --song
// - added -a, --artist
// - added -h, --help
// - added usage() function
// - added SP_DC variable to get cookie from environment variable
// - added a check to see if SP_DC is empty or not
// - added a check to see if cookie is valid or not
// - added a check to see if person is valid or not
// - added a check to see if song is valid or not
// - added a check to see if artist is valid or not
// - added a check to see if args has passed or not
// - added a check to see if args[1] is empty or not
// - added a check to see if args[0] is -c or --cookie or not

// git commit message: added -p, --person, -s, --song, -a, --artist, -h, --help, usage() function, SP_DC variable to get cookie from environment variable, a check to see if SP_DC is empty or not, a check to see if cookie is valid or not, a check to see if person is valid or not, a check to see if song is valid or not, a check to see if artist is valid or not, a check to see if args has passed or not, a check to see if args[1] is empty or not, a check to see if args[0] is -c or --cookie or not

const print = (person) => {
    const name = person["user"]["name"];
    const artist = person["track"]["artist"]["name"];
    const track = person["track"];
    const trackName = track["name"];
    const stamp = person["timestamp"];
    const humanDate = timestampToDate(stamp, "HH:mm:ss dd/MM/yyyy");
    const returnVal = `${name} is listened to ${artist} - ${trackName} at ${humanDate}`;
    console.log(returnVal);
    return returnVal;
};

const main = async () => {
    // if no args passed
    if (args.length === 0) {
        // if SP_DC is empty
        if (SP_DC.length === 0) {
            console.log("usage: spyify [-c <cookie>]");
            exit(-1);
        } else {
            try {
                const { accessToken } = await buddyList.getWebAccessToken(SP_DC);
                const friendActivity = await buddyList.getFriendActivity(accessToken);
                const obj = friendActivity["friends"];
                for (person in obj.reverse()) {
                    print(obj[person]);
                }
            } catch {
                console.log("Invalid cookie");
                exit(-1);
            }
        }
    } else {
        // if args has passed
        // if args[0] is -c
        if (args[0] === "-c" || args[0] === "--cookie") {
            // if args[1] is empty
            if (args[1].length === 0) {
                console.log("usage: spyify [-c <cookie>]");
                exit(-1);
            } else {
                try {
                    const cookie = args[1];
                    const { accessToken } = await buddyList.getWebAccessToken(cookie);
                    const friendActivity = await buddyList.getFriendActivity(accessToken);
                    const obj = friendActivity["friends"];
                    for (person in obj.reverse()) {
                        print(obj[person]);
                    }
                } catch {
                    console.log("Invalid cookie");
                    exit(-1);
                }
            }
        } if ((args[0] === "-p" || args[0] === "--person") && args[1].length != 0) { // log only one person that user's name is args[1]
            userExists = false;
            try {
                const cookie = SP_DC;
                const { accessToken } = await buddyList.getWebAccessToken(cookie);
                const friendActivity = await buddyList.getFriendActivity(accessToken);
                const obj = friendActivity["friends"];
                for (person in obj.reverse()) {
                    if (obj[person]["user"]["name"] === args[1]) {
                        print(obj[person]);
                        userExists = true;
                        break;
                    } else {
                        userExists = false;
                        continue;
                    }
                }
                if (!userExists) {
                    console.log("User not found");
                    exit(-1);
                }
            } catch {
                console.log("Some error occured");
                exit(-1);
            }
        } else if ((args[0] === "-s" || args[0] === "--song") && args[1].length != 0) { // check for one song
            songExists = false;
            try {
                const cookie = SP_DC;
                const { accessToken } = await buddyList.getWebAccessToken(cookie);
                const friendActivity = await buddyList.getFriendActivity(accessToken);
                const obj = friendActivity["friends"];
                for (person in obj.reverse()) {
                    if (obj[person]["track"]["name"] === args[1]) {
                        print(obj[person]);
                        songExists = true;
                        break;
                    } else {
                        songExists = false;
                        continue;
                    }
                }
                if (!songExists) {
                    console.log("Song not found");
                    exit(-1);
                }
            } catch {
                console.log("Some error occured");
                exit(-1);
            }
        } else if ((args[0] === "-a" || args[0] === "--artist") && args[1].length != 0) { // check for one artist
            artistExists = false;
            try {
                const cookie = SP_DC;
                const { accessToken } = await buddyList.getWebAccessToken(cookie);
                const friendActivity = await buddyList.getFriendActivity(accessToken);
                const obj = friendActivity["friends"];
                for (person in obj.reverse()) {
                    if (obj[person]["track"]["artist"]["name"] === args[1]) {
                        print(obj[person]);
                        artistExists = true;
                        break;
                    } else {
                        artistExists = false;
                        continue;
                    }
                }
                if (!artistExists) {
                    console.log("Artist not found");
                    exit(-1);
                }
            } catch {
                console.log("Some error occured");
                exit(-1);
            }
        } else if (args[0] === "-h" || args[0] === "--help") {
            usage();
            exit(0);
        } else {
            usage();
            exit(-1);
        }
    }
}

main();