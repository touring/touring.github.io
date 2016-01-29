var $ = function(node){
    return document.getElementById(node);
}

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var fontColor = '#fff';
var uploadImage;
var des = '张震岳的酒';
var store = '我是音乐葡萄酒计划';

var qrCodeImage = new Image();
qrCodeImage.src = './yz.png';

$('js-des').onkeyup = function(e){
    des = e.target.value;
    render();
}

$('js-store').onkeyup = function(e){
    store = e.target.value;
    render();
}

// 上传海报
uploadFile($('js-logo'));

function uploadFile(oInput){
    oInput.onchange = function(e){
        var file = oInput.files[0];
        var reader = new FileReader();
        uploadImage = new Image();
        reader.onloadend = function(){
            uploadImage.src = reader.result;
        }
        reader.readAsDataURL(file);
        uploadImage.onload = function(){
            render();
        }
    }
}

function drawBg(image, options) {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

function writeCanvasText(text, x, y, align, fontSize, color){
    ctx.save();
    ctx.font = fontSize +'px normal Arial';
    ctx.fillStyle = color;
    ctx.textBaseline = 'top';
    ctx.textAlign = align;
    ctx.fillText(text, x, y);
    ctx.restore();
}

function render () {
    ctx.save();
    canvas.width = canvas.width;
    drawBg(uploadImage);
    ctx.font = '40px Arial';
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    writeCanvasText(des + '&有赞的口碑好货', 300, 50, 'center', 36, fontColor);
    writeCanvasText('都是良心推荐啊', 300, 100, 'center', 36, fontColor);
    writeCanvasText('我是' + store, 300, 180, 'center', 24, fontColor);
    writeCanvasText('我在 有赞(买家版) 等你', 300, 220, 'center', 24, fontColor);
    ctx.drawImage(qrCodeImage, 0, 621, 600, 279);
    ctx.restore();
}

$('js-download').onclick = function(){
    var dt = canvas.toDataURL('image/png');
    var fileName = $('js-store').value || '海报';
    this.setAttribute('download',  fileName + '.png');
    this.href = dt.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}
