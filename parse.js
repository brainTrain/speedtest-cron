var fs = require('fs');

var LOG_BASE = 'logs';
var LOG_INPUT = `${ LOG_BASE }/speedtest.log`;
var LOG_OUTPUT = `${ LOG_BASE }/speedtest.json`;

var byTimestampArray = fs.readFileSync(LOG_INPUT).toString().split('-----');
var blobArray = [];
var unparsedPingCount = 0;

byTimestampArray.forEach(function(item) {
    // filter out items that are only newlines
    item = item.split('\n').filter(function(item) { return !!item; });

    // only let pristine data get in for now
    // NOTE: item.length < 5 means ping failed, item.length > 5 means computer turned off and didn't print delimeter
    // TODO: handle case where item.length > 5 and rescue ping that's run
    if (item.length === 5) blobArray.push(buildBlob(item));

    // build metadata
    if (item.length > 5) unparsedPingCount ++;
});

// write json formatted data to disk
fs.writeFile(LOG_OUTPUT, JSON.stringify(blobArray));

console.log('File parsed succesfully');
console.log('parsed:', blobArray.length);
console.log('unparsed:', unparsedPingCount);
console.log('input:', LOG_INPUT);
console.log('output:', LOG_OUTPUT);
console.log('');

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
