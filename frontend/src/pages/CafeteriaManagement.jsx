
import { useEffect, useState } from 'react'

function CafeteriaManagement() {
  const [cafeteriaName, setCafeteriaName] = useState('')
  const [building, setBuilding] = useState('')
  const [seatingCapacity, setSeatingCapacity] = useState('')
  const [open, setOpen] = useState('true')
  const [cafeterias, setCafeterias] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const API_URL = 'http://localhost:8081/cafeteria'

  const loadCafeterias = async () => {
    try {
      const response = await fetch(`${API_URL}/displayall`)
      if (!response.ok) throw new Error()
      const data = await response.json()
      setCafeterias(data)
    } catch {
      setMessage('Unable to load records. Check backend connection.')
    }
  }

  useEffect(() => {
    loadCafeterias()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/Add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cafeteriaName: cafeteriaName.trim(),
          building: building.trim(),
          seatingCapacity: Number(seatingCapacity),
          open: open === 'true',
        }),
      })

      if (!response.ok) throw new Error()

      setMessage('Cafeteria added successfully!')
      setCafeteriaName('')
      setBuilding('')
      setSeatingCapacity('')
      setOpen('true')
      await loadCafeterias()
    } catch {
      setMessage('Failed to add cafeteria. Check backend and CORS.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this cafeteria?')) return

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(`${API_URL}/Delete/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error()

      setMessage('Cafeteria deleted successfully!')
      await loadCafeterias()
    } catch {
      setMessage('Failed to delete cafeteria.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Cafeteria Management</h1>
        <p>Add, display and delete cafeteria records.</p>

        {message && <p role="status">{message}</p>}

        <h2>Add Cafeteria</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Cafeteria Name</label>
            <input
              className="form-control"
              value={cafeteriaName}
              onChange={(e) => setCafeteriaName(e.target.value)}
              placeholder="Enter cafeteria name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Building</label>
            <input
              className="form-control"
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              placeholder="Enter building name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Seating Capacity</label>
            <input
              type="number"
              className="form-control"
              value={seatingCapacity}
              onChange={(e) => setSeatingCapacity(e.target.value)}
              placeholder="Enter seating capacity"
              min="1"
              step="1"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Open Status</label>
            <select
              className="form-select"
              value={open}
              onChange={(e) => setOpen(e.target.value)}
              required
            >
              <option value="true">Open</option>
              <option value="false">Closed</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn-main"
            disabled={loading}
          >
            {loading ? 'Please wait...' : 'Add Cafeteria'}
          </button>
        </form>

        <h2>All Cafeterias</h2>

        {cafeterias.length === 0 ? (
          <p>No cafeteria records available.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Building</th>
                  <th>Capacity</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cafeterias.map((cafeteria) => (
                  <tr key={cafeteria.id}>
                    <td>{cafeteria.id}</td>
                    <td>{cafeteria.cafeteriaName}</td>
                    <td>{cafeteria.building}</td>
                    <td>{cafeteria.seatingCapacity}</td>
                    <td>{cafeteria.open ? 'Open' : 'Closed'}</td>
                    <td>
                      <button
                        type="button"
                        className="btn-main"
                        onClick={() => handleDelete(cafeteria.id)}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default CafeteriaManagement
