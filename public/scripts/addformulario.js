const formulario = document.getElementById('formulario');

formulario.addEventListener('submit',async(e)=>{
    e.preventDefault();

    const formdata = new FormData(e.target)
    const data = Object.fromEntries(formdata)
    console.log(data)

    const response =await fetch('/produtos',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    
    })
    const result = await response.json()
    console.log(result)
})