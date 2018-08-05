const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 游戏网格绘制起始坐标
const START_X = screenWidth * 0.2 / 2

export default class User {
  constructor(ctx) {
    this.drawAvatar(ctx)
  }

  drawAvatar(ctx) {
    wx.getUserInfo({      
      success: (res) => {
        this.userInfo = res.userInfo; 
        this.draw(res.userInfo, ctx)       
      }
    })    
  }

  draw(userInfo, ctx) {
    console.log(userInfo)
    let img = wx.createImage()
    img.src = userInfo.avatarUrl
    img.onload = () => {
      ctx.drawImage(img, START_X, 30, 80, 80);
    }
    // 绘制姓名
    // ctx.beginPath();
    ctx.fillStyle = "#776e65";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle"
    ctx.font = "20px Arial bold";
    ctx.fillText(userInfo.nickName, START_X + 90, 40);
    // ctx.closePath();
  }

  update(ctx) {
    console.log(this.userInfo)
    this.draw(this.userInfo, ctx)
  }
}