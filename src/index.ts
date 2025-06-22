import * as fs from 'fs'
import * as path from 'path'
import * as core from '@actions/core'
import * as io from '@actions/io'
import * as exec from '@actions/exec'
import * as tc from '@actions/tool-cache'

async function main(): Promise<void> {
  const installPath = path.join(process.cwd(), '.__install__/circt')

  try {
    core.info('Installation begins ...')

    const circtVersion: string = core.getInput('version')
    const circtPackage: string = core.getInput('target-package')

    const downloadPath: string = await tc.downloadTool(
      `https://github.com/llvm/circt/releases/download/firtool-${circtVersion}/${circtPackage}.tar.gz`
    )
    const extractedPath = await tc.extractTar(downloadPath, installPath)
    const targetBinPath = path.join(extractedPath, `firtool-${circtVersion}`, 'bin')

    core.info(`Update PATH ... ${targetBinPath}`)
    core.addPath(targetBinPath)
    core.exportVariable('CHISEL_FIRTOOL_PATH', targetBinPath)

    await exec.exec('firtool', ['--version'])
  } catch (error: unknown) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed('An unknown error occurred.')
    }
  }
}

main()
