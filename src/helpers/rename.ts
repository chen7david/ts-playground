import pluralize from 'pluralize'

// Function to convert a noun into PascalCase, pluralized, and CamelCase
export function transformNoun(noun: string) {
  // Function to convert a string to PascalCase
  const toPascalCase = (str: string) =>
    str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0
        ? match.toUpperCase()
        : match.toUpperCase().replace(/\s+/g, ''),
    )

  // Function to convert a string to CamelCase
  const toCamelCase = (str: string) =>
    str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0
        ? match.toLowerCase()
        : match.toUpperCase().replace(/\s+/g, ''),
    )

  // Pluralize the noun
  const pluralNoun = pluralize(noun)

  // Convert the noun to PascalCase
  const pascalCase = toPascalCase(pluralNoun)

  // Convert the noun to CamelCase
  const camelCase = toCamelCase(pluralNoun)

  return {
    pascalCase,
    pluralized: pluralNoun,
    camelCase,
  }
}

// Example usage
const noun = 'user'
const result = transformNoun(noun)
console.log(result)
