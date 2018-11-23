const arr = [
    {title:'title1',body:'This is body 1'},
    {title:'title2',body:'This is body 2'}
]

function getData(){
    setTimeout(()=>{
        let output = '';
        arr.forEach((e,idx)=>{
            output += `<li key=${idx} >${e.title}</li>`
        });
        document.getElementById('wrap').innerHTML = output;
    },1000)
}

function createData(data){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            arr.push(data);
            const error = false;
            if(!error){
                resolve();
            }else{
                reject('Error: somehting went wrong');
            }
        },2000);

        console.log(arr);
    })
}

// getData();

createData({ title:'title3',body:'This is body 3' })
    .then(getData)
    .catch(err => console.log(err))