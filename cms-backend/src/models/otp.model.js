const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const otpSchema = new mongoose.Schema({
    email: String,
    otp: String,
    createdAt: Date,
    expiresAt: Date,
},
    { timestamps: true },
);

otpSchema.pre("save", async function (next) {
    if (!this.isModified("otp")) return next();
    this.otp = await bcrypt.hash(this.otp, 10);
});

module.exports = mongoose.model("OTP", otpSchema);  