import fs from "fs";
import path from "path";

/**
 * Reads a markdown file from the docs directory within the frontend repository
 */
export function readMarkdownFile(filename: string): string {
  // Read from docs folder in the frontend repository root
  const filePath = path.join(process.cwd(), "docs", filename);
  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf-8");
    }
    throw new Error(`File not found: ${filePath}`);
  } catch (error) {
    console.error(`Error reading markdown file ${filename}:`, error);
    return `# Error\n\nCould not load ${filename}. Please check that the file exists in the docs directory.`;
  }
}
