const required_fields = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);

function contains_required(fields) {
    
    for (let rf of required_fields) {
        
        if (!fields.has(rf)) {

            return false;
        }
    }
    return true;
}

function valid_passports(text) {

    const lines = text.split('\n');
    let fields = new Set();
    let valid = 0;

    for (let i = 0; i < lines.length; i++) {

        if (lines[i].length !== 0) {

            const kvs = lines[i].split(' ');

            for (let j = 0; j < kvs.length; j++) {

                fields.add(kvs[j].slice(0, 3));
            }

        } else {

            if (contains_required(fields)) {

                valid++;
            }

            fields = new Set();
        }
    }

    document.querySelector('p').innerText = valid.toString();
}

fetch('day4.txt').then(function(response) {

    response.text().then(valid_passports);
});
