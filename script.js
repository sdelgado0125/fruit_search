const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

suggestions.addEventListener('mouseover', function (e) {
    const listItems = suggestions.querySelectorAll('li');
    listItems.forEach(item => {
        item.classList.remove('highlight');
    });
    if (e.target.tagName === 'LI') {
        e.target.classList.add('highlight');
    }
});

function search(str) {
	let results = [];

	if (str.length > 0) {
        results = fruit.filter(fruitItem =>
            fruitItem.toLowerCase().includes(str.toLowerCase())
        );
    }

	return results;
}

function searchHandler(e) {
	const inputVal = e.target.value;
    const results = search(inputVal);
    showSuggestions(results, inputVal);
}

function showSuggestions(results, inputVal) {
    suggestions.innerHTML = '';
    const regex = new RegExp(inputVal, 'ig');

    if (inputVal.length > 0) {
        results.forEach(fruitItem => {
            const li = document.createElement('li');
            li.innerHTML = fruitItem.replace(regex, '<b>$&</b>');
            
            suggestions.appendChild(li);

            li.addEventListener('click', () => {
                input.value = fruitItem;
                suggestions.classList.remove('has-suggestions');
            });
        });

        suggestions.classList.add('has-suggestions');
    } else {
        suggestions.classList.remove('has-suggestions');
    }
}

function useSuggestion(e) {
    if (e.target.tagName === 'LI') {
        input.value = e.target.textContent;
        suggestions.innerHTML = '';
    }
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);