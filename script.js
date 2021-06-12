const displayController = (() => {
    // Puts each book into a DOM object called a card and sends them to the DOM Conductor to be displayed
    const showBookCards = (lib) => {
        let cards = [];
        lib.forEach(book => {
            cards.push(domConductor.makeInfoCard(book));
        })
        domConductor.appendCards(cards);
    }

    return {
        showBookCards,
    }

})();

const domConductor = (() => {
    // Module variables
    let content = document.getElementById('content');
    let cardArea = document.getElementById('card-area');

    // Creates the actual dom object and returns them
    const create = (type) => {
        return document.createElement(type);
    }

    // Accepts a standard object with key:attribute pairs and applies them to the element 'el'
    function setAttributes(el, attr) {
        for (key in attr) {
            el.setAttribute(key, attr[key]);
        }
    }

    const addToContent = (el) => {
        content.appendChild(el);
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
        titleLabel.setAttribute('for','title-input');
        titleLabel.innerText = 'Title';
        newBookForm.appendChild(titleLabel);
        
        const titleBox = create('input');
        setAttributes(titleBox, {'id':'title-input', 'type':'text', 'required':''});
        newBookForm.appendChild(titleBox);
    
        const authorLabel = create('label');
        authorLabel.setAttribute('for','author-input');
        authorLabel.innerText = 'Author';
        newBookForm.appendChild(authorLabel);
    
        const authorBox = create('input');
        setAttributes(authorBox, {'id':'author-input', 'type':'text', 'required':''});
        newBookForm.appendChild(authorBox);

        const readLabel = create('lavel')
        readLabel.setAttribute('for','read-input');
        readLabel.innerText = 'Have read?';
        newBookForm.appendChild(readLabel);

        const readInput = create('input')
        setAttributes(readInput, {'id':'read-input', 'type':'checkbox'});
        newBookForm.appendChild(readInput);
        
        const submitButton = create('button');
        submitButton.innerText = 'Add Book';
        newBookForm.appendChild(submitButton);

        cardArea.appendChild(newBookForm);

        eventHandler.submitButtonListener(submitButton);
    }

    const grabFormElements = () => {
        formTitle = document.getElementById('title-input').value;
        formAuthor = document.getElementById('author-input').value;
        formHaveRead = document.getElementById('read-input').value;

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

    const createNewBookButton = () => {
        let button = create('button');
        button.innerText = 'New Book';
        button.id = 'new-book';
        return button;
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
        createNewBookButton,
        addToContent,
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
        haveRead == 'on' ? haveRead = true : haveRead = false;
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
        let button = domConductor.createNewBookButton();
        domConductor.addToContent(button);
        newBookButtonEvent(button);
    }

    const newBookButtonEvent = (button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            domConductor.createForm();
        })
    }

    const submitButtonListener = (button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            submitBook();
        })
    }

    const submitBook = () => {
        let form = domConductor.grabFormElements();
        libraryManager.addToLibrary(form[0], form[1], form[2]);
        domConductor.resetCardArea();
        let lib = libraryManager.getLibrary();
        displayController.showBookCards(lib);
        let button = domConductor.createNewBookButton();
        domConductor.addToContent(button);
        newBookButtonEvent(button);
    }

    return {
        initialize,
        submitBook,
        submitButtonListener,
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