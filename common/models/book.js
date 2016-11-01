module.exports = function(Book) {

    Book.create_naja = function(book ,callback){
        Book.create(book, callback);
    };
    Book.read_naja = function (callback) {
        Book.find({where: {name: {regexp: ".*"}}}, callback);
    };
    Book.update_naja = function(book, callback){
        Book.patchOrCreate(book, callback);
    };
    Book.delete_naja = function(book_id, callback){
        Book.deleteById(book_id, callback);
    };

    Book.remoteMethod(
        'read_naja',
        {
            http: {path: '/read_naja', verb: 'get'},
            returns: {arg: Book.modelName, type: 'object'}
        }
    );
    Book.remoteMethod(
        'create_naja',
        {
            accessType: 'WRITE',
            accepts: {arg: 'data', type: 'object', model: Book.modelName, http: {source: 'body'}},
            returns: {arg: 'data', type: Book.modelName},
            http: {path: '/create_naja', verb: 'put'}
        }
    );
    Book.remoteMethod(
        'update_naja',
        {
            accessType: 'WRITE',
            accepts: [
                {arg: 'where', type: 'object', http: { source: 'query'},
                    description: 'Criteria to match model instances'},
                {arg: 'data', type: 'object', model: Book.modelName, http: {source: 'body'},
                    description: 'An object of model property name/value pairs'},
            ],
            returns: {
                arg: 'info',
                type: {
                    count: {
                        type: 'number',
                        description: 'The number of instances updated',
                    },
                },
                root: true,
            },
            http: {verb: 'post', path: '/update_naja'}
        }
    )
    Book.remoteMethod(
        'delete_naja',
        {
            accessType: 'WRITE',
            accepts: {arg: 'id', type: 'any', description: 'Model id', required: true,
                http: {source: 'path'}},
            http: {verb: 'del', path: '/delete_naja/:id'},
            returns: {arg: 'count', type: 'object', root: true}
        }
    )
};