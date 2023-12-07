export function addRegister(register) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/registers", {
        method: "POST",
        body: JSON.stringify(register),
        headers: { "content-type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to add register");
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function findRegister(userProduct) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/registers/getRegisters", {
        method: "POST",
        body: JSON.stringify(userProduct),
        headers: { "content-type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch registers");
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function findallRegister(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/registers/getallRegisters", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "content-type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch registers");
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}


export function UpdateRegister(register) {
  return new Promise(async (resolve) => {
    const response = await fetch("/registers/"+register.id, {
      method: "PATCH",
      body: JSON.stringify(register),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}

export function fetchtopBidders(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/registers/topBidders/"+id);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchallmessages(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/registers/allmessages/"+id);
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchallregisters() {
  return new Promise(async (resolve) => {
    const response = await fetch("/registers/allregisters/");
    const data = await response.json();
    resolve({ data });
  });
}
