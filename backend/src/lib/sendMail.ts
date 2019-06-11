import AWS from 'aws-sdk';
import striptags from 'striptags';

const ses = new AWS.SES({ region: 'us-east-1' });

interface EmailParams {
  to: string | string[];
  subject: string;
  body: string;
  from: string;
}

const sendMail = ({
  to,
  subject,
  body,
  from = 'Justin <fivehoho75@gmail.com>',
}: EmailParams): Promise<any> => {
  return new Promise((resolve, reject) => {
    const params = {
      Destination: {
        ToAddresses: (() => {
          if (typeof to === 'string') {
            return [to];
          }
          return to;
        })(),
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: body,
          },
          Text: {
            Charset: 'UTF-8',
            Data: striptags(body),
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: from,
    };

    ses.sendEmail(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export default sendMail;
