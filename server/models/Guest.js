const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  guestList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GuestList',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    default: '',
  },
  plusOnes: {
    type: Number,
    required: true,
    default: 0,
  },
  responded: { type: Boolean, default: false },
  hasArrived: {
    type: Boolean,
    default: false,
  },
  plusOnesArrived: {
    type: Number,
    default: 0,
  },
  arrivalTime: {
    type: Date,
    default: null,
  },

  guestList: { type: mongoose.Schema.Types.ObjectId, ref: 'GuestList' } 
}, { timestamps: true });

guestSchema.pre('remove', async function(next) {
  const guest = this;
  await mongoose.model('GuestList').findByIdAndUpdate(guest.guestList, {
    $pull: { guests: guest._id }
  });
  next();
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;
