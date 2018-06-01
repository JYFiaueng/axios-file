'use strict';

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const isObject = (obj) => {
  return typeof obj === "object" && obj !== null;
}

const isString = (str) => {
  return typeof str === 'string' && str !== null;
}

const API = axios.create();

API.interceptors.request.use((config) => {

  const data = config.data;

  if (isObject(data)) {

    // axios 里面写死了默认 -1
    if (config.maxContentLength < 0) {
      config.maxContentLength = 1024 * 1024 * 100;
    }

    config.transformRequest = [(data, headers) => {
      let form = new FormData();
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          form.append(key, data[key]);
        }
      }
      delete headers.post['Content-Type'];
      delete headers.put['Content-Type'];
      delete headers.patch['Content-Type'];
      Object.assign(headers, form.getHeaders());
      return form;
    }];

  }

  if (isString(config.savePath)) {
    config.responseType = 'stream';
    config.transformResponse = [async (data) => {
      await new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(config.savePath);
        data.on('end', (err) => {
          if (err) reject();
          resolve();
        });
        data.pipe(writeStream);
      });
    }];
  }

  return config;

});

module.exports = API;