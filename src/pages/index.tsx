// SPA - Single Page Application 
// SSR - Server Side Rendering
// SSG - Static Side Generation

 
//USANDO SSG - Geração estática da página, gerado a partir do 1° Acesso, evita consultar muito a API ------------------------------------------------------
export default function Home(props) {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

// Unico contra -> Ele vai executar toda vez que alguém acessar nossa página.
export async function getStaticProps() {  //Só de a função ter esse nome, o Next já entende que tem que executar antes de mostrar o conteudo pro usuário.
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return{
    props: {    //Tem que vir como uma propriedade.
      episodes:data,
    },
    revalidate: 60*60*8,    //Ou seja, durante 8 horas a página vai ser igual.
    //Exemplo: João acessa a página 10:20, se maria acessar a mesma página as 15:00, a página será o mesmo HTML estático, não precisa consultar a API para que maria veja a página
  }
}


/* 
//USANDO SPA - REACT TRADICIONAL ------------------------------------------------------
import { useEffect } from "react"

export default function Home() {
    useEffect(() => {
      fetch('http://localhost:3333/episodes')
        .then(response => response.json())
        .then(data => console.log(data))

    }, [])   //Dispara quando ALGO mudar, efeito colateral. ->Unico contra, essas infos não são carregadas de primeira, elas vem do JS
  
  return (
    <h1>Index</h1>
  )
}
*/

/*
//USANDO SSR - Next.js ------------------------------------------------------------------
export default function Home(props) {
  console.log(props.episodes)
  return (
    <h1>Index</h1>
  )
}

// Unico contra -> Ele vai executar toda vez que alguém acessar nossa página.
export async function getServerSideProps() {  //Só de a função ter esse nome, o Next já entende que tem que executar antes de mostrar o conteudo pro usuário.
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return{
    props: {    //Tem que vir como uma propriedade.
      episodes:data,
    }
  }
}
*/




