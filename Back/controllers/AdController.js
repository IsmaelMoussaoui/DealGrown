const Ad = require('../models/Ad');
const jwt = require('jsonwebtoken');
const Vote = require('../models/Vote');
const User = require('../models/User');

exports.getAllAds = async (req, res) => {
    try {
        const ads = await Ad.findAll({
            attributes: ['id', 'title', 'description', 'imageUrl', 'publishTime', 'merchantName', 'commentsCount', 'upvotes', 'downvotes'],
            include: {
                model: User,
                as: 'author',
                attributes: ['username', 'avatarUrl']
            }
        });
        res.send(ads);
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error');
    }
};

exports.getAdById = async (req, res) => {
    try {
        const adId = req.params.id;
        const ad = await Ad.findOne({
            where: { id: adId },
            attributes: ['id', 'title', 'description', 'imageUrl', 'publishTime', 'merchantName', 'commentsCount', 'upvotes', 'downvotes'],
            include: {
                model: User,
                as: 'author',
                attributes: ['username', 'avatarUrl']
            }
        });

        if (!ad) {
            return res.status(404).send('Ad not found');
        }

        res.send(ad);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.createAd = async (req, res) => {
    try {
        // Vérification de l'authentification de l'utilisateur
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secretkey');

        if (!decoded.userId) {
            return res.status(403).send('Authorization denied');
        }

        const newAdData = {
            ...req.body,
            authorId: decoded.userId
        };

        req.body.publishTime = new Date();
        const ad = await Ad.create(newAdData);
        res.status(201).send(ad);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.upvoteAd = async (req, res) => {
    try {
        const adId = req.params.id;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secretkey');

        const existingVote = await Vote.findOne({ where: { userId: decoded.userId, adId } });
        if (existingVote) {
            return res.status(400).send('You have already voted for this ad.');
        }

        await Vote.create({ userId: decoded.userId, adId, voteType: 'up' });
        await Ad.increment('upvotes', { where: { id: adId } });

        res.send('Upvoted successfully');
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error');
    }
};

exports.downvoteAd = async (req, res) => {
    try {
        const adId = req.params.id;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secretkey');

        const existingVote = await Vote.findOne({ where: { userId: decoded.userId, adId } });
        if (existingVote) {
            return res.status(400).send('You have already voted for this ad.');
        }

        await Vote.create({ userId: decoded.userId, adId, voteType: 'down' });
        await Ad.increment('downvotes', { where: { id: adId } });

        res.send('Downvoted successfully');
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error');
    }
};
