/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import fs from "fs";

function compareGames(game1, game2, key: string, type: string) {
  const isDescending = type;
  if (key === "rating") {
    if (game1.rating > game2.rating) {
      return isDescending === "asc" ? 1 : -1;
    }
    if (game1.rating < game2.rating) {
      return isDescending === "desc" ? -1 : 1;
    }
    return 0;
  }
  if (key === "price") {
    if (game1.price > game2.price) {
      return isDescending === "asc" ? 1 : -1;
    }
    if (game1.price < game2.price) {
      return isDescending === "desc" ? -1 : 1;
    }
    return 0;
  }
  return undefined;
}
export default webpackMockServer.add((app, helper) => {
  app.get("/testMock", (_req, res) => {
    const response = {
      id: helper.getUniqueIdInt(),
      randomInt: helper.getRandomInt(),
      lastDate: new Date(),
    };

    res.json(response);
  });
  app.get("/api/search/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    const { platform, genre, age, sort, sortDir, text } = _req.query;
    const currentPlatform = (platform as string).toUpperCase();
    fs.readFile("./src/assets/products.json", "utf8", (err, data) => {
      if (err) {
        res.status(400).json(1);
        res.end();
      } else {
        const obj = JSON.parse(data);
        const response = obj
          .filter((game) => {
            if (game.genre === genre && game.age <= +age) return game;
            if (genre === "all genres" && game.age <= +age) return game;
            if (game.genre === genre && age === "all ages") return game;
            if (genre === "all genres" && age === "all ages") return game;
            return 0;
          })
          .filter((filteredGame) => {
            if (text !== "" && text) {
              if (filteredGame.title.toLowerCase().includes(text.toLowerCase())) return filteredGame;
            } else return filteredGame;
          })
          .filter((filteredGame) => {
            if (platform === "all games") return filteredGame;
            if (filteredGame.category.toLocaleUpperCase().includes(currentPlatform)) return filteredGame;
            return 0;
          })
          .filter((filteredGame) => {
            if (filteredGame.deleted === false) return filteredGame;
            return 0;
          })
          .sort((game1, game2) => compareGames(game1, game2, sort, sortDir));
        if (platform) {
          res.json(response);
        } else res.json(platform);
      }
    });
  });
  app.put("/api/auth/signUp/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    fs.readFile("./src/assets/users.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json(1);
        res.end();
      } else {
        const obj = JSON.parse(data);
        if (
          obj.users.filter((x) => x.login === _req.body.login).length === 0 &&
          _req.body.login !== undefined &&
          _req.body.password !== undefined
        ) {
          obj.users.push(_req.body);
          fs.writeFile("./src/assets/users.json", JSON.stringify(obj), "utf8", (err2) => {
            if (err2) {
              console.log(err2);
              res.status(400).json(1);
              res.end();
            } else {
              res.status(201).json(_req.body);
              res.end();
            }
          });
        } else {
          res.status(400).json(1);
          res.end();
        }
      }
    });
  });
  app.post("/api/auth/signIn/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    fs.readFile("./src/assets/users.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json(1);
      } else {
        const obj = JSON.parse(data);
        const foundUser = obj.users.filter((x) => x.login === _req.body.login)[0];
        if (_req.body.login !== undefined && _req.body.password !== undefined && foundUser !== undefined)
          if (
            foundUser.length !== 0 &&
            foundUser.login === _req.body.login &&
            foundUser.password === _req.body.password
          ) {
            res.json(foundUser);
            res.end();
          } else res.status(400).json(1);
        else res.status(400).json(1);
      }
    });
  });
  app.post("/api/buy", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    fs.readFile("./src/assets/orders.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json(1);
        res.end();
      } else {
        const obj = JSON.parse(data);
        obj.orders.push(_req.body);
        fs.writeFile("./src/assets/orders.json", JSON.stringify(obj), "utf8", (error) => {
          if (error) {
            console.log(error);
            res.status(400).json(1);
            res.end();
          } else {
            fs.readFile("./src/assets/carts.json", "utf8", (err2, data2) => {
              if (err2) {
                console.log(err2);
                res.status(400).json(1);
                res.end();
              } else {
                const obj2 = JSON.parse(data2);
                const foundCart = obj2.carts.filter((x) => x.login === _req.body.userName)[0];
                if (foundCart !== undefined) {
                  for (let i = 0; i < obj2.carts.length; i++) {
                    if (obj2.carts[i].login === _req.body.userName) {
                      obj2.carts[i].cart = [];
                      break;
                    }
                  }
                  fs.writeFile("./src/assets/carts.json", JSON.stringify(obj2), "utf8", (err3) => {
                    if (err3) {
                      console.log(err3);
                      res.status(400).json(1);
                      res.end();
                    } else {
                      res.status(201).json(_req.body);
                      res.end();
                    }
                  });
                }
              }
            });
          }
        });
      }
    });
  });
  app.get("/api/user/cart/:login", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    fs.readFile("./src/assets/carts.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json(1);
        res.end();
      } else {
        const obj = JSON.parse(data);
        const foundCart = obj.carts.filter((x) => x.login === _req.params.login)[0];
        if (foundCart && foundCart.cart) {
          res.status(200).json(foundCart.cart);
          res.end();
        } else {
          res.status(400).json({ gamesList: [] });
          res.end();
        }
      }
    });
  });
  app.post("/api/user/cart/:login", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    fs.readFile("./src/assets/carts.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json(1);
        res.end();
      } else {
        const obj = JSON.parse(data);
        const foundCart = obj.carts.filter((x) => x.login === _req.params.login)[0];
        if (foundCart !== undefined) {
          for (let i = 0; i < obj.carts.length; i++) {
            if (obj.carts[i].login === _req.params.login) {
              obj.carts[i].cart = _req.body;
              break;
            }
          }
          fs.writeFile("./src/assets/carts.json", JSON.stringify(obj), "utf8", (err2) => {
            if (err2) {
              console.log(err2);
              res.status(400).json(1);
              res.end();
            } else {
              res.status(201).json(_req.body);
              res.end();
            }
          });
        } else {
          obj.carts.push({ login: _req.params.login });
          fs.writeFile("./src/assets/carts.json", JSON.stringify(obj), "utf8", (err2) => {
            if (err2) {
              console.log(err2);
              res.status(400).json(1);
              res.end();
            } else {
              res.status(201).json(_req.body);
              res.end();
            }
          });
        }
      }
    });
  });
  app.get("/user/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    if (_req.query.login !== undefined)
      fs.readFile("./src/assets/users.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).json(1);
        } else {
          const obj = JSON.parse(data);
          const foundUser = obj.users.filter((x) => x.login === _req.query.login)[0];
          if (foundUser !== undefined) {
            res.json(foundUser);
            res.end();
          } else res.status(400).json(1);
        }
      });
    else res.status(400).json(1);
  });
  app.patch("/user/:login", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    if (_req.params.login !== undefined)
      fs.readFile("./src/assets/users.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).json(1);
        } else {
          const obj = JSON.parse(data);
          const foundUser = obj.users.filter((x) => x.login === _req.params.login)[0];
          const existingUser = obj.users.filter((x) => x.login === _req.body.login)[0];
          if (foundUser !== undefined && !existingUser) {
            for (let i = 0; i < obj.users.length; i++) {
              if (obj.users[i].login === _req.params.login) {
                obj.users[i].login = _req.body.login;
                obj.users[i].description = _req.body.description;
                break;
              }
            }
            fs.writeFile("./src/assets/users.json", JSON.stringify(obj), "utf8", (err2) => {
              if (err2) {
                console.log(err2);
                res.status(400).json(_req.params.login);
                res.end();
              } else {
                res.status(201).json(_req.body.login);
                res.end();
              }
            });
          } else res.status(400).json(_req.params.login);
        }
      });
    else res.status(400).json(_req.params.login);
  });
  app.patch("/user/passwordChange/:login", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    if (_req.params.login !== undefined)
      fs.readFile("./src/assets/users.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).json(1);
        } else {
          const obj = JSON.parse(data);
          const foundUser = obj.users.filter((x) => x.login === _req.params.login)[0];
          if (foundUser !== undefined) {
            for (let i = 0; i < obj.users.length; i++) {
              if (obj.users[i].login === _req.params.login) {
                if (obj.users[i].password === _req.body.repeatNewPassword) {
                  res.status(406);
                  res.end("Please don't use the same password as your old password");
                  return;
                }
                obj.users[i].password = _req.body.repeatNewPassword;
                break;
              }
            }
            fs.writeFile("./src/assets/users.json", JSON.stringify(obj), "utf8", (err2) => {
              if (err2) {
                console.log(err2);
                res.status(400).json(_req.params.login);
                res.end();
              } else {
                res.status(201).json(_req.body.login);
                res.end();
              }
            });
          } else res.status(400).json(_req.params.login);
        }
      });
    else res.status(400).json(_req.params.login);
  });
  app.post("/upload/:login", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    if (!_req.params.login) res.status(400).json(_req.params.login);
    else
      fs.readFile("./src/assets/users.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).json(1);
        } else {
          const obj = JSON.parse(data);
          const foundUser = obj.users.filter((x) => x.login === _req.params.login)[0];
          if (!foundUser) res.status(400).json(_req.params.login);
          else {
            console.log(_req.body);

            for (let i = 0; i < obj.users.length; i++) {
              if (obj.users[i].login === _req.params.login) {
                obj.users[i].profilePic = Object.keys(_req.body)[0];
                break;
              }
            }
            fs.writeFile("./src/assets/users.json", JSON.stringify(obj), "utf8", (err2) => {
              if (err2) {
                console.log(err2);
                res.status(400).json(_req.params.login);
                res.end();
              } else {
                res.status(201).json(_req.body.login);
                res.end();
              }
            });
          }
        }
      });
  });
  app.put("/api/product/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    fs.readFile("./src/assets/products.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json(1);
        res.end();
      } else {
        const obj = JSON.parse(data);
        obj.map((game) => {
          if (game.id === _req.body.id) {
            game.title = _req.body.title;
            game.age = _req.body.age;
            game.category = _req.body.category;
            game.description = _req.body.description;
            game.genres = _req.body.genre;
            game.logo = _req.body.logo;
            game.price = _req.body.price;
          }
        });
        fs.writeFile("./src/assets/products.json", JSON.stringify(obj), "utf8", (err2) => {
          if (err2) {
            console.log(err2);
            res.status(400).json();
            res.end();
          } else {
            res.status(200).json(obj);
            res.end();
          }
        });
      }
    });
  });
  app.post("/api/product/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    let flag = false;
    fs.readFile("./src/assets/products.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json(1);
        res.end();
      } else {
        const obj = JSON.parse(data);
        obj.map((game) => {
          if (game.title === _req.body.title && game.deleted === false) {
            res.status(400).json();
            res.end();
            flag = true;
          }
        });
        if (!flag) {
          _req.body.id = obj.length + 1;
          obj.push(_req.body);
          fs.writeFile("./src/assets/products.json", JSON.stringify(obj), "utf8", (err2) => {
            if (err2) {
              console.log(err2);
              res.status(400).json();
              res.end();
            } else {
              res.status(200).json(obj);
              res.end();
            }
          });
        }
      }
    });
  });
  app.delete("/api/product/:id", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    fs.readFile("./src/assets/products.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json(1);
        res.end();
      } else {
        const obj = JSON.parse(data);
        obj.map((game) => {
          if (game.id === +_req.params.id) {
            game.deleted = true;
          }
        });
        fs.writeFile("./src/assets/products.json", JSON.stringify(obj), "utf8", (err2) => {
          if (err2) {
            console.log(err2);
            res.status(400).json();
            res.end();
          } else {
            res.status(200).json(obj);
            res.end();
          }
        });
      }
    });
  });
  app.options("/api/auth/signUp/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS");
    res.set("Access-Control-Allow-Headers", "content-type");
    res.json(1);
    res.end();
  });
  app.options("/api/product/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS");
    res.set("Access-Control-Allow-Headers", "content-type");
    res.json(1);
    res.end();
  });
  app.options("/api/search", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS");
    res.set("Access-Control-Allow-Headers", "content-type");
    res.json(1);
    res.end();
  });
  app.options("/api/auth/signIn/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:8080");
    res.set("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
    res.set("Access-Control-Allow-Headers", "content-type");
    res.json(1);
    res.end();
  });
  app.options("/user/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:8080");
    res.set("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, PATCH");
    res.set("Access-Control-Allow-Headers", "content-type");
    res.json(1);
    res.end();
  });
  app.options("/user/passwordChange/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:8080");
    res.set("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, PATCH");
    res.set("Access-Control-Allow-Headers", "content-type");
    res.json(1);
    res.end();
  });
  app.options("/api/cart", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
    res.set("Access-Control-Allow-Headers", "content-type");
    res.json(1);
    res.end();
  });
  app.post("/testPostMock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });
});
