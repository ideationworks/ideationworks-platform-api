export class Worker {

    public doWork() {

        return new Promise(resolve => {

            setTimeout(() => {

                resolve('work be done!');

            }, 5000);

        });

    }

}

//////////

const worker = new Worker();

console.log('started');

console.log(worker.doWork().then(result => {

    console.log(`this is what we got from waiting! result = ${ result }`);

}));

//console.log(await worker.doWork());

console.log('we can do more work now while we wait');
