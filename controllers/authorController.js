let Author = require('../models/author');
let Book = require('../models/book');
let async = require('async');
// display a list og all authors
exports.author_list = (req, res, next) => {
    Author.find()
    .sort([['last_name', 'ascending']])
    .exec((err, list_authors) => {
        if(err){
            return next(err)
        }
        res.render('author_list', {title: 'Author List', author_list: list_authors})
    })
}

// display detailed page for a specific author
exports.author_detail = (req, res, next) => {
    async.parallel({
        author: (callback) => {
            Author.findById(req.params.id)
                .exec(callback)
        },
        books: (callback) => {
            Book.find({'author': req.params.id})
                .sort([['title', 'ascending']])
                .exec(callback)
        }
        
    }, 
        (err, results) => {
            if(err){
                return next(err)
            }
            if(results.books==null){
                let er = new Error('No books found for author')
                er.status = 404
                return next(er);
            }

            return res.render('author_detail', {title: results.author.name, author: results.author, books: results.books})
        }
    )
}

// display author create form on GET
exports.author_create_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Author create GET');
}

// handle author create on POST
exports.author_create_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Author create POST');
}

// Display Author delete form on GET.
exports.author_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.author_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.author_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Author update POST');
};