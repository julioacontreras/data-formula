# Data Formula

Process data using SQL, JsonPath and transforms in pipes.

## Install

```bash
npm install data-formula
```

## General Usage

Is possible use SQL without server:

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
/*
[
    {
      name: 'Bruce Lee',
    },
    {
      name: 'John Connor',
    },
  ]
*/
```

Is possible use transform data:

```js
import { formula } from 'data-formula';

const input = {
  users: [
    {
      id: 'U01',
      name: 'John Connor',
      event_at: '2025-06-01',
      customer: {
        id: 'C01',
        name: 'Company 1',
      },
    },
    {
      id: 'U03',
      name: 'Alice',
      event_at: '2025-06-22',
      customer: {
        id: 'C01',
        name: 'Company 1',
      },
    },
    {
      id: 'U02',
      name: 'Bruce Lee',
      event_at: '2025-06-12',
      customer: {
        id: 'C02',
        name: 'Company 2',
      },
    },
  ],
};

const actions = [
  {
    type: 'transform',
    mapper: {
      id: 'id',
      name: 'name',
      ts: ['$.event_at', 'formatToTimestamp'],
      day: ['$.event_at', 'formatToDay'],
      customer_id: '$.customer.id',
      customer_name: '$.customer.name',
    },
    output: {
      name: 'users_transformed',
    },
  },
];

const output = formula(actions, input);
console.log(output.users_transformed);
/*
[
    {
      id: 'U01',
      name: 'John Connor',
      ts: 1748736000000,
      day: '06',
      customer_id: 'C01',
      customer_name: 'Company 1',
    },
    ...
]
*/
```



## Transform

Functions can use in mapper:

**formatToTimestamp** Format date to timestamp

**formatToDay** Format date to a day

**jsonpath** Also is posiible extrand information using jsonpath syntax `$.my_field` more info: [https://www.npmjs.com/package/jsonpath#jsonpath-syntax]
