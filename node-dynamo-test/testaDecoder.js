'use strict'
const Decoder = require('./decoder')
const Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJBVVRIX0NSRURFTlRJQUwiOiJ5YXNtaW4wNkBmYWtlLmNvbSIsIkFDQ09VTlRfSUQiOiIwOTNkODA2Mi0wYzI3LTRmOTktODMzMC1kNDY2YjRmMmNhODAiLCJBUFBMSUNBVElPTiI6IkZMRUVUIiwiaXNzIjoiaUZvb2QiLCJleHAiOjE1NjUxNjQ4MDAsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE1NjUxMDU1NTgsIlRFTkFOVCI6IkJSIn0.ZzxENx8YTwDpftxmntmhmEZGJwwsDV4hu9zeA6ne7xE_w6s9GNLkCmYJcDClNS9VOTtdZGwBXjA9XgUaKEOuk22urSAKjQFlwdnpAZ0vBTLTwBIrnFCrl1TrU-e1CMSX1scKJ4HTpwxJsWS-_KF6MCqKAS4tLC5Uu2Sgy04EznY'
const decoder = new Decoder(Authorization)
const accountId = decoder.getAccountId()
console.log(accountId)