document.getElementById('passwordForm') ?.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const website = document.getElementById('website').value;

    const password = generatePassword(name, website);

    document.getElementById('result').innerText = `Generated Password: ${password}`;

    storePassword(name, website, password);
});

function generatePassword(name, website) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = name + website;

    for (let i = 0; i < 8; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
}

function storePassword(name, website, password) {
    const storedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
    storedPasswords.push({ name, website, password });
    localStorage.setItem('passwords', JSON.stringify(storedPasswords));
}

function displayStoredPasswords() {
    const storedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
    const passwordList = document.getElementById('passwordList');
    passwordList.innerHTML = '';
    storedPasswords.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerText = `Name: ${item.name}, Website: ${item.website}, Password: ${item.password}`;
        passwordList.appendChild(listItem);
    });
}

// Display stored passwords on page load if passwordList exists
if (document.getElementById('passwordList')) {
    displayStoredPasswords();
}