import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const sourceDirectory = process.argv[2]
if (!sourceDirectory) throw new Error('Usage: node scripts/prepare-resource-visuals.mjs <generated-image-directory>')
const manifest = JSON.parse(await readFile(new URL('../design/resource-visuals/prompts.json', import.meta.url), 'utf8'))
const headers = JSON.parse(await readFile(new URL('../design/resource-visuals/header-cutouts.json', import.meta.url), 'utf8'))
const outputDirectory = fileURLToPath(new URL('../public/images/resources/', import.meta.url))
await mkdir(outputDirectory, { recursive: true })

for (const asset of [...manifest.assets, ...headers.assets]) {
  const input = path.join(sourceDirectory, asset.generatedFile)
  const output = path.join(outputDirectory, `${asset.name}-${asset.transparent ? 'header' : '3d'}.webp`)
  if (asset.transparent && !(await sharp(input).metadata()).hasAlpha) throw new Error(`${asset.name} requires genuine alpha transparency`)
  const image = await sharp(input)
    .resize(1200, asset.transparent ? 960 : 720, { fit: 'contain', background: asset.transparent ? { r: 0, g: 0, b: 0, alpha: 0 } : '#0a1026' })
    .webp({ quality: 78, alphaQuality: 100, effort: 6 })
    .toBuffer()
  if (image.length > 200_000) throw new Error(`${asset.name} exceeds the 200 KB master-image budget`)
  await writeFile(output, image)
  console.log(`${path.basename(output)}: ${Math.round(image.length / 1024)} KB`)
}
