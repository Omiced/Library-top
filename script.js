"use strict";
//elements
const formEl = document.querySelector(".form-book");
const modalBtn = document.querySelector(".btn-modal");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close-modal");
const booksEl = document.querySelector(".books_container");
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
  addBookToLibrary(
    new Book(bookData.title, bookData.author, bookData.pages, bookData.read)
  );
  showBook();
  console.log(myLibrary);
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

const myLibrary = [];
const addBookToLibrary = function (book) {
  myLibrary.push(book);
};

const showBook = function () {
  myLibrary.forEach((book, i) => {
    if (book.render) return;
    book.render = true;
    booksEl.insertAdjacentHTML(
      "beforeend",
      `
    <article class="books_card">
      <h3>Book ${i + 1}</h3>
      <p>Title: <span>${book.title}</span></p>
      <p>Author: <span>${book.author}</span></p>
      <p>Pages: <span>${book.pages}</span></p>
      <p>Read: <span>${book.read ? "Yes" : "No"}</span></p>
      <button type="button" class="btn-delete">Delete Book</button>
    </article>
  `
    );
  });
};
