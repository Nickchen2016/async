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

function createData(data, callBack){
    setTimeout(()=>{
        arr.push(data);
        callBack();
    },3000)
}

// getData();

createData({ title:'title3',body:'This is body 3' },getData);