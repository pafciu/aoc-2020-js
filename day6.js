fetch('day6.txt').then(function(response) {

    response.text().then(function(text) {

        let unique_answers = new Set();
        let count = 0;

        for (let line of text.split('\n')) {

            if (line.length !== 0) {
                
                for (let c of line) {

                    unique_answers.add(c);
                }

            } else {

                count += unique_answers.size;
                unique_answers = new Set();
            }
        }

        document.querySelector('p').innerText = count.toString();
    });
});
