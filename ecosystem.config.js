/**
 * @type {{apps: [{args: string, env_homolog: {NODE_ENV: string}, name: string, script: string}]}}
 * Arquivo de configuração para PM2 na VPS
 */
module.exports = {
  apps: [
    {
      name: 'socel-ng',
      script: 'npm',
      args: 'build -- --configuration=homolog',
      env_homolog: {
        NODE_ENV: 'homolog',
      },
    },
  ],
};
