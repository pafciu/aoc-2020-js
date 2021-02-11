fetch('day1.txt').then(function(response) {

    response.text().then(function(text) {

        const entries = text.split('\n');
        
        for (let i = 0; i < entries.length && entries[i].length != 0; i++) {

            for (let j = i + 1; j < entries.length && entries[j].length != 0; j++) {

                for (let k = j + 1; k < entries.length && entries[k].length != 0; k++) {

                    // if (Number(entries[i]) + Number(entries[j]) == 2020) { // PART 1
                    if (Number(entries[i]) + Number(entries[j]) + Number(entries[k]) == 2020) {

                        // document.querySelector('p').innerText = Number(entries[i]) * Number(entries[j]); // PART 1
                        document.querySelector('p').innerText = Number(entries[i]) * Number(entries[j]) * Number(entries[k]);
                    }
                }
            }
        }
    });
});
