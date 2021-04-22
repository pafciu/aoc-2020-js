fetch('day8-example.txt').then(function(response) {

    response.text().then(function(text) {

        let program = [];
        let re = /(nop|acc|jmp) ([-+][0-9]+)/;

        for (let line of text.split('\n')) {

            let instruction;

            if (line.length !== 0) {

                instruction = line.match(re);
                console.log(instruction[1], instruction[2]);
                program.push(line.match(re));
            }
        }

        document.querySelector('pre').innerText = 'TODO';
    });
});
