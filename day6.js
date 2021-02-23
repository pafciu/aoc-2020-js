function intersection(setA, setB) {
    let _intersection = new Set()
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection
}

fetch('day6.txt').then(function(response) {

    response.text().then(function(text) {

        let everyone_answers = new Set();
        let count = 0;

        for (let line of text.split('\n')) {

            if (line.length !== 0) {
                
                const answers = new Set();
                for (let c of line) {

                    answers.add(c);
                }
                everyone_answers.add(answers);

            } else {

                count += [...everyone_answers].reduce((a, c) => intersection(a, c)).size;
                everyone_answers = new Set();
            }
        }

        document.querySelector('p').innerText = count.toString();
    });
});
