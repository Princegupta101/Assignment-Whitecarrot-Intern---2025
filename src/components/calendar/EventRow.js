export default function EventRow({ event }) {
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }
  
    const formatTime = (dateString) => {
      return new Date(dateString).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit'
      })
    }
  
    return (
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{event.summary}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">
            {formatDate(event.start.dateTime || event.start.date)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">
            {event.start.dateTime ? formatTime(event.start.dateTime) : 'All Day'}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">
            {event.location || 'No location'}
          </div>
        </td>
      </tr>
    )
  }