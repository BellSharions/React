// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
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
    else if (_req.query.text === undefined && _req.query.platform === undefined) res.json(mockGameList);
    else
      res.json(
        mockGameList
          .filter(({ category }) => category.includes(_req.query.platform))
          .filter(({ title }) => title.includes(_req.query.text))
      );
    const response = mockGameList;
    res.json(response);
  });

  app.post("/testPostMock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });
});
