// import jwt from 'jsonwebtoken'
// import config1 from '../../config.js'
// import User from '../models/user.model'
//
// // import Day from '../models/day.model'
// // import { getTradesHistory, getOpenOrder, getBalance, getInfo, getData } from '../utils/krakenFunc'
// // mport { decode } from '../utils/enigma'
// // import moment from 'moment'
//
// export default (socket) => {
//   socket.on('updateSocketId', (data, token) => updateSocketId(data, token, socket))
//   // socket.on('infoPerso', (data, token) => infoPerso(data, token, socket))
//   // socket.on('infoPrice', (data, token) => infoPrice(data, token, socket))
//   // socket.on('infoPriceByhour', (data, token) => infoPriceByhour(data, token, socket))
// }
//
// const updateSocketId = (data, token, socket) => {
//   jwt.verify(token, config1.local.jwtSecret, (err, decoded) => {
//     if (err) { return socket.emit('action', { type: 'forbidden', data: {} }) }
//     User.findOneAndUpdate({ _id: decoded._id }, { socketId: socket.id }).then(() => {
//       return 0
//     })
//   })
// }
// TODO IF need a socket integration
