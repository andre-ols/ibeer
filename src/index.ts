import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)
const rename = promisify(fs.rename)

async function renameFiles(directory: string) {
	try {
		const files = await readdir(directory)
		let count = 1

		for (const file of files) {
			const filePath = path.join(directory, file)
			const fileStat = await stat(filePath)

			if (fileStat.isDirectory()) {
				// Se for um diretório, chama a função recursivamente
				await renameFiles(filePath)
				// Zera a contagem para cada pasta
				count = 1
			} else {
				// Se o nome do arquivo não for "fg-image", renomeia para "image" + contagem incremental
				if (file !== 'fg-image.png') {
					const newFileName = `image-${count}.jfif`
					await rename(filePath, path.join(directory, newFileName))
					count++
				}
			}
		}
	} catch (error) {
		console.error(`Erro ao renomear arquivos: ${error}`)
	}
}

const pastaAssets = path.join(__dirname, '..', 'assets')
// Substitua 'caminho/para/sua/pasta' pelo caminho da sua pasta 'assets'

console.log('Iniciando renomeação de arquivos...', pastaAssets)

renameFiles(pastaAssets)
	.then(() => console.log('Renomeação concluída com sucesso!'))
	.catch((error) => console.error(`Erro ao renomear arquivos: ${error}`))
