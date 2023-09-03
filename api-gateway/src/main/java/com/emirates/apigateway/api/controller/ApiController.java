package com.emirates.apigateway.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final String nodeJsBaseUrl = "http://localhost:3000"; // Replace with your Node.js web app URL

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/data")
    public ResponseEntity<String> getData() {
        return restTemplate.getForEntity(nodeJsBaseUrl + "/api/data", String.class);
    }

    @GetMapping("/data/{appName}")
    public ResponseEntity<String> getDataByAppName(@PathVariable String appName) {
        return restTemplate.getForEntity(nodeJsBaseUrl + "/api/data/" + appName, String.class);
    }

}
