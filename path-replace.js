#!/usr/bin/env node
const appRoot = require('app-root-path')
const path = require('path')
const replace = require('replace-in-file')
const { path: appPath } = appRoot

try {
    const tsConfig = require(path.resolve(appPath, 'tsconfig.json'))
    
    const { compilerOptions: { baseUrl, outDir, paths: TS_PATHS } } = tsConfig
    const SEPARATE_DIR = '/'
    const ROOT_PATH = `${outDir}${baseUrl.replace('.', '')}${SEPARATE_DIR}`
    
    Object.entries(TS_PATHS).forEach(([ key, [ value ] ]) => {
        let filePath = ''
        const options = {
            files: `${ROOT_PATH}**/*.js`,
            from: file => {
                filePath = file
                return new RegExp(`((require)+(\\(")+((${key})))`, 'g')
            },
            to: match => {
                const relativePath = filePath.replace(ROOT_PATH, '')
                const diffPath = relativePath.substring(0, (relativePath.lastIndexOf(SEPARATE_DIR) + 1))
                const pathsToBack = diffPath.split(SEPARATE_DIR).filter(dir => dir.length)
                const absoluteKey = key.substring(0, (key.length - 1))
                const absolutePath = value.substring(0, (value.length - 1))
                if (pathsToBack.length) {
                    const backsPath = pathsToBack.map(() => '../').join('')
                    return match.replace(absoluteKey, `${backsPath}${absolutePath}`)
                }
                return match.replace(absoluteKey, `./${absolutePath}`)
            }
        }
    
        try {
            const changes = replace.sync(options)
            console.log('[Path Replace] Modified files => ', changes.join(', '))
        } catch (error) {
            console.error('[Path Replace] Error on trying modified files => ', error)
        }
    })
} catch (error) {
    console.error('[Path Replace] There\'s no tsconfig.json file in => ', appPath)
}
