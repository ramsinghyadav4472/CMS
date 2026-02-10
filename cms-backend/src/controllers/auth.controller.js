const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const OTP = require("../models/otp.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendOTP = async (req, res) => {
    const { email } = req.body;
    const otp = otpGenerator.generate(6, { digits: true });
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await OTP.create({ email, otp, expiresAt });
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "OTP for registration",
        text: `Your OTP is ${otp}`,
    });
    res.status(200).json({ message: "OTP sent successfully" });
}

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    const otpDoc = await OTP.findOne({ email });
    if (!otpDoc) {
        return res.status(400).json({ message: "OTP not found" });
    }
    if (otpDoc.expiresAt < Date.now()) {
        return res.status(400).json({ message: "OTP expired" });
    }
    const isMatch = await bcrypt.compare(otp, otpDoc.otp);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid OTP" });
    }
    await OTP.deleteOne({ email });
    res.status(200).json({ message: "OTP verified successfully" });
}   