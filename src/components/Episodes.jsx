import React, {useEffect} from 'react'

window.onbeforeunload = function()
    {
        localStorage.removeItem('item1');
        localStorage.removeItem('item2');
    };

function Episodes({char1, char2, page1, page2, charId1=1, charId2=1}) {

    let API_1 = `https://rickandmortyapi.com/api/character?page=${page1}`
    let API_2 = `https://rickandmortyapi.com/api/character?page=${page2}`

    let array1 = []
    let array2 = []

    // GET EPISODES FOR FIRST CHARACTER
    async function getData1(character){
        const urls = character.episode;
        for (const url of urls) {
            const response = await fetch(url);
            const body = await response.json();
            array1.push(body)
        }
        localStorage.setItem("item1", JSON.stringify(array1))
        return sharedEpisodes(array1);
    }

    // GET EPISODES FOR SECOND CHARACTER
    async function getData2(character){
        const urls = character.episode;
        for (const url of urls) {
            const response = await fetch(url);
            const body = await response.json();
            array2.push(body)
        }
        localStorage.setItem("item2", JSON.stringify(array2))
        return sharedEpisodes(array2);
    }

    // EPISODES OF 3 SECTIONS
    async function sharedEpisodes(){
        let data1 = await localStorage.getItem("item1")
        let data2 = await localStorage.getItem("item2")
        let ul3 = document.querySelector(".shared_episodes");
        let ep1 = JSON.parse(data1)
        let ep2 = JSON.parse(data2)

        const thirdArray = ep1.filter((elem) => {
            return ep2.some((ele) => {
                return ele.id === elem.id;
              });
        });

        if(data1 === [] || data2 === []){
                return ""
        } else {
            ul3.innerHTML = thirdArray.map((a) => (`<li key={${a.id}}><span>${a.episode}</span> - ${a.name} - ${a.air_date}</li>`))
               
            let ul1 = document.querySelector(".character1");
            ul1.innerHTML = ep1.map((a) => (`<li key={${a.id}}><span>${a.episode}</span> - ${a.name} - ${a.air_date}</li>`))

            let ul2 = document.querySelector(".character2");
            ul2.innerHTML = ep2.map((a) => (`<li key={${a.id}}><span>${a.episode}</span> - ${a.name} - ${a.air_date}</li>`))        
        }
            
            
    }

    useEffect(() => {
        fetch(API_1)
        .then(res => res.json())
        .then(json => json.results)
        .then(e => e.find(char => char.id === charId1))
        .then(resultado => getData1(resultado))
        .catch(err => console.log(err))
      },[charId1, API_1])


    useEffect(() => {
        fetch(API_2)
        .then(res => res.json())
        .then(json => json.results)
        .then(e => e.find(char => char.id === charId2))
        .then(resultado => getData2(resultado))
        .catch(err => console.log(err))
      },[charId2, API_2])


  return (
    <div className="episodesContainer">
        <div className="episodesCol">
            <h2><span style={{"color": "#97ce4c"}}>{char1}</span> - Only Episodes</h2>
            <ul className='character1'>
            </ul>
        </div>
        <div className="episodesCol">
            <h2><span style={{"color": "#97ce4c"}}>{char1}</span> & <span style={{"color": "#f0e14a"}}>{char2}</span> - Shared Episodes</h2>
            <ul className='shared_episodes'>   
            </ul>
        </div>
        <div className="episodesCol">
            <h2><span style={{"color": "#f0e14a"}}>{char2}</span> - Only Episodes</h2>
            <ul className='character2'>
            </ul>
        </div>
    </div>
  )
}

export default Episodes