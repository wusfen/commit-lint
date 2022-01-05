try {
  const fs = require('fs')

  const targetPath = `${__dirname}`.replace(/[\\/]node_modules.*/, '')
  const hooksPath = `${targetPath}/.git/hooks`
  const preCommitPath = `${hooksPath}/pre-commit`
  const shellFileName = `commit-lint`

  // backup
  if (fs.existsSync(preCommitPath) && fs.statSync(preCommitPath).isFile()) {
    fs.writeFileSync(`${preCommitPath}.backup`, fs.readFileSync(preCommitPath))
  }

  // dir
  if (fs.existsSync(preCommitPath) && fs.statSync(preCommitPath).isDirectory()) {
    fs.rmdirSync(preCommitPath)
  }
  fs.mkdirSync(hooksPath, {recursive: true}) // ensure
  
  // write .git/hooks/pre-commit
  fs.writeFileSync(
    preCommitPath,
    `#!/usr/bin/env bash
if [ -f "${shellFileName}" ];then . "${shellFileName}";fi
`
  )

  // write lint file
  fs.writeFileSync(
    `${targetPath}/${shellFileName}`,
    fs.readFileSync(`${__dirname}/${shellFileName}`)
  )
} catch (error) {
  console.warn('[commit-lint]', error)
}
