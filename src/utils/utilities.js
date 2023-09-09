async function generateID() {
    let id = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return id;
}

module.exports = { generateID }