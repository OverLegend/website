function getStaff() {
  fetch("/api/staff", {
    mode: "cors"
  })
  .then((data) => {
      return data.json();
  })
  .then(async (res) => {
    for (let i = 0; i < res.length; i++) {
      if (res[i].primary_group != "default" && res[i].primary_group.includes("staff_")) {

        let wrapper = document.createElement("div");
        wrapper.className = "wrapper";

        let group = res[i].primary_group.split("staff_")[1];

        if (group.includes("jr"))
          group = group.split("jr")[0];

        let username = res[i].username;
        let card = document.createElement("div");
        let name = document.createElement("p");
        name.innerText = username;

        let image = document.createElement("img");
        image.src = `https://minepic.org/head/${username}`;

        card.appendChild(image);
        card.appendChild(name);

        wrapper.appendChild(card);
        document.getElementById(group).appendChild(wrapper);
      }
    }

  });
}