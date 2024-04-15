const express = require("express")
const { model } = require("mongoose");
const { User, validate } = require("../models/user");

const app =express()

// middelwerees that are specific to this router
app.use(express.json())

