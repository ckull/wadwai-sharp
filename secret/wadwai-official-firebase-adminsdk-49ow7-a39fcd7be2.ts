export const adminConfig = {
  type: 'service_account',
  project_id: 'wadwai-official',
  private_key_id: process.env.FIREBASE_PRIVATE_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email:
    'firebase-adminsdk-49ow7@wadwai-official.iam.gserviceaccount.com',
  client_id: '113412966932528172367',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-49ow7%40wadwai-official.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};
