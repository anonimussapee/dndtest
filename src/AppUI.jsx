import { DragableBox } from './Components/DragableBox'
import './App.css'

const AppUI = () => {

  const initialData = {
    items:{
    'item-1': { id: 'item-1', content: 'Take out the garbage'},
    'item-2': { id: 'item-2', content: 'Match my favorite show'},
    'item-3': { id: 'item-3', content: 'Charge my phone'},
    'item-4': { id: 'item-4', content: 'learn dnd-react'},
    'item-5': { id: 'item-5', content: 'i will hug pancho'},
    'item-6': { id: 'item-6', content: 'i will be a fullstack'},
    'item-7': { id: 'item-7', content: 'Cook dinner'},

    },
    columns:{
      'column-1':{
        id:'column-1',
        title:'To do',
        itemIds:['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7']
      }
    },
    //facilitate reordering of the columns
    columnOrder :['column-1']
  }
  return (
    <div>
      <DragableBox key={'testing'} initialData={initialData}/>
    </div>
  )
}

export {AppUI}