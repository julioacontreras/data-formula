export type Action = {
  type: string,
  input: {
    name: string
  }
  output: {
    name: string
  } 
}

export type Schema = Record<string, string>

export type ActionTransform = Action & {
  schema: Schema
  mapper: Record<string, any>
}

export type ActionCalcule = Action & {
  sql: string
}

export type ActionCreateRows = Action & {
  schema: Schema
  forEach: Record<string, string>[]
}


export type Input = Record<string, any>