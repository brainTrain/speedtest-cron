var fs = require('fs');

var byTimestampArray = fs.readFileSync('logs/speedtest.log').toString().split('-----');
var blobArray = [];

byTimestampArray.forEach(function(item) {
    // filter out items that are only newlines
    item = item.split('\n').filter(function(item) { return !!item; });

    // only let pristine data get in for now
    if (item.length === 5) {
        blobArray.push(buildBlob(item));
    }
});

// write json formatted data to disk
fs.writeFile('logs/speedtest.json', JSON.stringify(blobArray));

function buildBlob(array) {
    return {
        date: {
            iso: array[0],
            epoch: array[1],
        },
        data: {
            ping: array[2].split(' ')[1],
            download: array[3].split(' ')[1],
            upload: array[4].split(' ')[1],
        }
    };
}
