## axios-file

node 中在 axios 基础上对文件的表单上传和下载进行处理

#### 上传：
```
const axiosFile = require('axios-file');

// 上传表单数据，必须有 formData 字段
// 会将 formData 和 data 数据进行合并，其余字段与 axios 原生完全一致即可
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
  formData: data,
  data: {
    test: 'test'
  }
});
```

#### 下载：
```
const axiosFile = require('axios-file');

// 下载文件并保存至指定的文件夹，
// responseType 指定为 stream，savePath 必须存在，否则将走 axios 的默认规则
await axiosFile({
  url: 'http://xxx.xxx/file',
  method: 'get',
  responseType: 'stream',
  savePath: `${__dirname}/test`
});

```