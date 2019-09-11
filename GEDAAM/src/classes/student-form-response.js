/**
 * List corresponding to form responses.
 * Keys are name according to Student class.
 * @property {array} - array[0] is spreadsheet range; array[ ...] is question(s) title(s)
 */
class StudentFormResponse {
  constructor() {
    this.timestamp = [];
    this.name = [];
    this.gender = [];
    this.register = [];
    this.email = [];
    this.phone = [];
    this.course = [];
    this.semester = [];
    this.university = [];
    this.declaredNewbie = [];
    this.opt1 = [];
    this.opt2 = [];
    this.firstContactMedium = [];
    this.performanceSummary = [];
    this.feedbackSummary = [];
    this.availabilitySummary = [];
  }
}

export default StudentFormResponse;
