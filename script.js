const { exec } = require('child_process');
exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
  if (err) {
    throw err;
  }

  const branchName = stdout.trim();
  console.log({ branchName })
});