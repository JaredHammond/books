let myLibrary = [];

function Book(title, author) {
    this.title = title;
    this.author = author;
}

function addToLibrary(title, author) {
    let newBook = new Book(title, author);
    myLibrary.push(newBook);
}

function setAttributes(el, attr) {
    for (key in attr) {
        el.setAttribute(key, attr[key]);
    }
}

function submitBook() {
    const newTitle = titleBox.value;
    const newAuthor = authorBox.value;

    addToLibrary(newTitle, newAuthor);
    saveBooks();
}

function showForm() {
    document.body.removeChild(newBookButton);
    const newBookForm = document.createElement('form');

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for','title');
    titleLabel.innerText = 'Title';
    newBookForm.appendChild(titleLabel);
    
    const titleBox = document.createElement('input');
    setAttributes(titleBox, {'name':'title', 'type':'text', 'required':''});
    newBookForm.appendChild(titleBox);

    const authorLabel = document.createElement('label');
    authorLabel.setAttribute('for','author');
    authorLabel.innerText = 'Author';
    newBookForm.appendChild(authorLabel);

    const authorBox = document.createElement('input');
    setAttributes(authorBox, {'name':'author', 'type':'text', 'required':''});
    newBookForm.appendChild(authorBox);
    
    cardArea.appendChild(newBookForm);

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Add Book';
    submitButton.addEventListener('click', submitBook);
    cardArea.appendChild(submitButton);
}


const cardArea = document.getElementById('card-area');

function initialize() {
        retrieveBooks();

        myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('book-card');
        
        const cardTitle = document.createElement('p');
        cardTitle.innerText = "Title: " + book.title;
        card.appendChild(cardTitle);
        
        const cardAuthor = document.createElement('p');
        cardAuthor.innerText = 'By: ' + book.author;
        card.appendChild(cardAuthor);
        
        const cardRead = document.createElement('p');
        book.read ? cardRead.innerText = 'Yes' : cardRead.innerText = 'No'
        card.appendChild(cardRead);
        
        cardArea.appendChild(card);
    })
}

const saveBooks = () => {
    let books = JSON.stringify(myLibrary);
    localStorage.setItem('books', books);
}

const retrieveBooks = () => {
    try {
        let books = JSON.parse('books');
        myLibrary = books;
    } catch {
        return;
    }
}

const newBookButton = document.getElementById('new-book');
newBookButton.addEventListener('click', showForm);


addToLibrary('The Hobbit', 'J.R.R. Tolkien', 456, false);
addToLibrary('The Giver', 'Lois Lowry', 100, true);
initialize();