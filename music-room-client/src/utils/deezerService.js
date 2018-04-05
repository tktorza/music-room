
import { NativeModules } from 'react-native'

const DeezerManager = NativeModules.DeezerManager

export function connectDeezer() {
  return new Promise((resolve, reject) => {
    DeezerManager.connect((decision) => { decision ? resolve(decision) : reject(decision) })
  })
}

export function checkSession() { DeezerManager.isSessionValid(cb) }

export function playTrack(id) {
  return new Promise((resolve, reject) => {
    DeezerManager.playTrack(id).then(res => {
      console.log('playTrack=>',res);
      resolve(res)
    })
  })
}

export function getPlaylistTracks(id) {
  return new Promise((resolve, reject) => {
    DeezerManager.getPlaylistTracks(id).then(res => {
      resolve(res)
    })
  })
}

export function getFavoritesTracks() {
  return new Promise((resolve, reject) => {
  DeezerManager.getFavoritesTracks().then(res => {
      resolve(res)
    })
  })
}

export function getPlaylists() {
  return new Promise((resolve, reject) => {
     DeezerManager.getPlaylists().then(res => {
      resolve(res)
    })
  })
}

export function pause() { DeezerManager.pause() }

export function play() { DeezerManager.play() }
