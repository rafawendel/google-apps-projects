class Group {
  constructor({
    primaryKey = 0,
    id = 0,
    title = '',
    aliases = [],
    schedule = '',
    campus = '',
    size: { total = 0, available = total } = {},
    classroom = '',
    cooordinators: [student = {}] = [], // Array of coordinators, child of 'student' class
    members = [] // Array of students primary keys (foreign keys from students JSON)
  } = {}) {
    this.primaryKey = primaryKey;
    this.id = id;
    this.title = title;
    this.aliases = aliases;
    this.schedule = schedule;
    this.campus = campus;
    this.size = {
      total,
      available
    };
    this.classroom = classroom;
    this.coordinators = [student];
    this.members = members;
  }
}

export default Group;
