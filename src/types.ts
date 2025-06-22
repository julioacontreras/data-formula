export type Action = {
  type: string,
  input: {
    name: string
  }
  output: {
    name: string
  } 
}

export type ActionTransform = Action & {
  mapper: Record<string, any>
}

export type ActionCalcule = Action & {
  sql: string
}

export type Input = Record<string, any>