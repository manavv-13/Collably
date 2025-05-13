const sendOTP = async (toEmail, otp) => {
  const payload = {
    sender: {
      name: "Collably",
      email: process.env.SENDER_EMAIL,
    },
    to: [{ email: toEmail }],
    subject: "Your OTP Code",
    htmlContent: `<p>Thank you for using Collably. Your OTP code is: <strong>${otp}</strong>. Use this to verify your E-mail!</p>`,
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const sendNotification = async (
  toEmail,
  toName,
  fromName,
  fromEmail,
  fromNumber
) => {
  const payload = {
    sender: {
      name: "Collably",
      email: process.env.SENDER_EMAIL,
    },
    to: [{ email: toEmail }],
    subject: "Someone showed interest in your profile!",
    htmlContent: `<p>Hi <strong>${toName}</strong>, <br/> Great news— someone has shown interest in your profile! <br/> It is ${fromName}, and they would love to connect. <br/> You can reach them at ${fromEmail} or call/text at ${fromNumber} <br/> Feel free to take the first step!.</p>`,
  };
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const sendMessage = async (toEmail, toName, message, fromEmail, fromNumber) => {
  const payload = {
    sender: {
      name: "Collably",
      email: process.env.SENDER_EMAIL,
    },
    to: [{ email: toEmail }],
    subject: "You have Got a New Message!",
    htmlContent: `<p>Hi ${toName},</p>
<p>Yo have just received a new message:</p>
<blockquote>${message}</blockquote>
<p>You can get in touch with them at <strong>${fromEmail}</strong> or reach out via phone/text at <strong>${fromNumber}</strong>.</p>
<p>Best regards,<br/>Team Collably</p>`,
  };
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

module.exports = {
  sendOTP,
  sendNotification,
  sendMessage,
};
