module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  shipit.initConfig({
    default: {
      key: '/Users/fhenri/music-room42.pem',
      workspace: '/tmp/deploy',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      deleteOnRollback: false,
      shallowClone: true
    },
    productionBack: {
      servers:  'ubuntu@ec2-54-93-252-146.eu-central-1.compute.amazonaws.com',
      repositoryUrl: 'https://github.com/fhenri42/music-room.git',
      deployTo: '/home/ubuntu/deploy',
      branch: 'master'
    },
  })
  shipit.task('startBack', (() => {
    shipit.remote('pm2 stop server').then(stop => {
      console.log(stop[0].stdout)
      shipit.remote('cd /home/ubuntu/deploy/current/server && npm install && npm run build').then(npm => {
        console.log(npm[0].stdout)
        shipit.remote('pm2 start yarn -- start && pm2 delete server && pm2 restart yarn --name server').then(start => {
          console.log(start[0].stdout)
      })
    })
  })
}))

}
