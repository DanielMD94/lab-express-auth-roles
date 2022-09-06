const router = require("express").Router()
const User = require("../models/User.model")
const isLogedin = require('../middleware/is_logedin.middleware');


//Students List
router.get('/students-list', isLogedin, (req, res, next) => {
    User.find()
        .then((allStudents) => {
            res.render('student/students-list', { allStudents });
        })
        .catch((err) => next(err));
});

//Profile
router.get('/profile', isLogedin, (req, res, next) => {
    User.findOne()
        .then(() => {
            res.render('student/profile');
        })
        .catch((err) => next(err));
});

// Student List Profile, Accedo al profile, pero de manera invididual, según el id del student.
router.get('/:idStudent/profile', isLogedin, (req, res, next) => { //Params accede a las partes que especificas de la URL, 
    const id = req.params.idStudent
    User.findById(id)
        .then((foundUser) => {
            res.render('student/profile', foundUser)
        })
        .catch((err) => next(err));
})

//Edit Student
router.get('/:idStudent/edit', (req, res, next) => {
    User.findById(req.params.idStudent)
        .then((updateStudent) => {
            res.render('student/edit-student', updateStudent)
        })
});

router.post('/:idStudent/edit', (req, res, next) => {
    const { username, description, role } = req.body;
    User.findByIdAndUpdate(req.params.idStudent, { username, description, role })
        .then((updateStudent) => {
            console.log(updateStudent)
            res.redirect('/students-list')
        })
        .catch((err) => next(err));
});

// Delete Student
router.post('/:id/delete', (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then((deleteStudent) => {
            console.log(deleteStudent)
            res.redirect('/students-list');
        })
        .catch((err) => next(err));
});


module.exports = router