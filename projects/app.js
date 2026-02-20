const USERNAME = "thedanielraj";
const projectGrid = document.querySelector("#projectGrid");
const projectStatus = document.querySelector("#projectStatus");

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const createCard = (repo) => {
  const card = document.createElement("article");
  card.className = "project-card";

  const description = repo.description
    ? repo.description
    : "No description added yet.";

  card.innerHTML = `
    <h2>${repo.name}</h2>
    <p>${description}</p>
    <p class="project-meta">Updated ${formatDate(repo.updated_at)}</p>
    <a href="${repo.html_url}" target="_blank" rel="noreferrer">Open Repo</a>
  `;

  return card;
};

const loadProjects = async () => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
      { headers: { Accept: "application/vnd.github+json" } }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    const ownRepos = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    projectGrid.innerHTML = "";

    if (!ownRepos.length) {
      projectStatus.textContent = "No public repositories found.";
      return;
    }

    ownRepos.forEach((repo) => {
      projectGrid.appendChild(createCard(repo));
    });

    projectStatus.textContent = `Showing ${ownRepos.length} repositories.`;
  } catch (error) {
    projectStatus.textContent =
      "Could not load projects right now. Please try again later.";
  }
};

loadProjects();
