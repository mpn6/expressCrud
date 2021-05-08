import TestJS from './TestJs';
import ConsoleLogIt from './ConsoleLogIt';
import getJSON from './getJSON';

TestJS();
getJSON('', (data) => {
  console.log(data);
});

getJSON('http://localhost:8000/api/v1/cities',
  (err, records) => {
    if (err !== null) {
      alert(`Something went wrong: ${err}`);
    } else {
      const table = document.querySelector("table");
      const data = Object.keys((records.data[0]));
      const dataRecords = records.data;

      generateTableHead(table, data);
      generateTable(table, dataRecords);
      /*
      let data = Object.keys(records.data[0]);
      generateTable(table, records.data); // generate the table first
      generateTableHead(table, data); // then the head
      */
    }
  });
ConsoleLogIt('this workedss  in the bundle');

function generateTableHead(table, data) {
    const thead = table.createTHead();
    const row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        console.log(element);
        let key;
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}