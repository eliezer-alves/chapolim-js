export function replaceCharacter(string: string, index: number, replacement: string) {
  return string.slice(0, index) + replacement + string.slice(index + replacement.length)
}

export function toCamelCase(str: string) {
  str = str.replace('_', ' ')
  return str.replace(/\W+(.)/g, function (match: string, chr: string) {
    return chr.toUpperCase()
  })
}

export function toPascalCase(str: string) {
  str = toCamelCase(str)
  str = replaceCharacter(str, 0, str[0].toUpperCase())

  return str
}
