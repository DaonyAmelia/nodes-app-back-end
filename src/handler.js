const { nanoid } = require("nanoid");
const books = require('./books')

const addNoteHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt, 
    };

    books.push(newBook); 

    const isSuccess = books.filter((book) => book.id === id).length > 0;
 
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        "bookId": id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan buku. Mohon isi nama buku',
  });
  response.code(400);
  return response;
};

const getAllBooksHandler = () => ({
  status: 'success',
  data:  {
    "books": [
      {
          "id": "Qbax5Oy7L8WKf74l",
          "name": "Buku A",
          "publisher": "Dicoding Indonesia"
      },
      {
          "id": "1L7ZtDUFeGs7VlEt",
          "name": "Buku B",
          "publisher": "Dicoding Indonesia"
      },
      {
          "id": "K8DZbfI-t3LrY7lD",
          "name": "Buku C",
          "publisher": "Dicoding Indonesia"
      }
  ]
}
});

const getBookByIdHandler = (request, h) => {
    const {id} = request.params;

    const book = books.filter((b) => b.id === id )[0];

    if (book !== undefined) {
      return {
        status: 'success',
        data: {
          "book": {
            "id": "aWZBUW3JN_VBE-9I",
            "name": "Buku A Revisi",
            "year": 2011,
            "author": "Jane Doe",
            "summary": "Lorem Dolor sit Amet",
            "publisher": "Dicoding",
            "pageCount": 200,
            "readPage": 26,
            "finished": false,
            "reading": false,
            "insertedAt": "2021-03-05T06:14:28.930Z",
            "updatedAt": "2021-03-05T06:14:30.718Z"
        }
        }
      }
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === id).length > 0;

    if (index !== -1) {
      books[index] = {
        ...books[index],
        name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt
      };
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      });
      response.code(200);
      return response;
    }
    {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui Buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
    }
    {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui Buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
};

const deleteBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};
module.exports = { addNoteHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler };