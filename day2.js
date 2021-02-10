const table = document.querySelector('table');
const h1 = document.querySelector('h1');

function td(text) {

    let element = document.createElement('td');
    element.innerText = text;
    return element;
}

fetch('day2.txt').then(function(response) {

    response.text().then(function(text) {

        const passwords = text.split('\n');
        const pattern = /([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/;

        let valid_count = 0;

        for (let i = 0; i < passwords.length && passwords[i].length !== 0; i++) {

            const tr = document.createElement('tr');
            const groups = passwords[i].match(pattern);
            console.log(groups.slice(1));
            let min, max, letter, password;
            [min, max, letter, password] = groups.slice(1);
            tr.append(td(min));
            tr.append(td(max));
            tr.append(td(letter));
            tr.append(td(password));

            // const letter_count = Array.from(password).reduce((a, c) => c === letter ? a + 1: a, 0); // PART 1

            // if (letter_count >= min && letter_count <= max) { // PART 1
            if ((password[min - 1] === letter && password[max - 1] !== letter) || (password[min - 1] !== letter && password[max - 1] === letter)) { // PART 2

                valid_count++;
                tr.append('true');

            } else {

                tr.append('false');
            }

            table.append(tr);
        }

        h1.innerText = valid_count.toString();
    });
});
