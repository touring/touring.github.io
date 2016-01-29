var $ = function(node){
    return document.getElementById(node);
}

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var fontColor = '#fff';
var uploadImage;
var des = 'xxx的xx产品';
var store = 'xxx店铺';

var qrCodeImage = new Image();
qrCodeImage.src = './yz.png';

var defaultFont = new Image();
defaultFont.src = './font.ttf';

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

function writeCanvasText(text, x, y, align, fontSize, font, color){
    ctx.save();
    ctx.font = fontSize +'px ' + font;
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
    writeCanvasText(des + ' & 有赞的口碑好货', 300, 50, 'center', 40, 'myFont Arial', fontColor);
    writeCanvasText('都是良心推荐啊', 300, 100, 'center', 40, 'myFont Arial',fontColor);
    writeCanvasText('我是' + store, 300, 180, 'center', 24, 'Arial', fontColor);
    writeCanvasText('我在 有赞(买家版) 等你', 300, 220, 'center', 24, 'Arial', fontColor);
    ctx.drawImage(qrCodeImage, 0, 621, 600, 279);
    ctx.restore();
}

$('js-download').onclick = function(){
    var dt = canvas.toDataURL('image/png');
    var fileName = $('js-store').value || '海报';
    this.setAttribute('download',  fileName + '.png');
    this.href = dt.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}
