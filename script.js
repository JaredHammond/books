const displayController = (() => {
    

})();

const domConductor = (() => {

    // Creates the actual dom object and returns them
    const create = (type) => {
        return document.createElement(type);
    }

    const grabFormElements = () => {
        formTitle = document.getElementById('title-input');
        formAuthor = document.getElementById('author-input');
        formHaveRead = document.getElementById('read-input');

        return [formTitle,formAuthor,formHaveRead];
    }

    const makeInfoCard = (bookObj) => {
        const card = create('div');
        card.classList.add('book-card');

        const cardTitle = create('p');
        cardTitle.innerText = "Title: " + bookObj.title;
        card.appendChild(cardTitle);

        const cardAuthor = create('p');
        cardAuthor.innerText = 'By: ' + book.author;
        card.appendChild(cardAuthor);

        const cardRead = create('p');
        bookObj.read ? cardRead.innerText = 'Yes' : cardRead.innerText = 'No'
        card.appendChild(cardRead);

        return card;
    }

    



    return {
        create,
        grabFormElements,
        makeInfoCard,
    }
})();

const libraryManager = (() => {
    let library = [];
    
    const updateLibrary = () => {
        const lib = storageController.retrieveLibrary();
        
    }

    const getLibrary = () => {
        return library;
    }

    const addToLibrary = (title, author, haveRead) => {
        library.push(new Book(title, author, haveRead))
        storageController.storeLibrary(library);
        updateLibrary();
    }

    return {
        getLibrary,
        addToLibrary,

    }
})();

class Book {
    constructor(title, author, haveRead) {
        this.title = title,
        this.author = author,
        this.haveRead = haveRead
    };

    changeRead() {
        this.haveRead = !this.haveRead
    }
}

const eventHandler = (function() {
    
    // Get books and feed them to diplay controller which
    const initialize = () => {
        // Grab books from
        const lib = storageController.retrieveLibrary();
        lib.forEach(book => libraryManager.addToLibrary(book));

    }

    const submitBook = () => {
        
    }

    return {
        initialize,
        submitBook,
    }
})();

const storageController = (() => {
    const storeLibrary = (library) => {
        let books = JSON.stringify(library);
        localStorage.setItem('books', books);
    }

    const retrieveLibrary = () => {
        try {
            let retrieved = localStorage.getItem('books');
            let books = JSON.parse(retrieved)
            return books;
        } catch {
            return [];
        }
    }

    return {
        storeLibrary,
        retrieveLibrary,
    }
})();

eventHandler.initialize();