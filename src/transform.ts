import jsonpath from 'jsonpath'

import { ActionTransform, Input } from './types'

const getValueFromComposeField = (data: any, arr: any[]): any => {
  let value: any = ''
  arr.forEach(instruction => {
    if (isJsonPath(instruction)) {
      value = getValueFromJsonPath(data, instruction)
    } else if (isFormatDay(instruction)) {
      value = formatDay(value)
    } else if (isFormatTimestamp(instruction)) {
      value = formatToTimestamp(value)
    }
  })
  return value
}

const formatDay = (value: string) => {
  return (new Date(value)).getDate()
}

const formatToTimestamp = (value: string) => {
  return (new Date(value)).getTime()
}

const isFormatTimestamp = (field: string): boolean => {
  return field === 'formatToTimestamp'
}

const isFormatDay = (field: string): boolean => {
  return field === 'formatToDay'
}

const getValueFromJsonPath = (data: any, field: string): any => {
  const response = jsonpath.query(data, field)
  if (response.length > 0) {
    return response[0]
  }
  return ''
}

const isJsonPath = (field: unknown): boolean => {
  return (typeof field === 'string' && field.includes('$'))
}

export const transform = (action: ActionTransform, input: Input) => {
  const dataTransformed: any[] = []
  const data = input[action.input.name]
  const mapKey = Object.keys(action.mapper)
  data.forEach((item: any) => {
    let fields: Record<string, any> = {}
    mapKey.forEach((key) => {
      let value = ''
      const field = action.mapper[key]
      if (Array.isArray(field)) {
        value = getValueFromComposeField(item, field)
      } else
      if (isJsonPath(field)) {
        value = getValueFromJsonPath(item, field)
      } else {
        value = item[field]
      }
      if (value === null) {
        value = ''
      }
      fields[key] = value
    })
    dataTransformed.push(fields)
  })
  input[action.output.name] = dataTransformed
  return input
}