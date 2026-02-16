const cards = document.querySelectorAll(".card");
const searchButton = document.querySelector(".search-pill");
const cmdk = document.querySelector(".cmdk");
const cmdkBackdrop = document.querySelector(".cmdk-backdrop");
const cmdkInput = document.querySelector("#cmdkInput");
const cmdkList = document.querySelector("#cmdkList");

const commands = [
  {
    label: "Home",
    description: "Go to homepage",
    url: "/",
    external: false,
  },
  {
    label: "Projects",
    description: "Open projects page",
    url: "/projects/",
    external: false,
  },
  {
    label: "Notes",
    description: "Open notes and blog posts",
    url: "/notes/",
    external: false,
  },
  {
    label: "My Band Post",
    description: "Read the band story post",
    url: "/notes/my-band.html",
    external: false,
  },
  {
    label: "Student-ERP Repo",
    description: "GitHub repository",
    url: "https://github.com/thedanielraj/Student-ERP",
    external: true,
  },
  {
    label: "GitHub Profile",
    description: "Open @thedanielraj on GitHub",
    url: "https://github.com/thedanielraj",
    external: true,
  },
  {
    label: "Random",
    description: "Totally random link",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    external: true,
  },
];

let selectedIndex = 0;
let filteredCommands = [...commands];

const navigateToCommand = (command) => {
  if (!command) {
    return;
  }

  if (command.external) {
    window.open(command.url, "_blank", "noopener,noreferrer");
  } else {
    window.location.href = command.url;
  }
};

const renderList = () => {
  if (!cmdkList) {
    return;
  }

  cmdkList.innerHTML = "";

  if (!filteredCommands.length) {
    const empty = document.createElement("li");
    empty.className = "cmdk-empty";
    empty.textContent = "No results";
    cmdkList.appendChild(empty);
    return;
  }

  filteredCommands.forEach((command, index) => {
    const item = document.createElement("li");
    item.className = `cmdk-item${index === selectedIndex ? " selected" : ""}`;
    item.setAttribute("role", "button");
    item.tabIndex = -1;
    item.innerHTML = `<strong>${command.label}</strong><span>${command.description}</span>`;
    item.addEventListener("click", () => navigateToCommand(command));
    cmdkList.appendChild(item);
  });
};

const filterCommands = () => {
  if (!cmdkInput) {
    return;
  }

  const query = cmdkInput.value.trim().toLowerCase();
  filteredCommands = commands.filter((command) => {
    const haystack = `${command.label} ${command.description}`.toLowerCase();
    return haystack.includes(query);
  });
  selectedIndex = 0;
  renderList();
};

const openPalette = () => {
  if (!cmdk || !cmdkBackdrop || !cmdkInput) {
    return;
  }
  cmdk.hidden = false;
  cmdkBackdrop.hidden = false;
  cmdkInput.value = "";
  filteredCommands = [...commands];
  selectedIndex = 0;
  renderList();
  cmdkInput.focus();
};

const closePalette = () => {
  if (!cmdk || !cmdkBackdrop) {
    return;
  }
  cmdk.hidden = true;
  cmdkBackdrop.hidden = true;
};

const isPaletteOpen = () => cmdk && !cmdk.hidden;

window.addEventListener("load", () => {
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add("visible");
    }, i * 120);
  });
});

if (searchButton) {
  searchButton.addEventListener("click", openPalette);
}

if (cmdkBackdrop) {
  cmdkBackdrop.addEventListener("click", closePalette);
}

if (cmdkInput) {
  cmdkInput.addEventListener("input", filterCommands);
}

window.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (isPaletteOpen()) {
      closePalette();
    } else {
      openPalette();
    }
    return;
  }

  if (!isPaletteOpen()) {
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closePalette();
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    if (filteredCommands.length) {
      selectedIndex = (selectedIndex + 1) % filteredCommands.length;
      renderList();
    }
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    if (filteredCommands.length) {
      selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
      renderList();
    }
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    navigateToCommand(filteredCommands[selectedIndex]);
  }
});
