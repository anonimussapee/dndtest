import { Draggable } from 'react-beautiful-dnd'

const Task = ({task, index}) => {

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided)=>(        
        <div className='border-[1px] border-[lightgrey] p-[8px] mb-[8px] rounded-md bg-white'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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