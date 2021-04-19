Package.describe({
  name: 'citizensay:polls',
});

Package.onUse(function(api) {
  api.versionsFrom('1.10.2');
  api.use([
      'ecmascript',
      'citizensay:core'
  ]);
  api.mainModule('client.js', 'client');
  api.mainModule('server.js', 'server');
});