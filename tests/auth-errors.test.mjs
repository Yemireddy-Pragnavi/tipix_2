import {test} from 'node:test';
import assert from 'node:assert/strict';
import {authError} from '../.sites-runtime/auth-test/authErrors.js';
test('outages do not accuse users of incorrect details',()=>{for(const error of [{status:502,message:'Bad Gateway'},{name:'AuthRetryableFetchError',message:'fetch failed'},{message:'The account service timed out.'}]) assert.match(authError(error),/temporarily unavailable/);});
test('incorrect credentials and throttling have distinct actions',()=>{assert.match(authError({code:'invalid_credentials',message:''}),/Email or password/);assert.match(authError({status:429,message:''}),/wait/);});
