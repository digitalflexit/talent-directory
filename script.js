const directory = document.getElementById('directory');
const searchInput = document.getElementById('search');

let talents = [];

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    talents = data;
    renderDirectory(talents);
  });

function renderDirectory(list) {
  directory.innerHTML = '';
  list.forEach(talent => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${talent.photo}" alt="${talent.name}">
      <h3>${talent.name}</h3>
      <p><strong>Role:</strong> ${talent.role}</p>
      <p><strong>Skills:</strong> ${talent.skills}</p>
      <p><strong>Location:</strong> ${talent.location}</p>
    `;
    directory.appendChild(card);
  });
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = talents.filter(t => 
    t.name.toLowerCase().includes(query) || 
    t.skills.toLowerCase().includes(query)
  );
  renderDirectory(filtered);
});
