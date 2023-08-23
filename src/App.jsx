import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import {Column} from './Column'
import './App.css'
import { document } from 'postcss'

const initialData = {
  tasks:{
  'task-1': { id: 'task-1', content: 'Take out the garbage'},
  'task-2': { id: 'task-2', content: 'Match my favorite show'},
  'task-3': { id: 'task-3', content: 'Charge my phone'},
  'task-4': { id: 'task-4', content: 'Cook dinner'},
  'task-5': { id: 'task-5', content: 'finish react-beautiful-dnd course'},
  'task-6': { id: 'task-6', content: 'make the jdx page update to show the ground station data'},

  },
  columns:{
    'column-1':{
      id:'column-1',
      title:'To do',
      taskIds:['task-1', 'task-2', 'task-3', 'task-4', 'task-5', 'task-6']
    }
  },
  //facilitate reordering of the columns
  columnOrder :['column-1']
}
// {

//   onDragStart
//   const start = {
//     draggableId : 'task-1',
//     type : 'TYPE',
//     source : {
//       droppableId : 'column-1',
//       index : 0
//     },
//   }
  
//    onDragUpdate 
//    const update = {
//     ...start,
//     destination : {
//       droppableId : 'column-1',
//       index : 1
//     }
//    }
  
//   onDragEnd
//   const results = {
//     ...update,
//     reason : 'DROP',
//   }
  
//   const result = {
//     draggableId: 'task-1',
//     type:'TYPE',
//     reason: 'DROP',
//     source: {
//       droppableId:'column-1',
//       index:1
//     },
//     destination:{
//       droppableId: 'column-1',
//       index:1
//     }
//   }
// }



const App = () => {

  const [data,setData] = useState(initialData)
  
  const onDragStart = (start) => {
  
    window.document.body.style.color = 'orange'
    window.document.body.style.transition = 'background-color 0.5s ease'
  }

  const onDragUpdate = (update) => {
    const {destination} = update
    const opacity = destination ? destination.index / Object.keys(data.tasks).length : 0
    window.document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
  }
  
  const onDragEnd = (result) => {
 
    window.document.body.style.color = 'black'
    window.document.body.style.backgroundColor = `white`
    //TODO: reorder our column
    const {destination, source, draggableId} = result
    
    if(!destination){
      return;
    }

    if( destination.droppableId === source.droppableId && destination.index === source.index){
      return;
    }

    const column = data.columns[source.droppableId]
    const newTaskIds = Array.from(column.taskIds)
    newTaskIds.splice(source.index, 1)
    newTaskIds.splice(destination.index, 0, draggableId)

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    }

    const newState = {
      ...data,
      columns:{
      ...data.columns,
      [newColumn.id] : newColumn
      }
    }
    setData(newState)
  }
  

    return (
      <div>
        <DragDropContext
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
          onDragEnd={onDragEnd}
        >
          {
          data.columnOrder?.map((columnId) =>{
            const column = data.columns[columnId]
            const tasks = column.taskIds.map(taskId => data.tasks[taskId])
            return <Column key={column.id} column={column} tasks={tasks}/>
          })
          }
    
        </DragDropContext>
      </div>
    )
  
} 

export default App

// class App extends React.Component{

//   state = initialData  

//   onDragEnd = (result) => {
//     //TODO: reorder our column

//   }
//   render () {

//     return (
//       <DragDropContext
//         onDragEnd={this.onDragEnd}
//       >
//         {
//         this.state.columnOrder?.map((columnId) =>{
//           const column = this.state.columns[columnId]
//           const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])
//           return <Column key={column.id} column={column} tasks={tasks}/>
//         })
//         }
  
//       </DragDropContext>
//     )
//   }
// } 

// export default App
