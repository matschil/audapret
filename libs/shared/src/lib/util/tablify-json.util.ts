import { min } from "lodash";

export interface JsonRow {
  [title: string]: string;
}

export interface JsonTable {
  [title: string]: string[];
}
// Expects an array of json objects that have the same attributes
export function tablifyJson(jsons: any[]): JsonTable /* | JsonTable[]  */ {
  //1. Determine columns
  const sampleObject = jsons[0];
  const columns = Object.keys(sampleObject);

  //1. Determine depth of sample JSON
  const depths = [];
  for (const level0Key of Object.keys(sampleObject)) {
    depths.push(0);
    if (sampleObject[level0Key].length !== undefined) {
      depths.push(1);
      for (const level1Entry of sampleObject[level0Key]) {
        if (typeof level1Entry === "object") {
          depths.push(2);
        }
      }
    }
  }
  if (min(depths) === 0) {
    // The source json has only level 0 attributes
    const entries: JsonRow[] = [];
    // Get all entries of the table
    for (const json of jsons) {
      entries.push(getJsonTable(json));
    }
    // Merge all entries to table of form {column1: [value1, valu2...], column2: [value1, value2...]}
    // Build table wihout rows {column1: [], column2: []}
    const table: JsonTable = {};
    columns.forEach((column) => (table[column] = []));
    // Add all rows
    for (const entry of entries) {
      for (const column of columns) {
        if (table[column] === undefined) {
          break;
        }
        table[column].push(entry[column]);
      }
    }
    return table;
  } else {
    throw new Error("Cannot parse jsons deeper than 2");
  }
}

export function getJsonTable(json: any): JsonRow {
  const table = {};
  for (const level0Key of Object.keys(json)) {
    switch (typeof json[level0Key]) {
      case "object":
        // If object is an array of strings
        if (
          json[level0Key].length > 0 &&
          (typeof json[level0Key][0] === "string" ||
            typeof json[level0Key][0] === "number")
        ) {
          table[level0Key] = `${String(json[level0Key]).substr(0, 15)}...`;
        }

        // Otherwise
        else {
          table[level0Key] = "Not displayed";
        }

        break;
      default:
        const stringifiedEntry =
          String(json[level0Key]).length > 15
            ? `${String(json[level0Key]).substr(0, 15)}...`
            : json[level0Key];
        table[level0Key] = stringifiedEntry;
        break;
    }
  }

  return table as JsonRow;
}

export function getJsonTableColumns(dataTable: JsonTable) {
  return Object.keys(dataTable).slice(0, 12);
}

export function getJsonTableRows(dataTable: JsonTable) {
  // extract columns - limit
  const columns = getJsonTableColumns(dataTable);

  // determine number of rows
  const rows = [];
  const numberRows = dataTable[columns[0]].length;
  // extract rows
  for (let rowIndex = 0; rowIndex < numberRows; rowIndex++) {
    const row: string[] = [];
    for (const column of columns) {
      row.push(dataTable[column][rowIndex]);
    }
    rows.push(row);
  }
  return rows;
}
