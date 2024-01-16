const image = document.querySelector("#image");
const brightnessInput = document.querySelector("#brightness");
const contrastInput = document.querySelector("#contrast");
const link = document.querySelector("#img");
image.src = link.value;

function updateImage() {
    const brightness = brightnessInput.value;
    const contrast = contrastInput.value;

    // Tăng sáng tối
    image.style.filter = `brightness(${brightness / 100})`;

    // Tăng tương phản
    image.style.filter += `contrast(${contrast / 100})`;
}

// Hàm debounce để giảm số lần gọi hàm updateImage
function debounce(func, delay) {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
    };
}

async function getData() {
    try {
        //var a = await fetch("https://bsgdtphcm.vn/xquang/viewopen.php");
	var a= await fetch("https://bsgdtphcm.vn/xquang/viewopen.php", {
  "headers": {
    "accept": "*/*",
    "accept-language": "vi,en;q=0.9,en-US;q=0.8,fr;q=0.7",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Microsoft Edge\";v=\"121\", \"Chromium\";v=\"121\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://bsgdtphcm.vn/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});
        var b = await a.text();
        var parser = new DOMParser();
        var doc = parser.parseFromString(b, "text/html");
        var img = doc.querySelectorAll("body img");
        image.src = img[3].src;
	link.value = img[3].src;
        console.log(img[3].src);
        var label = doc.querySelectorAll("body label");
        console.log(label[0].innerText);
        var page = doc.querySelectorAll("body p");
        console.log(page[0].innerText);
        const div = document.querySelector("#container");
        if(page[0].innerText) {
		div.innerHTML = label[0].innerText + "<br/>" + page[0].innerText;
	}
	await getImg();
    } catch (error) {
        alert("Có lỗi!");
	getData();
    }
}

function loading(e = 0) {
    document.getElementById("loading").innerHTML = e ? `
	<div class="loading-container">
        <div class="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>` : ''
}
function getImg(){
	const imgs = document.querySelector("img");
if (!imgs.src) {
  fetch(imgs.alt).then((response) => {
    const blob = response.blob();
    imgs.src = URL.createObjectURL(blob);
    console.log("load img!")
  });
}
}
// Tự động chạy khi trang web tải xong
updateImage();

brightnessInput.addEventListener("input", debounce(updateImage, 50));
contrastInput.addEventListener("input", debounce(updateImage, 50));
image.oncontextmenu = () => {
    //return false;
};
document.querySelector("#load").addEventListener("click", async () => {
    image.src = link.value;
    await getImg();
});
document.querySelector("#get").addEventListener("click", async () => {
    loading(!0)
    await getData();
    loading(0)
});

