let getScreenSize = () => {
  console.log(`Getting screen size.`);
   if (window.innerWidth <= 425) {
     buildScreen(1);
   } else if(window.innerWidth > 425 && window.innerWidth <= 768) {
     buildScreen(2);
   } else if(window.innerWidth > 768 && window.innerWidth <= 2560){
     buildScreen(3);
   }
}

let buildScreen = (numb) => {
  console.log(`Building screen.`);
  let sectors = [];
  let theGrid = document.getElementById(`theGrid`);

  for (let i = 0; i < numb; i++) {
    sectors.push(document.createElement('section'));
    sectors[i].className = `sector${i} sectors`;
    theGrid.append(sectors[i]);
  }

  var loadBtn = document.createElement(`button`);
  loadBtn.innerHTML = `Load More`;
  loadBtn.id = `load`;
  document.getElementById(`theSystem`).appendChild(loadBtn);
  loadBtn.addEventListener(`click`, loadMore);

  getTiles((data) => {
    let tiles = [];
    data.tiles.forEach(tileData => {
      console.log(`Building Tiles`);
      tiles.push(buildTile(tileData));
    });
    buildSectors(sectors, tiles);
  });
}

let getTiles = (callback) => {
  console.log(`Getting tile data.`);
  let request = new XMLHttpRequest();
  request.open(`GET`, `./js/masonry-data.json`, true);
  request.send(null);
  request.onreadystatechange = () => {
    if ( request.readyState === 4 && request.status === 200 ) {
      callback(JSON.parse(request.responseText));
    }
  }
}

let buildTile = (item) => {
  let template = ``
  if(item.image !== "")
  template = `
  <div class="tile">
    <img class="img" src="${item.image}" alt="" />
    <h3 class="heading">${item.heading}</h3>
    <p class="content">${item.content}</p>
    <h5 class="meta">${item.meta}</h5>
  </div>
  `;
  else
  template = `
  <div class="tile">
    <hr class="nonImg" />
    <h3 class="heading">${item.heading}</h3>
    <p class="content">${item.content}</p>
    <h5 class="meta">${item.meta}</h5>
  </div>
  `;
  let temp = document.createElement('div');
  temp.innerHTML = template;
  return temp.children[0];
}

let buildSectors = (sectors, tiles) => {
  console.log(`Building Sectors`);
  if(sectors.length === 3) {
    for(let tile of tiles) {
      let indx = 0;
      if(sectors[indx].offsetHeight <= sectors[indx + 1].offsetHeight && sectors[indx].offsetHeight <= sectors[indx + 2].offsetHeight) {
        //Goes into sector0
        sectors[indx].append(tile);
      } else if (sectors[++indx].offsetHeight <= sectors[indx + 1].offsetHeight) {
        //Goes into sector1
        sectors[indx].append(tile);
      } else {
        //Goes into sector2
        sectors[++indx].append(tile);
      }
    }
  } else if(sectors.length === 2) {
    for (let tile of tiles) {
      let indx = 0;
      if (sectors[indx].offsetHeight <= sectors[indx + 1].offsetHeight) {
        //Goes into sector0
        sectors[indx].append(tile);
      } else {
        //Goes into sector1
        sectors[++indx].append(tile);
      }
    }
  } else {
    for (let tile of tiles) {
      sectors[0].append(tile);
    }
  }
  return;
}

let loadMore = () => {
  console.log(`load more was clicked`);
  let sectors = document.getElementsByClassName(`sectors`);
  let loadBtn = document.getElementById(`load`);

  getTiles((data) => {
    let tiles = [];
    data.tiles.forEach(tileData => {
      let tile = buildTile(tileData);
      tiles.push(tile);
    });
    buildSectors(sectors, tiles);
  });

  loadBtn.remove();
}

let resize = () => {
  document.getElementById(`load`).remove();
  let theGrid = document.getElementById(`theGrid`);
  while (theGrid.firstChild) {
    theGrid.removeChild(theGrid.firstChild);
  }
  //theSystem.innerHTML(load);
  getScreenSize();
}

window.onresize = resize;

getScreenSize();
