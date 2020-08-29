// Update of Cities with the different population
// http://download.geonames.org/export/dump/
const fs = require('fs');

/**
 * Transforms input data into JSON object
 * with the porperties passed to it
 * @param {Array} input - array of lines to process
 */
const processData = (input, porperties) =>
  input
    .map(line => (line ? line.split('\t') : []))
    .reduce((city, line) => {
      line = line.reduce((data, text, i) => {
        data[porperties[i]] = text;

        return data;
      }, {});

      if (Object.keys(line).length) city.push(line);

      return city;
    }, []);

/**
 * Reads the file, proces the file data and writes to
 * the destionation file
 * @param {String} input - file to read from
 * @param {String} output - destination file to write to
 * @param {Array} porperties - properties of the JSON object
 * @param {String} encoding - file encoding
 */
const txt2json = (input, output, porperties, encoding) => {
  if (!input || !output || !porperties)
    throw 'Input & Output files & porperties are mandatory!!';

  const inputFile = fs.readFileSync(input, encoding || 'utf8').split('\n');

  let fd = undefined;
  try {
    fd = fs.openSync(output, 'w');

    // append wirst line of JS export
    fs.appendFileSync(fd, '[');

    // Append objects into file
    processData(inputFile, porperties).map((obj, i) => {
      let line = JSON.stringify(obj, null, 2);
      if (i > 0) line = ',\n' + line;

      fs.appendFileSync(fd, line);
    });

    // close the array of objects
    fs.appendFileSync(fd, ']');

    fs.closeSync(fd);
    console.log('The data was saved to the file!');
  } catch (error) {
    console.log(error);
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
  }
};

module.exports = txt2json;
