import alasql from "alasql"
import { ActionCalcule, Input } from "./types"

const loadTables = (input: Input) => {
  const tables = Object.keys(input)
  tables.forEach((table) => {
    alasql.tables[table] = { data: input[table] }
  })
}

export const calcule = (action: ActionCalcule, input: Input): Input => {
  loadTables(input)
  input[action.output.name] = alasql(action.sql)
  return input
}
