const User = require('../models/user'); // Import User Model Schema
const Tour = require('../models/tour'); // Import Tour Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {

    /* ===============================================================
       CREATE NEW BLOG
    =============================================================== */
    router.post('/newTour', (req, res) => {
        // Check if tour title was provided
        if (!req.body.title) {
            res.json({
                success: false,
                message: 'Tour title is required.'
            }); // Return error message
        } else {
            // Check if tour body was provided
            if (!req.body.body) {
                res.json({
                    success: false,
                    message: 'Tour body is required.'
                }); // Return error message
            } else {
                // Check if tour's creator was provided
                if (!req.body.createdBy) {
                    res.json({
                        success: false,
                        message: 'Tour creator is required.'
                    }); // Return error
                } else {
                    // Create the tour object for insertion into database
                    const tour = new Tour({
                        title: req.body.title, // Title field
                        body: req.body.body, // Body field
                        createdBy: req.body.createdBy // CreatedBy field
                    });
                    // Save tour into database
                    tour.save((err) => {
                        // Check if error
                        if (err) {
                            // Check if error is a validation error
                            if (err.errors) {
                                // Check if validation error is in the title field
                                if (err.errors.title) {
                                    res.json({
                                        success: false,
                                        message: err.errors.title.message
                                    }); // Return error message
                                } else {
                                    // Check if validation error is in the body field
                                    if (err.errors.body) {
                                        res.json({
                                            success: false,
                                            message: err.errors.body.message
                                        }); // Return error message
                                    } else {
                                        res.json({
                                            success: false,
                                            message: err
                                        }); // Return general error message
                                    }
                                }
                            } else {
                                res.json({
                                    success: false,
                                    message: err
                                }); // Return general error message
                            }
                        } else {
                            res.json({
                                success: true,
                                message: 'Tour saved!'
                            }); // Return success message
                        }
                    });
                }
            }
        }
    });

    /* ===============================================================
       GET ALL BLOGS
    =============================================================== */
    router.get('/allTours', (req, res) => {
        // Search database for all tour posts
        Tour.find({}, (err, tours) => {
            // Check if error was found or not
            if (err) {
                res.json({
                    success: false,
                    message: err
                }); // Return error message
            } else {
                // Check if tours were found in database
                if (!tours) {
                    res.json({
                        success: false,
                        message: 'No tours found.'
                    }); // Return error of no tours found
                } else {
                    res.json({
                        success: true,
                        tours: tours
                    }); // Return success and tours array
                }
            }
        }).sort({
            '_id': -1
        }); // Sort tours from newest to oldest
    });

    /* ===============================================================
       GET SINGLE BLOG
    =============================================================== */
    router.get('/singleTour/:id', (req, res) => {
        // Check if id is present in parameters
        if (!req.params.id) {
            res.json({
                success: false,
                message: 'No tour ID was provided.'
            }); // Return error message
        } else {
            // Check if the tour id is found in database
            Tour.findOne({
                _id: req.params.id
            }, (err, tour) => {
                // Check if the id is a valid ID
                if (err) {
                    res.json({
                        success: false,
                        message: 'Not a valid tour id'
                    }); // Return error message
                } else {
                    // Check if tour was found by id
                    if (!tour) {
                        res.json({
                            success: false,
                            message: 'Tour not found.'
                        }); // Return error message
                    } else {
                        // Find the current user that is logged in
                        User.findOne({
                            _id: req.decoded.userId
                        }, (err, user) => {
                            // Check if error was found
                            if (err) {
                                res.json({
                                    success: false,
                                    message: err
                                }); // Return error
                            } else {
                                // Check if username was found in database
                                if (!user) {
                                    res.json({
                                        success: false,
                                        message: 'Unable to authenticate user'
                                    }); // Return error message
                                } else {
                                    // Check if the user who requested single tour is the one who created it
                                    if (user.username !== tour.createdBy) {
                                        res.json({
                                            success: false,
                                            message: 'You are not authorized to eidt this tour.'
                                        }); // Return authentication reror
                                    } else {
                                        res.json({
                                            success: true,
                                            tour: tour
                                        }); // Return success
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });

    /* ===============================================================
       UPDATE BLOG POST
    =============================================================== */
    router.put('/updateTour', (req, res) => {
        // Check if id was provided
        if (!req.body._id) {
            res.json({
                success: false,
                message: 'No tour id provided'
            }); // Return error message
        } else {
            // Check if id exists in database
            Tour.findOne({
                _id: req.body._id
            }, (err, tour) => {
                // Check if id is a valid ID
                if (err) {
                    res.json({
                        success: false,
                        message: 'Not a valid tour id'
                    }); // Return error message
                } else {
                    // Check if id was found in the database
                    if (!tour) {
                        res.json({
                            success: false,
                            message: 'Tour id was not found.'
                        }); // Return error message
                    } else {
                        // Check who user is that is requesting tour update
                        User.findOne({
                            _id: req.decoded.userId
                        }, (err, user) => {
                            // Check if error was found
                            if (err) {
                                res.json({
                                    success: false,
                                    message: err
                                }); // Return error message
                            } else {
                                // Check if user was found in the database
                                if (!user) {
                                    res.json({
                                        success: false,
                                        message: 'Unable to authenticate user.'
                                    }); // Return error message
                                } else {
                                    // Check if user logged in the the one requesting to update tour post
                                    if (user.username !== tour.createdBy) {
                                        res.json({
                                            success: false,
                                            message: 'You are not authorized to edit this tour post.'
                                        }); // Return error message
                                    } else {
                                        tour.title = req.body.title; // Save latest tour title
                                        tour.body = req.body.body; // Save latest body
                                        tour.save((err) => {
                                            if (err) {
                                                if (err.errors) {
                                                    res.json({
                                                        success: false,
                                                        message: 'Please ensure form is filled out properly'
                                                    });
                                                } else {
                                                    res.json({
                                                        success: false,
                                                        message: err
                                                    }); // Return error message
                                                }
                                            } else {
                                                res.json({
                                                    success: true,
                                                    message: 'Tour Updated!'
                                                }); // Return success message
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });

    /* ===============================================================
       DELETE BLOG POST
    =============================================================== */
    router.delete('/deleteTour/:id', (req, res) => {
        // Check if ID was provided in parameters
        if (!req.params.id) {
            res.json({
                success: false,
                message: 'No id provided'
            }); // Return error message
        } else {
            // Check if id is found in database
            Tour.findOne({
                _id: req.params.id
            }, (err, tour) => {
                // Check if error was found
                if (err) {
                    res.json({
                        success: false,
                        message: 'Invalid id'
                    }); // Return error message
                } else {
                    // Check if tour was found in database
                    if (!tour) {
                        res.json({
                            success: false,
                            messasge: 'Tour was not found'
                        }); // Return error message
                    } else {
                        // Get info on user who is attempting to delete post
                        User.findOne({
                            _id: req.decoded.userId
                        }, (err, user) => {
                            // Check if error was found
                            if (err) {
                                res.json({
                                    success: false,
                                    message: err
                                }); // Return error message
                            } else {
                                // Check if user's id was found in database
                                if (!user) {
                                    res.json({
                                        success: false,
                                        message: 'Unable to authenticate user.'
                                    }); // Return error message
                                } else {
                                    // Check if user attempting to delete tour is the same user who originally posted the tour
                                    if (user.username !== tour.createdBy) {
                                        res.json({
                                            success: false,
                                            message: 'You are not authorized to delete this tour post'
                                        }); // Return error message
                                    } else {
                                        // Remove the tour from database
                                        tour.remove((err) => {
                                            if (err) {
                                                res.json({
                                                    success: false,
                                                    message: err
                                                }); // Return error message
                                            } else {
                                                res.json({
                                                    success: true,
                                                    message: 'Tour deleted!'
                                                }); // Return success message
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });

    return router;
};