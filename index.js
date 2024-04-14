const fs = require('fs');
const marked = require('marked');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).options({
    input: {
        describe: 'Path to the source Markdown file',
        type: 'string',
        demandOption: true
    },
    output: {
        describe: 'Path where the converted HTML file will be saved',
        type: 'string',
        demandOption: true
    }
}).argv;

function convertMarkdownToHtml(inputPath, outputPath) {
    fs.readFile(inputPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the Markdown file:', err);
            return;
        }
        const html = marked(data);
        fs.writeFile(outputPath, html, err => {
            if (err) {
                console.error('Error writing the HTML file:', err);
                return;
            }
            console.log(`Markdown has been converted to HTML and saved to ${outputPath}`);
        });
    });
}

convertMarkdownToHtml(argv.input, argv.output);
