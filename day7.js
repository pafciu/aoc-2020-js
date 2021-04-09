function key(matched) {

    return matched[matched.length - 2] + '-' + matched[matched.length - 1];
}

function number_of_bags(bags, color) {

    let inner = bags.get(color);

    if (inner.length == 0) {

        return 0;

    } else {

        let sum = 0;

        for (let i of inner) {

            sum += i['count'];
            sum += i['count'] * number_of_bags(bags, i['color']);
        }

        return sum;
    }
}

fetch('day7.txt').then(function(response) {

    response.text().then(function(text) {

        let segments;
        let contents;
        const inner_bag_re = /([0-9]+) ([a-z]+) ([a-z]+) bags?/;
        const bags1 = new Map();
        const bags2 = new Map();
        let inner_matched;
        let inner_key;
        const outer_bag_re = /([a-z]+) ([a-z]+) bags/;
        let outer_key;

        for (let line of text.split('\n')) {

            if (line.length !== 0) {
                
                segments = line.substring(0, line.length - 1).split(' contain ');
                outer_key = key(segments[0].match(outer_bag_re));
                bags2.set(outer_key, []);

                if (segments[segments.length - 1] != 'no other bags') {

                    contents = segments[segments.length - 1].split(', ');
                    
                    for (let bag of contents) {

                        inner_matched = bag.match(inner_bag_re);
                        inner_key = key(inner_matched);
                        
                        if (bags1.has(inner_key)) {

                            bags1.get(inner_key).push(outer_key);

                        } else {

                            bags1.set(inner_key, [outer_key]);
                        }

                        bags2.get(outer_key).push({ 'color': inner_key, 'count': parseInt(inner_matched[1]) });
                    }
                }

            }
        }

        const stack = ['shiny-gold'];
        const results = new Set();
        let current;
        let outer;

        do {

            current = stack.shift();
            
            if (bags1.has(current)) {

                outer = bags1.get(current);
                outer.forEach(function(b) {
                    stack.push(b);
                    results.add(b);
                });
            }

        } while (stack.length != 0);


        document.querySelector('#part1').innerText = results.size.toString();
        document.querySelector('#part2').innerText = number_of_bags(bags2, 'shiny-gold').toString();
    });
});
