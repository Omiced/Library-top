"use strict";
//elements
const formEl = document.querySelector(".form-book");
const modalBtn = document.querySelector(".btn-modal");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close-modal");
const booksEl = document.querySelector(".books_container");
const booksContainer = document.querySelector(".books_container");
//variable de estado
const myLibrary = [];

//modal event
modalBtn.addEventListener("click", () => {
  modal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});

//form data
let bookData;
formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  const dataArray = [...new FormData(this)];
  bookData = Object.fromEntries(dataArray);
  new Book(
    bookData.title,
    bookData.author,
    bookData.pages,
    bookData.read
  ).addBookToLibrary();

  showBook();
  formEl.reset();
  modal.close();
});

const Book = function (
  title = "unknow",
  author = "unknow",
  pages = 0,
  read = false
) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

Book.prototype.addBookToLibrary = function () {
  myLibrary.push(this);
};

Book.prototype.toggleRead = function () {
  this.read ? (this.read = false) : (this.read = true);
};

//render book function
const showBook = function () {
  myLibrary.forEach((book, i) => {
    if (book.render) return;
    book.render = true;
    booksEl.insertAdjacentHTML(
      "beforeend",
      `
    <article class="books_card">
      <h3>Book <span class="title-span">${i + 1}</span></h3>
      <p>Title: <span>${book.title}</span></p>
      <p>Author: <span>${book.author}</span></p>
      <p>Pages: <span>${book.pages}</span></p>
      <p id="#read">Read: <span>${book.read ? "Yes" : "No"}</span></p>
      <div class="card-buttons">
        <button data-item="${i}" type="button" id="btn-toggle">Read or Readn't</button>
        <button data-item="${i}" type="button"  id="btn-delete">Delete Book</button>
      </div>
    </article>
  `
    );
  });
};
//buttons delete y toggle event and functions handlers
booksContainer.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.id === "btn-toggle") {
    const book = e.target.dataset.item;
    toggle(book);
  }
  if (e.target.id === "btn-delete") {
    const book = e.target.dataset.item;
    deleteBook(book);
    console.log(book);
  }
});
const toggle = function (book) {
  myLibrary[book].toggleRead();
  updateHTML();
};

const deleteBook = function (book) {
  myLibrary.splice(book, 1);
  updateHTML();
};

const updateHTML = function () {
  myLibrary.forEach((book) => delete book.render);
  booksContainer.innerHTML = "";
  showBook();
};
