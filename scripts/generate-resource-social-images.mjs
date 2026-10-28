import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const directory = fileURLToPath(new URL('../public/images/resources/', import.meta.url))

for (const file of (await readdir(directory)).filter((name) => name.endsWith('-3d.webp'))) {
  const output = path.join(directory, file.replace('.webp', '-social.jpg'))
  await sharp(path.join(directory, file))
    .resize(1200, 630, { fit: 'contain', background: '#0a1026' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(output)
  console.log(path.basename(output))
}
