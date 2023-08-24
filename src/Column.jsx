import { Droppable, Draggable } from 'react-beautiful-dnd'
import {Task} from './Task'
const Column = ({index, isDropDisabled, column, tasks}) => {

  return (
    <Draggable
      draggableId={column.id}
      index={index}
    >
      
      {  (provided,snapshot) => (
      
          <div className={`flex flex-col text-[1.7rem] m-[8px] border-[lightgrey] border-[1px] rounded-md min-w-[300px] ${snapshot.draggingOver ? 'bg-cyan-950' : 'bg-white'}`}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <h3 className='text-[2.2rem] p-[8px]'
              {...provided.dragHandleProps}
            >{column.title}</h3>
            <Droppable 
              droppableId={column.id}
              // type={column.id === 'column-3' ? 'done' : 'activate'}
              isDropDisabled={isDropDisabled}
              type='task'
              
            >
              {
                (provided, snapshot) => (
                  <div className={`min-h-[100px] p-[8px] flex-grow-[1] ${snapshot.isDraggingOver ? ' bg-gray-300 ' : ' bg-white '}`} 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    
                    {tasks.map((task,index)=><Task isDropDisabled={isDropDisabled} key={task.id} task={task} index={index}/>)}
                    {provided.placeholder}
                  </div>
                )
              }
            </Droppable> 
          </div>
          )
        }
    </Draggable>
  )
}
export {Column}

