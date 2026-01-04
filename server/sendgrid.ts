import sgMail from '@sendgrid/mail';

export async function getUncachableSendGridClient() {
  const apiKey = process.env.SENDGRID_API_KEY;
  
  if (!apiKey) {
    throw new Error('SENDGRID_API_KEY not configured');
  }
  
  if (!apiKey.startsWith('SG.')) {
    throw new Error('Invalid SendGrid API key format - must start with SG.');
  }
  
  sgMail.setApiKey(apiKey);
  
  return {
    client: sgMail,
    fromEmail: 'asembleai@gmail.com'
  };
}
