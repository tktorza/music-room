import PlaylistController from '../controllers/playlist.controller'
import { isLogin } from './validators'

export default [

  /**
  * @api {Post} /playlist/create Create a new playList
  * @apiName PlaylistController
  * @apiGroup Create
  *
  * @apiDescription Create a new playList
  *
  * @apiParam {String} name  name
  * @apiParam {String} description  description
  * @apiParam {Number} type  type
  * @apiParam {Array} users  users
  * @apiParam {Array} songs  songs
  *
  * @apiSuccess {Object} Playlist information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 400 email is invalid) {String} message Return if name is already in use
  *
  */

  {
    method: 'POST',
    path: '/playlist/create',
    handler: PlaylistController.create,
    validator: [isLogin],
  },

  /**
  * @api {Get} /playlist/all/:userId get a playList
  * @apiName PlaylistController
  * @apiGroup getPlaylistByName
  *
  * @apiDescription get all the playList
  *
  * @apiParam {String} userId  userId
  *
  * @apiSuccess {Object} Playlist information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 403 userId is invalid) {String} message Return if user are not allowed to access this playList
  *
  */

  {
    method: 'GET',
    path: '/playlist/all/:userId',
    handler: PlaylistController.getPlaylistAll,
    validator: [isLogin],
  },

  /**
  * @api {Get} /playlist/:name/:userId get a playList
  * @apiName PlaylistController
  * @apiGroup getPlaylistByName
  *
  * @apiDescription get a playList by name
  *
  * @apiParam {String} name  name
  * @apiParam {String} userId  userId
  *
  * @apiSuccess {Object} Playlist information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 403 userId is invalid) {String} message Return if user are not allowed to access this playList
  *
  */

  {
    method: 'GET',
    path: '/playlist/:name/:userId',
    handler: PlaylistController.getPlaylistByName,
    validator: [isLogin],
  },

  /**
  * @api {Post} /playlist/update/:name/:userId  update a user
  * @apiName PlaylistController
  * @apiGroup updatePublic
  *
  * @apiDescription update the information of a playlist
  *
  * @apiParam {String} description  description
  * @apiParam {String} type  type
  * @apiParam {String} users  users
  * @apiParam {String} songs  songs
  *
  * @apiSuccess {Object} Playlist information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 403 userId is invalid) {String} message Return if user are not allowed to access this playList
  *
  */

  {
    method: 'POST',
    path: '/playlist/update/:playListId/:userId',
    handler: PlaylistController.updatePublic,
    validator: [isLogin],
  },

  /**
nIqUE LA DocC
**/
  {
    method: 'POST',
    path: '/playlist/updatePrivate/:playListId/:userId',
    handler: PlaylistController.updatePrivate,
    validator: [isLogin],
  },
  {
    method: 'PUT',
    path: '/playlist/update/:playListId/:userId/:newId/:songName',
    handler: PlaylistController.addMusicToList,
    validator: [isLogin],
  },

  {
    method: 'PUT',
    path: '/playlist/delete/user/:playListId/:userId/:userIdToDelete',
    handler: PlaylistController.deleteUser,
    validator: [isLogin],
  },
]
