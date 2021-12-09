try {
  const fs = require('fs')

  const targetPath = `${__dirname}`.replace(/[\\/]node_modules.*/, '')
  const preCommitPath = `${targetPath}/.git/hooks/pre-commit`
  const outputFileName = `commit-lint`

  // backup
  if (fs.existsSync(preCommitPath)) {
    fs.writeFileSync(`${preCommitPath}.backup`, fs.readFileSync(preCommitPath))
  }

  // write .git/hooks/pre-commit
  fs.writeFileSync(
    preCommitPath,
    `#!/usr/bin/env bash
if [ -f "${outputFileName}" ];then . "${outputFileName}";fi
`
  )

  // write lint file
  fs.writeFileSync(
    `${targetPath}/${outputFileName}`,
    fs.readFileSync(`${__dirname}/commit-lint`)
  )
} catch (error) {
  console.warn('[commit-lint]', error)
}
