import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from 'styled-components'
import {FaLocationArrow, FaRegTimesCircle} from 'react-icons/fa'

const DivForm = styled.div`
    width: 70%;
    margin: auto;
    font-family: Arial, Helvetica, sans-serif;

    h1{text-align:center}
    form{width: 80%; margin:auto;
        input{width: 100%; padding:5px; margin-bottom: 5px}

        a{background:red; margin-bottom:5px; color: white; text-decoration:none;
          padding:6px}

        button{color:white; background:green; border:none; display:inline-block;
               padding: 6px; margin-right: 10px }
    }
`


export default function FormProdutos(){

    const {id} = useParams()

    const [novo, setNovo]=useState({
        titulo: '',
        quantidade:'',
        preco:''
    })

    let metodo = 'POST'
    if(id){
        metodo = 'PUT'
    }
        
const handleChange = e=>{
    setNovo({...novo, [e.target.name]:e.target.value})
}

const handleSubmit = e =>{
    e.preventDefault()
    fetch(`http://localhost:5000/produto/${id ? id : ''}`,{
        method: metodo,
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(novo)
    })
    .then(()=> window.location='/')
    .catch(error=>console.log(error))
}

useEffect(()=>{
    if(id){
        fetch(`http://localhost:5000/produto/${id}`)
        .then(resp=> resp.json())
        .then(data=>setNovo(data))
        .catch(error=>console.log(error))        
    }
},[id])


    return(
        <DivForm>
            <h1>Formulário Produtos!!!</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="titulo" value={novo.titulo}
                placeholder="Título" onChange={handleChange} /><br/>
                <input type="number" name="quantidade" value={novo.quantidade}
                placeholder="Quantidade" onChange={handleChange} /><br/>
                <input type="number" name="preco" value={novo.preco}
                placeholder="Preço" onChange={handleChange} step={0.01} /><br/>
                <button type="submit">Cadastrar <FaLocationArrow/></button>
                <Link to='/'>Cancelar <FaRegTimesCircle/></Link>
            </form>
        </DivForm>
    )
}