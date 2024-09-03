
import {readFile} from 'fs/promises'

const file = await readFile('./data/users.json', 'utf-8')
const userData = JSON.parse(file)

export const get_user_byId = (id) =>{
    return userData.find(e=> e.id === id)
}