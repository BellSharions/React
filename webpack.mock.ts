// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import fs from "fs";
import { mockGameList } from "./src/constants/constants";

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
  console.log(game1.price > game2.price);
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
  app.get("/games", (_req, res) => {
    const response = mockGameList;
    res.set("Access-Control-Allow-Origin", "*");
    res.json(response);
    res.end();
  });
  app.get("/api/getTopProducts", (_req, res) => {
    const response = mockGameList.slice(0, 3);
    res.set("Access-Control-Allow-Origin", "*");
    res.json(response);
    res.end();
  });

  app.get("/api/search/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    const { platform, genre, age, sort, sortDir, text } = _req.query;
    console.log(_req.query);
    console.log(text);

    const currentPlatform = platform.toUpperCase();
    const response = mockGameList
      .filter((game) => {
        if (game.genres === genre && game.age <= +age) return game;
        if (genre === "all genres" && game.age <= +age) return game;
        if (game.genres === genre && age === "all ages") return game;
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
      .sort((game1, game2) => compareGames(game1, game2, sort, sortDir));
    if (platform) {
      res.json(response);
    } else res.json(platform);
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
        console.log(_req.body.login);
        console.log(_req.body.password);
        console.log(obj.users.filter((x) => x.login === _req.body.login));
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
        console.log(_req.body);
        console.log(_req.body.login);
        const foundUser = obj.users.filter((x) => x.login === _req.body.login)[0];
        console.log(foundUser);
        if (_req.body.login !== undefined && _req.body.password !== undefined && foundUser !== undefined)
          if (
            foundUser.length !== 0 &&
            foundUser.login === _req.body.login &&
            foundUser.password === _req.body.password
          ) {
            res.json(_req.body);
            res.end();
          } else res.status(400).json(1);
        else res.status(400).json(1);
      }
    });
  });
  app.get("/users/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    if (_req.query.login !== undefined)
      fs.readFile("./src/assets/users.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).json(1);
        } else {
          const obj = JSON.parse(data);
          console.log(_req.query);
          const foundUser = obj.users.filter((x) => x.login === _req.query.login)[0];
          console.log(foundUser);
          if (foundUser !== undefined) {
            res.json(foundUser);
            res.end();
          } else res.status(400).json(1);
        }
      });
    else res.status(400).json(1);
  });
  app.patch("/users/:login", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    console.log(_req.params);
    console.log(_req.body);
    if (_req.params.login !== undefined)
      fs.readFile("./src/assets/users.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).json(1);
        } else {
          const obj = JSON.parse(data);
          console.log(obj.users.length);
          const foundUser = obj.users.filter((x) => x.login === _req.params.login)[0];
          const existingUser = obj.users.filter((x) => x.login === _req.body.login)[0];
          console.log(foundUser);
          console.log(existingUser);
          if (foundUser !== undefined && existingUser === undefined) {
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
  app.patch("/passwordChange/:login", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    console.log(_req.params);
    console.log(_req.body);
    if (_req.params.login !== undefined)
      fs.readFile("./src/assets/users.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).json(1);
        } else {
          const obj = JSON.parse(data);
          console.log(obj.users.length);
          const foundUser = obj.users.filter((x) => x.login === _req.params.login)[0];
          console.log(foundUser);
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
    console.log(_req.params);
    console.log(_req.body);
    if (_req.params.login === undefined) res.status(400).json(_req.params.login);
    else
      fs.readFile("./src/assets/users.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).json(1);
        } else {
          const obj = JSON.parse(data);
          console.log(obj.users.length);
          const foundUser = obj.users.filter((x) => x.login === _req.params.login)[0];
          console.log(foundUser);
          if (foundUser === undefined) res.status(400).json(_req.params.login);
          else {
            for (let i = 0; i < obj.users.length; i++) {
              if (obj.users[i].login === _req.params.login) {
                obj.users[i].profilePic = _req.body;
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
  app.options("/api/auth/signUp/", (_req, res) => {
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
  app.options("/users/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:8080");
    res.set("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, PATCH");
    res.set("Access-Control-Allow-Headers", "content-type");
    res.json(1);
    res.end();
  });
  app.options("/passwordChange/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:8080");
    res.set("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, PATCH");
    res.set("Access-Control-Allow-Headers", "content-type");
    res.json(1);
    res.end();
  });
  app.post("/testPostMock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });
});
