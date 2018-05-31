const axiosFile = require('../index');
const assert = require('assert');
const fs = require('fs');
const Koa = require('koa');
const fileHandler = require('@zhike/koa2-upload');

const app = new Koa();
app.use(fileHandler({autoDelete: true}));
app.use(async (ctx) => {
  ctx.body = 'success';
});

app.listen(3000);

describe('测试上传功能', async function () {
  const filePath = 'package.json';

  it('upload test.js', async function () {
    const data = {
      myName: 'Steve',
      myFile: fs.createReadStream(filePath)
    };

    let res = await axiosFile({
      url: 'http://127.0.0.1:3000',
      method: 'post',
      data: data
    });

    assert(res.status === 200);
  });

});


describe('测试下载功能', async function () {

  const filePath = 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=851ae7889558d109d0eea1e0b031a7da/377adab44aed2e73d39a02da8001a18b86d6fad1.jpg';
  const tempPath = './test.jpg';

  it ('download test.png', async function () {

    try{
      await axiosFile({
        url: filePath,
        method: 'get',
        savePath: tempPath
      });
    } catch (err) {
      console.log(err);
    } finally {
      fs.unlinkSync(tempPath);
    }

  });

});