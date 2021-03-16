function parkourTop() {
  fetch("/api/top_parkour", {
    mode: "cors"
  })
  .then((data) => {
      return data.json();
  })
  .then((res) => {
    let scores = [];
    let blacklist = [];
    for (let k = 0; k < 10; k++) {
      let top = {};
      let max = 0;
      for (let i = 0; i < res.length; i++) {
        if (Number(res[i].score.split(":")[1].replace('}', '')) > max && !blacklist.includes(i)) {
          max = Number(res[i].score.split(":")[1].replace('}', ''));
          top.uuid = res[i].id;
          top.nick = res[i].name;
          top.score = Number(res[i].score.split(":")[1].replace('}', ''));
          top.entry = i;
        }
      }
      blacklist.push(top.entry);
      scores.push(top);
    }

    for (let i = 0; i < scores.length; i++) {
      let row = document.createElement("div");
      row.className = "usr";

      let skull = document.createElement("img");
      skull.src = `https://minotar.net/helm/${scores[i].nick}/50.png`;

      row.appendChild(skull);
      document.getElementById("park_top").appendChild(row);

      let newStat = document.createElement("p");
      newStat.innerText = `${i + 1}. ${scores[i].nick} (${scores[i].score})`;

       if (i < 5)
         document.getElementById("stat1").appendChild(newStat);
       else
         document.getElementById("stat2").appendChild(newStat);
    }

  });
}