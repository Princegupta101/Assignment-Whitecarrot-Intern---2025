export default function DateFilter({ value, onChange }) {
    return (
      <div className="flex items-center space-x-2">
        <label htmlFor="date-filter" className="text-sm font-medium text-gray-700">
          Filter by Date:
        </label>
        <input
          type="date"
          id="date-filter"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-md border text-black border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    )
  }