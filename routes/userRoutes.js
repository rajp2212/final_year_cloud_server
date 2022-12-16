import express from 'express';
import { signinuser,signupuser, signinprovider, signupprovider, updateDetails,getDetails,ResourceUpdate,getUserDetails } from '../controllers/userAction.js';

const router=express.Router();

router.post('/signinuser',signinuser); 
router.post('/signupuser',signupuser); 
router.post('/signinprovider',signinprovider); 
router.post('/signupprovider',signupprovider); 
router.patch('/:id',updateDetails); 
router.post('/:id',ResourceUpdate); 
router.get('/details',getDetails); 
router.get('/userDetails',getUserDetails); 


export default router;