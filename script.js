const myLibrary = [
  {
    title: "abcd",
    author: "sdfasd",
    pages: 89,
    isRead: "read",
  },
  {
    title: "abcdfadd",
    author: "fasdfsdfasd",
    pages: 55,
    isRead: "not read",
  },
];
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

//whenever the button is clicked it will open a dialog to add a new book
addNewBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

//to close the form dialog
closeFormBtn.addEventListener("click", () => {
  dialog.close();
});

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

    resetFormElements();
    displayBooks();
  }
});
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}
function createBook(title, author, pages, isRead) {
  let newBook = new Book(title, author, pages, isRead);
  addBookToLibrary(newBook);
}
function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

//write  a function which loops through an array and display each book on the page.
function displayBooks() {
  container.textContent = "";
  myLibrary.forEach((book) => {
    showBook(book);
  });
}

function showBook(book) {
  let bookDiv = document.createElement("div");
  bookDiv.classList.add("bookDiv");
  bookDiv.textContent = `${book.title} by ${book.author} has ${book.pages} pages, ${book.isRead}`;
  container.appendChild(bookDiv);
}

displayBooks();
