import filter from 'filter-object'
import User from '../models/user.model'
import { generateToken } from '../utils/token'
import bcrypt from 'bcryptjs'
// import { send } from '../utils/sendEmail.js'
import md5 from 'js-md5'

const createParams = '{email,password,firstName,lastName,url,bio}'

const updateParamsPublic = '{firstName,lastName,url,bio,email}'

const updateParamsPrivate = '{password,newPassword}'


var DZ = require('node-deezer');
var deezer = new DZ();


export default class UserController {

static test(req, res) {
  console.log(req.query);

  deezer.createSession('275462', '49ab00dbfafa0d19b44c21f95261f61a', req.query.code || 'frf633f3ffdefe016973fd48ebff7f44', function (err, result) {
    console.log('err',err);
    console.log('result1',result);
  //res.json({ msg:'hello', access_token: result.accessToken })
  res.send('<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id=30595446" width="700" height="240"></iframe>')


  })

}
  static create (req, res) {

    const params = filter(req.body, createParams)

    if (!params || !params.email || !params.password || !params.firstName || !params.lastName) { return res.status(401).send({ message: 'Messing parameters' }) }

    User.findOne({ email: params.email }).then(u => {
      if (u) { return res.status(400).send({ message: 'An account already exist with this e-mail.' }) }

      const email = params.email
      const tokenMd5 = md5(email.toString().split('').reverse().join(''))
      // send('no-reply@gringox.com', email, 'Account validation:', { url: `${req.headers.origin}/verifyAccount?email=${email}&token=${tokenMd5}`, name: params.firstName })

      const user = new User({
        email: params.email,
        role: 20,
        isActive: false,
        url: params.url,
        firstName: params.firstName,
        lastName: params.lastName,
        bio: params.bio,
        isEmailVerified: false,
        isEmailVerifiedToken: tokenMd5,
      })
      user.generateHash(params.password)
      user.save(err => {
        if (err) { return res.status(500).send({ message: 'internal serveur error' }) }
        const token = generateToken(user)
        return res.json({ token })
      }) /* istanbul ignore next */
    }).catch(() => {
      return res.status(500).send({ message: 'Internal serveur error' })
    })
  }

  static getMe (req, res) {
    const psw = req.headers['x-pass']
    User.findOne({ email: req.params.email }).then(user => {

      if (!user) { return res.status(404).send({ message: 'We did not find your account' }) }
      if (psw && !user.validPassword(psw)) { return res.status(403).send({ message: 'Wrong password' }) }
      if (!user.isEmailVerified) { return res.status(403).send({ message: 'Plz verifie your email first' }) }
      //  if (!user.isActive) { return res.status(403).send({ message: 'account not acctivate' }) }
      const token = generateToken(user)
      return res.json({ token }) /* istanbul ignore next */
    }).catch(() => {
      return res.status(500).send({ message: 'Internal serveur error' })
    })
  }

  static updatePublic (req, res) {
    const params = filter(req.body, updateParamsPublic)
    if (params.email) {
      User.findOne({ email: params.email }).then(u => {
        if (u) { return res.status(401).send({ message: 'This email is already use' }) }
        User.findOneAndUpdate({ _id: req.params.id }, { $set: params }, { new: true }).then(user => {
          if (!user) { return res.status(404).send({ message: 'We did not find any User' }) }
          const token = generateToken(user)
          return res.json({ token }) /* istanbul ignore next */
        }).catch(() => {
          return res.status(500).send({ message: 'Internal serveur error' })
        })
      })

    } else {
      User.findOneAndUpdate({ _id: req.params.id }, { $set: params }, { new: true }).then(user => {
        if (!user) { return res.status(404).send({ message: 'We did not find any User' }) }
        const token = generateToken(user)
        return res.json({ token }) /* istanbul ignore next */
      }).catch(() => {
        return res.status(500).send({ message: 'Internal serveur error' })
      })
    }
  }

  static updatePrivatePassword (req, res) {

    const params = filter(req.body, updateParamsPrivate)
    const paramsToUpdate = {}
    User.findOne({ _id: req.params.id }).then((uTmp) => {

      if (!uTmp.validPassword(params.password)) { return res.status(403).send({ message: 'Wrong password' }) }

      if (params.newPassword) { paramsToUpdate.password = bcrypt.hashSync(params.newPassword, 10) }
      User.findOneAndUpdate({ _id: req.params.id }, { $set: paramsToUpdate }, { new: true }).then((user) => {
        const token = generateToken(user)
        return res.json({ message: 'Private information was successfully updated', token })
      })
      /* istanbul ignore next */
    }).catch(() => {
      return res.status(500).send({ message: 'Internal Server Error' })
    })
  }

  static verifyEmail (req, res) {

    if (!req.body.email || !req.body.token) { return res.status(403).json({ message: 'This is not a valid account, or was previously update' }) }

    const email = req.body.email.trim()
    const token = req.body.token

    User.findOneAndUpdate({ email, isEmailVerifiedToken: token },
      {
        isEmailVerified: true,
        isEmailVerifiedToken: null,
      }, { new: true })
      .then(docUser => {
        if (!docUser) {
          res.status(403).json({
            message: 'This is not a valid account, or was previously updated',
          })
        } else {
          res.json({
            message: 'Your account was successfully verified, you will be redirect',
            token: generateToken(docUser),
          })
        }
      }).catch(() => { return res.status(500).send({ message: 'Internal serveur error' }) })
  }

}
