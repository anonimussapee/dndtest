import React, { useState } from 'react'
import { DragDropContext,Droppable } from 'react-beautiful-dnd'
import {Column} from './Column'
import './App.css'

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
    },
    'column-2':{
      id:'column-2',
      title:'In progress',
      taskIds:[]
    },
  },
  //facilitate reordering of the columns
  columnOrder :['column-1', 'column-2' ],
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
  
  const [homeIndex, setHomeIndex] = useState({})


  const onDragStart = (start, provided) => {
  
    window.document.body.style.color = 'orange'
    window.document.body.style.transition = 'background-color 0.5s ease'

    const homeIndex = data.columnOrder.indexOf(start.source.droppableId)

    setHomeIndex({
      homeIndex,
    })
    provided.announce('hello','hello world')
  }

  const onDragUpdate = (update, provided) => {
    const message =update.destination ? 'hello world' : 'que mas ve'
     provided.announce(message)
    const {destination} = update
    const opacity = destination ? destination.index / Object.keys(data.tasks).length : 0
    window.document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
  }
  
  const onDragEnd = (result, provided) => {

    const message =result.destination ? 'hello world' : 'que mas ve'
    provided.announce(message)
    setHomeIndex({
      homeIndex: null,
    })
 
    window.document.body.style.color = 'black'
    window.document.body.style.backgroundColor = `white`
    //TODO: reorder our column
    const {destination, source, draggableId, type} = result
    
    if(!destination){
      return;
    }

    if( destination.droppableId === source.droppableId && destination.index === source.index){
      return;
    }

    if(type === 'column'){

      const newColumnOrder = Array.from(data.columnOrder)
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0 ,draggableId)

      const newState = {
        ...data,
        columnOrder: newColumnOrder
      }

      setData(newState)
      return ;

    }

    const start = data.columns[source.droppableId]
    const finish = data.columns[destination.droppableId]

    if(start === finish){

        const newTaskIds = Array.from(start.taskIds)
        newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, draggableId)
    
        const newColumn = {
          ...start,
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
        return ;
    }

    //moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)

    const newStart = {
      ...start,
      taskIds:startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    setData({
      ...data, 
      columns: {
        ...data.columns,
        [newStart.id] : newStart,
        [newFinish.id] : newFinish
      }
    })

  }
  

    return (
      <DragDropContext
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
          onDragEnd={onDragEnd}
      >
        <Droppable
        
        droppableId='all-columns' direction='horizontal' type='column'>

        {  (provided)=>(
          <div className='flex '
            {...provided.droppableProps}
            ref={provided.innerRef}
          >

          {
          data.columnOrder?.map((columnId, index) =>{
            const column = data.columns[columnId]
            const tasks = column.taskIds.map(taskId => data.tasks[taskId])

            const isDropDisabled = index < homeIndex.homeIndex

            return <Column key={column.id} column={column} tasks={tasks} isDropDisabled={isDropDisabled} index={index}/>
          })
          }
          {provided.placeholder}
    
        </div>)
        }
        </Droppable>
      </DragDropContext>
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
