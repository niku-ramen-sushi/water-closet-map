console.log("==test=====start=");
const axios = require("axios");
const { expect } = require("chai");
const apiURL = "http://localhost:3000";

describe("起動確認__test.js", () => {
  it("起動OK", async () => {
    expect(11).to.equal(11);
  });
});

describe("find-user/id", () => {
  it("should return id:1 userId:1 data comment", async () => {
    const url = apiURL + "/api/click-wc-data/1/1";
    const resData = await axios.get(url);
    const res = resData.data;
    // console.log(res);

    expect(res[0].comment).to.equal("めちゃくちゃいけてる");
  });

  it("should return empty array - id:100 userId:100", async () => {
    const url = apiURL + "/api/click-wc-data/100/100";
    const resData = await axios.get(url);
    const res = resData.data;
    // console.log(res);

    expect(res.length).to.equal(0);
  });
});

describe("all-pins", () => {
  it("should return first pin title", async () => {
    const url = apiURL + "/api/all-wc-position";
    const resData = await axios.get(url);
    const res = resData.data;
    // console.log(res);

    expect(res[0].title).to.equal("大名古屋ビルヂング");
  });
});

describe("new-pins", () => {
  it("should return new pin name", async () => {
    const getUrl = apiURL + "/api/all-wc-position";
    const beforeData = await axios.get(getUrl);
    const beforeDataCount = beforeData.data.length;

    const url = apiURL + "/api/wc-position";
    const addObj = {
      user_id: 3,
      title: "JR名古屋高島屋",
      address: "名古屋市中村区99丁目",
      latitude: 99.99999,
      longitude: 88.88888,
      created_at: new Date(),
    };
    const resData = await axios.post(url, addObj);
    const res = resData.data;

    const afterData = await axios.get(getUrl);
    const afterDataCount = afterData.data.length;
    // console.log("count", beforeDataCount, afterDataCount);

    expect(res[0].title).to.equal("JR名古屋高島屋");
    expect(afterDataCount - beforeDataCount).to.equal(1);
  });
});

describe("new & del description", () => {
  it("should return new description comment", async () => {
    const getUrl = apiURL + "/api/click-wc-data/1";
    const beforeData = await axios.get(getUrl);
    const beforeDataCount = beforeData.data.length;
    const user_id = 1;
    const url = apiURL + "/api/wc-description";
    const comment = "すごくいいトイレでした。住んでもいいくらい清潔です。";
    const addObj = {
      hygiene_id: 1,
      wc_pos_id: 1,
      gender_type_id: 1,
      user_id: user_id,
      comment: comment,
    };
    const resData = await axios.post(url, addObj);
    const res = resData.data;
    // console.log(res);

    const afterData = await axios.get(getUrl);
    const afterDataCount = afterData.data.length;
    // console.log("count", beforeDataCount, afterDataCount);

    // console.log("add end--------------------");
    // console.log(afterData);
    const newId = afterData.data.filter((obj) => obj.user_id === user_id)[0].id;
    // console.log("newId", newId);
    //追加したデータを削除する

    const delAdd = apiURL + `/api/wc-description/${newId}`;
    const delData = await axios.delete(delAdd);
    const delRes = delData.data;
    // console.log("del--", delRes);

    const afterDelData = await axios.get(getUrl);
    const afterDelDataCount = afterDelData.data.length;

    expect(res[0].comment).to.equal(comment);
    expect(afterDataCount - beforeDataCount).to.equal(1);
    expect(beforeDataCount).to.equal(afterDelDataCount);
  });
});
