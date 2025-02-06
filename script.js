import { Validate } from './Validate.js';

class Library {
  static myLibrary = [];
  static bookIsReadYes = document.querySelector('.isReadYes');
  static bookIsReadNo = document.querySelector('.isReadNo');
  static container = document.querySelector('.container');
  static changeReadStatusBtnCounter = 0;
  static bookTitle = document.querySelector('.title');
  static bookAuthor = document.querySelector('.author');
  static bookPages = document.querySelector('.pages');
  static removeBtnCounter = 0;

  static createBook(title, author, pages, isRead) {
    let newBook = new Book(title, author, pages, isRead);
    this.addBookToLibrary(newBook);
  }
  static addBookToLibrary(newBook) {
    this.myLibrary.push(newBook);
  }
  static createChangeReadStatusBtn() {
    let changeReadStatusBtn = document.createElement('button');
    changeReadStatusBtn.classList.add('changeReadStatusBtn');
    changeReadStatusBtn.setAttribute(
      'data-book-index',
      this.changeReadStatusBtnCounter
    );
    this.changeReadStatusBtnCounter++;
    changeReadStatusBtn.textContent = 'Change Read Status';

    return changeReadStatusBtn;
  }
  static createRemoveBookBtn() {
    let removeBtn = document.createElement('button');
    removeBtn.classList.add('removeBtn');
    removeBtn.setAttribute('data-book-index', this.removeBtnCounter);
    this.removeBtnCounter++;
    removeBtn.textContent = 'Remove Book';
    return removeBtn;
  }

  static showBook(book) {
    let bookDiv = document.createElement('div');
    bookDiv.classList.add('bookDiv');
    bookDiv.textContent = `${book.title} by ${book.author} has ${book.pages} pages, ${book.isRead}`;
    bookDiv.append(this.createChangeReadStatusBtn());
    bookDiv.append(this.createRemoveBookBtn());
    this.container.appendChild(bookDiv);
  }

  //write  a function which loops through an array and display each book on the page.

  static removeBookFromLibrary(index) {
    this.myLibrary.splice(index, 1);
    this.displayBooks();
  }
  static activateChangeReadStatusBtnEventListener() {
    const changeReadStatusBtns = document.querySelectorAll(
      '.changeReadStatusBtn'
    );
    changeReadStatusBtns.forEach((changeReadStatusBtn) => {
      changeReadStatusBtn.addEventListener('click', (e) => {
        let indexOfBookWhichReadStatusHasToChange =
          e.target.getAttribute('data-book-index');

        this.myLibrary[
          indexOfBookWhichReadStatusHasToChange
        ].changeReadStatus();
      });
    });
  }

  static activateRemoveBtnEventListener() {
    const removeBtns = document.querySelectorAll('.removeBtn');
    removeBtns.forEach((removeBtn) => {
      removeBtn.addEventListener('click', (e) => {
        let indexOfBookToBeRemoved = e.target.getAttribute('data-book-index');
        this.removeBookFromLibrary(indexOfBookToBeRemoved);
      });
    });
  }
  static resetFormElements() {
    this.bookTitle.value = '';
    this.bookAuthor.value = '';
    this.bookPages.value = '';
    this.bookIsReadYes.checked = false;
    this.bookIsReadNo.checked = false;
    this.removeBtnCounter = 0;
    this.changeReadStatusBtnCounter = 0;
  }
  static displayBooks() {
    this.container.textContent = '';
    this.myLibrary.forEach((book) => {
      this.showBook(book);
    });
    this.activateRemoveBtnEventListener();
    this.activateChangeReadStatusBtnEventListener();
    this.resetFormElements();
  }

  static getBookIsRead() {
    if (this.bookIsReadYes.checked) {
      return this.bookIsReadYes;
    } else if (this.bookIsReadNo.checked) {
      return this.bookIsReadNo;
    } else {
      return null;
    }
  }
}

class Book extends Library {
  constructor(title, author, pages, isRead) {
    super();
    this.title = title;

    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
  changeReadStatus = function () {
    if (this.isRead === 'Read') {
      this.isRead = 'Not Read';
    } else {
      this.isRead = 'Read';
    }
    Library.displayBooks();
  };
}

function validateForm(title, author, pages, isRead) {
  console.log(title && author && pages && isRead);
  if (title && author && pages > 0 && isRead) {
    return true;
  } else {
    errorOutput.textContent = 'Please Fill The Inputs Correctly';
    return false;
  }
}

class Render {
  static dialog = document.querySelector('.dialog');
  static addNewBookBtn = document.querySelector('.add-new-book-btn');
  static addBookBtn = document.querySelector('.add-book-btn');
  static closeFormBtn = document.querySelector('.close-form-btn');
  static bookForm = document.querySelector('.book-form');
  static errorOutput = document.querySelector('.error-output');
  //to get the data from form when submitted

  static activateLibraryEventListeners() {
    this.addBookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let bookIsRead = Library.getBookIsRead();

      let isFormValidate = Validate.validateFormEvent();
      console.log(isFormValidate);
      if (isFormValidate) {
        this.dialog.close();
        Library.createBook(
          Library.bookTitle.value,
          Library.bookAuthor.value,
          Library.bookPages.value,
          bookIsRead.value
        );

        Library.displayBooks();
        Validate.clearErrors();
      }
    });
    //whenever the button is clicked it will open a dialog to add a new book
    this.addNewBookBtn.addEventListener('click', () => {
      this.dialog.showModal();
    });

    //to close the form dialog
    this.closeFormBtn.addEventListener('click', () => {
      this.dialog.close();
    });
  }
}

Render.activateLibraryEventListeners();
