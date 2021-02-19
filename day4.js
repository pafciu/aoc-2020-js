fetch('day4-example.txt').then(function(response) {

    response.text().then(function(text) {

        const lines = text.split('\n');
        const required_fields = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);

        for (let i = 0; i < lines.length; i++) {

            if (lines[i].length !== 0) {

                const kvs = lines[i].split(' ');

                for (let j = 0; j < kvs.length; j++) {

                    console.log(kvs[j].slice(0, 3));
                    console.log(kvs[j].slice(4, kvs[j].length));
                }
            }
        }
    });
});
