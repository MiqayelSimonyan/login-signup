import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = mongoose.Schema({
	name: {type: String, trim: true, required: true},
	username: {type: String, trim: true, unique: true, required: true},
    email: {type: String, trim: true, unique: true, required: true},
	password: {type: String, trim: true, required: true},
}, {
	timestamps: true
});

/**
 * Pre-save hook
 */
UserSchema.pre('findOne', function (next) {
    if (this._conditions.password) {
        this._conditions.password = crypto.createHash('md5').update(this._conditions.password).digest("hex");
    }

    next();
});

UserSchema.pre('save', function (next) {
    if (this.password.length >= 1 && this.password.length != 32) {
        this.password = crypto.createHash('md5').update(this.password).digest("hex");
    }
    next();
});

mongoose.model('User', UserSchema);