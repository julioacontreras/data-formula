# Data Formula &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE)

Flexible data processing in pipeline.

## ✨ Features

- **Transforms** change attributes in your data in a easy way.

- **SQL without server** use SQL in backend or frontend withput server.

- **Simple to use** use JSON structure to get your results.

- **Less code** with this library use less code and get faster results.

## Playground

Is possible use the library in the [playground](https://codesandbox.io/p/sandbox/data-formula-p9hht7).

## 🚀 Install

```bash
npm install data-formula
```

## 🎨 Code Examples

Is possible use SQL without server:

```js
import { formula } from 'data-formula';

// The information you will process
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

// The action do want extract. Will get your data and will
// execute the SQL to name and will return in the new
// data 'users_order_by_name' 
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

// Process data 
const output = formula(actions, input);

// Result
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
    schema: {
      id: 'string',
      name: 'string',
      ts: 'number', 
      day: 'number',
      date: 'string',
      customer_id: 'string',
      customer_name: 'string',
    },
    mapper: {
      id: 'id',                                   // pass field id
      name: 'name',                               // pass field name
      ts: ['$.event_at', 'formatToTimestamp'],    // get the attribute 'event_at' and transform in a timestamp
      day: ['$.event_at', 'formatToDay'],         // get the attribute 'event_at' and extract the day
      date: ['$.event_at', 'formatToDDMMYYYY'],   // get the attribute 'event_at' and transform to human date in format dd/mm/yyyy
      customer_id: '$.customer.id',               // from the input get value id in customer and copy in the field customer_id
      customer_name: '$.customer.name',           // from the input get value name in customer and copy in the field customer_name
    },
    input: {
      name: 'users',
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
      date: '12/06/2025',
      customer_id: 'C01',
      customer_name: 'Company 1',
    },
    ...
]
*/
```

Mixed:

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
      customer_id: '$.customer.id',
      customer_name: '$.customer.name',
    },
    input: {
      name: 'users',
    },
    output: {
      name: 'users_transformed',
    },
  },
  {
    type: 'calcule',
    sql: `
    SELECT
      customer_id,
      customer_name,
      SUM(COUNT(*)) as count
    FROM
      users_transformed
    ORDER BY
      name
    `,
    output: {
      name: 'users_group_by_company',
    },
  },
];

const output = formula(actions, input);
console.log(output.users_group_by_company);
/*
[
    {
      count: 2,
      customer_name: 'Company 1',
    },
    {
      count: 1,
      customer_name: 'Company 2',
    }
]
*/
```

## 📚 Documentation

### Transform

```js
{
  type: 'transform',
  schema: <string, string>,
  mapper: <string, string || Array>[
    // 'my_field_transformed': ['field' | 'function' | 'jsonpath']
  ],
  input: {
    name: string
  },
  output: {
    name: string
  }
}
```

Functions can use in mapper:

**formatToTimestamp** Format date to timestamp

**formatToDay** Format date to a day

**jsonpath** Also is posiible extrand information using jsonpath syntax `$.my_field` more info: [https://www.npmjs.com/package/jsonpath#jsonpath-syntax]

### Calcule

```js
{
  type: 'calcule',
  sql: string, // sql query to filter, group or calcule
  output: {
    name: string
  }
}
```

### Create rows

```js
{
  type: 'create_rows',
  schema: <string, string>,
  forEach: <string, string>[
    {
      my_new_field_name: "$t:my text",
      my_new_field_value: "$.original_field",
    }
  ]
  output: {
    name: string
  }
}
```

### 📄 License

React is [MIT licensed](./LICENSE).
