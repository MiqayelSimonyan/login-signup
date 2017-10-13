import passport from 'passport';
import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';

const router = module.exports = express.Router();

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/signUp', (req, res) => {
	res.render('index');
});

router.get('/login', (req, res) => {
	res.render('index');
});

router.get('/not-found', (req, res) => {
	res.render('index');
});

router.get('/user', helpers.auth('user'), (req, res) => {
	res.render('index');
});