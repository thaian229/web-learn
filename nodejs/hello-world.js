const fs = require('fs'); // import fs to fs

const textData = `I recollect that my first exploit in squirrel-shooting was in a grove of tall walnut-trees that shades one side of the valley. I had wandered into it at noontime, when all nature is peculiarly quiet, and was startled by the roar of my own gun, as it broke the Sabbath stillness around and was prolonged and reverberated by the angry echoes.`;

fs.writeFile(`text.txt`, textData, (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log('write file success');
    }
});

fs.readFile(`./text.txt`, (err, data) => {
    if(err) throw err;
    console.log(data.toString());
})

fs.watchFile(`./text.txt`,(curr, prev) => {
    console.log(`the current mtime is: ${curr.mtime}`);
    console.log(`the previous mtime was: ${prev.mtime}`);
});