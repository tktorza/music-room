import filter from 'filter-object'
import Playlist from '../models/playlist.model'

const createParams = '{name,description,type,users,songs}'

export default class PlaylistController {

  static create (req, res) {

    const params = filter(req.body, createParams)

    if (!params || !params.name) { return res.status(401).send({ message: 'Messing parameters.' }) }

    Playlist.findOne({ name }).then(u => {
      if (u) { return res.status(400).send({ message: 'An playList already exist with this name.' }) }

      const playList = new Playlist({
        name: params.email,
        description: params.description,
        type: params.type,
        users: params.users,
        songs: params.songs,
      })

      playList.save(err => {
        if (err) { return res.status(500).send({ message: 'internal serveur error' }) }
        return res.json({ message: 'Your playList', playList })
      })
    }).catch(() => {
      return res.status(500).send({ message: 'Internal serveur error' })
    })
  }

  static getPlaylistByName (req, res) {

    Playlist.findOne({ name: req.params.name }).then(playList => {
      if (playList.type === 0) {
        let test = false
        playList.users.forEach(u => {
          if (u.id === req.params.userId) {
            test = true
          }
        })
        if (!test) { return res.status(403).send({ message: 'You are not allowed to access this playList' }) }

      }
      return res.json({ message: 'Your playList', playList }) /* istanbul ignore next */
    }).catch(() => {
      return res.status(500).send({ message: 'Internal serveur error' })
    })
  }

  static updatePublic (req, res) {
    const params = filter(req.body, updateParamsPublic)

    Playlist.findOne({ name: req.params.name }).then(playList => {

      let test = false
      playList.users.forEach(u => {
        if (u.id === req.params.userId && u.role === 0) {
          test = true
        }
      })
      if (!test) { return res.status(403).send({ message: 'You are not allowed to access this playList' }) }

      Playlist.findOneAndUpdate({ name: req.params.name }, { $set: params }, { new: true }).then(playList => {
        return res.json({ message: 'Your playList', playList })
      }).catch(() => {
        return res.status(500).send({ message: 'Internal serveur error' })
      })
    })
  }
}
