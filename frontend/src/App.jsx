
import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';

const API_URL = '/api/cafeteria';

async function apiRequest(url, options = {}) {
  const response = await fetch(url, options);
  const body = await response.text();

  if (!response.ok) {
    throw new Error(body || `Request failed with status ${response.status}`);
  }

  if (!body) return null;

  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
}

// Navigation bar
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🍽️ Cafeteria Portal
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="navbar-nav ms-auto">
            <NavLink to="/" end className="nav-link">
              Home
            </NavLink>
            <NavLink to="/add" className="nav-link">
              Add
            </NavLink>
            <NavLink to="/display" className="nav-link">
              Display
            </NavLink>
            <NavLink to="/delete" className="nav-link">
              Delete
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Home page - bottom feature cards removed
function Home() {
  return (
    <div className="container home-container">
      <section className="hero-card">
        <span className="eyebrow">CAFETERIA MANAGEMENT SYSTEM</span>

        <h1>Welcome to the Cafeteria Portal</h1>

        <p>
          Manage cafeteria information easily through a simple,
          modern and responsive portal.
        </p>

        <div className="d-flex flex-wrap gap-3 mt-4">
          <Link to="/add" className="btn btn-primary btn-lg">
            + Add Cafeteria
          </Link>

          <Link to="/display" className="btn btn-outline-primary btn-lg">
            View Records
          </Link>
        </div>
      </section>
    </div>
  );
}

// Add cafeteria form - no ID field
const initialForm = {
  cafeteriaName: '',
  building: '',
  seatingCapacity: '',
  open: 'true',
};

