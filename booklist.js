//Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;

}


//UI Constructor
function UI() {}

//add booktolist
UI.prototype.addBookToList = function(book){
    const list  = document.getElementById('book-list');
    //create element
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>`;
    
    list.appendChild(row);
}



//'show alert in ui
UI.prototype.showAlert = function(message, className){
    //create div
    const div = document.createElement('div');
    //classname
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);

    //timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000)
}



//delete book
UI.prototype.deleteBook = function(target){
    if(target.className ==='delete'){
        target.parentElement.parentElement.remove();
    }
}



// CLEAR FIELDS
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}



//Event Listeners  add book
document.getElementById('book-form').addEventListener('submit', function(e){
    //GET FORM VALUES
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value

          //INSTANSTIATING A BOOK
    const book = new Book(title, author, isbn);

    //INSTANTIATE UI
    const ui = new UI();


    if(title === '' || author ==='' || isbn === ''){
        //show alert
        ui.showAlert('Please fill in all fields', 'error');
    } else{
        //ADD BOOK TO LIST
        ui.addBookToList(book);

        //show sucess
        ui.showAlert('Book Added!', 'success');

        //!CLEAR INPUTS
        ui.clearFields()

    }

    e.preventDefault();
});



//Event Listeners  remove book
document.getElementById('book-list').addEventListener('click', function(e){

    //INSTANTIATE UI
    const ui = new UI();

    //delete book
    ui.deleteBook(e.target);

    //show message
    ui.showAlert('Book Removed!', 'success')



    e.preventDefault();
});










