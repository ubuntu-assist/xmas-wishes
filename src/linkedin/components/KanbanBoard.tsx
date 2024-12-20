import React, { useState, useCallback, DragEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  IconPlus,
  IconTrash,
  IconEdit,
  IconCircleCheck,
  IconCircleX,
} from '@tabler/icons-react'
import { v4 as uuidv4 } from 'uuid'

// TypeScript Interfaces
interface Card {
  id: string
  title: string
  description?: string
  column: ColumnType
  createdAt: Date
  priority?: 'low' | 'medium' | 'high'
}

type ColumnType = 'backlog' | 'todo' | 'doing' | 'done'

interface ColumnConfig {
  title: string
  color: string
}

// Column Configuration
const COLUMN_CONFIGS: Record<ColumnType, ColumnConfig> = {
  backlog: { title: 'Backlog', color: 'text-neutral-500' },
  todo: { title: 'To Do', color: 'text-yellow-200' },
  doing: { title: 'In Progress', color: 'text-blue-200' },
  done: { title: 'Completed', color: 'text-emerald-200' },
}

// Initial Cards
const DEFAULT_CARDS: Card[] = [
  {
    id: uuidv4(),
    title: 'Optimize React Performance',
    description: 'Investigate and implement performance improvements',
    column: 'backlog',
    createdAt: new Date(),
    priority: 'high',
  },
  {
    id: uuidv4(),
    title: 'Refactor Authentication Flow',
    description: 'Implement more secure authentication mechanism',
    column: 'todo',
    createdAt: new Date(),
    priority: 'medium',
  },
]

const KanbanBoard: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(DEFAULT_CARDS)
  const [editingCard, setEditingCard] = useState<string | null>(null)

  const moveCard = useCallback((cardId: string, newColumn: ColumnType) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, column: newColumn } : card
      )
    )
  }, [])

  const deleteCard = useCallback((cardId: string) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId))
  }, [])

  const updateCard = useCallback((cardId: string, updates: Partial<Card>) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, ...updates } : card
      )
    )
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 text-neutral-50'>
      <h1 className='text-4xl font-bold mb-8 text-center'>
        Project Kanban Board
      </h1>
      <div className='flex gap-4 overflow-x-auto pb-4'>
        {(Object.keys(COLUMN_CONFIGS) as ColumnType[]).map((columnType) => (
          <Column
            key={columnType}
            column={columnType}
            cards={cards.filter((card) => card.column === columnType)}
            moveCard={moveCard}
            deleteCard={deleteCard}
            updateCard={updateCard}
            editingCard={editingCard}
            setEditingCard={setEditingCard}
          />
        ))}
        <AddCardButton setCards={setCards} />
      </div>
    </div>
  )
}

interface ColumnProps {
  column: ColumnType
  cards: Card[]
  moveCard: (cardId: string, newColumn: ColumnType) => void
  deleteCard: (cardId: string) => void
  updateCard: (cardId: string, updates: Partial<Card>) => void
  editingCard: string | null
  setEditingCard: React.Dispatch<React.SetStateAction<string | null>>
}

