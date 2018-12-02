const express = require('express');
const router = express.Router();

const requestReport = require('../controllers/request-report.controller');
const authMiddleware = require('../../auth.middleware');

const requestReportRoute = '/api/requestsReports';

router.post(requestReportRoute + '/newRequestReport', requestReport.newRequestReport);
router.patch(requestReportRoute + '/modifyRequestReport', requestReport.modifyRequestReport);
router.get(requestReportRoute + '/allRequestsReports/:type', requestReport.allRequestsReports);
router.get(requestReportRoute + '/requestsReportsByUsername/:username', requestReport.getRequestsReportsByUsername);

module.exports = router;
