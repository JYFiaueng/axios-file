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

  const formData = config.formData;

  if (isObject(formData)) {

    if (isObject(config.data)) {
      formData = {...formData, ...config.data};
    }

    config.transformRequest = [(data, headers) => {
      let form = new FormData();
      for(let p in formData) {
        form.append(p, formData[p]);
      }
      headers['content-type'] = form.getHeaders()['content-type'];
      return form;
    }];

  }

  if (isString(config.savePath)) {
    config.responseType = 'stream';
    config.transformResponse = [async (data) => {
      await new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(config.savePath);
        writeStream.on('finish', () => {
          resolve();
        });
        data.pipe(writeStream);
      });
    }];
  }

  return config;

});

module.exports = API;