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
        var a = await fetch("https://bsgdtphcm.vn/xquang/viewopen.php");
        var b = await a.text();
        var parser = new DOMParser();
        var doc = parser.parseFromString(b, "text/html");
        var img = doc.querySelectorAll("body img");
        image.src = img[3].src;
        //console.log(image[3]);
        var label = doc.querySelectorAll("body label");
        console.log(label[0]);
        var page = doc.querySelectorAll("body p");
        console.log(page[0]);
        const div = document.querySelector("#container");
        div.innerHTML = label[0].innerText + "<br/>" + page[0].innerText;
    } catch (error) {
        alert("Có lỗi!");
    }
}

// Tự động chạy khi trang web tải xong
updateImage();

brightnessInput.addEventListener("input", debounce(updateImage, 50));
contrastInput.addEventListener("input", debounce(updateImage, 50));
image.oncontextmenu = () => {
    return false;
};
document.querySelector("#load").addEventListener("click", () => {
    image.src = link.value;
});
document.querySelector("#get").addEventListener("click", () => {
    getData();
});
