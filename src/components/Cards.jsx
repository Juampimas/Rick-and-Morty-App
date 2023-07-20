
import React, {useState, useEffect} from 'react'
import Episodes from './Episodes'

function Cards() {

    const [pageNum1, setPageNum1] = useState(1)
    const [pageNum2, setPageNum2] = useState(1)
    const [name1, setName1] = useState("none")
    const [name2, setName2] = useState("none")
    const [charId1, setCharId1] = useState(0)
    const [charId2, setCharId2] = useState(0)
    const [characters1, setCharacters1] = useState([])
    const [characters2, setCharacters2] = useState([])
  
    let API1 = `https://rickandmortyapi.com/api/character?page=${pageNum1}`
    let API2 = `https://rickandmortyapi.com/api/character?page=${pageNum2}`
  
    useEffect(() => {
      fetch(API1)
      .then(res => res.json())
      .then(json => json.results)
      .then(results => setCharacters1(results))
      .catch(err => console.log(err))
    },[API1])

    useEffect(() => {
      fetch(API2)
      .then(res => res.json())
      .then(json => json.results)
      .then(results => setCharacters2(results))
      .catch(err => console.log(err))
    },[API2])

    // PAGINATION FUNCTIONS FOR CARDS1
    function HandleNextPage(){
        setPageNum1(pageNum1 + 1)
    }
    function HandlePrevPage(){
        setPageNum1(pageNum1 - 1)
    }
    function HandleFirstPage(){
        setPageNum1(1)
    }
    function HandleLastPage(){
        setPageNum1(42)
    }
        // PAGINATION FUNCTIONS FOR CARDS2
    function HandleNextPage2(){
        setPageNum2(pageNum2 + 1)
    }
    function HandlePrevPage2(){
        setPageNum2(pageNum2 - 1)
    }
    function HandleFirstPage2(){
        setPageNum2(1)
    }
    function HandleLastPage2(){
        setPageNum2(42)
    }
    // FUNCTIONS FOR SELECTED CARD
    function HandleClick1(char){
        let characterName = char.name;
        setName1(characterName)
        setCharId1(char.id)
    }
    function HandleClick2(char){
        let characterName = char.name;
        setName2(characterName)
        setCharId2(char.id)
    }

  return (
    <>
        <div className='sections'>
            <div>
                <h2>Character#1 selected: <span style={{"color": "#97ce4c"}}>{name1}</span></h2>
                <ul className="cardList">
                    {
                    characters1.map(char => (
                        <li className="card" key={char.id}>
                        <img src={char.image} alt={char.name} />
                        <div className="char_info">
                            <h3>{char.name}</h3>
                            <p>Status: {char.status}</p>
                            <p>Species: {char.species}</p>
                            <button onClick={() =>{HandleClick1(char)}}>Select</button>
                        </div>
                        </li>
                    ))
                    }
                </ul>
                <div className="pageBtns">
                    {pageNum1 > 2 ? <button className="pageBtn" onClick={HandleFirstPage}>First Page</button>:""}
                    {pageNum1 > 1 ? <button className="pageBtn" onClick={HandlePrevPage}>Previous Page</button>:""}
                    <p>Page: {pageNum1}</p>
                    {pageNum1 !== 42 ? <button className="pageBtn" onClick={HandleNextPage}>Next Page</button>: ""}
                    {pageNum1 !== 42 ? <button className="pageBtn" onClick={HandleLastPage}>Last Page</button>:""}
                </div>
            </div>
            <div>
                <h2>Character#2 selected: <span style={{"color": "#f0e14a"}}>{name2}</span></h2>
                <ul className="cardList">
                    {
                    characters2.map(char => (
                        <li className="card" key={char.id}>
                        <img src={char.image} alt={char.name} />
                        <div className="char_info">
                            <h3>{char.name}</h3>
                            <p>Status: {char.status}</p>
                            <p>Species: {char.species}</p>
                            <button className='select_btn2' onClick={() =>{HandleClick2(char)}}>Select</button>
                        </div>
                        </li>
                    ))
                    }
                </ul>
                <div className="pageBtns">
                    {pageNum2 > 2 ? <button className="pageBtn2" onClick={HandleFirstPage2}>First Page</button>:""}
                    {pageNum2 > 1 ? <button className="pageBtn2" onClick={HandlePrevPage2}>Previous Page</button>:""}
                    <p>Page: {pageNum2}</p>
                    {pageNum2 !== 42 ? <button className="pageBtn2" onClick={HandleNextPage2}>Next Page</button>: ""}
                    {pageNum2 !== 42 ? <button className="pageBtn2" onClick={HandleLastPage2}>Last Page</button>:""}
                </div>
            </div>
        </div>
        <Episodes 
            char1={name1} 
            char2={name2} 
            page1={pageNum1} 
            page2={pageNum2}
            charId1={charId1} 
            charId2={charId2} 
        />
    </>
  )
}

export default Cards