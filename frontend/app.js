function getMenu() {
  fetch('http://localhost:5000/api/menu')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('menuList');
      list.innerHTML = '';
      data.forEach(item => {
        list.innerHTML += `<li>${item.name} - $${item.price}</li>`;
      });
    });
}
