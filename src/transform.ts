import { translateValue, getValueDefault } from './functions'
import { ActionTransform, Input } from './types'
 

const mapRow = (mapKey: string[], row: any, action: ActionTransform): Record<string, any> => {
  const fields: Record<string, any> = {}
  mapKey.forEach((key) => {
    const field = action.mapper[key]
    const valueDefault = getValueDefault(key, action.schema)
    const value = translateValue(field, row, valueDefault)
    fields[key] = value
  })
  return fields
}

export const transform = (action: ActionTransform, input: Input) => {
  let dataTransformed: any[] = []
  const data = input[action.input.name]
  const mapKey = Object.keys(action.mapper)
  data.forEach((row: any) => {
    const fields = mapRow(mapKey, row, action)
    dataTransformed.push(fields)
  })
  input[action.output.name] = dataTransformed
  return input
}