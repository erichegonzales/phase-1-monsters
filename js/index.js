const createMonster = document.getElementById('create-monster')
const monsterContainer = document.getElementById('monster-container')
const backBtn = document.getElementById('back')
const forwardBtn = document.getElementById('forward')
const monsterForm = document.getElementById('monster-form')
const createBtn = document.getElementById('create-btn')
const baseUrl = 'http://localhost:3000/monsters'
let pageNum = 1;


const fetchMonsters = async () => {
    let res = await fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    let req = await res.json()
    return req
}

forwardBtn.addEventListener('click', () => {
    pageNum++;
    console.log(pageNum)
    getMonsters()
    monsterContainer.innerHTML = ''
})

backBtn.addEventListener('click', () => {
    if (pageNum > 1) {
        pageNum--;
        console.log(pageNum)
        getMonsters()
        monsterContainer.innerHTML = ''
    }
    else window.alert('Reached the first page')
})

const postMonsters = async (monster) => {
    let res = await fetch(`http://localhost:3000/monsters`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            name: monster.name.value,
            age: monster.age.value,
            description: monster.description.value
        })
    })
    let req = await res.json()
    let newMonster = renderMonster(req)
    console.log(newMonster)
}

const renderMonster = (monster) => {
    let div = document.createElement('div')
    let h2 = document.createElement('h2')
    let h4 = document.createElement('h4')
    let p = document.createElement('p')

    h2.innerText = monster.name
    h4.innerText = `Age: ${monster.age}`
    p.innerText = `Bio: ${monster.description}`
    
    div.append(h2, h4, p)
    div.class = 'monster-card'
    monsterContainer.append(div)
}

createBtn.addEventListener('click', () => {
    monsterForm.addEventListener('submit', (event) => {
        event.preventDefault()
        postMonsters(event.target)
    })
})

const getMonsters = async () => {
    let monsterObj = await fetchMonsters()
    monsterObj.forEach((monster) => {
        renderMonster(monster)
    })
}
getMonsters()