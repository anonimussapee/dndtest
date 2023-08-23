import { Draggable } from 'react-beautiful-dnd'

const Handle = (props) => {
  return (
    <div className='w-[20px] h-[20px] bg-orange-500 rounded-md mr-5' {...props} ></div>
  )
}

const Task = ({task, index}) => {

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot)=>(        
        <div  className={`flex items-center border-[1px] border-[lightgrey] p-[8px] mb-[8px] rounded-md ${snapshot.isDragging ? ' bg-gray-200 text-black ' : ' bg-black  text-white'}`}
          {...provided.draggableProps}
          
          ref={provided.innerRef}

        >
          <Handle {...provided.dragHandleProps} />
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