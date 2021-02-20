fetch('day5.txt').then(function(response) {

    response.text().then(function(text) {

        function seat_id(pass) {

            return parseInt(pass.replaceAll('F', '0').replaceAll('B', '1').replaceAll('L', '0').replaceAll('R', '1'), 2);
        }

        const seat_ids = new Set(text.split('\n').filter(s => s.length !== 0).map(seat_id));
        const max_seat_id = Math.max(...seat_ids);
        document.querySelector('#p1').innerText = max_seat_id.toString();
        
        for (let i = 0; i < 1024; i++) {

            if (!seat_ids.has(i) && seat_ids.has(i - 1) && seat_ids.has(i + 1)) {

                document.querySelector('#p2').innerText = i.toString();
            }
        }
    });
});
