var ghpages = require('gh-pages');
var path = require('path');
var basePath = path.join(__dirname, 'site-dist');
ghpages.publish(basePath);
