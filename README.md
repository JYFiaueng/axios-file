## axios-file
node 中在 axios 基础上实现文件的上传和下载

### Installation
```
npm install axios-file
```

### Example
##### 上传：
```
const axiosFile = require('axios-file');

// 直接将 stream 传入即可

const data = {
  name: 'test',
  file: fs.createReadStream('./test.png')
};

await axiosFile({
  url: 'http://xxx.xxx/test',
  method: 'post',
  headers: {
    'cache-control': 'no-cache'
  },
  data: data
});
```

##### 下载：
```
const axiosFile = require('axios-file');

// 下载文件并保存至指定的文件中
// savePath 必须存在，否则将走 axios 的默认规则

await axiosFile({
  url: 'http://xxx.xxx/file',
  method: 'get',
  savePath: `${__dirname}/test.png`
});

```