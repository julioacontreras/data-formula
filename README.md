# Data Formula

Process data using SQL, JsonPath and transforms in pipes.

## Depedencies

- Alasql [https://github.com/AlaSQL/alasql/wiki]
- Jsonpath [https://www.npmjs.com/package/jsonpath]

## General Usage

```js
import { formula } from 'data-formula';

const input = {
  users: [
    {
      id: 'U01',
      name: 'John Connor',
    },
    {
      id: 'U02',
      name: 'Bruce Lee',
    },
  ],
};

const actions = [
  {
    type: 'calcule',
    sql: `
    SELECT 
      name
    FROM
      users
    ORDER BY
      name
    `,
    output: {
      name: 'users_order_by_name',
    },
  },
];

const output = formula(actions, input);
console.log(output.users_order_by_name);
```

## Install

```bash
npm install data-formula
```
