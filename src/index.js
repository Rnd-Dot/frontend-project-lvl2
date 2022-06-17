import _ from 'lodash';
import fs from 'fs';
import path from 'path';



const readFile = (filename) => fs.readFileSync(path.resolve(process.cwd(), filename.trim()), 'utf-8');



const genDiff = (file1, file2) => {
  const filepath1 = readFile(file1);
  const filepath2 = readFile(file2);
  const data1 = JSON.parse(filepath1);
  const data2 = JSON.parse(filepath2);
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1,keys2));

  const result = [];
  sortedKeys.map((key) => {
    if (!_.has (data1,key)) {
      result.push(`  + ${key}: ${data2[key]}`);
    }
    else if (!_.has (data2,key)) {
      result.push(`  - ${key}: ${data1[key]}`);
    }
    else if ( data1[key] !== data2[key]) {
      result.push(`  - ${key}: ${data1[key]}`);
      result.push(`  + ${key}: ${data2[key]}`);
    }
    else {
      result.push(`    ${key}: ${data1[key]}`)
    }
    return null;
  })

  return ["{", ...result ,"}"].join("\n");
}
export default genDiff;
