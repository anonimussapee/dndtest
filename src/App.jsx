import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import {Column} from './Column'
import './App.css'

const initialData = {
  tasks:{
  'task-1': { id: 'task-1', content: 'Take out the garbage'},
  'task-2': { id: 'task-2', content: 'Match my favorite show'},
  'task-3': { id: 'task-3', content: 'Charge my phone'},
  'task-4': { id: 'task-4', content: 'Cook dinner'},
  },
  columns:{
    'column-1':{
      id:'column-1',
      title:'To do',
      taskIds:['task-1', 'task-2', 'task-3', 'task-4']
    }
  },
  //facilitate reordering of the columns
  columnOrder :['column-1']
}
const result = {
  draggableId: 'task-1',
  type:'TYPE',
  reason: 'DROP',
  source: {
    droppableId:'column-1',
    index:1
  },
  destination:{
    droppableId: 'column-1',
    index:1
  }
}

const App = () => {

  const [data,setData] = useState(initialData)

  const onDragEnd = (result) => {
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
        <p >{data.columns['column-1'].taskIds}</p>
        <p >{Object.keys(data.tasks)}</p>

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
