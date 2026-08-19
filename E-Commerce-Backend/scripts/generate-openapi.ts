import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { swaggerSpec } from "../src/config/swagger";

// Support both ESM and CJS __dirname resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.resolve(__dirname, "../generated");
const outputPath = path.join(outputDir, "openapi.json");

// Ensure the 'generated' directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2), "utf-8");
console.log(`✅ OpenAPI specification generated at: ${outputPath}`);
