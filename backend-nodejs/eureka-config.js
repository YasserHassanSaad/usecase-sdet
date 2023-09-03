const Eureka = require('eureka-js-client').Eureka;

const eurekaClient = new Eureka({
  instance: {
    app: 'nodejs-backend', 
    hostName: 'localhost', 
    ipAddr: '127.0.0.1', 
    port: {
      $: 3000, 
      '@enabled': true,
    },
    vipAddress: 'nodejs-backend', 
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: 'localhost', 
    port: 8761, 
    servicePath: '/eureka/apps/',
  },
});

module.exports = eurekaClient;
