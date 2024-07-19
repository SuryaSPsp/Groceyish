let items = [];

async function loadItems() {
    const response = await fetch('/items.json');
    const data = await response.json();
    items = data.items;
    displayItems(items);
}

function displayItems(items) {
    const container = document.getElementById('itemContainer');
    container.innerHTML = '';
    items.forEach(item => {
        const itemHtml = getItemTemplate(item);
        container.insertAdjacentHTML('beforeend', itemHtml);
    });
}

function getItemTemplate(item) {
    return `
            <div class="item">
                        <div class="item-img">
                            <img src=${item.image} />
                        </div>
                        <div class="item-content">
                            <p class="type">${item.type}</p>
                            <div class="item-name-wg">
                                <p>${item.name}</p>
                                <p>${item.weight}</p>
                            </div>
                            <div class="rating">
                                <img src="images/icons/Star1.svg"/>
                                <img src="images/icons/Star1.svg"/>
                                <img src="images/icons/Star1.svg"/>
                                <img src="images/icons/Star1.svg"/>
                                <img src="images/icons/Star.svg"/>
                                <p>(4)</p>
                            </div>
                            <p class="spons">By <span>Mcfood</span></p>
                            <div class="item-rate">
                                <div class="cost">
                                    <p class="price">$${item.cost}</p>
                                    <span class="offer">$${item.offer}</span>
                                </div>
                                <div class="cart-btn">
                                    <button><i class="bi bi-cart2"></i>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
}

function filterItems() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const category = document.getElementById('categorySelect').value;

    const filteredItems = items.filter(item => {
        const matchesCategory = category === 'all' || item.type === category;
        const matchesQuery = item.name.toLowerCase().includes(query);
        return matchesCategory && matchesQuery;
    });

    displayItems(filteredItems);
}

loadItems();
