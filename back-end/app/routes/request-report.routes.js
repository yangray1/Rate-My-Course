const express = require('express');
const router = express.Router();

const requestReport = require('../controllers/request-report.controller');
const authMiddleware = require('../../auth.middleware');

const requestReportRoute = '/api/requestsReports';

router.post(requestReportRoute + '/newRequestReport', authMiddleware, requestReport.newRequestReport);
router.patch(requestReportRoute + '/modifyRequestReport', authMiddleware, requestReport.modifyRequestReport);
router.get(requestReportRoute + '/allRequestsReports/:type', authMiddleware, requestReport.allRequestsReports);
router.get(requestReportRoute + '/requestsReportsByUsername/:username', authMiddleware, requestReport.getRequestsReportsByUsername);

module.exports = router;
