const User = require('../models/user'); // Import User Model Schema
const Tour = require('../models/tour'); // Import Tour Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {

    /* ===============================================================
       CREATE NEW TOUR DETAILS
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
     GET ALL TOURS
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

    return router;
};