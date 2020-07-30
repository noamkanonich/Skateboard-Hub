const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { response } = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/storeDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
});

const User = mongoose.model("User", userSchema);

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
});

const Product = mongoose.model("Product", productSchema);

const orderSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    products: Array,
    totalProducts: Number,
    totalPrice: Number,
    date: String,
});

const Order = mongoose.model("Order", orderSchema);

var totalPrice = 0;
var totalProducts = 0;
var userName = "";

app.get("/", function (req, res) {
    Product.find({}, function (err, foundProducts) {
        if (foundProducts.length === 0) {
            totalProducts = 0;
            User.find({ name: userName }, function (err, foundUser) {
                if (foundUser === null) {
                    res.render("index", {
                        totalProducts: totalProducts,
                        profileName: "",
                    });
                } else {
                    res.render("index", {
                        totalProducts: totalProducts,
                        profileName: userName,
                    });
                }
            });
        } else {
            totalProducts = foundProducts.length;
            res.render("index", {
                totalProducts: totalProducts,
                profileName: userName,
            });
        }
    });
});

app.post("/", function (req, res) {
    Product.find({}, function (err, foundProducts) {
        if (foundProducts.length === 0) {
            totalProducts = 0;
            res.render("index", {
                totalProducts: totalProducts,
                profileName: userName,
            });
        } else {
            totalProducts = foundProducts.length;
            res.render("index", {
                totalProducts: totalProducts,
                profileName: userName,
            });
        }
    });
});

app.get("/login", function (req, res) {
    var loginName = req.query.username;
    var loginNumber = req.query.phone;
    var loginEmail = req.query.email;
    
    User.findOne({ name: loginName, email: loginEmail }, function (
        err,
        foundUser
    ) {
        if (foundUser === null) {
            console.log("There is no such account!");
            res.redirect("/");
        } else {
            userName = loginName;
            res.render("index", {
                totalProducts: totalProducts,
                profileName: userName,
            });
        }
    });
});

app.post("/login", function (req, res) {
    var newUser = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
    });

    User.findOne({ name: newUser.name, email: newUser.email }, function (err,foundUser) {
        if (foundUser === null) {
            userName = newUser.name;
            newUser.save();
            res.redirect("/");
        } else {
            console.log("User is already created! redirecting to home page.");
            res.render("index", {
                totalProducts: totalProducts,
                profileName: userName,
            });
        }
    });
});

app.get("/signout", function (req, res) {
    userName = "";
    res.redirect("/");
});

app.get("/cart", function (req, res) {
    Product.find({}, function (err, foundProducts) {
        // If shopping cart is empty
        if (foundProducts.length === 0) {
            res.render("cart", {
                productList: foundProducts,
                totalProducts: 0,
                totalPrice: 0,
                userName: userName,
            });
        } else {
            totalPrice = 0;
            foundProducts.forEach(function (product) {
                totalPrice = totalPrice + product.price;
            });
            res.render("cart", {
                productList: foundProducts,
                totalProducts: foundProducts.length,
                totalPrice: totalPrice,
                userName: userName,
            });
        }
    });
});

app.post("/cart", function (req, res) {
    Product.find({}, function (err, foundProducts) {
        if (foundProducts.length === 0 && req.body.product === undefined) {
            res.redirect("cart");
        } else if ((foundProducts.length !== 0) & (req.body.product === undefined)) {
            totalPrice = 0;
            foundProducts.forEach(function (product) {
                totalPrice = totalPrice + product.price;
            });
            res.render("cart", {
                productList: foundProducts,
                totalProducts: totalProducts,
                totalPrice: totalPrice,
                userName: userName,
            });
        } else {
            var products = req.body.product;
            var prices = req.body.price;
            var images = req.body.image;

            // If there is only one product inside the shopping cart
            if (Array.isArray(prices) === false) {
                var newProduct = new Product({
                    name: products,
                    price: parseInt(prices),
                    image: images,
                });

                if (foundProducts.length > 0) {
                    var diff = true;
                    for (i = 0; i < foundProducts.length; i++) {
                        if (foundProducts[i].name === newProduct.name) {
                            diff = false;
                        }
                    }
                    if (diff === true) {
                        newProduct.save();
                        totalPrice = totalPrice + newProduct.price;
                        totalProducts++;
                    }
                } else {
                    newProduct.save();
                    totalPrice = totalPrice + newProduct.price;
                    totalProducts++;
                }
                res.redirect("cart");
            } else {
                prices.forEach(function (price) {
                    totalPrice = totalPrice + parseInt(price);
                    totalProducts++;
                });

                var newProduct = new Product();
                for (i = 0; i < products.length; i++) {
                    var newProduct = new Product({
                        name: products[i],
                        price: parseInt(prices[i]),
                        image: images[i],
                    });
                    var diff = true;

                    // Check if this product is alreay inside the shopping cart
                    foundProducts.forEach(function (product) {
                        if (product.name === newProduct.name) {
                            diff = false;
                        }
                    });
                    if (diff === true) {
                        newProduct.save();
                    }
                }

                Product.find({}, function (err, foundProducts) {
                    if (foundProducts.length === 0) {
                        res.redirect("cart");
                    } else {
                        res.redirect("cart");
                    }
                });
            }
        }
    });
});

