import fs from "fs";
import path from "path";
import { swaggerSpec } from "../config/swagger";

const outputDir = path.resolve(__dirname, "../generated");
const outputPath = path.join(outputDir, "openapi.json");

// Ensure the 'generated' directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2), "utf-8");
console.log(`✅ OpenAPI specification generated at: ${outputPath}`);
