async function getProducts() {
    const data = await fetch('/api/productos').then(res => res.json()).then(data => { return data })

    const table = document.querySelector('#products-table tbody')

    if (data.length > 0) {
        data.forEach(product => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>$${product.price}</td>
                <td>
                    <a meta-id="${product.id}" onclick="viewProduct(this)" id="viewProduct" href="#">Ver Detalles</a>
                    <a meta-id="${product.id}" onclick="editProduct(this)" id="editProduct" href="#">Editar</a>
                    <a meta-id="${product.id}" onclick="deleteProduct(this)" id="deleteProduct" href="#">Eliminar</a>
                </td>
            `
            table.appendChild(tr)
        })
    }
}

getProducts()

async function addProduct(name, description, price, e) {
    e.preventDefault()
    const data = await fetch('/api/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price, description })
    })

    const form = document.getElementById('add-product-form')
    form.setAttribute('style', 'display: none')

    location.reload()

    return data
}

async function deleteProduct(id) {
    const data = await fetch(`/api/productos/${id}`, {
        method: 'DELETE'
    }).then(res => res.json()).then(data => { return data })
    console.log(data)
    return data
}

function showForm() {
    const form = document.getElementById('add-product-form')

    form.setAttribute('style', 'display: block')
}

async function viewProduct(e) {
    const id = e.getAttribute('meta-id')
    await fetch(`/api/productos/${id}`, {
        method: 'GET'
    }).then(async res => {
        const data = await res.json()

        const modal = document.getElementById('view-modal')

        modal.innerHTML = `
            <div class="view-modal-content">
                <h2 id="view-modal-title">Nombre del producto: ${data.name}</h2>
                <p id="view-modal-description">Descripción: ${data.description}</p>
                <p id="view-modal-price">Precio: $${data.price}</p>
            </div>
        `

        modal.setAttribute('style', 'display: block')
    })
}

async function deleteProduct(e) {
    const productId = e.getAttribute('meta-id');
    const modal = document.getElementById('delete-modal');

    await fetch(`/api/productos/${productId}`, {
        method: 'DELETE'
    }).then(async res => {
        if (res.status === 204) {
            modal.innerHTML = `
                <div class="delete-modal-content">
                    <h2 id="delete-modal-title">Producto eliminado exitosamente.</h2>
                </div>
            `;
            modal.setAttribute('style', 'display: block');  

            setTimeout(() => {
                location.reload();
            }, 2000);
        } else {
            modal.innerHTML = `
                <div class="delete-modal-content">
                    <h2 id="delete-modal-title">Error al eliminar el producto.</h2>
                </div>
            `;
            modal.setAttribute('style', 'display: block');

            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    });
}

async function editProduct(e) {
    const modal = document.getElementById('edit-modal')
    const id = e.getAttribute('meta-id')

    await fetch(`/api/productos/${id}`, {
        method: 'GET'
    }).then(async res => {
        const data = await res.json()

        modal.innerHTML = `
            <div class="edit-modal-content">
                <h2 id="edit-modal-title">Editar producto</h2>
                <form id="edit-product-form">
                    <label for="name">Nombre</label>
                    <input type="text" name="name" id="newName" value="${data.name}">
                    <label for="description">Descripción</label>
                    <input type="text" name="description" id="newDescription" value="${data.description}">
                    <label for="price">Precio</label>
                    <input type="number" name="price" id="newPrice" value="${data.price}">
                    <button type="submit" onclick="updateProduct('${data.id}', event)">Actualizar</button>
                </form>
            </div>
        `

        modal.setAttribute('style', 'display: block')
    })
}

async function updateProduct(id, e) {
    e.preventDefault()
    const name = document.getElementById('newName').value
    const description = document.getElementById('newDescription').value
    const price = document.getElementById('newPrice').value

    const data = await fetch(`/api/productos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, price })
    }).then(res => res.json()).then(data => { return data })

    console.log(data)

    const modal = document.getElementById('edit-modal')
    modal.setAttribute('style', 'display: none')

    location.reload()

    return data
}
