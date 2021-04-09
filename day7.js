function key(matched) {

    return matched[1] + '-' + matched[2];
}

fetch('day7.txt').then(function(response) {

    response.text().then(function(text) {

        let segments;
        let contents;
        const inner_bag_re = /[0-9]+ ([a-z]+) ([a-z]+) bags?/;
        const bags = new Map();
        let matched;
        let inner_key;
        const outer_bag_re = /([a-z]+) ([a-z]+) bags/;
        let outer_key;

        for (let line of text.split('\n')) {

            if (line.length !== 0) {
                
                segments = line.substring(0, line.length - 1).split(' contain ');

                if (segments[segments.length - 1] != 'no other bags') {

                    contents = segments[segments.length - 1].split(', ');
                    outer_key = key(segments[0].match(outer_bag_re));
                    
                    for (let bag of contents) {

                        inner_key = key(bag.match(inner_bag_re));
                        
                        if (bags.has(inner_key)) {

                            bags.get(inner_key).push(outer_key);

                        } else {

                            bags.set(inner_key, [outer_key]);
                        }
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
            
            if (bags.has(current)) {

                outer = bags.get(current);
                outer.forEach(function(b) {
                    stack.push(b);
                    results.add(b);
                });
            }

        } while (stack.length != 0);


        document.querySelector('pre').innerText = results.size.toString();
    });
});
