//we need a function to display errors whenever there are events of input
//we want to show errors in the error span below inputs;
export class Validate {
  static form = document.querySelector('.book-form');
  static tittle = document.querySelector('.title');
  static author = document.querySelector('.author');
  static pages = document.querySelector('.pages');
  static isReadYes = document.querySelector('.isReadYes');
  static isReadNo = document.querySelector('.isReadNo');
  static addBookBtn = document.querySelector('.add-book-btn');
  static tittleError = document.querySelector('.tittleError');
  static authorError = document.querySelector('.authorError');
  static pagesError = document.querySelector('.pagesError');

  static isReadError = document.querySelector('.isReadError');

  static validateFormEvent() {
    if (
      !this.tittle.validity.valid ||
      !this.author.validity.valid ||
      !this.pages.validity.valid ||
      !this.getBookIsRead()
    ) {
      this.showError();
      return false;
    }
    return true;
  }
  static getBookIsRead() {
    if (this.isReadYes.checked) {
      return this.isReadYes;
    } else if (this.isReadNo.checked) {
      return this.isReadNo;
    } else {
      return false;
    }
  }
  static clearErrors() {
    this.tittleError.textContent = '';
    this.authorError.textContent = '';
    this.pagesError.textContent = '';
    this.isReadError.textContent = '';
  }
  static showError() {
    if (this.tittle.validity.valueMissing) {
      this.tittleError.textContent = this.tittle.validationMessage;
    } else {
      this.tittleError.textContent = '';
    }
    if (this.author.validity.valueMissing) {
      this.authorError.textContent = this.author.validationMessage;
    } else {
      this.authorError.textContent = '';
    }
    console.log(this.pages.validity.valueMissing);

    if (this.pages.validity.valueMissing) {
      this.pagesError.textContent = this.pages.validationMessage;
    } else {
      this.pagesError.textContent = '';
    }
    console.log(this.getBookIsRead());
    if (!this.getBookIsRead()) {
      this.isReadError.textContent = this.isReadYes.validationMessage;
    } else {
      this.isReadError.textContent = '';
    }
  }
}
