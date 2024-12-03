const myLibrary = [];
const container = document.querySelector(".container");
const dialog = document.querySelector(".dialog");
const addNewBookBtn = document.querySelector(".add-new-book-btn");
const addBookBtn = document.querySelector(".add-book-btn");
const closeFormBtn = document.querySelector(".close-form-btn");
const bookForm = document.querySelector(".book-form");
let bookTitle = document.querySelector(".title");
let bookAuthor = document.querySelector(".author");
let bookPages = document.querySelector(".pages");
let bookIsReadYes = document.querySelector(".isReadYes");
let bookIsReadNo = document.querySelector(".isReadNo");
const errorOutput = document.querySelector(".error-output");

let removeBtnCounter = 0;
let changeReadStatusBtnCounter = 0;

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}
Book.prototype.changeReadStatus = function () {
  if (this.isRead === "Read") {
    this.isRead = "Not Read";
  } else {
    this.isRead = "Read";
  }
  displayBooks();
};
function createBook(title, author, pages, isRead) {
  let newBook = new Book(title, author, pages, isRead);
  addBookToLibrary(newBook);
}
function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

function showBook(book) {
  let bookDiv = document.createElement("div");
  bookDiv.classList.add("bookDiv");
  bookDiv.textContent = `${book.title} by ${book.author} has ${book.pages} pages, ${book.isRead}`;
  bookDiv.append(createChangeReadStatusBtn());
  bookDiv.append(createRemoveBookBtn());
  container.appendChild(bookDiv);
}
function createChangeReadStatusBtn() {
  let changeReadStatusBtn = document.createElement("button");
  changeReadStatusBtn.classList.add("changeReadStatusBtn");
  changeReadStatusBtn.setAttribute(
    "data-book-index",
    changeReadStatusBtnCounter
  );
  changeReadStatusBtnCounter++;
  changeReadStatusBtn.textContent = "Change Read Status";

  return changeReadStatusBtn;
}
function createRemoveBookBtn() {
  let removeBtn = document.createElement("button");
  removeBtn.classList.add("removeBtn");
  removeBtn.setAttribute("data-book-index", removeBtnCounter);
  removeBtnCounter++;
  removeBtn.textContent = "Remove Book";
  return removeBtn;
}

//write  a function which loops through an array and display each book on the page.
function displayBooks() {
  container.textContent = "";
  myLibrary.forEach((book) => {
    showBook(book);
  });
  activateRemoveBtnEventListener();
  activateChangeReadStatusBtnEventListener();
  resetFormElements();
}
function activateChangeReadStatusBtnEventListener() {
  const changeReadStatusBtns = document.querySelectorAll(
    ".changeReadStatusBtn"
  );
  changeReadStatusBtns.forEach((changeReadStatusBtn) => {
    changeReadStatusBtn.addEventListener("click", (e) => {
      let indexOfBookWhichReadStatusHasToChange =
        e.target.getAttribute("data-book-index");
      myLibrary[indexOfBookWhichReadStatusHasToChange].changeReadStatus();
    });
  });
}
function activateRemoveBtnEventListener() {
  const removeBtns = document.querySelectorAll(".removeBtn");
  removeBtns.forEach((removeBtn) => {
    removeBtn.addEventListener("click", (e) => {
      let indexOfBookToBeRemoved = e.target.getAttribute("data-book-index");
      removeBookFromLibrary(indexOfBookToBeRemoved);
    });
  });
}
function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}
function validateForm(title, author, pages, isRead) {
  console.log(title && author && pages && isRead);
  if (title && author && pages > 0 && isRead) {
    return true;
  } else {
    errorOutput.textContent = "Please Fill The Inputs Correctly";
    return false;
  }
}
function resetFormElements() {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookIsReadYes.checked = false;
  bookIsReadNo.checked = false;
  removeBtnCounter = 0;
  changeReadStatusBtnCounter = 0;
}
function getBookIsRead() {
  if (bookIsReadYes.checked) {
    return bookIsReadYes;
  } else if (bookIsReadNo.checked) {
    return bookIsReadNo;
  } else {
    return null;
  }
}

//to get the data from form when submitted
addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let bookIsRead = getBookIsRead();

  let isFormValidate = validateForm(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookIsRead.value
  );

  if (isFormValidate) {
    dialog.close();
    createBook(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      bookIsRead.value
    );

    displayBooks();
  }
});
//whenever the button is clicked it will open a dialog to add a new book
addNewBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

//to close the form dialog
closeFormBtn.addEventListener("click", () => {
  dialog.close();
});

//we need to add remove button to every book which will delete the book whenever user clicks it.
