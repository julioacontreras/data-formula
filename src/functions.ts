import jsonpath from 'jsonpath'
import { Schema } from './types'

export const getValueDefault = (fieldName: string, schema: Schema): any => {
  const typeField = schema[fieldName]
  switch (typeField) {
    case "string": return ''
    case "number": return 0
    case "array": return []
    case "object": return {}
    default: return ''
  }
}

export const getValueFromComposeField = (row: any, arr: any[]): any => {
  let value: any = ''
  arr.forEach(instruction => {
    if (isJsonPath(instruction)) {
      value = getValueFromJsonPath(row, instruction)
    } else if (isFormatDay(instruction)) {
      value = formatDay(value)
    } else if (isFormatTimestamp(instruction)) {
      value = formatToTimestamp(value)
    } else if (isFormatToHuman(instruction)) {
      value = formatToHuman(value)
    }
  })
  return value
}

export const formatDay = (value: string) => {
  return (new Date(value)).getDate()
}

export const formatToTimestamp = (value: string) => {
  return (new Date(value)).getTime()
}

export const isFormatTimestamp = (field: string): boolean => {
  return field === 'formatToTimestamp'
}

export const isFormatToHuman = (field: string): boolean => {
  return field === 'formatToDDMMYYY'
}

export const formatToHuman = (value: string) => {
  const date = new Date(value)
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export const isFormatDay = (field: string): boolean => {
  return field === 'formatToDay'
}

export const getValueFromJsonPath = (row: any, field: string): any => {
  const response = jsonpath.query(row, field)
  if (response.length > 0) {
    return response[0]
  }
  return ''
}

export const isJsonPath = (field: unknown): boolean => {
  return (typeof field === 'string' && !field.includes('$t:') &&field.includes('$'))
}

export const isText = (field: unknown): boolean => {
  return (typeof field === 'string' && field.includes('$t:'))
}

export const getText = (field: string): string => {
  return field.split(':')[1]
}

export const translateValue = (field: string | Array<any>, row: any, valueDefault: any): any => {
  let value = valueDefault
  if (Array.isArray(field)) {
    value = getValueFromComposeField(row, field)
  } else
    if (isJsonPath(field)) {
      value = getValueFromJsonPath(row, field)
    }
    else if (row[field]){
      value = row[field] 
    } else if (isText(field)) {
      value = getText(field)
    } else {
      value = valueDefault
    }
  if (value === null) {
    value = valueDefault
  }
  return value
}