const Column: React.FC<ColumnProps> = ({
  column,
  cards,
  moveCard,
  deleteCard,
  updateCard,
  editingCard,
  setEditingCard,
}) => {
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const cardId = e.dataTransfer.getData('cardId')
    moveCard(cardId, column)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className='w-72 shrink-0 bg-neutral-800 rounded-lg p-4 shadow-xl'
    >
      <div className='flex justify-between items-center mb-4'>
        <h2 className={`text-xl font-semibold ${COLUMN_CONFIGS[column].color}`}>
          {COLUMN_CONFIGS[column].title}
        </h2>
        <span className='text-neutral-400 text-sm'>{cards.length} Cards</span>
      </div>
      <AnimatePresence>
        {cards.map((card) => (
          <KanbanCard
            key={card.id}
            card={card}
            deleteCard={deleteCard}
            updateCard={updateCard}
            isEditing={editingCard === card.id}
            setEditingCard={setEditingCard}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

interface CardProps {
  card: Card
  deleteCard: (cardId: string) => void
  updateCard: (cardId: string, updates: Partial<Card>) => void
  isEditing: boolean
  setEditingCard: React.Dispatch<React.SetStateAction<string | null>>
}

const KanbanCard: React.FC<CardProps> = ({
  card,
  deleteCard,
  updateCard,
  isEditing,
  setEditingCard,
}) => {
  const [localTitle, setLocalTitle] = useState(card.title)
  const [localDescription, setLocalDescription] = useState(
    card.description || ''
  )

  const handleSave = () => {
    updateCard(card.id, {
      title: localTitle,
      description: localDescription,
    })
    setEditingCard(null)
  }

  const getPriorityColor = () => {
    switch (card.priority) {
      case 'high':
        return 'border-red-500'
      case 'medium':
        return 'border-yellow-500'
      case 'low':
        return 'border-green-500'
      default:
        return 'border-neutral-700'
    }
  }

  const handleDragStart = (e: any) => {
    e.dataTransfer?.setData('cardId', card.id)
  }

  if (isEditing) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='bg-neutral-700 p-4 rounded-lg mb-2'
      >
        <input
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          className='w-full mb-2 p-2 bg-neutral-600 rounded text-neutral-50'
        />
        <textarea
          value={localDescription}
          onChange={(e) => setLocalDescription(e.target.value)}
          className='w-full mb-2 p-2 bg-neutral-600 rounded text-neutral-50 min-h-[100px]'
        />
        <div className='flex justify-between'>
          <button
            onClick={handleSave}
            className='flex items-center gap-2 bg-emerald-600 px-3 py-1 rounded'
          >
            <IconCircleCheck size={18} /> Save
          </button>
          <button
            onClick={() => setEditingCard(null)}
            className='flex items-center gap-2 bg-red-600 px-3 py-1 rounded'
          >
            <IconCircleX size={18} /> Cancel
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      draggable
      onDragStart={handleDragStart}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`bg-neutral-700 p-4 rounded-lg mb-2 cursor-grab border-l-4 ${getPriorityColor()}`}
    >
      <div className='flex justify-between items-start mb-2'>
        <h3 className='font-semibold text-neutral-100'>{card.title}</h3>
        <div className='flex gap-2'>
          <button
            onClick={() => setEditingCard(card.id)}
            className='text-neutral-400 hover:text-neutral-100'
          >
            <IconEdit size={18} />
          </button>
          <button
            onClick={() => deleteCard(card.id)}
            className='text-neutral-400 hover:text-red-500'
          >
            <IconTrash size={18} />
          </button>
        </div>
      </div>
      {card.description && (
        <p className='text-sm text-neutral-400'>{card.description}</p>
      )}
      <div className='flex justify-between mt-2 text-xs'>
        <span className='text-neutral-500'>
          {card.createdAt.toLocaleDateString()}
        </span>
        {card.priority && (
          <span
            className={`
            px-2 py-0.5 rounded
            ${
              card.priority === 'high'
                ? 'bg-red-500/20 text-red-400'
                : card.priority === 'medium'
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-green-500/20 text-green-400'
            }
          `}
          >
            {card.priority.toUpperCase()}
          </span>
        )}
      </div>
    </motion.div>
  )
}

interface AddCardButtonProps {
  setCards: React.Dispatch<React.SetStateAction<Card[]>>
}

const AddCardButton: React.FC<AddCardButtonProps> = ({ setCards }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')
  const [newCardPriority, setNewCardPriority] =
    useState<Card['priority']>('medium')

  const handleAddCard = () => {
    if (!newCardTitle.trim()) return

    const newCard: Card = {
      id: uuidv4(),
      title: newCardTitle.trim(),
      column: 'backlog',
      createdAt: new Date(),
      priority: newCardPriority,
    }

    setCards((prev) => [...prev, newCard])
    setNewCardTitle('')
    setIsAdding(false)
  }

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className='w-72 bg-neutral-700 rounded-lg p-4 text-neutral-400 hover:bg-neutral-600 transition-colors flex items-center justify-center gap-2'
      >
        <IconPlus size={20} /> Add New Card
      </button>
    )
  }

  return (
    <div className='w-72 bg-neutral-700 rounded-lg p-4'>
      <input
        value={newCardTitle}
        onChange={(e) => setNewCardTitle(e.target.value)}
        placeholder='Enter card title'
        className='w-full mb-2 p-2 bg-neutral-600 rounded text-neutral-50'
      />
      <select
        value={newCardPriority}
        onChange={(e) => setNewCardPriority(e.target.value as Card['priority'])}
        className='w-full mb-2 p-2 bg-neutral-600 rounded text-neutral-50'
      >
        <option value='low'>Low Priority</option>
        <option value='medium'>Medium Priority</option>
        <option value='high'>High Priority</option>
      </select>
      <div className='flex justify-between'>
        <button
          onClick={handleAddCard}
          className='flex items-center gap-2 bg-emerald-600 px-3 py-1 rounded'
        >
          <IconPlus size={18} /> Add
        </button>
        <button
          onClick={() => setIsAdding(false)}
          className='flex items-center gap-2 bg-red-600 px-3 py-1 rounded'
        >
          <IconCircleX size={18} /> Cancel
        </button>
      </div>
    </div>
  )
}

export default KanbanBoard
