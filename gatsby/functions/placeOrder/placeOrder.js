const nodemailer = require("nodemailer");

function generateOrderEmail({ order, total }) {
  return `
  <div>
  <h2>Your recent order total is ${total}</h2>
  <p>Please start walking over. We will have your order ready in 20 minutes</p>
  <ul>
  ${order.map(
    (item) => `<li>
  <img src="${item.thumbnail}" alt="${item.name}"/>
  ${item.size} ${item.name} - ${item.price}
  </li>`
  ).join('')}
  </ul>
  <p>Your total is <strong>${total}</strong> due at pickup</p>
  <style>
  ul {
    list-style: none;
  }
  </style>
  </div>
  `;
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);

  //validate
  const requiredFields = ["name", "email", "order"];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        status: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // Send email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: "New Order!",
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Success" }),
  };
};
