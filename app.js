var express = require('express')
  , siteApp = express();

siteApp.use('/', express.static(__dirname+'/public'));
siteApp.use(['/apps/vday', '/paola'], express.static(__dirname+'/apps/vday/deny'));

siteApp.get('/apps/partaydj', function (req, res) {
    djApp = express();
    djApp.use('/', express.static(__dirname+'/apps/partaydj/public')).listen(3001);

});

siteApp.listen(3000);
