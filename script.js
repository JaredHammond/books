const displayController = (() => {
    const showBookCards = (lib) => {
        let cards = [];
        lib.forEach(book => {
            cards.push(domConductor.makeInfoCard(book));
        })
        domConductor.appendCards(cards);
    }

    const showForm = () => {
        domConductor.grabFormElements
    }

    return {
        showBookCards,
    }

})();

const domConductor = (() => {

    let content = document.getElementById('content');
    let cardArea = document.getElementById('card-area');

    // Creates the actual dom object and returns them
    const create = (type) => {
        return document.createElement(type);
    }

    function setAttributes(el, attr) {
        for (key in attr) {
            el.setAttribute(key, attr[key]);
        }
    }

    const appendCards = (cards) => {
        cards.forEach(card => cardArea.appendChild(card));
    }

    const resetCardArea = () => {
        while (cardArea.firstChild) {
            cardArea.removeChild(cardArea.lastChild);
        }
    }

    const createForm = () => {

        let newBookButton = grabFormButton();
        content.removeChild(newBookButton);

        const newBookForm = create('form');

        const titleLabel = create('label');
        titleLabel.setAttribute('for','title');
        titleLabel.innerText = 'Title';
        newBookForm.appendChild(titleLabel);
        
        const titleBox = create('input');
        setAttributes(titleBox, {'id':'title', 'type':'text', 'required':''});
        newBookForm.appendChild(titleBox);
    
        const authorLabel = create('label');
        authorLabel.setAttribute('for','author');
        authorLabel.innerText = 'Author';
        newBookForm.appendChild(authorLabel);
    
        const authorBox = create('input');
        setAttributes(authorBox, {'id':'author', 'type':'text', 'required':''});
        newBookForm.appendChild(authorBox);

        const readLabel = create('lavel')
        readLabel.setAttribute('for','read');
        readLabel.innerText = 'Have read?';
        newBookForm.appendChild(readLabel);

        const readInput = create('input')
        setAttributes(readInput, {'id':'read', 'type':'checkbox'});
        newBookForm.appendChild(readInput);
        
        const submitButton = create('button');
        submitButton.innerText = 'Add Book';
        newBookForm.appendChild(submitButton);

        cardArea.appendChild(newBookForm);
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
        cardAuthor.innerText = 'By: ' + bookObj.author;
        card.appendChild(cardAuthor);

        const cardRead = create('p');
        bookObj.read ? cardRead.innerText = 'Yes' : cardRead.innerText = 'No'
        card.appendChild(cardRead);

        return card;
    }

    const grabFormButton = () => {
        let button = document.getElementById('new-book');
        return button;
    }

    return {
        create,
        grabFormElements,
        makeInfoCard,
        appendCards,
        grabFormButton,
        resetCardArea,
        createForm,
    }
})();

const libraryManager = (() => {
    let library = [];
    
    const updateLibrary = () => {
        library = storageController.retrieveLibrary();
        return library;
    }

    const getLibrary = () => {
        return library;
    }

    const addToLibrary = (title, author, haveRead) => {
        library.push(new Book(title, author, haveRead))
        storageController.storeLibrary(library);
    }

    return {
        getLibrary,
        addToLibrary,
        updateLibrary,
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
        let lib = libraryManager.updateLibrary();
        domConductor.initDomObjects;
        displayController.showBookCards(lib);
        newBookButtonEvent()
    }

    const newBookButtonEvent = () => {
        let button = domConductor.grabFormButton();
        button.addEventListener('click', (e) => {
            e.preventDefault();
            let form = domConductor.createForm();
            
        })
    }

    const submitBook = () => {
        let form = domConductor.grabFormElements();
        libraryManager.addToLibrary(form[0], form[1], form[2]);
        domConductor.resetCardArea();
        
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

// Baseline items to populate window
libraryManager.addToLibrary('The Hobbit', 'J.R.R. Tolkien', false);
libraryManager.addToLibrary('The Giver', 'Lois Lowry', true);

eventHandler.initialize();