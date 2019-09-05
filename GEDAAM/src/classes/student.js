class Student {
  constructor({
    primaryKey = 0,
    register = 0,
    name = '',
    email = '',
    phone = '',
    university = '',
    position: { stamp = 0, bonuses = [] } = {},
    choices: { opt1: { id1 = 0, title1 = '' } = {}, opt2: { id2 = 0, title2 = '' } = {} } = {},
    status: { valid = true, gotOpt1 = false, gotOpt2 = false, waitlist = false } = {}
  } = {}) {
    this.primaryKey = primaryKey;
    this.register = register;
    this.position = {
      stamp,
      bonuses,
      get multiplier() {
        if (bonuses[0] instanceof Object) {
          return bonuses.reduce((total, current) => {
            if (university === 'UFMG') {
              return +current[Object.keys(current)[0]] + total;
            }
            return Object.keys(current)[0] === 'Workshop'
              ? total
              : +current[Object.keys(current)[0]] + total;
          }, 0);
        }
        return 0;
      },
      get correction() {
        return primaryKey - this.multiplier;
      }
    };
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.university = university;
    this.choices = { opt1: { id: id1, title: title1 }, opt2: { id: id2, title: title2 } };
    this.status = { valid, gotOpt1, gotOpt2, waitlist };
  }
}

export default Student;
