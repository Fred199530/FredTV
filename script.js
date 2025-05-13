fetch("data/channels.json")
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById("channel-list");
    const search = document.getElementById("search");

    function renderChannels(filter = "") {
      list.innerHTML = "";
      data.forEach(channel => {
        if (channel.name.toLowerCase().includes(filter.toLowerCase())) {
          const div = document.createElement("div");
          div.className = "channel";
          div.innerHTML = `
            <img src="${channel.logo}" alt="${channel.name}">
            <p>${channel.name}</p>
          `;
          div.onclick = () => {
            document.getElementById("video-source").src = channel.url;
            const player = videojs('channel-player');
            player.load();
            player.play();
          };
          list.appendChild(div);
        }
      });
    }

    search.addEventListener("input", () => renderChannels(search.value));
    renderChannels();
  });
