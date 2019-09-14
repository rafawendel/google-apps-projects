class Student {
  constructor({
    primaryKey = 0,
    register = 0,
    name = '',
    email = '',
    phone = '',
    university = '',
    position: { stamp = 0, bonuses = [], linear = 0 } = {},
    choices: { opt1: { id1 = 0, title1 = '' } = {}, opt2: { id2 = 0, title2 = '' } = {} } = {},
    status: { valid = true, gotOpt1 = false, gotOpt2 = false, waitlist = false } = {}
  } = {}) {
    this.primaryKey = primaryKey;
    this.name = name;
    this.register = register;
    this.position = {
      stamp,
      bonuses,
      linear,
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
        return this.linear - this.multiplier;
      }
    };
    // email and phone should be grouped as one 'contact data' object
    this.email = email;
    this.phone = phone;
    this.university = university; // this should be coupled with the register
    // future implementations: univesity id, register properties (length), aliases
    this.choices = { opt1: { id: id1, title: title1 }, opt2: { id: id2, title: title2 } };
    this.status = { valid, gotOpt1, gotOpt2, waitlist };
  }
}

export default Student;
