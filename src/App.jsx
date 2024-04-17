import  { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const baseUrl = 'https://jsonplaceholder.typicode.com/users';
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch users data
  useEffect(() => {
    axios.get(baseUrl)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or edit a user
  const handleSubmit = () => {
    if (editMode) {
      // Edit mode
      axios.put(`${baseUrl}/${editId}`, formData)
        .then((res) => {
          const updatedUsers = users.map((user) =>
            user.id === editId ? res.data : user
          );
          setUsers(updatedUsers);
          setFormData({ name: '', email: '', phone: '' });
          setEditMode(false);
          setEditId(null);
        })
        .catch((error) => console.error('Error updating user:', error));
    } else {
      // Add mode
      axios.post(baseUrl, formData)
        .then((res) => {
          setUsers([...users, res.data]);
          setFormData({ name: '', email: '', phone: '' });
        })
        .catch((error) => console.error('Error adding user:', error));
    }
  };

  // Delete a user
  const deleteUser = (id) => {
    axios.delete(`${baseUrl}/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  // Edit a user
  const editUser = (user) => {
    setFormData({ name: user.name, email: user.email, phone: user.phone });
    setEditMode(true);
    setEditId(user.id);
  };

  return (
    <div className="container mt-5">
         <h2 className="mt-5">{editMode ? 'Edit User' : 'Add User'}</h2>
      <div className="row align-items-center">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control "
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="email"
            className="form-control "
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="tel"
            className="form-control "
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-success " onClick={handleSubmit}>
        {editMode ? 'Update User' : 'Add User'}
      </button>
        </div>
      </div>
      
      <h1 className="mb-4">Users</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          {users.map((user) => (
            <div className="col-md-4 mb-3" key={user.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">Email: {user.email}</p>
                  <p className="card-text">Phone: {user.phone}</p>
                  <div className='d-flex align-items-center justify-content-cente'>
                    <button className="btn btn-danger mx-4 mr-2" onClick={() => deleteUser(user.id)}>Delete</button>
                  <button className="btn btn-primary" onClick={() => editUser(user)}>Edit</button>
                  </div>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
   
    </div>
  );
}

export default App;
