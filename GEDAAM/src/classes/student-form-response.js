/**
 * List corresponding to form responses.
 * Keys are according to Student class.
 */
class StudentFormResponse {
  constructor() {
    this.timestamp = { range: 'AA:AA', aliases: [] };
    this.name = { range: 'AA:AA', aliases: [] };
    this.gender = { range: 'AA:AA', aliases: [] };
    this.register = { range: 'AA:AA', aliases: [] };
    this.email = { range: 'AA:AA', aliases: [] };
    this.phone = { range: 'AA:AA', aliases: [] };
    this.course = { range: 'AA:AA', aliases: [] };
    this.semester = { range: 'AA:AA', aliases: [] };
    this.university = { range: 'AA:AA', aliases: [] };
    this.declaredNewbie = { range: 'AA:AA', aliases: [] };
    this.opt1 = { range: 'AA:AA', aliases: [] };
    this.opt2 = { range: 'AA:AA', aliases: [] };
    this.firstContactMedium = { range: 'AA:AA', aliases: [] };
    this.performanceSummary = { range: 'AA:AA', aliases: [] };
    this.feedbackSummary = { range: 'AA:AA', aliases: [] };
    this.availabilitySummary = { range: 'AA:AA', aliases: [] };
  }
}

export default StudentFormResponse;
