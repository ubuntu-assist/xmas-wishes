import './style.css'

const defaultAvatars = [
  { id: 36, name: 'Jane Richmond' },
  { id: 55, name: 'Gordon Smith' },
  { id: 14, name: 'Harris Jackson' },
  { id: 15, name: 'Dave Rogers' },
  { id: 16, name: 'Naria López' },
  { id: 17, name: 'Simon Martins' },
  { id: 18, name: 'Bob Raymond' },
  { id: 19, name: 'Sarah Durst' },
  { id: 45, name: 'Elizabeth Riches' },
  { id: 54, name: 'Angel Dimi' },
  { id: 49, name: 'Sally Broadman' },
  { id: 8, name: 'Phil Davis' },
  { id: 9, name: 'Joleen Hampton' },
  { id: 7, name: 'Roger Fields' },
]

const HexagonalProfileGallery = ({
  avatars = defaultAvatars,
  baseUrl = 'https://i.pravatar.cc/300?img=',
}) => {
  return (
    <div className='gallery'>
      {avatars.map((avatar) => (
        <div
          key={avatar.id}
          className='avatar'
          style={
            {
              '--img': `url('${baseUrl}${avatar.id}')`,
            } as React.CSSProperties
          }
          title={avatar.name}
        />
      ))}
    </div>
  )
}

export default HexagonalProfileGallery
