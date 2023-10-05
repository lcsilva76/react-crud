import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from 'styled-components'
import {FaEdit, FaTrash} from 'react-icons/fa'

const DivLista = styled.div`
    width: 70%; margin: auto; font-family: Arial;

    h1{text-align: center;}

    a{text-decoration:none; padding: 10px 15px; margin-bottom:20px;
      background-color: yellowgreen; color: white; display:inline-block;}
    
    table{width:100%; margin: auto}

    thead tr{ background-color: darkblue; color:white}

    thead th{padding: 10px}

    tbody tr:nth-child(2n){background-color:#ccc}
    tbody tr td a{ background: none; margin-bottom: 5px; color:blue}
    tbody tr td button{ color: red; background:none; border: none}

    tfoot tr td{text-align:center; background:#333; color: white}
`

export default function ListaProdutos(){

    const [produtos, setProdutos]= useState([])

    useEffect(()=>{
        fetch('http://localhost:5000/produto')
        .then(resp => resp.json())
        .then(resp => setProdutos(resp))
        .catch(error => console.log(error))
    },[])

    const handleDelete = (id)=>{
        fetch(`http://localhost:5000/produto/${id}`,{method: 'delete'})
        .then(window.location = '/')
        .catch(error => console.log(error))
    }



    return(
        <DivLista>
            <h1>Lista de Produtos</h1>

            <Link to='/incluir'>Inserir Produto</Link>

            <table>
                <thead>
                    <tr>
                        <th>Título</th><th>Quantidade</th><th>Preço</th><th></th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(prod => (
                        <tr key={prod.id}>
                            <td>{prod.titulo}</td> <td>{prod.quantidade}</td>
                            <td>R$ {parseFloat(prod.preco).toFixed(2)}</td>
                            <td>
                                <Link title="Editar" to={`/editar/${prod.id}`}><FaEdit/></Link>  
                                <button title="Excluir" onClick={handleDelete.bind(this, prod.id)}>
                                    <FaTrash/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr><td colSpan={4}>Produtos vindo do servidor</td></tr>
                </tfoot>
            </table>
        </DivLista>
    )
}

/*


*/