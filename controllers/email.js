import { sendEmail } from "../middleware/emails/sendEmail.js";
import { applyJob } from "../middleware/emails/apply-job.js";

export const sendEmailController = async (req, res, next) => {
  const { senderemail, recipientEmail, title, content } = req.body;
  try {
    await sendEmail.sendEmail(senderemail, recipientEmail, title, content);
    res.status(200).json({
      message: "Email successfully sent",
    });
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED",
      error: error.message,
    });
  }
};
export const applyJobController = async (req, res, next) => {
  const { senderemail, recipientEmail, title, content } = req.body;
  try {
    await applyJob.applyJob(senderemail, recipientEmail, title, content);
    res.status(200).json({
      message: "Email successfully sent",
    });
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED",
      error: error.message,
    });
  }
};
