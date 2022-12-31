const { exit } = require('process');
const buddyList = require('spotify-buddylist');
const timestampToDate = require('timestamp-to-date');
const args = process.argv.slice(2);

let SP_DC = "";

if (process.env.SP_DC) {
    SP_DC = process.env.SP_DC;
}

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
        if (args[0] === "-c") {
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
        } else {
            console.log("usage: spyify [-c <cookie>]");
            exit(-1);
        }
    }
}

main();