function AddCafeteria() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage(null);

    const cafeteriaName = form.cafeteriaName.trim();
    const building = form.building.trim();
    const capacity = Number(form.seatingCapacity);

    if (!cafeteriaName || !building || !form.seatingCapacity.trim()) {
      setMessage({
        type: 'danger',
        text: 'Please fill in all required fields.',
      });
      return;
    }

    if (cafeteriaName.length > 100 || building.length > 100) {
      setMessage({
        type: 'danger',
        text: 'Name and building must not exceed 100 characters.',
      });
      return;
    }

    if (
      !Number.isInteger(capacity) ||
      capacity < 1 ||
      capacity > 10000
    ) {
      setMessage({
        type: 'danger',
        text: 'Seating capacity must be a whole number from 1 to 10000.',
      });
      return;
    }

    setLoading(true);

    try {
      await apiRequest(`${API_URL}/Add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cafeteriaName,
          building,
          seatingCapacity: capacity,
          open: form.open === 'true',
        }),
      });

      setMessage({
        type: 'success',
        text: 'Cafeteria added successfully!',
      });

      setForm({ ...initialForm });
    } catch (error) {
      setMessage({
        type: 'danger',
        text: `Failed to add cafeteria: ${error.message}. Check the backend connection.`,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container page-container">
      <div className="form-card">
        <span className="eyebrow">NEW RECORD</span>
        <h2>Add Cafeteria</h2>
        <p className="text-secondary mb-4">
          Enter the details to register a cafeteria.
        </p>

        {message && (
          <div className={`alert alert-${message.type}`} role="alert">
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="cafeteriaName" className="form-label">
              Cafeteria Name *
            </label>
            <input
              id="cafeteriaName"
              className="form-control"
              name="cafeteriaName"
              value={form.cafeteriaName}
              onChange={handleChange}
              placeholder="Enter cafeteria name"
              maxLength={100}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="building" className="form-label">
              Building *
            </label>
            <input
              id="building"
              className="form-control"
              name="building"
              value={form.building}
              onChange={handleChange}
              placeholder="Enter building name"
              maxLength={100}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="seatingCapacity" className="form-label">
              Seating Capacity *
            </label>
            <input
              id="seatingCapacity"
              className="form-control"
              type="number"
              name="seatingCapacity"
              value={form.seatingCapacity}
              onChange={handleChange}
              placeholder="Enter seating capacity"
              min="1"
              max="10000"
              step="1"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="open" className="form-label">
              Status *
            </label>
            <select
              id="open"
              className="form-select"
              name="open"
              value={form.open}
              onChange={handleChange}
              required
            >
              <option value="true">Open</option>
              <option value="false">Closed</option>
            </select>
          </div>

          {/* ID is intentionally excluded. Backend generates it. */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Cafeteria'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Reusable records table
function CafeteriaTable({ records, onDelete, deletingId }) {
  if (records.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">▤</div>
        <h5>No cafeteria records found</h5>
        <p>Add a cafeteria to see records here.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cafeteria Name</th>
            <th>Building</th>
            <th>Seating Capacity</th>
            <th>Status</th>
            {onDelete && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {records.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td className="fw-semibold">{item.cafeteriaName}</td>
              <td>{item.building}</td>
              <td>{item.seatingCapacity}</td>
              <td>
                <span
                  className={`status-badge ${
                    item.open ? 'status-open' : 'status-closed'
                  }`}
                >
                  {item.open ? 'Open' : 'Closed'}
                </span>
              </td>

              {onDelete && (
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    disabled={deletingId === item.id}
                    onClick={() => onDelete(item)}
                  >
                    {deletingId === item.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Display and Delete pages
function RecordsPage({ allowDelete = false }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  async function loadRecords() {
    setLoading(true);
    setError('');

    try {
      // Exact mapping from your Spring Boot controller
      const data = await apiRequest(`${API_URL}/DisplayAll`);

      if (!Array.isArray(data)) {
        throw new Error('Expected a list of cafeteria records from the API.');
      }

      setRecords(data);
    } catch (err) {
      setError(
        `${err.message}. Check that Spring Boot is running on port 8081.`
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecords();
  }, []);

  async function handleDelete(item) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.cafeteriaName}" (ID: ${item.id})?`
    );

    if (!confirmed) return;

    setDeletingId(item.id);
    setError('');
    setMessage('');

    try {
      // Exact mapping from your Spring Boot controller
      await apiRequest(`${API_URL}/Delete/${item.id}`, {
        method: 'DELETE',
      });

      setRecords((previous) =>
        previous.filter((record) => record.id !== item.id)
      );

      setMessage(`"${item.cafeteriaName}" deleted successfully.`);
    } catch (err) {
      setError(`Delete failed: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="container page-container">
      <div className="records-card">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div>
            <span className="eyebrow">
              {allowDelete ? 'RECORD MANAGEMENT' : 'CAFETERIA DIRECTORY'}
            </span>
            <h2 className="page-title">
              {allowDelete ? 'Delete Cafeteria' : 'All Cafeterias'}
            </h2>
            <p className="text-secondary mb-0">
              {allowDelete
                ? 'Choose a record to remove.'
                : 'View all registered cafeteria records.'}
            </p>
          </div>

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={loadRecords}
            disabled={loading}
          >
            {loading ? 'Loading...' : '↻ Refresh'}
          </button>
        </div>

        {message && (
          <div className="alert alert-success" role="status">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            <div>{error}</div>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger mt-2"
              onClick={loadRecords}
              disabled={loading}
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading cafeteria records...</p>
          </div>
        ) : (
          <>
            {!error && (
              <p className="text-secondary small">
                Total records: {records.length}
              </p>
            )}

            <CafeteriaTable
              records={records}
              onDelete={allowDelete ? handleDelete : null}
              deletingId={deletingId}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddCafeteria />} />
          <Route path="/display" element={<RecordsPage />} />
          <Route path="/delete" element={<RecordsPage allowDelete />} />
          <Route
            path="*"
            element={
              <div className="container page-container">
                <h2>Page not found</h2>
                <Link to="/">Return Home</Link>
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="app-footer">
        Cafeteria Management System | React + Spring Boot
      </footer>
    </>
  );
}
