module.exports = class ENUM {
  data;
  constructor(data) {
    this.enum = data;
  }

  getValues() {
    return Object.values(this.enum);
  }

  getKeys() {
    return Object.keys(this.enum);
  }

  get() {
    return this.enum;
  }
};
