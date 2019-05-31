var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var lineWidth = 5;

// 进入画板自动绘制一个白色的背景
setTimeout(function() {
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
}, 0.1);

autoSetCanvasSize(canvas);

listenToUser(canvas);

var eraserEnabled = false;
eraser.onclick = function() {
  eraserEnabled = true;
  eraser.classList.add("active");
  brush.classList.remove("active");
};
brush.onclick = function() {
  eraserEnabled = false;
  brush.classList.add("active");
  eraser.classList.remove("active");
};
// 清屏
clear.onclick = function() {
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
};
// 保存为图片
save.onclick = function() {
  var url = canvas.toDataURL("image/png");
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.href = url;
  a.download = "我的画儿";
  a.target = "_blank";
  a.click();
};

// 颜色切换
black.onclick = function() {
  context.fillStyle = "#000";
  context.strokeStyle = "#000";

  $("#black").addClass("active");
  $("#black")
    .siblings()
    .removeClass("active");
};
red.onclick = function() {
  context.fillStyle = "#ff1a40";
  context.strokeStyle = "#ff1a40";

  $("#red").addClass("active");
  $("#red")
    .siblings()
    .removeClass("active");
};
green.onclick = function() {
  context.fillStyle = "#2bd965";
  context.strokeStyle = "#2bd965";

  $("#green").addClass("active");
  $("#green")
    .siblings()
    .removeClass("active");
};
blue.onclick = function() {
  context.fillStyle = "#1a8cff";
  context.strokeStyle = "#1a8cff";

  $("#blue").addClass("active");
  $("#blue")
    .siblings()
    .removeClass("active");
};

// 画笔粗细切换
thin.onclick = function() {
  lineWidth = 6;
  $("#thin").addClass("active");
  $("#thin")
    .siblings()
    .removeClass("active");
};
mid.onclick = function() {
  lineWidth = 9;
  $("#mid").addClass("active");
  $("#mid")
    .siblings()
    .removeClass("active");
};
thick.onclick = function() {
  lineWidth = 12;
  $("#thick").addClass("active");
  $("#thick")
    .siblings()
    .removeClass("active");
};

/******/
// 画板自适应大小
function autoSetCanvasSize(canvas) {
  setCanvasSize();
  // 监听页面大小改变
  window.onresize = function() {
    setCanvasSize();
  };

}

function setCanvasSize() {
  // 获取页面宽高，并赋值给canvas  ；获取宽高方式不止一种
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;

  canvas.width = pageWidth;
  canvas.height = pageHeight;
}
// 画圆点
function drawCircle(x, y, radius) {
  context.beginPath();
  // context.fillStyle = 'black'
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}
// 画线
function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  // context.strokeStyle = 'black'
  context.moveTo(x1, y1); // 起点
  context.lineWidth = lineWidth;
  context.lineCap = "round"; //线段末端以圆形结束，默认是方形(butt)
  context.lineJoin = "round"; //相连部分如何连接在一起
  context.lineTo(x2, y2); // 终点
  context.stroke();
  context.closePath();
}
// 监听用户操作  鼠标点击和屏幕触摸两种情况
function listenToUser(canvas) {
  var using = false;
  var lastPoint = {
    x: undefined,
    y: undefined
  };

  //特性检测
  if (document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = function(event) {
      console.log(event);
      var x = event.touches[0].clientX;
      var y = event.touches[0].clientY;
      console.log(x, y);
      using = true;
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10);
      } else {
        lastPoint = {
          x: x,
          y: y
        };
      }
    };
    canvas.ontouchmove = function(event) {
      var x = event.touches[0].clientX;
      var y = event.touches[0].clientY;

      if (!using) {
        return;
      }

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10);
      } else {
        var newPoint = {
          x: x,
          y: y
        };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };
    canvas.ontouchend = function(event) {
      using = false;
    };
  } else {
    //非触屏设备
    canvas.onmousedown = function(event) {
      var x = event.clientX;
      var y = event.clientY;
      using = true;
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 15, 15);
      } else {
        lastPoint = {
          x: x,
          y: y
        };
      }
    };
    canvas.onmousemove = function(event) {
      var x = event.clientX;
      var y = event.clientY;

      if (!using) {
        return;
      }

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 15, 15);
      } else {
        var newPoint = {
          x: x,
          y: y
        };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };
    canvas.onmouseup = function(event) {
      using = false;
    };
  }
}
