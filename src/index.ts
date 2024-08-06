import fs from 'fs'
import path from 'path'
import prettier, { RequiredOptions } from 'prettier'

// Predefined Prettier configuration
const prettierConfig: Partial<RequiredOptions> = {
  singleQuote: true,
  trailingComma: 'all',
  parser: 'typescript',
  semi: false,
  tabWidth: 2,
}

// Function to read, replace, format, and write the file
async function copyAndReplace(
  sourceFilePath: string,
  destinationFilePath: string,
  replacements: Record<string, string>,
) {
  try {
    // Read the original file content
    const fileContent = fs.readFileSync(sourceFilePath, 'utf-8')

    // Replace the values as specified in the replacements object
    let modifiedContent = fileContent
    for (const [key, value] of Object.entries(replacements)) {
      const regex = new RegExp(key, 'g')
      modifiedContent = modifiedContent.replace(regex, value)
    }

    // Format the modified content using Prettier
    const formattedContent = await prettier.format(
      modifiedContent,
      prettierConfig,
    )

    // Write the modified and formatted content to the new file
    fs.writeFileSync(destinationFilePath, formattedContent, 'utf-8')

    console.log(
      `File copied and modified successfully to ${destinationFilePath}`,
    )
  } catch (error) {
    console.error('Error processing the file:', error)
  }
}

// Define the source and destination file paths
const sourceFilePath = path.join(__dirname, '/templates/user.model.ts')
const destinationFilePath = path.resolve(__dirname, 'user.model.ts')
console.log({ sourceFilePath, destinationFilePath })

// Define the replacements as key-value pairs
const replacements: Record<string, string> = {
  '{{ModelName}}': 'User',
}

// Execute the copy and replace function
copyAndReplace(sourceFilePath, destinationFilePath, replacements)
