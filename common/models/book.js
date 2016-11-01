'use strict';

module.exports = function(Book) {
  Book.create_naja = function(book, callback){
    return callback(null, "TEST CREATE");
  }
  Book.remoteMethod(
    "create_naja",
    {
      description: "Test create",
      accepts: [
        {args: "book", type: "Book", require: true}
      ],
      returns: {
        args: 'status', type:
      }
    }
  );
};
