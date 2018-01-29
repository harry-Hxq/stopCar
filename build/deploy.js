// https://github.com/simonh1000/ftp-deploy
var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var config = {
    username: "username",
    password: "password", // optional, prompted if none given
    host: "ftp.someserver.com",
    port: 21,
    localRoot: __dirname + "/local-folder",
    remoteRoot: "/public_html/remote-folder/",
    include: ['build/version.txt'],
    exclude: ['.git', '.idea', 'tmp/*', 'build/*']
}
    
ftpDeploy.deploy(config, function(err) {
    if (err) console.log(err)
    else console.log('finished');
});