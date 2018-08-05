let instance

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if (instance)
      return instance

    instance = this

    this.bgmAudio = new Audio()
    this.bgmAudio.src = 'audio/get.mp3'
  }

  playBgm() {
    this.bgmAudio.currentTime = 0
    this.bgmAudio.play()
  }
}
