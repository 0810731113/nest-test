const os = require("os");
const ifaces = os.networkInterfaces();

export const getHost = () => {
    let host = '127.0.0.1';
    let hasFound = false

    for (const dev in ifaces) {
        ifaces[dev].forEach(function(details) {
            if(hasFound) return
            if (details.family === 'IPv4' && details.address.indexOf('192.168') >= 0) {
                host = details.address;
                hasFound=true
            }
        });
    }

    return host;
};

