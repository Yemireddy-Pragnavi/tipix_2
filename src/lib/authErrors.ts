export function authError(error: {code?:string;status?:number;message:string;name?:string}) {
  if(error.status===429 || error.code?.includes('rate_limit')) return 'Too many attempts. Please wait before trying again.';
  if((error.status && error.status>=500)||error.name==='AuthRetryableFetchError'||/failed to fetch|network|timed out|timeout|abort/i.test(error.message)) return 'The account service is temporarily unavailable. Please wait a moment and retry. Your entered details have been kept.';
  if(error.code==='invalid_credentials') return 'Email or password is incorrect.';
  if(error.code==='weak_password') return 'Choose a stronger, unique password.';
  if(error.code==='email_address_not_authorized' || /smtp|sending confirmation|sending recovery/i.test(error.message)) return 'Email delivery is not ready. Please contact EDPIX to finish email setup.';
  if(error.code==='otp_expired') return 'This code is invalid or has expired. Request a new code.';
  if(error.code==='user_already_exists') return 'Unable to create this account. Try logging in or resetting your password.';
  return 'The request could not be completed. Please check your details and try again.';
}
