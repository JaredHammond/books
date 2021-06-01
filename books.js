let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}
addToLibrary('The Hobbit', 'J.R.R. Tolkien', 456, false);
addToLibrary('The Giver', 'Some Guy', 100, true);
console.log(myLibrary);

const cardArea = document.getElementById('card-area');

myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    
    const cardTitle = document.createElement('p');
    cardTitle.innerText = "Title: " + book.title;
    card.appendChild(cardTitle);

    const cardAuthor = docuemnt.createElement('p');
    cardAuthor

    cardArea.appendChild(card);
})