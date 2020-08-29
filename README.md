# Transform txt file into json

### Format of txt file

```js
// separated with \t & \r
1141269 Ghazni	Ghazni  Asia/Kabul  2018-02-17
2766429 Sankt Pölten  Sankt Poelten Europe/Vienna 2019-09-05
....
```

### How to use it

```js
const input = 'path/to/file.txt';
const output = 'path/where/to/put/file.json';
const porperties = [
  'id',
  'name',
  'asciiname'
  'tz',
  'lastModified',
]

txt2json(input, output, porperties);
```
