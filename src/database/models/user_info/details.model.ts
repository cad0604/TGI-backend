import mongoose from 'mongoose';
import moment from 'moment';

const DetailsModel = new mongoose.Schema(
  {
    profilePhoto: {
      type: String,
      default: null,
    },
    personalDetails: {
      firstName: {
        type: String,
        default: null,
      },
      lastName: {
        type: String,
        default: null,
      },
      gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: null,
      },
      dob: {
        type: String,
        default: null,
      },
    },
  },

  {
    versionKey: false,
    timestamps: true,
  },
);

DetailsModel.pre('save', function (next) {
  if (this.personalDetails && this.personalDetails.dob) {
    this.personalDetails.dob = moment(
      this.personalDetails.dob,
      'DD-MM-YYYY',
    ).toISOString();
  }
  next();
});
export const userDetailsModel = mongoose.model('user_details', DetailsModel);
