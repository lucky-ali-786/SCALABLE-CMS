import { Worker } from "bullmq";
import { connection } from "../db/redis.js";
import nodemailer from "nodemailer";
import sanitizeHtml from 'sanitize-html';
import { Post } from "../models/posts.models.js";
const worker = new Worker("email-queue", async (job) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'luckyali7666@gmail.com',
      pass: process.env.PASSWORD
    }

  });
  let mailOptions = {
    from: 'luckyali7666@gmail.com',
    to: `${job.data.email}`,
    subject: `BLOGGER sent you a message`,
    html: job.data.message.htmlTemplate,
    attachments: [{
      filename: 'photo.png',
      path: 'C:\\REACT\\backend\\src\\bullmq\\photo.png',
      cid: 'logo'
    }
    ]
  };
  try {
    let info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending email: " + error.message);
  }
},

  {
    connection,
    concurrency: 5
  },
)
worker.on("completed", (job) => {
  console.log(`Job with id ${job.id} has been completed`)
})
worker.on("failed", (job, err) => {
  console.log(`Job with id ${job} has failed with error ${err.message}`)
})
const postworker = new Worker('post-queue', async (job) => {
  try {
    const cleanContent = sanitizeHtml(job.data.content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        'img': ['src', 'alt', 'width', 'height', 'style']
      },
      allowedSchemes: ['http', 'https', 'data']
    });
    const cleanTitle = sanitizeHtml(job.data.title, {
      allowedTags: [], 
      allowedAttributes: {}
    });
    const newPost = new Post({
      title: cleanTitle,
      featuredImage: job.data.featuredImage.url,
      content: cleanContent,
      status: job.data.status,
      userId: job.data.userId
    });
    await newPost.save();
  }
  catch (err) {
   throw new Error(err.message);
  }
}, {
  connection,
  concurrency: 5
})
postworker.on('completed', (job) => {
  console.log('job is completed')
})
postworker.on('failed', (err) => {
  console.log('job failed', err.message)
}
)
export { worker, postworker };