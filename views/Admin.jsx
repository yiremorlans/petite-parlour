import React from 'react';

function Admin(props) {
  const { requests } = props;
  return (
    <>
     <head>
         <link rel="stylesheet" href="./style.css" type='text/css'/>
     </head>
     <body>
        <div className='container'>
          <h1>Service Requests</h1>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id}>
                  <td>{request.date}</td>
                  <td>{request.time}</td>
                  <td>{request.name}</td>
                  <td>{request.email}</td>
                  <td>{request.phone}</td>
                  <td>{request.service}</td>
                  <td>{request.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
     </body>
    </>
  );
}

module.exports = Admin;
