import { PlusCircle, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

// Types and Interfaces
interface Task {
  id: number
  text: string
  quadrant: QuadrantId
  color: string
  description?: string
}

type QuadrantId =
  | 'urgent-important'
  | 'not-urgent-important'
  | 'urgent-not-important'
  | 'not-urgent-not-important'

interface Quadrant {
  id: QuadrantId
  title: string
  color: string
  description: string
}

interface TaskItemProps {
  task: Task
  onDelete: (id: number) => void
  onDragStart: (task: Task) => void
}

// AddCard Component Types
interface AddCardProps {
  quadrantId: QuadrantId
  onAddTask: (task: Omit<Task, 'id'>) => void
}

// Constants
const QUADRANT_CONFIG: Quadrant[] = [
  {
    id: 'urgent-important',
    title: 'Urgent & Important',
    color: 'bg-red-100',
    description: 'Do First',
  },
  {
    id: 'not-urgent-important',
    title: 'Not Urgent but Important',
    color: 'bg-blue-100',
    description: 'Schedule',
  },
  {
    id: 'urgent-not-important',
    title: 'Urgent but Not Important',
    color: 'bg-yellow-100',
    description: 'Delegate',
  },
  {
    id: 'not-urgent-not-important',
    title: 'Not Urgent & Not Important',
    color: 'bg-green-100',
    description: 'Eliminate',
  },
]

const QUADRANT_COLORS: Record<QuadrantId, string> = {
  'urgent-important': 'bg-red-200',
  'not-urgent-important': 'bg-blue-200',
  'urgent-not-important': 'bg-yellow-200',
  'not-urgent-not-important': 'bg-green-200',
}

// Add Card Component (Trello-like)
const AddCard: React.FC<AddCardProps> = ({ quadrantId, onAddTask }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [taskText, setTaskText] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isEditing])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (taskText.trim()) {
      onAddTask({
        text: taskText,
        description: taskDescription,
        quadrant: quadrantId,
        color: QUADRANT_COLORS[quadrantId],
      })
      setTaskText('')
      setTaskDescription('')
      setIsEditing(false)
    }
  }

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className='w-full p-2 text-left text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-2'
      >
        <PlusCircle className='w-4 h-4' />
        <span>Add a task</span>
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='p-2 bg-white rounded-lg shadow-lg'>
      <textarea
        ref={textareaRef}
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder='Enter a title for this task...'
        className='w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2'
        rows={2}
      />
      <textarea
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder='Add a more detailed description... (optional)'
        className='w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2'
        rows={2}
      />
      <div className='flex gap-2'>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition-colors duration-200'
        >
          Add Task
        </button>
        <button
          type='button'
          onClick={() => {
            setIsEditing(false)
            setTaskText('')
            setTaskDescription('')
          }}
          className='px-4 py-1 rounded hover:bg-gray-100 transition-colors duration-200'
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

// Task Item Component
const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onDragStart }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      draggable
      onDragStart={() => onDragStart(task)}
      className={`${task.color} p-2 mb-2 rounded-lg shadow cursor-move group relative transition-all duration-200 hover:shadow-md`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className='flex justify-between items-center'>
        <span className='text-sm font-medium'>{task.text}</span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(task.id)
          }}
          className='opacity-0 group-hover:opacity-100 transition-opacity duration-200'
          aria-label='Delete task'
        >
          <X className='w-4 h-4 text-gray-600 hover:text-red-600' />
        </button>
      </div>
      {isExpanded && task.description && (
        <div className='mt-2 text-sm text-gray-600 border-t pt-2'>
          {task.description}
        </div>
      )}
    </div>
  )
}

// QuadrantBox Component
interface QuadrantBoxProps {
  quadrant: Quadrant
  tasks: Task[]
  onDragOver: (e: React.DragEvent) => void
  onDrop: (quadrantId: QuadrantId) => void
  onDeleteTask: (id: number) => void
  onDragStart: (task: Task) => void
  onAddTask: (task: Omit<Task, 'id'>) => void
}

const QuadrantBox: React.FC<QuadrantBoxProps> = ({
  quadrant,
  tasks,
  onDragOver,
  onDrop,
  onDeleteTask,
  onDragStart,
  onAddTask,
}) => (
  <div
    className={`${quadrant.color} p-4 rounded-lg min-h-64 transition-colors duration-200`}
    onDragOver={onDragOver}
    onDrop={() => onDrop(quadrant.id)}
  >
    <h3 className='font-semibold mb-1'>{quadrant.title}</h3>
    <p className='text-sm text-gray-600 mb-4'>{quadrant.description}</p>
    <div className='space-y-2'>
      {tasks
        .filter((task) => task.quadrant === quadrant.id)
        .map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDeleteTask}
            onDragStart={onDragStart}
          />
        ))}
      <AddCard quadrantId={quadrant.id} onAddTask={onAddTask} />
    </div>
  </div>
)

// Main Component
const PriorityMatrix: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      text: 'Quarterly Report',
      quadrant: 'urgent-important',
      color: QUADRANT_COLORS['urgent-important'],
      description:
        'Complete Q4 financial analysis and prepare presentation for stakeholders',
    },
    {
      id: 2,
      text: 'Team Training',
      quadrant: 'not-urgent-important',
      color: QUADRANT_COLORS['not-urgent-important'],
      description:
        'Plan and schedule technical training sessions for the development team',
    },
  ])

  const [draggedTask, setDraggedTask] = useState<Task | null>(null)

  const handleAddTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now(),
    }
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const handleDragStart = (task: Task) => {
    setDraggedTask(task)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (quadrantId: QuadrantId) => {
    if (!draggedTask) return

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTask.id
          ? {
              ...task,
              quadrant: quadrantId,
              color: QUADRANT_COLORS[quadrantId],
            }
          : task
      )
    )
    setDraggedTask(null)
  }

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className='p-4 max-w-6xl mx-auto'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Priority Matrix</h2>

      {/* Matrix Grid */}
      <div className='grid grid-cols-2 gap-4'>
        {QUADRANT_CONFIG.map((quadrant) => (
          <QuadrantBox
            key={quadrant.id}
            quadrant={quadrant}
            tasks={tasks}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDeleteTask={deleteTask}
            onDragStart={handleDragStart}
            onAddTask={handleAddTask}
          />
        ))}
      </div>
    </div>
  )
}

export default PriorityMatrix
