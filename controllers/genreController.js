let Genre = require('../models/genre');
let Book = require('../models/book');
let async = require('async');

// Display list of all Genre.
exports.genre_list = (req, res) => {
    Genre.find()
        .sort([['name', 'ascending']])
        .exec((err, list_genres) => {
            if(err){
                return next(err)
            }
            res.render('genre_list', {title: 'Genre List', genre_list: list_genres})
        })
};


// Display detail page for a specific Genre.
exports.genre_detail = (req, res) => {
    async.parallel({
        genre: (callback) => {
            Genre.findById(req.params.id)
                .exec(callback);
        },
        genre_books: (callback) => {
            Book.find({'genre': req.params.id})
                .exec(callback)
        }
    }, 
        (err, results) => {
            if(err){
                return next(err);
            }
            if(results.genre==null){
                // No results
                let err = new Error('Genre not found')
                err.status = 404;
                return next(err);
            }

            res.render('genre_detail', {title: 'Genre detail', genre: results.genre, genre_books: results.genre_books})
        }
    )
};

// Display Genre create form on GET.
exports.genre_create_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Genre create GET');
};

// Handle Genre create on POST.
exports.genre_create_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Genre create POST');
};

// Display Genre delete form on GET.
exports.genre_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Genre update POST');
};