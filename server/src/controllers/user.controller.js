import filter from 'filter-object'
import User from '../models/user.model'
import { generateToken } from '../utils/token'
import bcrypt from 'bcryptjs'
import { send } from '../utils/sendEmail.js'
import md5 from 'js-md5'
import FB from 'fb'

const createParams = '{email,password,firstName,lastName,url,bio}'
const createParamsFacebook = '{access_token}'

const updateParamsPublic = '{firstName,lastName,tags,musicTags,isPrivateInfo}'

const updateParamsPrivate = '{newPassword,email}'

const DZ = require('node-deezer')
const deezer = new DZ()

const createCode = () => {
  let str = ''
  for (let i = 0; i < 6; i++) {
    str += Math.floor(Math.random() * Math.floor(10))
  }
  return str
}

export default class UserController {

  static test (req, res) {
    console.log(req.query)

    deezer.createSession('275462', '49ab00dbfafa0d19b44c21f95261f61a', req.query.code || 'frf633f3ffdefe016973fd48ebff7f44', (err, result) => {
      console.log('err', err)
      console.log('result1', result)
      // res.json({ msg:'hello', access_token: result.accessToken })
      res.send('<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id=30595446" width="700" height="240"></iframe>')

    })

  }
  static facebookCreate (req, res) {
    const params = filter(req.body, createParamsFacebook)
    console.log(req.body.access_token)
    FB.setAccessToken(req.body.access_token.toString())
    FB.api('me', { fields: 'id,name,email,first_name,last_name', access_token: req.body.access_token.toString() }, ((fbRes) => {
      console.log(fbRes.email)
      User.findOne({ email: fbRes.email }).then(u => {
        if (u) {
          console.log('ici')
          if (u.isFaceBookLogin === true) {
            const token = generateToken(u)
            return res.json({ token })
          } return res.status(403).send({ message: 'What the fuck are you doing ?' })
        }
        const user = new User({
          email: fbRes.email,
          isActive: true,
          url: fbRes.url,
          firstName: fbRes.first_name,
          lastName: fbRes.last_name,
          isEmailVerified: true,
          isFaceBookLogin: true,
        })

        user.save(err => {
          if (err) { return res.status(500).send({ message: 'internal serveur error' }) }
          const token = generateToken(user)
          return res.json({ token })
        })

      }).catch((e) => {
        return res.status(500).send({ message: 'Internal serveur error' })
      })
    }))

  }

  static create (req, res) {

    const params = filter(req.body, createParams)

    if (!params || !params.email || !params.password || !params.firstName || !params.lastName) { return res.status(401).send({ message: 'Messing parameters' }) }

    User.findOne({ email: params.email }).then(u => {
      if (u) { return res.status(400).send({ message: 'An account already exist with this e-mail.' }) }

      const email = params.email
      const tokenStr = createCode()
      console.log(tokenStr)
      send('no-reply@musiroom.com', email, 'Account validation:', { code: tokenStr, name: params.firstName })

      const user = new User({
        email: params.email,
        isActive: false,
        url: params.url,
        firstName: params.firstName,
        lastName: params.lastName,
        bio: params.bio,
        isFaceBookLogin: false,
        isEmailVerified: false,
        isEmailVerifiedToken: tokenStr,
      })
      user.generateHash(params.password)
      user.save(err => {
        if (err) { return res.status(500).send({ message: 'internal serveur error' }) }
        const token = generateToken(user)
        return res.json({ token })
      }) /* istanbul ignore next */
    }).catch(e => {
      console.log(e)
      return res.status(500).send({ message: 'Internal serveur error' })
    })
  }

  static getMe (req, res) {
    const psw = req.headers['x-pass']
    User.findOne({ email: req.params.email }).then(user => {

      if (!user) { return res.status(404).send({ message: 'We did not find your account' }) }
      if (psw && !user.validPassword(psw)) { return res.status(403).send({ message: 'Wrong password' }) }
      //  if (!user.isEmailVerified) { return res.status(403).send({ message: 'Plz verifie your email first' }) }
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

  static updatePrivate (req, res) {

    const params = filter(req.body, updateParamsPrivate)
    const paramsToUpdate = {}
    User.findOne({ email: params.email }).then((uTmp) => {

      if (uTmp) { return res.status(401).send({ message: 'This is email is used' }) }

      if (params.newPassword) { paramsToUpdate.password = bcrypt.hashSync(params.newPassword, 10) }
      if (params.email) { paramsToUpdate.email = params.email }
      User.findOneAndUpdate({ _id: req.params.id }, { $set: paramsToUpdate }, { new: true }).then((user) => {
        const token = generateToken(user)
        return res.json({ message: 'Private information was successfully updated', token })
      })
      /* istanbul ignore next */
    }).catch(() => { return res.status(500).send({ message: 'Internal Server Error' }) })
  }

  static verifyEmail (req, res) {

    if (!req.params.email || !req.params.code) { return res.status(403).json({ message: 'This is not a valid account, or was previously update' }) }

    const email = req.params.email.trim()
    const code = req.params.code

    User.findOneAndUpdate({ email, isEmailVerifiedToken: code },
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

  static resetPassword (req, res) {

    User.findOne({ email: req.params.email }).then(u => {

      if (!u) { return res.status(404).send({ message: 'No account whit this email' }) }

      const email = req.params.email
      const tokenStr = createCode()
      send('no-reply@musiroom.com', email, 'Reset password:', { code: tokenStr, name: u.firstName })
      User.findOneAndUpdate({ email }, { $set: { isPassWordReset: true, passwordResetCode: tokenStr } }).then(ut => {
        res.json({ message: 'email send' })
      })

    })
  }
  static resetVerefiPassword (req, res) {
    if (!req.params.email || !req.params.code || !req.params.email) { return res.status(403).json({ message: 'This is not a valid account, or was previously update' }) }

    const email = req.params.email.trim()
    const code = req.params.code

    User.findOneAndUpdate({ email, passwordResetCode: code, isPassWordReset: true },
      {
        isPassWordReset: false,
        passwordResetCode: null,
        password: bcrypt.hashSync(req.params.newPassword, 10),
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
