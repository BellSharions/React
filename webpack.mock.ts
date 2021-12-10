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
  app.get("/api/search/:category/:text", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    if (_req.path.split("/")[4].toLocaleLowerCase() === "*")
      res.json(mockGameList.filter(({ category }) => category.includes(_req.path.split("/")[3])) || mockGameList);
    else if (_req.path.split("/")[4].toLocaleLowerCase() === "")
      res.json(mockGameList.filter(({ category }) => category.includes(_req.path.split("/")[3])) || mockGameList);
    else
      res.json(
        mockGameList
          .filter(({ category }) => category.includes(_req.path.split("/")[3]))
          .filter(({ title }) => title.toLocaleLowerCase().includes(_req.path.split("/")[4].toLocaleLowerCase()))
      );
  });
  app.get("/api/search/:text", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    const response =
      mockGameList.filter(({ title }) =>
        title.toLocaleLowerCase().includes(_req.path.split("/")[3].toLocaleLowerCase())
      ) || mockGameList;
    res.json(response);
  });

  app.get("/api/search/", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    const response = mockGameList;
    res.json(response);
  });
  app.post("/testPostMock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });
});
