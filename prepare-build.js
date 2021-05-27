const { readdirSync, lstatSync, rmdirSync, rmSync, copyFileSync } = require('fs');
const { exec } = require('child_process');

exec('echo "abc"', {}, async (err, stout) => {
    console.log(stout);
    exec('git checkout -B gh-pages', {}, (err, branch_stdout) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(branch_stdout);

        const files = readdirSync('./');
        files.forEach(each => {
            if (each !== 'build' && each.indexOf('.git') !== 0 && each !== 'node_modules') {
                if (lstatSync(each).isDirectory()) {
                    console.log('Removing directory ['+ each + ']')
                    // rmdirSync(each);
                } else {
                    console.log('Removing file ['+each +']')
                    // rmSync(each)
                }
            }
        });
        readdirSync('./build').forEach(each => {
            console.log(`Coping file [build/${each}] to [${each}]`)
            // copyFileSync('./build/' +each, each);
        });
        exec('git add . & git commit -b "prepared build and release"', {}, (err, commit_stdout) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(commit_stdout);

            exec('git checkout master"', {}, (err, checkout_stdout) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(checkout_stdout); 
            });
        });
    });
});