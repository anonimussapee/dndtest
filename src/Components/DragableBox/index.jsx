import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const Item = ({item, index}) => {
  

  return (
    <Draggable
      draggableId={item.id}
      index={index}
    >
      {
        (provided) => (
          <div className={`border-[1px] border-[#474747]  shadow-[#0000006d]  shadow-md p-[8px] mb-[8px] rounded-md   bg-[#000000] text-white font-extrabold  `}       
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {item.content}
          </div>
        )
      }

    </Draggable>
  ) 
}

const Column = ({column, items}) => {


  return (
    <div className='text-[1.7rem] m-[8px] border-[lightgrey] border-[1px] rounded-md'>
      <h3 className='text-[2.2rem] p-[8px]'>{column.title}</h3>
      <Droppable
        droppableId={column.id}
      >
        {
          (provided) => (
            <div 
              className='p-[8px]'
              ref={provided.innerRef}
            >
              {
                items?.map((item, index) => <Item key={item.id} item={item} index={index}/>)
              }
              {
                provided.placeholder
              }
            
            </div>
          )
        }

      </Droppable>

    </div>
  )
}

const DragableBox = ({initialData}) => {
  
  const [data, setData ] = useState(initialData)

  const onDragEnd = (result) => {

    const {destination, source, draggableId} = result
    if(!destination){
      return;
    }
    if(destination.droppableId === source.droppableId && destination.index === source.index){
      return;
    }

    const column = data.columns[source.droppableId]
    const newItemIds = Array.from(column.itemIds)
    newItemIds.splice(source.index , 1)
    newItemIds.splice(destination.index, 0, draggableId)

    const newColumn = {
      ...column,
      itemIds: newItemIds
    }
    const newState = {
      ...data,
      columns:{
        ...data.columns,
        [newColumn.id] :newColumn
      }
    }

    setData(newState);

  }
  return (
    <DragDropContext
    onDragEnd={onDragEnd}
    >
      {
        data.columnOrder?.map((columnId)=>{
          const column = data.columns[columnId]
          const items = column.itemIds?.map(itemId => data.items[itemId])
          return <Column key={column.id} column={column} items={items}/>
        }) 
      }
    </DragDropContext> 
  )
}
export {Item, Column, DragableBox}