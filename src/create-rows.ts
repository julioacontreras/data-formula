import { translateValue, getValueDefault } from './functions'
import type { ActionCreateRows, Input } from './types'

export const createRows = (action: ActionCreateRows, input: Input) => {
  const dataTransformed: any[] = []
  const data = input[action.input.name]
  data.forEach((row: any) => {
    action.forEach.forEach(item => {
      const fieldNames = Object.keys(item)
      fieldNames.forEach(name => {
        const defaultValue = getValueDefault(name, action.schema)
        const value = translateValue(item[name], row, defaultValue)
        row[name] = value
      })
      dataTransformed.push({...row})
    })
  })
  input[action.output.name] = dataTransformed
  return input
}