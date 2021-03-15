function scrollInto(el, offset) {
  let elemetnOffset = document.querySelector(el).offsetTop + offset;
  window.scrollTo(0,elemetnOffset);
}

function goTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function checkScroll(x) {
  if (window.pageYOffset > x && document.querySelector(".navbar").classList.contains("top")) {
    document.querySelector(".navbar").classList.toggle("top");
  } else if (window.pageYOffset <= x && !document.querySelector(".navbar").classList.contains("top")) {
    document.querySelector(".navbar").classList.toggle("top");
  }
}

function countPlayers(a,b,c) {
  fetch("https://ptb.discord.com/api/guilds/706103159835197460/widget.json", {
    mode: "cors"
  })
  .then((data) => {
      return data.json();
  })
  .then((res) => {
    document.querySelector(a).innerText = res.members.length;
  });




  fetch("https://mcapi.us/server/status?ip=mc.overlegend.it&port=25575", {
    mode: "cors"
  })
  .then((data) => {
      return data.json();
  })
  .then((res) => {
    if (res.online == true) {
      document.querySelector(b).innerHTML = res.players.now;
    } else {
      document.querySelector(b).innerText = "Offline";
    }
  });

  document.querySelector(c).innerText = "1500+";
}

function toggleMenu() {
  document.querySelector(".log-menu").classList.toggle("visible");
}

if (document.querySelector(".log-menu") != undefined) {
  let referenceEl = document.getElementById("nav-left-content");
  let style = window.getComputedStyle(referenceEl)

  let userDropdown = document.querySelector(".log-menu");
  userDropdown.style.width = (referenceEl.offsetWidth + parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) - parseFloat(style.paddingLeft) / 2) + "px";
}