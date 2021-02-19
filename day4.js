const required_fields = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);

function contains_required(fields) {
    
    for (let rf of required_fields) {
        
        if (!fields.has(rf)) {

            return false;
        }
    }
    return true;
}

const validations = {

    year_pattern: /^[0-9]{4}$/,
    year: function(text, at_least, at_most) {

        const m = text.match(this.year_pattern);
        
        if (m !== null) {

            y = parseInt(m[0]);
            return y >= at_least && y <= at_most;
        }
        return false;
    },
    byr: function(text) {
        return this.year(text, 1920, 2002);
    },
    iyr: function(text) {
        return this.year(text, 2010, 2020);
    },
    eyr: function(text) {
        return this.year(text, 2020, 2030);
    },
    hgt_pattern: /^([0-9]{2,3})(cm|in)$/,
    hgt: function(text) {

        const m = text.match(this.hgt_pattern);

        if (m !== null) {

            h = parseInt(m[1]);

            if (m[2] === 'cm' && h >= 150 && h <= 193) {
                
                return true;

            } else if (m[2] === 'in' && h >= 59 && h <= 76) {

                return true;
            }
        }
        return false;
    },
    hcl_pattern: /^#[0-9a-f]{6}$/,
    hcl: function(text) {

        return text.match(this.hcl_pattern) !== null;
    },
    ecl_options: new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']),
    ecl: function(text) {

        return this.ecl_options.has(text);
    },
    pid_pattern: /^[0-9]{9}$/,
    pid: function(text) {

        return text.match(this.pid_pattern) !== null;
    },
    cid: function(text) {

        return true;
    }
}

function valid_passports(text) {

    const lines = text.split('\n');
    let fields = new Set();
    let values = new Map();
    let valid = 0;
    let valid_fields = true;

    for (let i = 0; i < lines.length; i++) {

        if (lines[i].length !== 0) {

            const kvs = lines[i].split(' ');

            for (let j = 0; j < kvs.length; j++) {

                fields.add(kvs[j].slice(0, 3));
                values.set(kvs[j].slice(0, 3), kvs[j].slice(4, kvs[j].length));
            }

        } else {

            console.log(values);

            if (contains_required(fields)) {

                for (let f of fields) {

                    valid_fields = valid_fields && validations[f](values.get(f));
                }
                
                if (valid_fields) {
                    
                    valid++;
                }
            }

            fields = new Set();
            values = new Map();
            valid_fields = true;
        }
    }

    document.querySelector('p').innerText = valid.toString();
}

fetch('day4.txt').then(function(response) {

    response.text().then(valid_passports);
});
