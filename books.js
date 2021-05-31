function Book(title, author, pages, read) {
    this.title = "";
    this.author = "";
    this.pages = 0;
    this.read = false;
    this.info = function() {
        const haveRead = read ? 'have read book' : 'have not read book';
        return title + ' by ' + author + ', ' + pages + ' pages, ' + haveRead + '.';
    }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 456, true);
console.log(theHobbit.info());