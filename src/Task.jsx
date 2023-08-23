import { Draggable } from 'react-beautiful-dnd'

const Handle = ({isDropDisabled }) => {
  return (
    <div className={`w-[20px] min-w-[20px] h-[20px] min-h-[20px] ${isDropDisabled ? ' bg-orange-400 ': ' bg-orange-500 '}  rounded-md mr-5`}  ></div>
  )
}

const Task = ({isDropDisabled ,task, index}) => {

  const isDragDisabled = task.id === 'task-1'
 
  return (
    <Draggable 
      draggableId={task.id} 
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot)=>(        
        <div  className={`flex items-center border-[1px] border-[lightgrey] p-[8px] mb-[8px] rounded-md ${snapshot.isDragging ? ' bg-gray-200 text-black ' : isDragDisabled ? ' bg-gray-400 text-black' : ' bg-black  text-white'}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps} 
          ref={provided.innerRef}

        >
          <Handle isDropDisabled={isDropDisabled}/>
          {task.content}
        </div>
      )}
    </Draggable>
  )
}
export {Task} 

// class Task extends React.Component{

//   render (){
//     return (
//       <Draggable draggableId={this.props.task.id} index={this.props.index}>
//         {(provided)=>(        
//           <div className='border-[1px] border-[lightgrey] p-[8px] mb-[8px] rounded-md'
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//             ref={provided.innerRef}
//           >
//             {this.props.task.content}
//           </div>
//         )}
//       </Draggable>
//     )
//   }
// }
// export {Task} 