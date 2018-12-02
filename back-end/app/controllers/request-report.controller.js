const RequestReport = require("../models/request-report.modals");

newRequestReport = (req, res) => {
    if (res.body === {}) {
        return res.status(400).send({
            message: "Body cannot be empty"
        });
    }

    const requestReport = new RequestReport({
        username: req.body.username,
        description: req.body.description,
        resolved: false,
        type: req.body.type,
        content: req.body.content,

    });

    requestReport.save().then(savedRequestReport => {
        res.send(savedRequestReport);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the RequestReport."
        });
    });
}

modifyRequestReport = (req, res) => {
    RequestReport.findByIdAndUpdate(req.body.requestReport._id, req.body.requestReport).then(savedRequestReport => {
        res.send(savedRequestReport);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while saving the RequestReport."
        });
    });
}

allRequestsReports = (req, res) => {
    RequestReport.find({
            type: req.params.type
        })
        .then(requestsReports => {
            res.send(requestsReports);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving all requests/reports."
            });
        });
};

getRequestsReportsByUsername = (req, res) => {
    RequestReport.find({
        username: req.params.username
    }).then(requestsReports => {
        res.send(requestsReports);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving requests/reports by username"
        });
    });
}

module.exports = {
    newRequestReport,
    modifyRequestReport,
    allRequestsReports,
    getRequestsReportsByUsername,

}