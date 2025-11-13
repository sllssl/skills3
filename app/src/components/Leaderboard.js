
import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        console.log('Leaderboard API endpoint:', endpoint);
        console.log('Fetched data:', json);
        setData(json.results || json);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div>
      <h2 className="mb-4 display-5">Leaderboard</h2>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Show Info Modal</button>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Leaderboard Overview</h5>
          <p className="card-text">This section displays the leaderboard from the Octofit backend API.</p>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              {headers.map(h => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item.id || idx}>
                {headers.map(h => <td key={h}>{item[h]?.toString()}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{background: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Leaderboard Info</h5>
                <button type="button" className="close btn" onClick={() => setShowModal(false)}>&times;</button>
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

export default Leaderboard;
