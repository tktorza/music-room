import jwt from 'jsonwebtoken'
import config from '../../config.js'

export function isAdmin (req, res) {
  return new Promise((resolve) => {

    const token = req.headers['x-access-token']
    jwt.verify(token, config.local.jwtSecret, (err, decoded) => {
      if (err || decoded.role > 10) { return res.status(403).send({ message: 'forbindden' }) }
      resolve()
    })
  })
}

export function isSuperAdmin (req, res) {
  return new Promise((resolve) => {

    const token = req.headers['x-access-token']
    jwt.verify(token, config.local.jwtSecret, (err, decoded) => {
      if (err || decoded.role !== 0) { return res.status(403).send({ message: 'forbindden' }) }
      resolve()
    })
  })
}

export function isLogin (req, res) {
  return new Promise((resolve) => {
    const token = req.headers['x-access-token']
    jwt.verify(token, config.local.jwtSecret, (err, decode) => {
      if (err || decode._id !== req.params.id) { return res.status(403).send({ message: 'forbindden' }) }
      resolve()
    })
  })
}
