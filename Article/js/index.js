.let makeTempImg = () => {
    let img = document.createElement('img');
    img.classList.add('tempImg');
    document.querySelector('.imgHolder').appendChild(img);
    return img;
};

let crossFader = (main, newSrc) => {
    let temp = document.querySelector('.tempImg') || makeTempImg();
    temp.src = main.src;

    main.setAttribute(`src`, newSrc);
    main.classList.add('active');
};

let thumbClickHandler = (e) => {
    let main = document.getElementById(`mainImg`);
    main.classList.remove('active');
    setTimeout(() => {
        crossFader(main, e.target.src);
    }, 500);
};

let thumbs = document.querySelectorAll(`.thumbnails`);

[...thumbs].forEach((elem) => {
    elem.addEventListener(`click`, thumbClickHandler);
});
