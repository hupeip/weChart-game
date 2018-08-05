import BackGround from './runtime/background'
import GameManager from './runtime/gamemanager.js'
import Music from './runtime/music'
import User from './runtime/user'
// canvas 对象
let ctx = canvas.getContext('2d')

const width = window.innerWidth  // 屏幕的宽
const height = window.innerHeight  // 屏幕的高
const ratio = 1
const W = width * 0.8

// 滑块矩阵数量(4x4)
const SIZE = 4

export default class Main {
  constructor() {
    this.restart()

    this.initEvent()
  }

  restart() {
    if (this.user == null) {
      this.user = new User(ctx);
    } else {
      console.log('dsaadsa')
      this.user.update(ctx);
    }
    if (this.bg == null) {
      this.bg = new BackGround(ctx);
    } else {
      this.bg.update(ctx);
    }
    if (this.gamemanager == null) {
      this.gamemanager = new GameManager(ctx, SIZE);
    } else {
      this.gamemanager.restart(ctx);
    }

  }

  update() {
    this.bg.update(ctx);
    this.gamemanager.update(ctx);
    this.user.update(ctx);
  }

  initEvent() {
    this.music = new Music()
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.music.playBgm()
      this.x0 = e.touches[0].clientX / ratio;
      this.y0 = e.touches[0].clientY / ratio;
      return false;
    });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
    });
    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      var X = e.changedTouches[0].clientX / ratio;
      var Y = e.changedTouches[0].clientY / ratio;
      var addX = X - this.x0;
      var addY = Y - this.y0;
      var percent = Math.abs(addX) / Math.abs(addY) >= 1 ? true : false;
      if (Math.abs(addX) < W / 50 && Math.abs(addY) < W / 50) {
        return;
      };
      let isGameTerminated = true;
      if (- addX > W / 50 && percent) {
        this.update();
        ctx.save();
        this.gamemanager.left();
        isGameTerminated = this.gamemanager.addnum(ctx);
        ctx.restore();
        console.log(addX, addY, "向左")
      } else if (addX > W / 50 && percent) {
        this.update();
        ctx.save();
        this.gamemanager.right();
        isGameTerminated = this.gamemanager.addnum(ctx);
        ctx.restore();
        console.log(addX, addY, "向右")
      } else if (- addY > W / 50 && !percent) {
        this.update();
        ctx.save();
        this.gamemanager.up();
        isGameTerminated = this.gamemanager.addnum(ctx);
        ctx.restore();
        console.log(addX, addY, "向上")
      } else if (addY > W / 50 && !percent) {
        this.update();
        ctx.save();
        this.gamemanager.down();
        isGameTerminated = this.gamemanager.addnum(ctx);
        ctx.restore();
        console.log(addX, addY, "向下")
      }
      if (isGameTerminated) {
        wx.showModal({
          title: '温馨提示',
          content: 'game over!',
          showCancel: true,
          cancelText: '下次再战',
          confirmText: '再来一局',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              this.restart();
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }.bind(this),
          fail: function (res) { console.log('用户点击fail'); },
          complete: function (res) { console.log('用户点击complete'); },
        });
      }
      console.table(this.gamemanager.board);
    });
  }
}