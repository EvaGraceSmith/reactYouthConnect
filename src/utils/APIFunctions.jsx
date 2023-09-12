export const createRoom = async (payload, user) => {
    const method = 'POST';
    const url = 'https://youth-connect-server.onrender.com/api/v1/rooms';
    const action = 'CREATING ROOM';
    let headers = new Headers();
    const body = {
      name: payload.name,
      users: payload.users,
      description: payload.description,
      minimumAge: payload.minimumAge,
      maxAge: payload.maxAge,
    };
    headers.set('Authorization', `Bearer ${user.token}`);
    headers.set('Content-Type', 'application/json');
    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log('Data from create room', data);
      return data;
    } catch (error) {
      console.log('ERROR ', action, ':', error);
    }
  };
  
  export const getRooms = async user => {
    const method = 'GET';
    const url = 'https://youth-connect-server.onrender.com/api/v1/rooms';
    const action = 'GETTING ROOMS';
    let headers = new Headers();
    const body = {};
    headers.set('Authorization', `Bearer ${user.token}`);
    headers.set('Content-Type', 'application/json');
    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('ERROR ', action, ':', error);
    }
  };
  
  export const deleteRoom = async (id, user) => {
    const method = 'DELETE';
    const url = `https://youth-connect-backend.onrender.com/api/v1/rooms/${id}`;
    const action = 'DELETING ROOM';
    let headers = new Headers();
    const body = {};
    headers.set('Authorization', `Bearer ${user.token}`);
    headers.set('Content-Type', 'application/json');
    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('ERROR ', action, ':', error);
    }
  };
  
  export const deleteMessage = async (id, user) => {
    const method = 'DELETE';
    const url = `https://youth-connect-server.onrender.com/api/v1/messages/${id}`;
    const action = 'DELETING MESSAGE';
    let headers = new Headers();
    const body = {};
    headers.set('Authorization', `Bearer ${user.token}`);
    headers.set('Content-Type', 'application/json');
    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('ERROR ', action, ':', error);
    }
  };
  
  export const updateRoom = async (payload, user) => {
    const method = 'PUT';
    const url = `https://youth-connect-server.onrender.com/api/v1/rooms/${payload.room}`;
    const action = 'UPDATING ROOM';
    let headers = new Headers();
    const body = {
      name: payload.room,
      users: payload.users,
      description: payload.description,
      minimumAge: payload.minimumAge,
      maxAge: payload.maxAge,
    };
    headers.set('Authorization', `Bearer ${user.token}`);
    headers.set('Content-Type', 'application/json');
    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('ERROR ', action, ':', error);
    }
  };
  
  export const createUser = async payload => {
    const method = 'POST';
    const url = 'https://youth-connect-server.onrender.com/signup';
    const action = 'CREATING USER';
    let headers = new Headers();
    const body = {
      username: payload.username,
      password: payload.password,
      DOB: payload.DOB,
    };
    headers.set('Content-Type', 'application/json');
    let newUser;
    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });
      const data = await response.json();
      newUser = data.user;
      return newUser;
    } catch (error) {
      console.log('ERROR ', action, ':', error);
    }
  };
  
  export const getUsers = async user => {
    const method = 'GET';
    const url = 'https://youth-connect-server.onrender.com/api/v1/users';
    const action = 'GETTING USERS';
    let headers = new Headers();
    const body = {};
    headers.set('Authorization', `Bearer ${user.token}`);
    headers.set('Content-Type', 'application/json');
    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('ERROR ', action, ':', error);
    }
  };
  