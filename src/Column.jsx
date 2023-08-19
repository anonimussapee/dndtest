import { Droppable } from 'react-beautiful-dnd'
import {Task} from './Task'
const Column = ({column,tasks}) => {

  return (
    <div className='text-[1.7rem] m-[8px] border-[lightgrey] border-[1px] rounded-md'>
      <h3 className='text-[2.2rem] p-[8px]'>{column.title}</h3>
      <Droppable droppableId={column.id}>
        {
          (provided) => (
            <div className='p-[8px]'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              
              {tasks.map((task,index)=><Task key={task.id} task={task} index={index}/>)}
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    </div>
  )
}
export {Column}

