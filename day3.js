function trees(map, slope_x, slope_y) {

    const width = map[0].length;
    let count = 0;
    for (let x = 0, y = 0; y < map.length; x = (x + slope_x) % width, y += slope_y) {

        if (map[y][x] === '#') {

            count++;
        }
    }
    return count;
}

fetch('day3.txt').then(function(response) {

    response.text().then(function(text) {

        let map = text.split('\n');
        map = map.slice(0, map.length - 1);
        
        document.querySelector('p').innerText = // trees(map, 3, 1); // PART 1
            trees(map, 1, 1)
            * trees(map, 3, 1)
            * trees(map, 5, 1)
            * trees(map, 7, 1)
            * trees(map, 1, 2);
    });
});
