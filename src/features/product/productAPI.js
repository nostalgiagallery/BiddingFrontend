export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("/products");
    const data = await response.json();
    resolve({ data });
  });
}


export function addProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}

export function EditProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/" + product.id, {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}



export function addTicket(ticket) {
  return new Promise(async (resolve) => {
    const response = await fetch("/tickets", {
      method: "POST",
      body: JSON.stringify(ticket),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}
