const Eureka = require('eureka-js-client').Eureka;

const eurekaClient = new Eureka({
  instance: {
    app: 'nodejs-backend', // Replace with your microservice name
    hostName: 'localhost',    // Host where your service is running
    ipAddr: '127.0.0.1',      // IP address of your service
    port: {
      $: 3000,                // Port where your service is running
      '@enabled': true,
    },
    vipAddress: 'nodejs-backend', // Replace with your microservice name
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: 'localhost', // Replace with your Eureka Server's host
    port: 8761,                // Port of your Eureka Server
    servicePath: '/eureka/apps/',
  },
});

module.exports = eurekaClient;