app.post("/delete", function (req, res) {
    var productName = req.body.product;
    Product.findOneAndDelete({ name: productName }, function (err, productFound) {
        if (err) {
            console.log(err);
        } else {
            Product.find({}, function (err, productsFound) {
                if (productFound.length === 0) {
                    totalPrice = totalPrice - productFound.price;
                    totalProducts--;
                    console.log("Cart is Empty");
                    res.redirect("cart");
                } else {
                    totalPrice = totalPrice - productFound.price;
                    totalProducts--;
                    res.redirect("cart");
                }
            });
        }
    });
});

app.get("/profile", function (req, res) {
    Order.find({ name: userName }, function (err, orderFound) {
        if (orderFound.length === 0) {
            User.findOne({ name: userName }, function (err, userFound) {
                var newUserOrder = new Order({
                    name: userFound.name,
                    phone: userFound.phone,
                    email: userFound.email,
                });
                res.render("order", { orderFound: newUserOrder });
            });
        } else {
            res.render("order", { orderFound: orderFound });
        }
    });
});

app.post("/profile", function (req, res) {
    Order.find({ name: req.body.name }, function (err, orderFound) {
        res.render("order", { orderFound: orderFound });
    });
});

app.get("/order", function (req, res) {
    Order.find({ name: userName }, function (err, orderFound) {
        if (orderFound.length === 0) {
            res.redirect("order");
        } else {
            Product.deleteMany({}, function (err, foundProducts) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("order", { orderFound: orderFound });
                }
            });
        }
    });
});

app.post("/order", function (req, res) {
    var name = req.body.fullname;
    var phone = req.body.phone;
    var email = req.body.email;
    var totalPrice = 0;
    var today = String(new Date());
    var products = [];
    var newOrder;

    // When user not logged in - check if there is alreay a user with the same name
    User.find({name: name}, function(err, userFound){
        if(userFound.length > 0){
            userName = name;
            Order.deleteMany({ name: name }, function (err, orderFound) {
                if (err) {
                    console.log(err);
                }
            });
        }
    })

    // When user is logged in - delete his past order
    Order.deleteMany({ name: userName }, function (err, orderFound) {
        if (err) {
            console.log(err);
        }
    });

    Product.find({}, function (err, foundProducts) {
        if (foundProducts.length === 0) {
            res.send("EMPTY CART, TRY AGAIN");
        } else {
            for (i = 0; i < foundProducts.length; i++) {
                products.push(foundProducts[i]);
                totalPrice = totalPrice + foundProducts[i].price;
            }

            // if there is no user with this name, create one
            User.findOne({ name: userName }, function (err, userFound) {
                if (userFound === null) {
                    var newUser = new User({
                        name: name,
                        phone: phone,
                        email: email,
                    });
                    userName = newUser.name;
                    newUser.save();
                    console.log("NEW USER!");

                    newOrder = new Order({
                        name: name,
                        phone: phone,
                        email: email,
                        products: products,
                        totalPrice: totalPrice,
                        totalProducts: foundProducts.length,
                        date: today.slice(0, 25),
                    });
                    newOrder.save();
                } else {
                    newOrder = new Order({
                        name: userFound.name,
                        phone: userFound.phone,
                        email: userFound.email,
                        products: products,
                        totalPrice: totalPrice,
                        totalProducts: foundProducts.length,
                        date: today.slice(0, 25),
                    });
                    newOrder.save();
                }
            });
            Product.deleteMany({}, function (err, foundProducts) {
                if (err) {
                    console.log(err);
                }
            });
        }
        res.redirect("/profile");
    });
});

app.listen(3000, function () {
    Product.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        }
    });
    Order.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        }
    });
    User.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("Server started on port 3000");
});
