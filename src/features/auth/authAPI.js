// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      // Handle other errors like network failure, etc.
      reject(error);
    }
  });
}

// A mock function to mimic making an async request for data
export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/check");
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      }else{
        reject(response.error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function signOut() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/logout");
      if (response.ok) {
        resolve({ data: "success" });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function resetPasswordRequest(emailInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/reset-password-request", {
        method: "POST",
        body: JSON.stringify(emailInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function resetPassword(password) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(password),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function updateUser(user) {
  return new Promise(async (resolve) => {
    const response = await fetch("/auth/updteuser/" + user.id, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}



export function signupRequest(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/signup-request", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      // Handle other errors like network failure, etc.
      reject(error);
    }
  });
}