
import React, { useEffect, useState } from 'react';

const Users = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        console.log('Users API endpoint:', endpoint);
        console.log('Fetched data:', json);
        setData(Array.isArray(json) ? json : (json.results || []));
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [endpoint]);

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="display-5 fw-bold text-primary">Users</h2>
        <button className="btn btn-outline-primary" onClick={() => setShowModal(true)}>
          <i className="bi bi-info-circle me-2"></i>Show Info
        </button>
      </div>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">Users Overview</h5>
          <p className="card-text">This section displays all users from the Octofit backend API.</p>
        </div>
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-primary">
                <tr>
                  {headers.map(h => <th key={h} className="text-capitalize">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr><td colSpan={headers.length} className="text-center">No users found.</td></tr>
                ) : (
                  data.map((item, idx) => (
                    <tr key={item.id || idx}>
                      {headers.map(h => <td key={h}>{item[h]?.toString()}</td>)}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{background: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Users Info</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>This modal uses Bootstrap styles and can be used for more info or actions.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
