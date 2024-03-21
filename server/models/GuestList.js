const mongoose = require("mongoose");
const {uniqueID} = require('../util/UID');
const { hexadecimalUppercase } = require('nanoid-dictionary');
const Guest = require('./Guest')
const guestListSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    inviteCode: { type: String, unique: true },
    guests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guest' }]
  },
  { timestamps: true }
);


// Pre-save hook to generate a unique invite code
guestListSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('inviteCode')) {
    let isUnique = false;
    while (!isUnique) {
      this.inviteCode = uniqueID(6);
      try {
        const existing = await mongoose.model('GuestList').findOne({ inviteCode: this.inviteCode }).exec();
        if (!existing) {
          isUnique = true;
        }
      } catch (err) {
        next(err);
      }
    }
  }
  next();
});

guestListSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  console.log('Deleting guests');
  const guestList = this;

  const ids = await Guest.deleteMany({ guestList: guestList._id });
  console.log(ids);
  next();
});
const GuestList = mongoose.model("GuestList", guestListSchema);

module.exports = GuestList;
