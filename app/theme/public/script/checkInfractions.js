const months = [
  "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"
];

let getUrlParameter = function getUrlParameter(sParam) {
  let sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
}

function fillTable(x) {
  let page = getUrlParameter("page");

  let tableHead = document.createElement("tr")

  let headCell1 = document.createElement("th");
  headCell1.innerText = "Player";
  let headCell2 = document.createElement("th");
  headCell2.innerText = "Autore";
  let headCell3 = document.createElement("th");
  headCell3.innerText = "Motivazione";
  let headCell4 = document.createElement("th");
  headCell4.innerText = "Data";
  let headCell5 = document.createElement("th");
  headCell5.innerText = "Termine";

  tableHead.appendChild(headCell1);
  tableHead.appendChild(headCell2);
  tableHead.appendChild(headCell3);
  tableHead.appendChild(headCell4);
  tableHead.appendChild(headCell5);

  document.getElementById("list").appendChild(tableHead);

  fetch("/api/"+x, {
    mode: "cors"
  })
  .then((data) => {
      return data.json();
  })
  .then((res) => {
    let start = 0;
    let end = 40;

    if (page == undefined || page == "" || page == " ") {
      start = 0;
      end = 40;
    } else {
      end = end * page;
      start = end - 40;
    }

    let i;
    if (end % 40 == 0 && res.data.length >= end)
      i = end;
    else
      i = res.data.length;

    i--;

    for (; i >= start; i--) {
      let newCnt = document.createElement("tr");

      let authorCnt = document.createElement("td");
      authorCnt.className = "wimg";
      let authorTxt = document.createElement("p");
      authorTxt.innerText = res.data[i].banned_by_name;

      let authorImg = document.createElement("img");
      if (res.data[i].banned_by_name != "OverLegend Network") {
        authorImg.src = `https://minotar.net/avatar/${res.data[i].banned_by_name}/25`;
      } else {
        authorTxt.innerText = "Console";
        authorImg.src = `https://minotar.net/avatar/console/25`;
      }

      authorCnt.appendChild(authorImg);
      authorCnt.appendChild(authorTxt);
      
      let playerCnt = document.createElement("td");
      playerCnt.className = "wimg";
      let playerTxt = document.createElement("p");
      let playerImg = document.createElement("img");
      let stop = false;

      for (let k = 0; k < res.history.length && !stop; k++) {
        if (res.history[k].uuid == res.data[i].uuid) {
          stop = true;
          playerTxt.innerText = res.history[k].name;

          playerImg.src = `https://minotar.net/avatar/${res.history[k].name}/25`;
          playerCnt.appendChild(playerImg);
          nickname = res.history[k].name;
        }
      }
      playerCnt.appendChild(playerTxt);

      let reasonCnt = document.createElement("td");
      let reasonTxt = document.createElement("p");
      reasonTxt.innerText = res.data[i].reason;
      reasonCnt.appendChild(reasonTxt);

      let startDateCnt = document.createElement("td");
      let startDateTxt = document.createElement("p");

      let dt1 = new Date(res.data[i].removed_by_date);
      let startDay = dt1.getDate();
      let startMonth = dt1.getMonth();
      let startYear = dt1.getFullYear();
      let startMinute = dt1.getMinutes();
      let startHour = dt1.getHours();

      if (Number(startHour) < 10)
      startHour = "0" + startHour;
      if (Number(startMinute) < 10)
      startMinute = "0" + startMinute;

      let startMonthString = months[startMonth];

      startDateTxt.innerText = `${startDay} ${startMonthString} ${startYear}\n${startHour}:${startMinute}`;
      startDateCnt.appendChild(startDateTxt);

      let endDateCnt = document.createElement("td");
      let endDateTxt = document.createElement("p");

      let dtnow = new Date();
      
      let moderatorName = res.data[i].removed_by_name;
      if (moderatorName == "OverLegend Network")
        moderatorName = "Console";

      if (res.data[i].removed_by_name == null && res.data[i].until == -1)
        endDateTxt.innerText = "∞";
      else if (res.data[i].removed_by_name == null && res.data[i].until >= dtnow.getTime()) {
        let dt2 = new Date(Number(res.data[i].until));
        let endDay = dt2.getDate();
        let endMonth = dt2.getMonth();
        let endYear = dt2.getFullYear();
        let endMinute = dt2.getMinutes();
        let endHour = dt2.getHours();

        if (Number(endHour) < 10)
          endHour = "0" + endHour;
        if (Number(endMinute) < 10)
          endMinute = "0" + endMinute;

        let endMonthString = months[endMonth];

        endDateTxt.innerText = `${endDay} ${endMonthString} ${endYear}\n${endHour}:${endMinute}`;

        let today = new Date().getTime();
        let rawPercent = Math.abs((today - res.data[i].time) / (res.data[i].until - res.data[i].time) * 100);
        //let rawPercent = (res.data[i].until - res.data[i].time) / res.data[i].time * 10000;

        let progressBar = document.createElement("div");
        progressBar.className = "bar";

        let childBar = document.createElement("div");
        childBar.style.width = rawPercent + "%";
      
        progressBar.appendChild(childBar);
        endDateCnt.appendChild(progressBar);
      } else if ((res.data[i].removed_by_name == null || res.data[i].removed_by_name == "#expired") && res.data[i].until < dtnow.getTime()) {
        let dt2 = new Date(Number(res.data[i].until));
        let endDay = dt2.getDate();
        let endMonth = dt2.getMonth();
        let endYear = dt2.getFullYear();
        let endMinute = dt2.getMinutes();
        let endHour = dt2.getHours();

        if (Number(endHour) < 10)
          endHour = "0" + endHour;
        if (Number(endMinute) < 10)
          endMinute = "0" + endMinute;

        let endMonthString = months[endMonth];

        endDateTxt.innerText = `${endDay} ${endMonthString} ${endYear}\n${endHour}:${endMinute}\n(Terminato)`;
      } else {

        if (res.data[i].until == -1) {
          endDateTxt.innerText = `∞\n(Terminato da ${moderatorName})`;
        } else {
          let dt2 = new Date(Number(res.data[i].until));
          let endDay = dt2.getDate();
          let endMonth = dt2.getMonth();
          let endYear = dt2.getFullYear();
          let endMinute = dt2.getMinutes();
          let endHour = dt2.getHours();

          if (Number(endHour) < 10)
            endHour = "0" + endHour;
          if (Number(endMinute) < 10)
            endMinute = "0" + endMinute;

          let endMonthString = months[endMonth];
          endDateTxt.innerText = `${endDay} ${endMonthString} ${endYear}\n${endHour}:${endMinute}\n(Terminato da ${moderatorName})`;
        }
      }
      endDateCnt.appendChild(endDateTxt);

      newCnt.appendChild(playerCnt);
      newCnt.appendChild(authorCnt);
      newCnt.appendChild(reasonCnt);
      newCnt.appendChild(startDateCnt);
      newCnt.appendChild(endDateCnt);
      document.getElementById("list").appendChild(newCnt);
    }
  });
}

function check() {
  const pages = ["bans","mutes","warns"];
  let url = window.location.href;
  let path = url.split("punizioni/")[1];
  
  if (path.includes("?"))
    path = path.split("?")[0];
  
  if (pages.includes(path)) {
    document.getElementById(path).classList.toggle("toggled");
    fillTable(path);
  } else {
    window.location.href = "/punizioni/bans";
  }
}

function nextPage() {
  let url = window.location.href;
  let page = getUrlParameter("page");

  if (document.getElementById("list").childElementCount > 40) {
    if (page == undefined && !url.includes("?")) {
      window.location.href = url+"?page=2";
    } else if (page == undefined && url.includes("?")) {
      window.location.href = url+"&page=2";
    } else if (page != undefined) {
      url = url.replace(`page=${page}`, `page=${Number(page)+1}`);
      window.location.href = url;
    }
  }
}

function prevPage() {
  let url = window.location.href;
  let page = getUrlParameter("page");

  if (page != undefined && page != 1) {
    url = url.replace(`page=${page}`, `page=${Number(page)-1}`);
    window.location.href = url;
  }
}