module.exports = {
  default: {
    require: ['steps/*.js'],
    format: ['progress', 'html:cucumber-report.html'],
    publishQuiet: true,
    timeout: 60000  // 60 seconds timeout
  }
};
