import fs from "fs";
import path from "path";

/**
 * Reads a markdown file from the content directory within the frontend repository.
 * Uses "content" (not "pages") to avoid Next.js treating it as the Pages Router.
 */
export function readMarkdownFile(filename: string): string {
  const filePath = path.join(process.cwd(), "content", filename);
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
