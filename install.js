try {
  const fs = require('fs')

  const targetPath = `${__dirname}`.replace(/[\\/]node_modules.*/, '')
  const hooksPath = `${targetPath}/.git/hooks`
  const preCommitPath = `${hooksPath}/pre-commit`
  const shellFileName = `commit-lint`

  // backup
  if (fs.existsSync(preCommitPath)) {
    fs.writeFileSync(`${preCommitPath}.backup`, fs.readFileSync(preCommitPath))
  }

  // write .git/hooks/pre-commit
  fs.mkdirSync(`${preCommitPath}/..`, {recursive: true}) // ensure
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
