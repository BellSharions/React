// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import fs from "fs";
import { mockGameList } from "./src/constants/constants";

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
  });
  app.get("/api/getTopProducts", (_req, res) => {
    const response = mockGameList.slice(0, 3);
    res.set("Access-Control-Allow-Origin", "*");
    res.json(response);
  });
  app.get("/api/search/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    if (_req.query.platform === undefined && _req.query.text !== undefined)
      res.json(mockGameList.filter(({ title }) => title.includes(_req.query.text)));
    else if (_req.query.text === undefined && _req.query.platform !== undefined)
      res.json(mockGameList.filter(({ category }) => category.includes(_req.query.platform)) || mockGameList);
    else
      res.json(
        mockGameList
          .filter(({ category }) => category.includes(_req.query.platform))
          .filter(({ title }) => title.includes(_req.query.text))
      );
    const response = mockGameList;
    res.json(response);
  });
  app.put("/api/auth/signUp/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    fs.readFile("./src/assets/users.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const obj = JSON.parse(data);
        if (_req.body.login !== undefined && _req.body.password !== undefined) obj.users.push(_req.body);
        if (obj.users.filter((x) => x.login === _req.body.login).length === 0)
          fs.writeFile("./src/assets/users.json", JSON.stringify(obj), "utf8", (err2) => {
            if (err2) {
              console.log(err2);
            }
            res.status(201).json(_req.body);
          });
        else res.status(400).json(1);
      }
    });
  });
  app.post("/api/auth/signIn/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    fs.readFile("./src/assets/users.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const obj = JSON.parse(data);
        console.log(_req.body);
        console.log(_req.body.login);
        console.log(obj.users.filter((x) => x.login === _req.body.login));
        if (_req.body.login !== undefined && _req.body.password !== undefined)
          if (obj.users.filter((x) => x.login === _req.body.login).length !== 0) res.json(_req.body);
          else res.status(400).json(1);
      }
    });
  });
  app.options("/api/auth/signUp/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS");
    res.set("Access-Control-Allow-Headers", "content-type");
    res.json(1);
  });
  app.options("/api/auth/signIn/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:8080");
    res.set("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
    res.set("Access-Control-Allow-Headers", "content-type");
    res.json(1);
  });
  app.post("/testPostMock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });
});
