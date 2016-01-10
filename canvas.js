CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {
    var lines = text.split("\n");
    for (var i = 0; i < lines.length; i++) {
        var words = lines[i].split(' ');
        var line = '';

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = this.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                this.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }

        this.fillText(line, x, y);
        y += lineHeight;
    }
};

var $ = function(node){
    return document.getElementById(node);
}

var canvasMap = document.getElementById('myCanvas');
var ctx = canvasMap.getContext('2d');
var fontColor = '#403e3f';


// 矩形
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, 640, 900);

function writeCanvasText(text, x, y, align, fontSize, color){
    ctx.font = fontSize +'px "Microsoft Yahei" Arial';
    ctx.fillStyle = color;
    ctx.textBaseline = 'top';
    ctx.textAlign = align;
    ctx.fillText(text, x, y);
}

// 日期
writeCanvasText('2015/1/11', 50, 35, 'left', 24, fontColor);
$('js-date').onkeyup = function(e){
    var date = e.target.value;
    ctx.clearRect(0,0,640,80);
    ctx.fillStyle="#fff";
    ctx.fillRect(0,0,640,80);
    writeCanvasText(date, 50, 35, 'left', 24, fontColor);
}


// 数据
writeCanvasText('48297+', 320, 90, 'center', 90, '#e03c00');
$('js-data').onkeyup = function(e){
    var data = e.target.value;
    ctx.clearRect(0,90,640,120);
    ctx.fillStyle="#fff";
    ctx.fillRect(0,90,640,120);
    writeCanvasText(data, 320, 90, 'center', 90, '#e03c00');
}



// 说明
var  des = '从此不再起早贪黑挤市场抢货，打开有赞批发，你所熟悉的\n' + 
           '店铺和商家都在这里啊。有赞批发，有你有赞！有赞批发！\n' +
           '从此不再起早贪黑挤市啊场抢货，打开有赞批发，你熟悉的\n' + 
           '店铺和商家都在这里啊。有赞批发，有你有赞！有赞批发！\n';
ctx.font = '20px Arial';
ctx.fillStyle = fontColor;
ctx.textAlign = 'left';
ctx.wrapText(des, 60, 210, 520, 36);

$('js-des').onkeyup = function(e){
    var des = e.target.value;
    ctx.clearRect(0,200,640,160);
    ctx.fillStyle="#fff";
    ctx.fillRect(0,200,640,160);
    ctx.font = '20px Arial';
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'left';
    ctx.wrapText(des, 60, 210, 520, 36);
}

// 二维码
var qrCodeImage = new Image();
qrCodeImage.src = './code.png';
qrCodeImage.onload = function(){
    ctx.drawImage(qrCodeImage, 190, 350, 260, 260);
}

uploadFile($('js-qrcode'), {x: 190, y:350, width:260, height:260}, false);

uploadFile($('js-logo'), {}, true);

// Shop avatar
var shopAvatarImage = new Image();
shopAvatarImage.src = './avatar.jpg';
shopAvatarImage.onload = function(){
    
    var tempCanvas = document.createElement("canvas"),
        tCtx = tempCanvas.getContext("2d");

    tempCanvas.width = 640;
    tempCanvas.height = 900;

    tCtx.drawImage(shopAvatarImage, 395, 610, 240, 240);

    var pattern = ctx.createPattern(tempCanvas, 'no-repeat');
    ctx.arc(515, 730, 110, 0, 2 * Math.PI);
    ctx.fillStyle = pattern;
    ctx.fill(); 

}


// 扫一扫
writeCanvasText('微信扫一扫 或', 320, 615, 'center', 14, fontColor);
// 文案
writeCanvasText('长按图片识别图中二维码访问店铺', 320, 640, 'center', 14, fontColor);



function uploadFile(oInput, options, isArc){
    oInput.onchange = function(e){
        var file = oInput.files[0];
        var reader = new FileReader();
        var uploadImage = new Image();
        reader.onloadend = function(){
            uploadImage.src = reader.result;
        }
        reader.readAsDataURL(file);
        uploadImage.onload = function(){
            if(isArc){
                var tempCanvas = document.createElement("canvas"),
                    tCtx = tempCanvas.getContext("2d");

                tempCanvas.width = 640;
                tempCanvas.height = 900;

                tCtx.drawImage(uploadImage, 395, 610, 240, 240);

                var pattern = ctx.createPattern(tempCanvas, 'no-repeat');
                ctx.arc(515, 730, 110, 0, 2 * Math.PI);
                ctx.fillStyle = pattern;
                ctx.fill(); 

            } else {
                coverImage(uploadImage, options);
            }
        }
    }
}

function coverImage(image, options) {
    ctx.drawImage(image, options.x, options.y, options.width, options.height);
}

$('js-download').onclick = function(){
    var dt = canvasMap.toDataURL('image/png');
    var fileName = $('js-date').value || '简报';
    this.setAttribute('download',  fileName + '.png');
    this.href = dt.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}



   
// -----------------------
writeCanvasText('--------------------', 40, 720, 'left', 30, fontColor);

var jianbaoImg = new Image();
jianbaoImg.src = './jianbao.png';
jianbaoImg.onload = function(){
    coverImage(jianbaoImg, {x:40, y:750, width:180, height:95})
}

writeCanvasText('他们做得不错', 230, 810, 'left', 26, fontColor);

writeCanvasText('数据来源：有赞批发商户提供，数据真实无水分，上榜商家奖励10个积分。', 50, 860, 'left', 15, fontColor);
