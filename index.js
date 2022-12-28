const { exit } = require('process');
const buddyList = require('spotify-buddylist');
const timestampToDate = require('timestamp-to-date');
const args = process.argv.slice(2);

const SP_DC = "";

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
    if (args.length < 1 || SP_DC.length < 1) {
        // Take cookie from user
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question('Enter your cookie: ', async (cookie) => {
            try {
                const { accessToken } = await buddyList.getWebAccessToken(cookie);
                const friendActivity = await buddyList.getFriendActivity(accessToken);
                const obj = friendActivity["friends"];
                for (person in obj.reverse()) {
                    print(obj[person]);
                }
                readline.close();
            } catch (e) {
                console.log("Invalid cookie");
                readline.close();
                exit(-1);
            }
        });
    } else {
        if (args[0] === "-c") {
            const cookie = args[1];
            const { accessToken } = await buddyList.getWebAccessToken(cookie);
            const friendActivity = await buddyList.getFriendActivity(accessToken);
            const obj = friendActivity["friends"];
            for (person in obj.reverse()) {
                print(obj[person]);
            }
        } else if (SP_DC.length > 0) {
            const { accessToken } = await buddyList.getWebAccessToken(SP_DC);
            const friendActivity = await buddyList.getFriendActivity(accessToken);
            const obj = friendActivity["friends"];
            for (person in obj.reverse()) {
                print(obj[person]);
            }
        } else {
            console.log("usage: spyify [-c <cookie>]");
        }
    }
}

main();